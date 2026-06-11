import Link from "next/link";

const platformLinks = [
  {
    label: "Temizlikçi Bul",
    href: "/temizlikci-bul",
  },
  {
    label: "Talep Oluştur",
    href: "/talep-olustur",
  },
  {
    label: "İş Talepleri",
    href: "/is-talepleri",
  },
  {
    label: "Temizlikçi Ol",
    href: "/temizlikci-ol",
  },
];

const accountLinks = [
  {
    label: "Giriş Yap",
    href: "/giris",
  },
  {
    label: "Müşteri Kaydı",
    href: "/kullanici-kayit",
  },
  {
    label: "Temizlikçi Kaydı",
    href: "/temizlikci-ol",
  },
  {
    label: "Taleplerim",
    href: "/taleplerim",
  },
];

const legalLinks = [
  {
    label: "KVKK",
    href: "/kvkk",
  },
  {
    label: "Gizlilik Politikası",
    href: "/gizlilik-politikasi",
  },
  {
    label: "Kullanım Şartları",
    href: "/kullanim-sartlari",
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#06264a] pb-20 text-white md:pb-0">
      <div className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-[#f6a313]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-blue-400/10 blur-3xl" />

      <div className="container-main relative">
        <div className="py-10 md:py-14">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-blue-950/20 backdrop-blur md:p-7">
            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div>
                <div className="inline-flex rounded-[1.2rem] bg-white px-4 py-3 shadow-xl shadow-blue-950/15">
                  <img
                    src="/brand/logo-primary.png"
                    alt="BenimElemanım"
                    className="h-12 w-auto max-w-[240px] object-contain"
                  />
                </div>

                <p className="mt-5 max-w-2xl text-sm leading-7 text-blue-100 md:text-base">
                  BenimElemanım; temizlik hizmeti arayan kullanıcılarla,
                  temizlik işi yapmak isteyen kişileri hızlı, kolay ve
                  kontrollü bir sistemde buluşturan dijital platformdur.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <Link
                  href="/temizlikci-bul"
                  className="flex min-h-14 items-center justify-center rounded-full bg-[#f6a313] px-6 text-center text-sm font-black text-white shadow-lg shadow-orange-400/20 transition hover:-translate-y-0.5 hover:bg-[#e58f00]"
                >
                  Temizlikçi Bul
                </Link>

                <Link
                  href="/temizlikci-ol"
                  className="flex min-h-14 items-center justify-center rounded-full border border-white/15 bg-white/10 px-6 text-center text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-white/15"
                >
                  Temizlikçi Ol
                </Link>
              </div>
            </div>
          </div>

          <div className="grid gap-8 py-10 md:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1fr_1fr] lg:gap-10">
            <div>
              <h3 className="text-lg font-black tracking-[-0.03em]">
                Güvenli ve sade temizlik platformu
              </h3>

              <p className="mt-4 max-w-md text-sm leading-7 text-blue-100">
                Mobil öncelikli tasarım, hızlı formlar, büyük butonlar ve kolay
                anlaşılır akışlarla kullanıcıların temizlikçi bulma sürecini
                pratik hale getirir.
              </p>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <div className="rounded-[1.3rem] border border-white/10 bg-white/5 p-4">
                  <div className="text-xl font-black text-white">Yerel</div>
                  <div className="mt-1 text-xs font-bold text-blue-200">
                    İlçe bazlı
                  </div>
                </div>

                <div className="rounded-[1.3rem] border border-white/10 bg-white/5 p-4">
                  <div className="text-xl font-black text-white">Hızlı</div>
                  <div className="mt-1 text-xs font-bold text-blue-200">
                    Kolay akış
                  </div>
                </div>

                <div className="rounded-[1.3rem] border border-white/10 bg-white/5 p-4">
                  <div className="text-xl font-black text-white">Mobil</div>
                  <div className="mt-1 text-xs font-bold text-blue-200">
                    Uyumlu
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-black uppercase tracking-[0.18em] text-orange-200">
                Platform
              </h4>

              <div className="mt-5 flex flex-col gap-3 text-sm font-bold text-blue-100">
                {platformLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="transition hover:translate-x-1 hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-black uppercase tracking-[0.18em] text-orange-200">
                Hesap
              </h4>

              <div className="mt-5 flex flex-col gap-3 text-sm font-bold text-blue-100">
                {accountLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="transition hover:translate-x-1 hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-black uppercase tracking-[0.18em] text-orange-200">
                Yasal
              </h4>

              <div className="mt-5 flex flex-col gap-3 text-sm font-bold text-blue-100">
                {legalLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="transition hover:translate-x-1 hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 py-5">
          <div className="flex flex-col justify-between gap-3 text-center text-xs font-bold text-blue-100 sm:text-sm md:flex-row md:text-left">
            <span>© 2026 BenimElemanım. Tüm hakları saklıdır.</span>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-center sm:gap-4">
              <span>benimelemanim.com</span>
              <span className="hidden text-white/25 sm:inline">•</span>
              <span>Temizlikçi arayanlarla temizlikçileri buluşturur.</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}