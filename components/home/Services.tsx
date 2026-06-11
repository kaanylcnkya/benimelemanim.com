const serviceCards = [
  {
    title: "Ev Temizliği",
    text: "Günlük, haftalık veya tek seferlik ev temizliği talepleri.",
    icon: "🏠",
  },
  {
    title: "Ofis Temizliği",
    text: "İş yerleri için düzenli veya dönemsel temizlik desteği.",
    icon: "🏢",
  },
  {
    title: "Günlük Temizlikçi",
    text: "Aynı gün veya planlı günlük temizlikçi ihtiyaçları.",
    icon: "🧹",
  },
  {
    title: "İnşaat Sonrası",
    text: "Tadilat, boya ve inşaat sonrası detaylı temizlik.",
    icon: "🧽",
  },
];

export default function Services() {
  return (
    <section id="hizmetler" className="bg-white py-14 md:py-20">
      <div className="container-main">
        <div className="max-w-2xl">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#f6a313]">
            Hizmetler
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-[#06264a] sm:text-5xl">
            Başlangıçta temizlik hizmetlerine odaklanıyoruz.
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-600">
            Sistem büyüdükçe bakıcı, ofis personeli, günlük eleman ve farklı
            hizmet kategorileri de eklenebilir.
          </p>
        </div>

        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {serviceCards.map((item) => (
            <div
              key={item.title}
              className="group rounded-[1.8rem] border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-2 hover:border-orange-200 hover:bg-white hover:shadow-2xl hover:shadow-blue-950/10"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-3xl shadow-sm group-hover:bg-orange-50">
                {item.icon}
              </div>

              <h3 className="text-xl font-black text-[#06264a]">
                {item.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}