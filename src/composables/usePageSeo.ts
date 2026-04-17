import { computed } from "vue";
import { useI18n } from "vue-i18n";
import {
  OG_LOCALE_BY_CODE,
  SITE_AUTHOR,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_URL,
  SOCIAL_IMAGE_PATH,
  toAbsoluteUrl,
} from "~/utils/seo";

type StructuredData = Record<string, unknown>;

type PageSeoOptions = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  keywords?: string[];
  type?: "website" | "article";
  noindex?: boolean;
  structuredData?: StructuredData[];
};

export const usePageSeo = (options: PageSeoOptions) => {
  const route = useRoute();
  const runtimeConfig = useRuntimeConfig();
  const { locale } = useI18n();

  const siteUrl = computed(() => runtimeConfig.public.siteUrl || SITE_URL);
  const canonicalPath = computed(() => options.path ?? route.path);
  const canonicalUrl = computed(() => toAbsoluteUrl(siteUrl.value, canonicalPath.value));
  const socialImage = computed(() => toAbsoluteUrl(siteUrl.value, options.image ?? SOCIAL_IMAGE_PATH));
  const robots = options.noindex
    ? "noindex, nofollow"
    : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
  const keywords = Array.from(new Set([...SITE_KEYWORDS, ...(options.keywords ?? [])])).join(", ");

  if (import.meta.server) {
    useSeoMeta({
      title: options.title,
      description: options.description,
      author: SITE_AUTHOR,
      keywords,
      robots,
      ogTitle: options.title,
      ogDescription: options.description,
      ogType: options.type ?? "website",
      ogUrl: () => canonicalUrl.value,
      ogImage: () => socialImage.value,
      ogImageAlt: `${SITE_NAME} preview image`,
      ogSiteName: SITE_NAME,
      ogLocale: () => OG_LOCALE_BY_CODE[locale.value] ?? "en_US",
      twitterCard: "summary_large_image",
      twitterTitle: options.title,
      twitterDescription: options.description,
      twitterImage: () => socialImage.value,
      applicationName: SITE_NAME,
    });
  }

  const schemaEntries = computed(() => {
    const pageSchema: StructuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: options.title,
      description: options.description,
      url: canonicalUrl.value,
      inLanguage: locale.value,
      isPartOf: {
        "@type": "WebSite",
        name: SITE_NAME,
        url: siteUrl.value,
        description: SITE_DESCRIPTION,
      },
    };

    return [...(options.structuredData ?? []), pageSchema];
  });

  useHead({
    link: [
      {
        key: "canonical",
        rel: "canonical",
        href: () => canonicalUrl.value,
      },
    ],
    script: () =>
      schemaEntries.value.map((entry, index) => ({
        key: `ld-json-${canonicalPath.value}-${index}`,
        type: "application/ld+json",
        textContent: JSON.stringify(entry),
      })),
  });

  return {
    canonicalUrl,
    socialImage,
  };
};
