import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#06264a] pb-20 text-white md:pb-0">
      <div className="container-main grid gap-10 py-12 md:py-16 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-sm font-black text-[#06264a]">
              BE
            </div>
            <div>
              <div className="text-xl font-black">BenimElemanım</div>
              <div className="text-xs font-bold uppercase tracking-[0.22em] text-blue-200">
                Temizlik Platformu
              </div>
            </div>
          </div>

          <p className="mt-5 max-w-md text-sm leading-7 text-blue-100">
            Hizmet arayanlarla temizlik işi yapmak isteyenleri hızlı, kolay ve
            kontrollü bir sistemde buluşturur.
          </p>

          <div className="mt-6 rounded-[1.6rem] border border-white/10 bg-white/5 p-4">
            <div className="text-sm font-black text-white">
              Mobil öncelikli sistem
            </div>
            <p className="mt-2 text-sm leading-6 text-blue-100">
              Kullanıcıların çoğu telefondan geleceği için hızlı form, büyük
              butonlar ve sade akışla tasarlanmıştır.
            </p>
          </div>
        </div>

        <div>
          <h4 className="font-black">Platform</h4>
          <div className="mt-4 flex flex-col gap-3 text-sm text-blue-100">
            <Link href="/temizlikci-bul">Temizlikçi Bul</Link>
            <Link href="/temizlikci-ol">Temizlikçi Ol</Link>
            <Link href="/giris">Giriş Yap</Link>
            <Link href="/panel">Panel</Link>
          </div>
        </div>

        <div>
          <h4 className="font-black">Hizmetler</h4>
          <div className="mt-4 flex flex-col gap-3 text-sm text-blue-100">
            <span>Ev Temizliği</span>
            <span>Ofis Temizliği</span>
            <span>Günlük Temizlikçi</span>
            <span>İnşaat Sonrası Temizlik</span>
          </div>
        </div>

        <div>
          <h4 className="font-black">Yasal</h4>
          <div className="mt-4 flex flex-col gap-3 text-sm text-blue-100">
            <Link href="/kvkk">KVKK</Link>
            <Link href="/gizlilik-politikasi">Gizlilik Politikası</Link>
            <Link href="/kullanim-sartlari">Kullanım Şartları</Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-5">
        <div className="container-main flex flex-col justify-between gap-3 text-sm text-blue-100 md:flex-row">
          <span>© 2026 BenimElemanım. Tüm hakları saklıdır.</span>
          <span>benimelemanim.com</span>
        </div>
      </div>
    </footer>
  );
}