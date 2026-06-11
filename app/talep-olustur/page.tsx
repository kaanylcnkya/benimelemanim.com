"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { services } from "@/lib/site";
import { getAuthUser } from "@/lib/auth";
import { getCities, getDistricts, type City, type District } from "@/lib/locations";
import { createJobRequest } from "@/lib/jobRequests";

type ApiValidationError = {
  message?: string;
  errors?: Record<string, string[]>;
};

export default function CreateJobRequestPage() {
  const router = useRouter();

  const [cities, setCities] = useState<City[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);

  const [title, setTitle] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [cityId, setCityId] = useState("");
  const [districtId, setDistrictId] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [workDate, setWorkDate] = useState("");
  const [workTime, setWorkTime] = useState("");
  const [budget, setBudget] = useState("");
  const [description, setDescription] = useState("");

  const [cityLoading, setCityLoading] = useState(true);
  const [districtLoading, setDistrictLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  useEffect(() => {
    const user = getAuthUser();

    if (!user) {
      router.push("/giris");
      return;
    }

    if (user.role !== "customer") {
      router.push("/is-talepleri");
      return;
    }

    setCityId(user.city_id ? String(user.city_id) : "");
  }, [router]);

  useEffect(() => {
    async function loadCities() {
      try {
        setCityLoading(true);
        const response = await getCities();
        setCities(response.data);
      } catch {
        setError("İl listesi yüklenemedi.");
      } finally {
        setCityLoading(false);
      }
    }

    loadCities();
  }, []);

  useEffect(() => {
    async function loadDistricts() {
      if (!cityId) {
        setDistricts([]);
        setDistrictId("");
        return;
      }

      try {
        setDistrictLoading(true);
        setDistrictId("");
        const response = await getDistricts(cityId);
        setDistricts(response.data);

        const user = getAuthUser();

        if (user?.district_id && String(user.city_id) === String(cityId)) {
          setDistrictId(String(user.district_id));
        }
      } catch {
        setError("İlçe listesi yüklenemedi.");
      } finally {
        setDistrictLoading(false);
      }
    }

    loadDistricts();
  }, [cityId]);

  function getFieldError(field: string) {
    return fieldErrors[field]?.[0];
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setError("");
    setFieldErrors({});

    try {
      await createJobRequest({
        title,
        service_type: serviceType,
        city_id: Number(cityId),
        district_id: Number(districtId),
        address_detail: addressDetail,
        work_date: workDate,
        work_time: workTime,
        budget,
        description,
      });

      router.push("/taleplerim");
      router.refresh();
    } catch (err) {
      const apiError = err as ApiValidationError;

      setError(apiError.message || "Talep oluşturulamadı.");
      setFieldErrors(apiError.errors || {});
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page-bottom-space py-8 md:py-14">
      <div className="container-main">
        <div className="mx-auto max-w-5xl">
          <Link href="/" className="text-sm font-black text-[#06264a]">
            ← Ana sayfaya dön
          </Link>

          <div className="mt-7 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <aside className="rounded-[2rem] bg-[#06264a] p-7 text-white md:p-9">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-orange-200">
                Temizlik Talebi
              </p>

              <h1 className="mt-4 text-4xl font-black leading-tight tracking-[-0.05em]">
                Temizlik ihtiyacınızı ilan olarak yayınlayın.
              </h1>

              <p className="mt-5 text-sm leading-8 text-blue-100">
                Talebiniz bölgenizdeki temizlikçilere gösterilir. Uygun
                temizlikçiler sizinle iletişime geçebilir.
              </p>

              <div className="mt-7 grid gap-3">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                  <div className="font-black">Bölgeye göre görünürlük</div>
                  <p className="mt-2 text-sm leading-6 text-blue-100">
                    İlanınız seçtiğiniz il ve ilçedeki temizlikçilere gösterilir.
                  </p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                  <div className="font-black">Kolay iletişim</div>
                  <p className="mt-2 text-sm leading-6 text-blue-100">
                    Temizlikçiler talebinizi görüp sizinle iletişime geçebilir.
                  </p>
                </div>
              </div>
            </aside>

            <form
              onSubmit={handleSubmit}
              className="soft-card rounded-[2.2rem] p-5 md:p-8"
            >
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#f6a313]">
                Yeni Talep
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-[-0.05em] text-[#06264a]">
                Talep bilgilerini girin
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                Açık ve net bilgi verirseniz temizlikçiler size daha hızlı
                dönüş yapabilir.
              </p>

              {error && (
                <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-bold leading-6 text-red-700">
                  {error}
                </div>
              )}

              <div className="mt-7 grid gap-4 md:grid-cols-2">
                <label className="md:col-span-2">
                  <span className="mb-2 block text-sm font-black text-slate-700">
                    Talep Başlığı
                  </span>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Örn. Haftalık ev temizliği"
                    className="min-h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold outline-none focus:border-[#f6a313] focus:bg-white"
                  />
                  {getFieldError("title") && (
                    <p className="mt-2 text-xs font-bold text-red-600">
                      {getFieldError("title")}
                    </p>
                  )}
                </label>

                <label>
                  <span className="mb-2 block text-sm font-black text-slate-700">
                    Hizmet Türü
                  </span>
                  <select
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    className="min-h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold outline-none focus:border-[#f6a313] focus:bg-white"
                  >
                    <option value="">Hizmet seçiniz</option>
                    {services.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                  {getFieldError("service_type") && (
                    <p className="mt-2 text-xs font-bold text-red-600">
                      {getFieldError("service_type")}
                    </p>
                  )}
                </label>

                <label>
                  <span className="mb-2 block text-sm font-black text-slate-700">
                    Bütçe
                  </span>
                  <input
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="Örn. 1500 TL"
                    className="min-h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold outline-none focus:border-[#f6a313] focus:bg-white"
                  />
                </label>

                <label>
                  <span className="mb-2 block text-sm font-black text-slate-700">
                    İl
                  </span>
                  <select
                    value={cityId}
                    onChange={(e) => setCityId(e.target.value)}
                    disabled={cityLoading}
                    className="min-h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold outline-none focus:border-[#f6a313] focus:bg-white"
                  >
                    <option value="">
                      {cityLoading ? "İller yükleniyor..." : "İl seçiniz"}
                    </option>
                    {cities.map((city) => (
                      <option key={city.id} value={city.id}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                  {getFieldError("city_id") && (
                    <p className="mt-2 text-xs font-bold text-red-600">
                      {getFieldError("city_id")}
                    </p>
                  )}
                </label>

                <label>
                  <span className="mb-2 block text-sm font-black text-slate-700">
                    İlçe
                  </span>
                  <select
                    value={districtId}
                    onChange={(e) => setDistrictId(e.target.value)}
                    disabled={!cityId || districtLoading}
                    className="min-h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold outline-none focus:border-[#f6a313] focus:bg-white"
                  >
                    <option value="">
                      {districtLoading
                        ? "İlçeler yükleniyor..."
                        : "İlçe seçiniz"}
                    </option>
                    {districts.map((district) => (
                      <option key={district.id} value={district.id}>
                        {district.name}
                      </option>
                    ))}
                  </select>
                  {getFieldError("district_id") && (
                    <p className="mt-2 text-xs font-bold text-red-600">
                      {getFieldError("district_id")}
                    </p>
                  )}
                </label>

                <label>
                  <span className="mb-2 block text-sm font-black text-slate-700">
                    Tarih
                  </span>
                  <input
                    value={workDate}
                    onChange={(e) => setWorkDate(e.target.value)}
                    type="date"
                    className="min-h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold outline-none focus:border-[#f6a313] focus:bg-white"
                  />
                </label>

                <label>
                  <span className="mb-2 block text-sm font-black text-slate-700">
                    Saat
                  </span>
                  <input
                    value={workTime}
                    onChange={(e) => setWorkTime(e.target.value)}
                    placeholder="Örn. 10:00 veya fark etmez"
                    className="min-h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold outline-none focus:border-[#f6a313] focus:bg-white"
                  />
                </label>

                <label className="md:col-span-2">
                  <span className="mb-2 block text-sm font-black text-slate-700">
                    Adres Detayı
                  </span>
                  <input
                    value={addressDetail}
                    onChange={(e) => setAddressDetail(e.target.value)}
                    placeholder="Mahalle, cadde veya kısa adres bilgisi"
                    className="min-h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold outline-none focus:border-[#f6a313] focus:bg-white"
                  />
                </label>
              </div>

              <label className="mt-5 block">
                <span className="mb-2 block text-sm font-black text-slate-700">
                  Açıklama
                </span>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={5}
                  placeholder="Ev büyüklüğü, oda sayısı, beklentiler ve özel notları yazabilirsiniz."
                  className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-bold outline-none focus:border-[#f6a313] focus:bg-white"
                />
                {getFieldError("description") && (
                  <p className="mt-2 text-xs font-bold text-red-600">
                    {getFieldError("description")}
                  </p>
                )}
              </label>

              <button
                type="submit"
                disabled={loading}
                className="mt-6 min-h-14 w-full cursor-pointer rounded-full bg-[#f6a313] px-6 font-black text-white shadow-lg shadow-orange-400/25 transition hover:bg-[#e58f00] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Talep oluşturuluyor..." : "Talebi Yayınla"}
              </button>

              <div className="mt-6 text-center text-sm font-bold text-slate-600">
                Mevcut taleplerinizi görmek için{" "}
                <Link href="/taleplerim" className="font-black text-[#06264a]">
                  Taleplerim
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}