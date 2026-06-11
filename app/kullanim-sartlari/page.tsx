export default function TermsPage() {
  return (
    <main className="page-bottom-space py-10 md:py-16">
      <div className="container-main max-w-4xl">
        <div className="soft-card rounded-[2rem] p-6 md:p-10">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#f6a313]">
            Kullanım
          </p>

          <h1 className="mt-3 text-4xl font-black tracking-[-0.05em] text-[#06264a]">
            Kullanım Şartları
          </h1>

          <div className="mt-6 space-y-5 text-sm leading-8 text-slate-600 md:text-base">
            <p>
              BenimElemanım, temizlik hizmeti arayan kullanıcılar ile temizlik
              hizmeti sunan kullanıcıları bir araya getirmeyi amaçlayan bir
              platformdur.
            </p>

            <p>
              Platformda yer alan temizlikçi profilleri, iş talepleri ve
              iletişim bilgileri yalnızca ilgili hizmetin sağlanması amacıyla
              kullanılmalıdır.
            </p>

            <p>
              Kullanıcılar, paylaştıkları bilgilerin doğru ve güncel olmasından
              sorumludur. Platform, kullanıcılar arasında gerçekleşen hizmet
              ilişkilerinde doğrudan taraf değildir.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}