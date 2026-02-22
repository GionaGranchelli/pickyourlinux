# Dataset Maintenance

## Future Work / Known Follow-ups

- **Artix runit variant**: Artix ships separate ISOs for runit, s6, and dinit. When the schema supports multiple init system values per distro, add `artix_linux_runit` as a separate entry to bring `initSystem=RUNIT` from 2 to 3 matches.
- **LXQt coverage**: Monitor whether any new maintained LXQt-focused distro emerges. Current ceiling of 1 is accurate as of February 2026.
- **Nix ecosystem**: If Determinate NixOS or Lix reaches sufficient adoption and stability, evaluate adding as a second NIX entry.
