import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ArrowDown,
  ArrowRight,
  Bookmark,
  Building2,
  Check,
  Download,
  Menu,
  PenTool,
  Sparkles,
  X,
} from "lucide-react";
import displayOne from "./assets/display1.png";
import displayTwo from "./assets/display2.png";
import appIcon from "./assets/icon3.png";

const APP_STORE_URL =
  "https://apps.apple.com/us/app/student-saver/id6780177346";

const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSdD4rFIMFE9V0R6eJG5MgWiHFqpyzIpXdkxxO-QMyyvG6pc9w/viewform?usp=dialog";

function AppStoreLink({ compact = false }: { compact?: boolean }) {
  const { t } = useTranslation();

  return (
    <a
      href={APP_STORE_URL}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center justify-center gap-2 bg-ink text-paper transition-colors hover:bg-sage-dark ${
        compact
          ? "min-h-10 px-4 text-sm font-semibold"
          : "min-h-13 px-6 text-sm font-bold sm:text-base"
      }`}
    >
      <Download aria-hidden="true" size={compact ? 16 : 18} />
      {compact ? t("nav.download") : t("hero.download")}
    </a>
  );
}

function LanguageSwitch() {
  const { i18n, t } = useTranslation();
  const currentLanguage = i18n.resolvedLanguage?.startsWith("zh")
    ? "zh-TW"
    : "en";

  return (
    <div
      className="inline-flex h-10 items-center border border-ink/20 bg-paper p-1"
      role="group"
      aria-label={t("nav.language")}
    >
      {[
        ["en", "EN"],
        ["zh-TW", "繁中"],
      ].map(([language, label]) => (
        <button
          key={language}
          type="button"
          onClick={() => void i18n.changeLanguage(language)}
          aria-pressed={currentLanguage === language}
          className={`h-full px-2.5 text-xs font-bold transition-colors ${
            currentLanguage === language
              ? "bg-ink text-paper"
              : "text-ink/60 hover:text-ink"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

function Header() {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-paper/95 backdrop-blur-md">
      <div className="page-shell flex h-16 items-center justify-between gap-4">
        <a
          href="#top"
          className="flex items-center gap-2.5 font-bold"
          onClick={closeMenu}
        >
          <img
            src={appIcon}
            alt=""
            aria-hidden="true"
            className="size-8 object-cover"
          />
          <span>Student StudyPen</span>
        </a>

        <nav className="hidden items-center gap-7 text-sm font-semibold md:flex">
          <a className="transition-colors hover:text-sage-dark" href="#product">
            {t("nav.product")}
          </a>
          <a
            className="transition-colors hover:text-sage-dark"
            href="#features"
          >
            {t("nav.features")}
          </a>
          <a className="transition-colors hover:text-sage-dark" href="#enquiry">
            {t("nav.enquiry")}
          </a>
          <a className="transition-colors hover:text-sage-dark" href="#contact">
            {t("nav.contact")}
          </a>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitch />
          <AppStoreLink compact />
        </div>

        <button
          type="button"
          className="grid size-10 place-items-center border border-ink/20 md:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={menuOpen ? t("nav.close") : t("nav.menu")}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {menuOpen && (
        <nav
          id="mobile-navigation"
          className="page-shell border-t border-ink/10 py-5 md:hidden"
        >
          <div className="grid gap-1 text-lg font-semibold">
            <a className="py-3" href="#product" onClick={closeMenu}>
              {t("nav.product")}
            </a>
            <a className="py-3" href="#features" onClick={closeMenu}>
              {t("nav.features")}
            </a>
            <a className="py-3" href="#enquiry" onClick={closeMenu}>
              {t("nav.enquiry")}
            </a>
            <a className="py-3" href="#contact" onClick={closeMenu}>
              {t("nav.contact")}
            </a>
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-ink/10 pt-5">
            <LanguageSwitch />
            <AppStoreLink compact />
          </div>
        </nav>
      )}
    </header>
  );
}

function FeatureCopy({
  number,
  title,
  body,
}: {
  number: string;
  title: string;
  body: string;
}) {
  return (
    <article className="border-t border-ink/20 pt-6">
      <div className="mb-8 flex items-center justify-between">
        <span className="font-mono text-xs text-ink/50">{number}</span>
        <ArrowRight aria-hidden="true" className="text-sage-dark" size={18} />
      </div>
      <h3 className="max-w-md font-display text-3xl leading-tight sm:text-4xl">
        {title}
      </h3>
      <p className="mt-5 max-w-lg text-base leading-7 text-ink/65">{body}</p>
    </article>
  );
}

