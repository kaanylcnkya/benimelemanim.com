import { serviceTypes } from "@/lib/constants";

export default function ServiceCategories() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-5">
        <div className="max-w-2xl">
          <p className="font-black text-blue-700">Hizmetler</p>
          <h2 className="mt-2 text-3xl font-black text-slate-950">
            Başlangıçta temizlik hizmetlerine odaklanıyoruz.
          </h2>
          <p className="mt-4 leading-7 text-slate-600">
            İlk aşamada talep yoğunluğunu ölçmek için temizlik kategorileriyle
            başlıyoruz. Sistem büyüdükçe farklı personel ve hizmet alanları
            eklenebilir.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {serviceTypes.map((service) => (
            <div
              key={service}
              className="rounded-3xl border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-1 hover:border-blue-200 hover:bg-white hover:shadow-lg hover:shadow-blue-950/5"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-xl">
                🧹
              </div>
              <h3 className="text-lg font-black text-slate-950">{service}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Bölgenizdeki uygun temizlikçilere ulaşmak için talep
                oluşturabilirsiniz.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}