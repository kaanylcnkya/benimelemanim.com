import Link from "next/link";

const cleaners = [
  {
    id: 1,
    name: "Ayşe K.",
    city: "İstanbul",
    district: "Kadıköy",
    services: ["Ev Temizliği", "Günlük Temizlik"],
    experience: "4 yıl deneyim",
    price: "Günlük 1.500 TL",
    rating: "4.8",
    phone: "05xx xxx xx xx",
    isVerified: true,
  },
  {
    id: 2,
    name: "Fatma D.",
    city: "İstanbul",
    district: "Maltepe",
    services: ["Ev Temizliği", "Ofis Temizliği"],
    experience: "6 yıl deneyim",
    price: "Günlük 1.700 TL",
    rating: "4.9",
    phone: "05xx xxx xx xx",
    isVerified: true,
  },
  {
    id: 3,
    name: "Zeynep A.",
    city: "Ankara",
    district: "Çankaya",
    services: ["Günlük Temizlikçi", "Boş Ev Temizliği"],
    experience: "3 yıl deneyim",
    price: "Günlük 1.400 TL",
    rating: "4.7",
    phone: "05xx xxx xx xx",
    isVerified: false,
  },
  {
    id: 4,
    name: "Emine Y.",
    city: "İzmir",
    district: "Karşıyaka",
    services: ["Ev Temizliği", "İnşaat Sonrası Temizlik"],
    experience: "5 yıl deneyim",
    price: "Günlük 1.600 TL",
    rating: "4.8",
    phone: "05xx xxx xx xx",
    isVerified: true,
  },
];

export default function FindCleanerPage() {
  const isLoggedIn = false;

  return (
    <main className="page-bottom-space py-8 md:py-14">
      <div className="container-main">
        <div className="mb-7">
          <Link href="/" className="text-sm font-black text-[#06264a]">
            ← Ana sayfaya dön
          </Link>

          <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_0.45fr] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#f6a313]">
                Temizlikçi Bul
              </p>

              <h1 className="mt-3 text-4xl font-black tracking-[-0.05em] text-[#06264a] md:text-5xl">
                Bölgenize yakın temizlikçileri bulun.
              </h1>

              <p className="mt-4 max-w-2xl text-slate-600">
                İl ve ilçenizi seçerek yakınınızdaki temizlikçileri listeleyin.
                Telefon numarasını görmek için üye olmanız gerekir.
              </p>
            </div>

            <div className="rounded-[1.6rem] bg-[#06264a] p-5 text-white">
              <div className="text-sm font-black text-orange-200">
                Telefon bilgileri korumalıdır
              </div>
              <p className="mt-2 text-sm leading-6 text-blue-100">
                Temizlikçi telefonlarına sadece giriş yapan kullanıcılar
                ulaşabilir.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-sm">
          <div className="grid gap-3 md:grid-cols-5">
            <select className="min-h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold text-slate-700 outline-none focus:border-[#f6a313]">
              <option>İl seçiniz</option>
              <option>İstanbul</option>
              <option>Ankara</option>
              <option>İzmir</option>
            </select>

            <select className="min-h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold text-slate-700 outline-none focus:border-[#f6a313]">
              <option>İlçe seçiniz</option>
              <option>Kadıköy</option>
              <option>Maltepe</option>
              <option>Çankaya</option>
              <option>Karşıyaka</option>
            </select>

            <select className="min-h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold text-slate-700 outline-none focus:border-[#f6a313]">
              <option>Hizmet türü</option>
              <option>Ev Temizliği</option>
              <option>Ofis Temizliği</option>
              <option>Günlük Temizlikçi</option>
              <option>İnşaat Sonrası Temizlik</option>
            </select>

            <select className="min-h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold text-slate-700 outline-none focus:border-[#f6a313]">
              <option>Sıralama</option>
              <option>En yakın</option>
              <option>En yüksek puan</option>
              <option>En uygun fiyat</option>
            </select>

            <button className="min-h-12 rounded-2xl bg-[#06264a] px-4 text-sm font-black text-white">
              Filtrele
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-4">
          {cleaners.map((cleaner) => (
            <article
              key={cleaner.id}
              className="soft-card rounded-[1.8rem] p-5 transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-950/10"
            >
              <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                <div className="flex gap-4">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#06264a] text-lg font-black text-white">
                    {cleaner.name.charAt(0)}
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-2xl font-black tracking-[-0.03em] text-[#06264a]">
                        {cleaner.name}
                      </h3>

                      {cleaner.isVerified && (
                        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-700">
                          Onaylı Profil
                        </span>
                      )}

                      <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-black text-[#e58f00]">
                        ⭐ {cleaner.rating}
                      </span>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2 text-sm font-bold text-slate-500">
                      <span>📍 {cleaner.city} / {cleaner.district}</span>
                      <span>🧾 {cleaner.experience}</span>
                      <span>💰 {cleaner.price}</span>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {cleaner.services.map((service) => (
                        <span
                          key={service}
                          className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600"
                        >
                          {service}
                        </span>
                      ))}
                    </div>

                    <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
                      Bölgesinde aktif çalışan temizlikçi profili. Telefon
                      bilgisini görmek için giriş yapmanız gerekir.
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 flex-col gap-2 md:w-48">
                  {isLoggedIn ? (
                    <a
                      href={`tel:${cleaner.phone}`}
                      className="flex min-h-12 items-center justify-center rounded-full bg-[#f6a313] px-5 text-sm font-black text-white shadow-lg shadow-orange-400/20"
                    >
                      Telefonu Ara
                    </a>
                  ) : (
                    <Link
                      href="/giris"
                      className="flex min-h-12 items-center justify-center rounded-full bg-[#f6a313] px-5 text-center text-sm font-black text-white shadow-lg shadow-orange-400/20"
                    >
                      Telefonu Görmek İçin Giriş Yap
                    </Link>
                  )}

                  <button className="min-h-12 rounded-full border border-slate-200 bg-white px-5 text-sm font-black text-[#06264a]">
                    Profili İncele
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}