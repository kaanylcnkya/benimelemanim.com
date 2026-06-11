import Link from "next/link";

export default function NotFound() {
  return (
    <main className="page-bottom-space bg-slate-50 py-10 md:py-16">
      <div className="container-main">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-slate-200 bg-white p-6 text-center shadow-[0_18px_60px_rgba(15,23,42,0.08)] md:p-10">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-orange-50 text-4xl">
            🧹
          </div>

          <p className="mt-6 text-xs font-black uppercase tracking-[0.22em] text-[#f6a313]">
            404
          </p>

          <h1 className="mt-3 text-3xl font-black tracking-[-0.05em] text-[#06264a] md:text-5xl">
            Aradığınız sayfa bulunamadı
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-600 md:text-base">
            Bu sayfa kaldırılmış, taşınmış veya yanlış bağlantı ile açılmış
            olabilir. Ana sayfaya dönebilir ya da temizlikçi arama sayfasına
            geçebilirsiniz.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <Link
              href="/"
              className="flex min-h-14 items-center justify-center rounded-full bg-[#06264a] px-6 text-sm font-black text-white shadow-lg shadow-blue-950/15 transition hover:-translate-y-0.5 hover:bg-[#0b355f]"
            >
              Ana Sayfaya Dön
            </Link>

            <Link
              href="/temizlikci-bul"
              className="flex min-h-14 items-center justify-center rounded-full bg-[#f6a313] px-6 text-sm font-black text-white shadow-lg shadow-orange-400/25 transition hover:-translate-y-0.5 hover:bg-[#e58f00]"
            >
              Temizlikçi Bul
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}