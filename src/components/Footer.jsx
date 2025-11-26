import Link from "next/link";
import { useLanguage } from "@/lib/languageContext";
import { getCopy } from "@/lib/copy";

const Footer = () => {
  const { language } = useLanguage();
  const t = getCopy(language);

  return (
    <footer className="w-full border-t border-base-300/80 bg-base-100/80 backdrop-blur py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p className="text-lg font-semibold text-neutral">{t.brand}</p>
          <p className="text-sm text-neutral/70">{t.footer.tagline}</p>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <Link href="/impressum" className="hover:text-primary font-medium">
            {t.footer.impressum}
          </Link>
          <span className="text-neutral/60">•</span>
          <p className="text-neutral/70">{t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
