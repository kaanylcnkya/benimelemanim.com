const steps = [
  {
    title: "Talep oluştur",
    text: "İl, ilçe, temizlik türü ve telefon bilgisiyle ihtiyacınızı bildirin.",
  },
  {
    title: "Bölgedeki kişiler görsün",
    text: "Kayıtlı temizlikçiler kendi bölgelerindeki talepleri panelden takip eder.",
  },
  {
    title: "Hızlı iletişim kur",
    text: "Onaylı temizlikçiler talep detayına ulaşarak sizinle iletişime geçebilir.",
  },
];

export default function HowItWorks() {
  return (
    <section id="nasil-calisir" className="py-14 md:py-20">
      <div className="container-main">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#f6a313]">
            Nasıl Çalışır?
          </p>

          <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-[#06264a] sm:text-5xl">
            Reklamdan gelen kullanıcıyı yormayan kısa süreç.
          </h2>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="soft-card relative overflow-hidden rounded-[1.8rem] p-7"
            >
              <div className="absolute -right-4 -top-5 text-8xl font-black text-slate-100">
                {index + 1}
              </div>

              <div className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#06264a] text-xl font-black text-white">
                  {index + 1}
                </div>

                <h3 className="mt-6 text-2xl font-black text-[#06264a]">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {step.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}