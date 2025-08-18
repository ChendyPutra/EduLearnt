import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/products");
      const data = await res.json();
      const foundProduct = data.find(p => p.id == id);
      setProduct(foundProduct || null);
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
          <Link to="/shop" className="text-emerald-600 hover:underline">
            ← Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            <div className="aspect-square bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl flex items-center justify-center">
              {product.image_url ? (
                <img src={product.image_url} alt={product.name} className="w-full h-full object-cover rounded-2xl" />
              ) : (
                <div className="w-32 h-32 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-3xl flex items-center justify-center">
                  <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
              )}
            </div>
            
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
                <p className="text-gray-600 leading-relaxed">{product.desc || "Kit pembelajaran berkualitas untuk mendukung perjalanan belajar teknologi Anda."}</p>
              </div>
              
              <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                {product.price ? `Rp ${parseInt(product.price).toLocaleString('id-ID')}` : "Hubungi Kami"}
              </div>
              
              <div className="space-y-3">
                {product.marketplace_url ? (
                  <a 
                    href={product.marketplace_url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-500 text-white py-4 px-6 rounded-2xl font-bold hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    Beli di Marketplace
                  </a>
                ) : (
                  <button disabled className="w-full bg-gray-200 text-gray-500 py-4 px-6 rounded-2xl font-bold cursor-not-allowed">
                    Segera Hadir
                  </button>
                )}
                
                <Link 
                  to="/shop"
                  className="w-full border-2 border-emerald-200 text-emerald-700 py-3 px-6 rounded-2xl font-semibold hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-200 text-center block"
                >
                  ← Kembali ke Shop
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}