function App() {
  const { t } = useTranslation();

  return (
    <div id="top" className="overflow-clip">
      <Header />

      <main>
        <section
          id="product"
          className="relative min-h-[calc(100svh-4rem)] border-b border-ink/10"
        >
          <div className="page-shell grid min-h-[calc(100svh-4rem)] items-center gap-10 py-12 lg:grid-cols-[0.82fr_1.18fr] lg:py-16">
            <div className="relative z-10 reveal">
              <p className="eyebrow text-sage-dark">{t("hero.eyebrow")}</p>
              <h1 className="display-title mt-7 max-w-3xl text-[clamp(3.4rem,7vw,7.4rem)]">
                {t("hero.title")}
              </h1>
              <p className="mt-7 max-w-xl text-lg leading-8 text-ink/65 sm:text-xl">
                {t("hero.body")}
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-5">
                <AppStoreLink />
                <a
                  href="#features"
                  className="inline-flex min-h-12 items-center gap-2 border-b border-ink py-2 text-sm font-bold"
                >
                  {t("hero.explore")}
                  <ArrowDown aria-hidden="true" size={17} />
                </a>
              </div>
            </div>

            <div className="image-noise reveal reveal-delay relative min-h-[24rem] overflow-hidden bg-bone sm:min-h-[34rem] lg:min-h-[42rem]">
              <div className="absolute inset-x-[8%] top-[10%] h-[80%] rotate-[-2deg] overflow-hidden border-[10px] border-ink bg-ink shadow-[0_30px_80px_rgba(23,24,22,0.24)] sm:border-[14px]">
                <img
                  src={displayOne}
                  alt={t("hero.imageAlt")}
                  className="size-full object-cover object-center"
                />
              </div>
              <div className="absolute bottom-5 left-5 z-10 flex items-center gap-2 bg-paper px-4 py-3 text-xs font-bold shadow-lg sm:bottom-8 sm:left-8">
                <PenTool aria-hidden="true" size={16} />
                Apple Pencil
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 sm:py-32">
          <div className="page-shell grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
            <p className="eyebrow text-sage-dark">{t("intro.eyebrow")}</p>
            <div>
              <h2 className="display-title max-w-5xl text-5xl sm:text-6xl lg:text-7xl">
                {t("intro.title")}
              </h2>
              <p className="mt-8 max-w-2xl text-lg leading-8 text-ink/65">
                {t("intro.body")}
              </p>
            </div>
          </div>
        </section>

        <section
          id="features"
          className="border-y border-ink/10 bg-bone/65 py-24 sm:py-32"
        >
          <div className="page-shell grid gap-16 md:grid-cols-2 md:gap-x-14 md:gap-y-24">
            <FeatureCopy
              number={t("features.pencil.number")}
              title={t("features.pencil.title")}
              body={t("features.pencil.body")}
            />
            <FeatureCopy
              number={t("features.feedback.number")}
              title={t("features.feedback.title")}
              body={t("features.feedback.body")}
            />
          </div>
        </section>

        <section className="py-24 sm:py-32">
          <div className="page-shell grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <div className="order-2 lg:order-1">
              <p className="eyebrow text-sage-dark">{t("practice.eyebrow")}</p>
              <h2 className="display-title mt-6 max-w-xl text-5xl sm:text-6xl">
                {t("practice.title")}
              </h2>
              <p className="mt-7 max-w-xl text-lg leading-8 text-ink/65">
                {t("practice.body")}
              </p>
              <ol className="mt-10 grid gap-0 border-t border-ink/20">
                {["stepOne", "stepTwo", "stepThree"].map((step, index) => (
                  <li
                    key={step}
                    className="flex items-center gap-5 border-b border-ink/20 py-5"
                  >
                    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-ink text-xs text-paper">
                      {index + 1}
                    </span>
                    <span className="font-semibold">
                      {t(`practice.${step}`)}
                    </span>
                    {index === 2 && (
                      <Check
                        aria-hidden="true"
                        className="ml-auto text-sage-dark"
                        size={18}
                      />
                    )}
                  </li>
                ))}
              </ol>
            </div>

            <div className="image-noise order-1 overflow-hidden bg-mist p-5 sm:p-10 lg:order-2">
              <div className="overflow-hidden border-[10px] border-ink bg-ink shadow-[0_24px_70px_rgba(23,24,22,0.2)] sm:border-[14px]">
                <img
                  src={displayTwo}
                  alt={t("features.generate.imageAlt")}
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
              <div className="relative z-10 mt-5 flex items-center justify-between text-sm font-bold">
                <span className="inline-flex items-center gap-2">
                  <Sparkles aria-hidden="true" size={17} />
                  {t("features.generate.title")}
                </span>
                <span className="font-mono text-xs text-ink/50">
                  {t("features.generate.number")}
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-ink/10 bg-ink py-24 text-paper sm:py-32">
          <div className="page-shell grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
            <div>
              <p className="eyebrow text-sun">{t("library.eyebrow")}</p>
              <h2 className="display-title mt-6 max-w-lg text-5xl sm:text-6xl">
                {t("library.title")}
              </h2>
              <p className="mt-7 max-w-lg text-lg leading-8 text-paper/65">
                {t("library.body")}
              </p>
            </div>

            <div>
              {["itemOne", "itemTwo", "itemThree"].map((item, index) => (
                <article
                  key={item}
                  className="group flex items-center gap-5 border-t border-paper/20 py-6 last:border-b"
                >
                  <div className="grid size-12 shrink-0 place-items-center border border-paper/25 text-sun">
                    <Bookmark
                      aria-hidden="true"
                      size={19}
                      fill={index === 0 ? "currentColor" : "none"}
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">
                      {t(`features.library.${item}`)}
                    </h3>
                    <p className="mt-1 text-sm text-paper/50">
                      {t("features.library.saved")}
                    </p>
                  </div>
                  <span className="ml-auto font-mono text-xs text-paper/35">
                    0{index + 1}
                  </span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 sm:py-32">
          <div className="page-shell grid gap-16 md:grid-cols-2 md:gap-x-14">
            <FeatureCopy
              number={t("features.generate.number")}
              title={t("features.generate.title")}
              body={t("features.generate.body")}
            />
            <FeatureCopy
              number={t("features.library.number")}
              title={t("features.library.title")}
              body={t("features.library.body")}
            />
          </div>
        </section>

        <section
          id="enquiry"
          className="border-y border-ink/10 bg-sun py-20 sm:py-24"
        >
          <div className="page-shell grid items-end gap-12 lg:grid-cols-[1fr_auto]">
            <div>
              <div className="flex items-center gap-3">
                <Building2 aria-hidden="true" size={20} />
                <p className="eyebrow">{t("b2b.eyebrow")}</p>
              </div>
              <h2 className="display-title mt-7 max-w-4xl text-5xl sm:text-6xl lg:text-7xl">
                {t("b2b.title")}
              </h2>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-ink/70">
                {t("b2b.body")}
              </p>
            </div>
            <a
              href={GOOGLE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-14 items-center justify-center gap-3 bg-ink px-7 text-base font-bold text-paper transition-colors hover:bg-sage-dark"
            >
              {t("b2b.action")}
              <ArrowRight aria-hidden="true" size={19} />
            </a>
          </div>
        </section>

        <section className="py-24 text-center sm:py-32">
          <div className="page-shell flex flex-col items-center">
            <p className="eyebrow text-sage-dark">{t("finalCta.eyebrow")}</p>
            <h2 className="display-title mt-7 max-w-4xl text-5xl sm:text-7xl">
              {t("finalCta.title")}
            </h2>
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-10 inline-flex min-h-14 items-center justify-center gap-3 bg-ink px-7 text-base font-bold text-paper transition-colors hover:bg-sage-dark"
            >
              {t("finalCta.action")}
              <ArrowRight aria-hidden="true" size={19} />
            </a>
          </div>
        </section>

        <section
          id="contact"
          className="border-t border-ink/10 bg-bone py-20 sm:py-24"
        >
          <div className="page-shell grid items-end gap-12 lg:grid-cols-[1fr_auto]">
            <div>
              <h2 className="display-title max-w-4xl text-5xl sm:text-6xl lg:text-7xl">
                {t("contact.title")}
              </h2>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-ink/70">
                {t("contact.body")}
              </p>
            </div>
            <a
              href={`mailto:${t("contact.email")}`}
              className="inline-flex min-h-14 items-center justify-center gap-3 bg-ink px-7 text-base font-bold text-paper transition-colors hover:bg-sage-dark"
            >
              {t("contact.action")}
              <ArrowRight aria-hidden="true" size={19} />
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-ink/15 py-10">
        <div className="page-shell grid gap-8 sm:grid-cols-[1fr_auto] sm:items-end">
          <div>
            <a href="#top" className="text-xl font-bold">
              Student StudyPen
            </a>
            <p className="mt-2 text-sm text-ink/55">{t("footer.tagline")}</p>
          </div>
          <div className="sm:text-right">
            <div className="flex flex-wrap gap-5 text-sm font-semibold sm:justify-end">
              <a href={APP_STORE_URL} target="_blank" rel="noreferrer">
                {t("footer.appStore")}
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={GOOGLE_FORM_URL}
              >
                {t("footer.enquiry")}
              </a>
            </div>
            <p className="mt-4 text-xs text-ink/45">
              {t("footer.copyright", { year: new Date().getFullYear() })}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
