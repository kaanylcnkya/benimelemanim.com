export default function Trust() {
  const items = [
    [
      "🔐",
      "Kontrollü erişim",
      "Telefon bilgileri giriş yapmış kullanıcılarla kontrollü paylaşılır.",
    ],
    [
      "📍",
      "Bölgesel eşleşme",
      "Temizlikçiler kendi il ve ilçelerindeki talepleri takip eder.",
    ],
    [
      "✅",
      "Onaylı profiller",
      "Sonraki aşamada kimlik ve telefon doğrulama eklenebilir.",
    ],
    [
      "💬",
      "Kolay iletişim",
      "Talep detayından hızlı arama veya WhatsApp yönlendirmesi yapılabilir.",
    ],
  ];

  return (
    <section id="guvenlik" className="bg-white py-14 md:py-20">
      <div className="container-main grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[2rem] bg-[#06264a] p-7 text-white md:p-9">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-orange-200">
            Güvenlik ve KVKK
          </p>

          <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] sm:text-5xl">
            Telefon bilgileri herkese açık yayınlanmaz.
          </h2>

          <p className="mt-5 text-sm leading-8 text-blue-100 sm:text-base">
            Talep sahibinin iletişim bilgileri kontrollü görüntülenir.
            Temizlikçi sisteme kayıt olur, kendi bölgesindeki talepleri görür.
            İleride doğrulama, puanlama ve ücretli talep görüntüleme sistemi
            eklenebilir.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {items.map(([icon, title, text]) => (
            <div
              key={title}
              className="rounded-[1.8rem] border border-slate-200 bg-slate-50 p-6"
            >
              <div className="text-3xl">{icon}</div>
              <h3 className="mt-5 text-xl font-black text-[#06264a]">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}