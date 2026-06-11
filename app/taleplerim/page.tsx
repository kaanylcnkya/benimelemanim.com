"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuthUser } from "@/lib/auth";
import { getMyJobRequests, type JobRequest } from "@/lib/jobRequests";

function getStatusLabel(status: string) {
  if (status === "open") return "Yayında";
  if (status === "closed") return "Kapalı";
  if (status === "cancelled") return "İptal";
  return status;
}

function getStatusClass(status: string) {
  if (status === "open") {
    return "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100";
  }

  if (status === "closed") {
    return "bg-slate-100 text-slate-600 ring-1 ring-slate-200";
  }

  if (status === "cancelled") {
    return "bg-red-50 text-red-600 ring-1 ring-red-100";
  }

  return "bg-slate-100 text-slate-600 ring-1 ring-slate-200";
}

export default function MyJobRequestsPage() {
  const router = useRouter();

  const [jobRequests, setJobRequests] = useState<JobRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadMyRequests() {
      const user = getAuthUser();

      if (!user) {
        router.push("/giris");
        return;
      }

      if (user.role !== "customer") {
        router.push("/is-talepleri");
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response = await getMyJobRequests();

        setJobRequests(response.data);
      } catch {
        setError("Talepleriniz yüklenemedi. Lütfen tekrar deneyin.");
      } finally {
        setLoading(false);
      }
    }

    loadMyRequests();
  }, [router]);

  return (
    <main className="page-bottom-space py-8 md:py-14">
      <div className="container-main">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <Link href="/" className="text-sm font-black text-[#06264a]">
                ← Ana sayfaya dön
              </Link>

              <p className="mt-7 text-xs font-black uppercase tracking-[0.22em] text-[#f6a313]">
                Taleplerim
              </p>

              <h1 className="mt-3 text-4xl font-black tracking-[-0.06em] text-[#06264a] md:text-5xl">
                Yayınladığınız temizlik talepleri
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
                Açtığınız talepleri buradan takip edebilirsiniz. Yayında olan
                talepler bölgenizdeki temizlikçiler tarafından görüntülenebilir.
              </p>
            </div>

            <Link
              href="/talep-olustur"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#f6a313] px-6 text-sm font-black text-white shadow-lg shadow-orange-400/25 transition hover:-translate-y-0.5 hover:bg-[#e58f00]"
            >
              Yeni Talep Oluştur
            </Link>
          </div>

          <div className="mt-8 rounded-[2.2rem] border border-slate-200 bg-white p-4 shadow-[0_18px_60px_rgba(15,23,42,0.08)] md:p-6">
            {loading && (
              <div className="grid gap-4">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="animate-pulse rounded-[1.6rem] bg-slate-50 p-5"
                  >
                    <div className="h-5 w-2/5 rounded-full bg-slate-200" />
                    <div className="mt-4 h-4 w-3/5 rounded-full bg-slate-200" />
                    <div className="mt-3 h-4 w-1/2 rounded-full bg-slate-200" />
                  </div>
                ))}
              </div>
            )}

            {!loading && error && (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm font-bold leading-7 text-red-700">
                {error}
              </div>
            )}

            {!loading && !error && jobRequests.length === 0 && (
              <div className="rounded-[1.8rem] bg-slate-50 p-8 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white text-2xl shadow-sm">
                  🧹
                </div>

                <h2 className="mt-5 text-2xl font-black tracking-[-0.04em] text-[#06264a]">
                  Henüz talep oluşturmadınız
                </h2>

                <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-600">
                  Temizlik ihtiyacınızı ilan olarak yayınlayın, bölgenizdeki
                  temizlikçiler talebinizi görsün.
                </p>

                <Link
                  href="/talep-olustur"
                  className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-[#f6a313] px-6 text-sm font-black text-white"
                >
                  İlk Talebimi Oluştur
                </Link>
              </div>
            )}

            {!loading && !error && jobRequests.length > 0 && (
              <div className="grid gap-4">
                {jobRequests.map((job) => (
                  <article
                    key={job.id}
                    className="rounded-[1.8rem] border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-lg hover:shadow-slate-200/60 md:p-6"
                  >
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-black ${getStatusClass(
                              job.status
                            )}`}
                          >
                            {getStatusLabel(job.status)}
                          </span>

                          <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-slate-500 ring-1 ring-slate-200">
                            #{job.id}
                          </span>
                        </div>

                        <h2 className="mt-4 text-2xl font-black tracking-[-0.04em] text-[#06264a]">
                          {job.title}
                        </h2>

                        <p className="mt-2 text-sm font-black text-[#f6a313]">
                          {job.service_type}
                        </p>

                        {job.description && (
                          <p className="mt-4 line-clamp-3 text-sm leading-7 text-slate-600">
                            {job.description}
                          </p>
                        )}
                      </div>

                      <div className="shrink-0 rounded-2xl bg-white p-4 text-sm shadow-sm md:w-64">
                        <div className="font-black text-[#06264a]">
                          Talep Bilgileri
                        </div>

                        <div className="mt-3 grid gap-2 text-slate-600">
                          <div className="flex justify-between gap-3">
                            <span className="font-bold">Konum</span>
                            <span className="text-right font-black text-slate-700">
                              {job.city?.name || "-"}
                              {job.district?.name ? ` / ${job.district.name}` : ""}
                            </span>
                          </div>

                          <div className="flex justify-between gap-3">
                            <span className="font-bold">Tarih</span>
                            <span className="text-right font-black text-slate-700">
                              {job.work_date || "Belirtilmedi"}
                            </span>
                          </div>

                          <div className="flex justify-between gap-3">
                            <span className="font-bold">Saat</span>
                            <span className="text-right font-black text-slate-700">
                              {job.work_time || "Belirtilmedi"}
                            </span>
                          </div>

                          <div className="flex justify-between gap-3">
                            <span className="font-bold">Bütçe</span>
                            <span className="text-right font-black text-slate-700">
                              {job.budget || "Belirtilmedi"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {(job.address_detail || job.created_at) && (
                      <div className="mt-5 grid gap-3 border-t border-slate-200 pt-5 text-sm text-slate-600 md:grid-cols-2">
                        <div>
                          <span className="font-black text-slate-700">
                            Adres Detayı:
                          </span>{" "}
                          {job.address_detail || "Belirtilmedi"}
                        </div>

                        <div className="md:text-right">
                          <span className="font-black text-slate-700">
                            Oluşturma:
                          </span>{" "}
                          {job.created_at || "-"}
                        </div>
                      </div>
                    )}
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}