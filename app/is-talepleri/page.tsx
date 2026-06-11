import Link from "next/link";

const jobRequests = [
  {
    id: 1,
    title: "2+1 Ev Temizliği",
    city: "İstanbul",
    district: "Kadıköy",
    service: "Ev Temizliği",
    date: "Bugün",
    time: "10:00 - 14:00",
    budget: "1.500 TL",
    status: "Yeni Talep",
    note: "Genel ev temizliği yapılacak. Cam temizliği de isteniyor.",
    customerPhone: "05xx xxx xx xx",
  },
  {
    id: 2,
    title: "Ofis Temizliği",
    city: "İstanbul",
    district: "Maltepe",
    service: "Ofis Temizliği",
    date: "Yarın",
    time: "09:00 - 12:00",
    budget: "Teklif bekliyor",
    status: "Yeni Talep",
    note: "Küçük ofis. Düzenli haftalık temizlik de olabilir.",
    customerPhone: "05xx xxx xx xx",
  },
  {
    id: 3,
    title: "Günlük Temizlikçi Aranıyor",
    city: "Ankara",
    district: "Çankaya",
    service: "Günlük Temizlikçi",
    date: "Bu hafta",
    time: "Uygun saat",
    budget: "1.400 TL",
    status: "Bekliyor",
    note: "Ev temizliği için günlük destek aranıyor.",
    customerPhone: "05xx xxx xx xx",
  },
];

export default function JobRequestsPage() {
  const isLoggedIn = false;

  return (
    <main className="page-bottom-space py-8 md:py-14">
      <div className="container-main">
        <div className="mb-7 grid gap-5 lg:grid-cols-[1fr_0.45fr] lg:items-end">
          <div>
            <Link href="/" className="text-sm font-black text-[#06264a]">
              ← Ana sayfaya dön
            </Link>

            <p className="mt-5 text-xs font-black uppercase tracking-[0.22em] text-[#f6a313]">
              Temizlikçiler İçin
            </p>

            <h1 className="mt-3 text-4xl font-black tracking-[-0.05em] text-[#06264a] md:text-5xl">
              Bölgenizdeki iş taleplerini görün.
            </h1>

            <p className="mt-4 max-w-2xl text-slate-600">
              Temizlik işi yapmak isteyen kullanıcılar, kendi bölgesindeki
              işveren taleplerini burada görebilir. İletişim bilgilerine erişmek
              için giriş yapmak gerekir.
            </p>
          </div>

          <div className="rounded-[1.6rem] bg-[#06264a] p-5 text-white">
            <div className="text-sm font-black text-orange-200">
              Temizlikçi hesabı gerekli
            </div>
            <p className="mt-2 text-sm leading-6 text-blue-100">
              İşveren iletişim bilgileri sadece giriş yapmış temizlikçilere
              gösterilir.
            </p>
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
            </select>

            <select className="min-h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold text-slate-700 outline-none focus:border-[#f6a313]">
              <option>Hizmet türü</option>
              <option>Ev Temizliği</option>
              <option>Ofis Temizliği</option>
              <option>Günlük Temizlikçi</option>
            </select>

            <select className="min-h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold text-slate-700 outline-none focus:border-[#f6a313]">
              <option>Durum</option>
              <option>Yeni Talep</option>
              <option>Bekliyor</option>
            </select>

            <button className="min-h-12 rounded-2xl bg-[#06264a] px-4 text-sm font-black text-white">
              Filtrele
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-4">
          {jobRequests.map((request) => (
            <article
              key={request.id}
              className="soft-card rounded-[1.8rem] p-5 transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-950/10"
            >
              <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                <div className="min-w-0">
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-black text-[#e58f00]">
                      {request.status}
                    </span>

                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-[#06264a]">
                      {request.date}
                    </span>
                  </div>

                  <h3 className="text-2xl font-black tracking-[-0.03em] text-[#06264a]">
                    {request.title}
                  </h3>

                  <div className="mt-3 flex flex-wrap gap-2 text-sm font-bold text-slate-500">
                    <span>📍 {request.city} / {request.district}</span>
                    <span>🧹 {request.service}</span>
                    <span>🕒 {request.time}</span>
                    <span>💰 {request.budget}</span>
                  </div>

                  <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
                    {request.note}
                  </p>
                </div>

                <div className="flex shrink-0 flex-col gap-2 md:w-52">
                  {isLoggedIn ? (
                    <a
                      href={`tel:${request.customerPhone}`}
                      className="flex min-h-12 items-center justify-center rounded-full bg-[#f6a313] px-5 text-center text-sm font-black text-white shadow-lg shadow-orange-400/20"
                    >
                      İşvereni Ara
                    </a>
                  ) : (
                    <Link
                      href="/giris"
                      className="flex min-h-12 items-center justify-center rounded-full bg-[#f6a313] px-5 text-center text-sm font-black text-white shadow-lg shadow-orange-400/20"
                    >
                      İletişim İçin Giriş Yap
                    </Link>
                  )}

                  <button className="min-h-12 rounded-full border border-slate-200 bg-white px-5 text-sm font-black text-[#06264a]">
                    Detayı Gör
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