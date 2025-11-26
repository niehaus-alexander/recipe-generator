import Link from "next/link";
import { HiOutlineArrowLeft } from "react-icons/hi2";
import { useLanguage } from "@/lib/languageContext";
import { getCopy } from "@/lib/copy";
import { useRouter } from "next/router";

export default function ImpressumPage() {
  const { language } = useLanguage();
  const t = getCopy(language);
  const router = useRouter();

  return (
    <div className="w-full bg-base-100 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <button
          onClick={() => (window.history.length > 1 ? router.back() : router.push("/"))}
          className="inline-flex items-center gap-2 text-primary hover:underline mb-6"
        >
          <HiOutlineArrowLeft size={22} />
          {t.impressum.back}
        </button>
        <div className="glass-surface border border-base-300/60 rounded-2xl p-6 sm:p-8 space-y-6">
          <div>
            <p className="text-sm font-semibold text-primary uppercase tracking-[0.2em]">
              {t.impressum.legal}
            </p>
            <h1 className="font-bold text-4xl text-neutral">Impressum</h1>
          </div>
          <div className="space-y-3 text-neutral/80">
            <p className="text-neutral font-semibold">Alexander Niehaus</p>
            <p>Eisenbahnstrasse 35</p>
            <p>04315 Leipzig</p>
          </div>

          <div className="space-y-2">
            <h2 className="font-semibold text-2xl text-neutral">Kontakt</h2>
            <p>Telefon: 01522 4829410</p>
            <p>Email: alexander.niehaus@gmx.net</p>
          </div>

          <div className="space-y-2">
            <h2 className="font-semibold text-2xl text-neutral">
              Vertreten durch
            </h2>
            <p>Alexander Niehaus</p>
          </div>
        </div>
      </div>
    </div>
  );
}
