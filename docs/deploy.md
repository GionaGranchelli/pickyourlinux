# Deployment

whichdistro.com is a statically prerendered Nuxt app (`nitro.preset: "static"`), served by nginx
from files. There is no server process to restart and no CI deploy step: the build runs on the
host. This file records the procedure as it exists on the box, because it was previously only
discoverable by logging in.

## Shape

- `whichdistro.com` / `www.whichdistro.com` → `172.233.58.150` (Linode host alias `tuna`)
- nginx: `/etc/nginx/conf.d/picklinux.conf`, `root /var/www/picklinux/app/public`
- git checkout on the host: `/var/www/picklinux/repo` (origin = GitHub, deploy key)
- published files: `/var/www/picklinux/app/public`

## Deploy

`/root/deploy-picklinux.sh` on the host does, in order:

1. `git pull` in `/var/www/picklinux/repo`
2. `pnpm install --frozen-lockfile`
3. `NODE_OPTIONS=--max-old-space-size=960 pnpm run build` (the box has 1 GB RAM)
4. `rm -rf /var/www/picklinux/app/public` and `cp -r .output/public /var/www/picklinux/app/public`

Run it detached — the build takes minutes on 1 GB of RAM and a dropped SSH session must not kill
it:

    ssh tuna 'cd /root && setsid nohup ./deploy-picklinux.sh > /tmp/deploy.log 2>&1 < /dev/null &'

A failed build cannot take the site down: step 4 runs only after step 3 succeeds, so the published
directory is untouched until there is something to publish.

## Toolchain

Two combinations are known to work, and they are not interchangeable:

- host: Node v20.19.1 + pnpm 10.30.1 — this is what deploys today
- CI (`.github/workflows/ci.yml`): Node 22 + pnpm 11.6.0 — this is what gates PRs

If pnpm is ever upgraded on the host to 11, Node must go to 22 at the same time: pnpm 11 requires
`node:sqlite`, which landed in Node 22.5.

## After deploying

- `curl -o /dev/null -w '%{http_code}' https://whichdistro.com/` → 200
- `/wizard`, `/distros`, `/compare` answer 301 to the trailing-slash form and then 200 — nginx
  directory normalisation, unchanged by any dataset or engine edit
- confirm the dataset actually shipped, positively and negatively:
  `curl -s https://whichdistro.com/llms-full.txt` lists `llms-full.txt` content generated from
  `src/data/distros.json` at build time, so a distro added in the deployed commit appears there and
  a removed one does not
- `npx vitest`/`pnpm build` locally first: the CI gates (`typecheck`, `test`, `validate`, `lint`,
  `build`) are what make the host build a formality rather than a gamble
