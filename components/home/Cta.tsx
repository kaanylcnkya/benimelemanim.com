import Link from "next/link";

export default function Cta() {
  return (
    <section className="py-14 md:py-20">
      <div className="container-main overflow-hidden rounded-[2rem] bg-[#f6a313] p-7 text-white shadow-2xl shadow-orange-400/25 md:p-12">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-orange-100">
              Başlamak için hazır
            </p>

            <h2 className="mt-3 max-w-3xl text-3xl font-black tracking-[-0.04em] sm:text-5xl">
              Temizlik ihtiyacınızı dakikalar içinde talebe dönüştürün.
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-orange-50 sm:text-base">
              İlk sürümde hızlı talep toplama, temizlikçi kaydı ve bölgesel
              talep görüntüleme sistemiyle ilerleyeceğiz.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Link
              href="/temizlikci-bul"
              className="rounded-full bg-white px-7 py-4 text-center font-black text-[#06264a] transition hover:bg-orange-50"
            >
              Temizlikçi Bul
            </Link>

            <Link
              href="/temizlikci-ol"
              className="rounded-full border border-white/40 px-7 py-4 text-center font-black text-white transition hover:bg-white/10"
            >
              Temizlikçi Ol
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}