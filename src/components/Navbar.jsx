import Link from "next/link";
import { useRouter } from "next/router";
import { useLanguage } from "@/lib/languageContext";
import { getCopy } from "@/lib/copy";

const Navbar = () => {
  const router = useRouter();
  const { language, toggleLanguage } = useLanguage();
  const t = getCopy(language);

  const links = [
    { href: "/inspiration", label: t.nav.inspiration },
    { href: "/creator", label: t.nav.creator },
    { href: "/favorites", label: t.nav.favorites },
    { href: "/random-recipe-picker", label: t.nav.randomizer },
  ];

  const getPageTitle = (path) => {
    if (path.startsWith("/recipes/")) {
      return t.pageTitle.recipe;
    }
    switch (path) {
      case "/favorites":
        return t.pageTitle.favorites;
      case "/inspiration":
        return t.pageTitle.inspiration;
      case "/creator":
        return t.pageTitle.creator;
      case "/impressum":
        return t.pageTitle.impressum;
      case "/random-recipe-picker":
        return t.pageTitle.randomizer;
      default:
        return t.pageTitle.home;
    }
  };

  const currentPage = getPageTitle(router.pathname);
  const isDetailsPage = router.pathname.startsWith("/recipes/");

  return (
    <nav className="sticky top-0 z-30 w-full border-b border-base-300/70 bg-base-100/80 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-primary font-semibold tracking-tight"
        >
          <span className="h-10 w-10 rounded-full bg-primary/10 border border-primary/30 grid place-items-center text-lg">
            🍲
          </span>
          <div className="leading-tight">
            <p className="text-sm text-neutral/70">{t.brand}</p>
            <p className="text-lg font-bold text-neutral">{currentPage}</p>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-2">
          {links.map((link) => {
            const isActive =
              router.pathname === link.href ||
              (isDetailsPage && link.href === "/inspiration");
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-primary text-primary-content shadow-md"
                    : "hover:bg-base-200 text-neutral"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="md:hidden dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle"
            aria-label="Open navigation"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content glass-surface rounded-box z-[1] mt-4 w-52 p-3 shadow-lg space-y-1"
          >
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
            <li>
              <button
                onClick={toggleLanguage}
                className="btn btn-ghost justify-start"
              >
                {t.nav.languageToggle}
              </button>
            </li>
          </ul>
        </div>

        <div className="hidden sm:flex items-center gap-2">
          <Link
            href="/creator"
            className="btn btn-primary text-primary-content shadow-lg shadow-primary/20"
          >
            {t.nav.cta}
          </Link>
          <button
            onClick={toggleLanguage}
            className="btn btn-ghost btn-sm border border-base-300/80 hover:border-primary/60"
            aria-label="Toggle language"
          >
            {t.nav.languageToggle}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
