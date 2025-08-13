export default function CompanyProfile() {
  const team = [
    { n: "Rani", r: "CEO" },
    { n: "Bima", r: "Head of Curriculum" },
    { n: "Sari", r: "Lead Instructor" },
  ];
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-2xl font-bold">Profil Perusahaan</h1>
        <p className="text-gray-700 mt-2">
          Visi: Menginspirasi generasi muda menjadi kreator teknologi.
          Misi: Menyediakan pembelajaran STEAM yang menyenangkan & relevan industri.
        </p>
      </section>
      <section>
        <h2 className="text-lg font-bold mb-3">Tim</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {team.map((t, i) => (
            <div key={i} className="border rounded-2xl p-4">
              <div className="aspect-square rounded-xl bg-gray-100 grid place-content-center text-gray-400">(foto)</div>
              <div className="mt-3 font-semibold">{t.n}</div>
              <div className="text-sm text-gray-600">{t.r}</div>
            </div>
          ))}
        </div>
      </section>
      <section className="rounded-2xl border p-6">
        <h2 className="text-lg font-bold mb-2">Kemitraan & Kontak</h2>
        <form className="grid sm:grid-cols-2 gap-3">
          <input className="border rounded-lg p-2" placeholder="Nama Sekolah / Institusi" />
          <input className="border rounded-lg p-2" placeholder="Kontak (Email/HP)" />
          <textarea className="border rounded-lg p-2 sm:col-span-2" rows="4" placeholder="Pesan"></textarea>
          <button type="button" className="btn btn-primary sm:col-span-2">Kirim</button>
        </form>
      </section>
    </div>
  );
}
