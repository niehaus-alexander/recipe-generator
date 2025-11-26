import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/languageContext";
import { getCopy } from "@/lib/copy";

export default function Home() {
  const { language } = useLanguage();
  const t = getCopy(language);

  return (
    <div className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-amber-100 to-base-100" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 lg:py-20">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          <div className="w-full lg:w-1/2 space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
              {t.hero.eyebrow}
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-neutral">
              {t.hero.title}
            </h1>
            <p className="text-lg text-neutral/80">
              {t.hero.body}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                className="btn btn-primary text-primary-content shadow-lg shadow-primary/30"
                href="/inspiration"
              >
                {t.hero.primaryCta}
              </Link>
              <Link
                className="btn btn-ghost border border-base-300/70 hover:border-primary/60"
                href="/creator"
              >
                {t.hero.secondaryCta}
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
              {t.hero.stats.map(({ value, label }) => (
                <div
                  key={label}
                  className="rounded-xl border border-base-300/70 bg-base-100/90 px-4 py-3 shadow-sm"
                >
                  <p className="text-2xl font-bold text-neutral">{value}</p>
                  <p className="text-sm text-neutral/70">{label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full lg:w-1/2 relative">
            <div className="absolute -left-6 -top-6 h-24 w-24 rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute -right-4 -bottom-4 h-28 w-28 rounded-full bg-amber-200 blur-3xl" />
            <div className="glass-surface rounded-3xl border border-base-300/60 p-4 shadow-2xl">
              <Image
                alt="A vibrant, plated dish"
                width={800}
                height={800}
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&auto=format&fit=crop&q=80"
                className="rounded-2xl object-cover w-full"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
