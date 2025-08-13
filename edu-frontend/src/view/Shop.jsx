export default function Shop() {
  const items = [
    { name: "Starter Robot Kit", price: "Rp 450.000" },
    { name: "AI Vision Kit", price: "Rp 680.000" },
    { name: "Coding Card Pack", price: "Rp 99.000" },
  ];
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Toko Online</h1>
      <div className="grid sm:grid-cols-3 gap-4">
        {items.map((it, i) => (
          <div key={i} className="border rounded-2xl p-4">
            <div className="aspect-video bg-gray-100 rounded-xl grid place-content-center text-gray-400">(img)</div>
            <div className="mt-3 font-semibold">{it.name}</div>
            <div className="text-sm text-gray-600">{it.price}</div>
            <div className="flex gap-2 mt-3">
              <a className="btn btn-primary flex-1" href="#">Shopee</a>
              <a className="btn btn-outline flex-1" href="#">Tokopedia</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
