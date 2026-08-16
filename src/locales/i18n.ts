import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en";
import zhTW from "./zh-TW";

const LANGUAGE_KEY = "student-saver-language";
const supportedLanguages = ["en", "zh-TW"] as const;
type SupportedLanguage = (typeof supportedLanguages)[number];

function normalizeLanguage(
  language: string | null | undefined,
): SupportedLanguage {
  return language?.toLowerCase().startsWith("zh") ? "zh-TW" : "en";
}

function getInitialLanguage(): SupportedLanguage {
  const savedLanguage = localStorage.getItem(LANGUAGE_KEY);

  if (
    savedLanguage &&
    supportedLanguages.includes(savedLanguage as SupportedLanguage)
  ) {
    return savedLanguage as SupportedLanguage;
  }

  return normalizeLanguage(navigator.languages[0] ?? navigator.language);
}

void i18n.use(initReactI18next).init({
  resources: {
    en,
    "zh-TW": zhTW,
  },
  lng: getInitialLanguage(),
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

function syncDocumentLanguage(language: string) {
  const normalizedLanguage = normalizeLanguage(language);
  const locale = normalizedLanguage === "zh-TW" ? "zh_TW" : "en_US";
  document.documentElement.lang = normalizedLanguage;
  localStorage.setItem(LANGUAGE_KEY, normalizedLanguage);
  document.title = i18n.t("meta.title");

  const setMetaContent = (selector: string, content: string) => {
    document
      .querySelector<HTMLMetaElement>(selector)
      ?.setAttribute("content", content);
  };

  setMetaContent('meta[name="description"]', i18n.t("meta.description"));
  setMetaContent('meta[property="og:title"]', i18n.t("meta.title"));
  setMetaContent(
    'meta[property="og:description"]',
    i18n.t("meta.socialDescription"),
  );
  setMetaContent('meta[property="og:locale"]', locale);
  setMetaContent('meta[property="og:image:alt"]', i18n.t("meta.imageAlt"));
  setMetaContent('meta[name="twitter:title"]', i18n.t("meta.title"));
  setMetaContent(
    'meta[name="twitter:description"]',
    i18n.t("meta.socialDescription"),
  );
  setMetaContent('meta[name="twitter:image:alt"]', i18n.t("meta.imageAlt"));

  const structuredData =
    document.querySelector<HTMLScriptElement>("#structured-data");

  if (structuredData?.textContent) {
    const data = JSON.parse(structuredData.textContent) as {
      "@graph": Array<{ "@type": string; description?: string }>;
    };
    const application = data["@graph"].find(
      (entry) => entry["@type"] === "SoftwareApplication",
    );

    if (application) {
      application.description = i18n.t("meta.structuredDescription");
      structuredData.textContent = JSON.stringify(data);
    }
  }
}

syncDocumentLanguage(i18n.language);
i18n.on("languageChanged", syncDocumentLanguage);

export default i18n;
