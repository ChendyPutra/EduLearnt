import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Toast from "../components/Toast";
import ConfirmDialog from "../components/ConfirmDialog";

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [confirmDialog, setConfirmDialog] = useState({ show: false, id: null });
  const [formData, setFormData] = useState({
    name: "",
    desc: "",
    price: "",
    marketplace_url: ""
  });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/products");
      const data = await res.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    
    try {
      const url = editingProduct 
        ? `http://localhost:8000/api/admin/products/${editingProduct.id}`
        : "http://localhost:8000/api/admin/products";
      
      const method = editingProduct ? "PUT" : "POST";
      
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        fetchProducts();
        setShowForm(false);
        setEditingProduct(null);
        setFormData({ name: "", desc: "", price: "", marketplace_url: "" });
        showToast(editingProduct ? 'Product updated successfully!' : 'Product created successfully!');
      } else {
        showToast('Failed to save product', 'error');
      }
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData(product);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Hapus produk ini?")) return;
    
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`http://localhost:8000/api/admin/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (res.ok) {
        fetchProducts();
        showToast('Product deleted successfully!');
      } else {
        showToast('Failed to delete product', 'error');
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <p className="text-indigo-600 font-medium">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Toast 
        show={toast.show} 
        message={toast.message} 
        type={toast.type} 
        onClose={() => setToast({ ...toast, show: false })} 
      />
      
      <ConfirmDialog
        show={confirmDialog.show}
        title="Delete Product"
        message="Are you sure you want to delete this product? This action cannot be undone."
        onConfirm={() => {
          const token = localStorage.getItem("token");
          fetch(`http://localhost:8000/api/admin/products/${confirmDialog.id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` }
          }).then(res => {
            if (res.ok) {
              fetchProducts();
              showToast('Product deleted successfully!');
            } else {
              showToast('Failed to delete product', 'error');
            }
          }).catch(() => showToast('Failed to delete product', 'error'));
          setConfirmDialog({ show: false, id: null });
        }}
        onCancel={() => setConfirmDialog({ show: false, id: null })}
      />
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl p-8 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Manage Products</h1>
            <p className="text-orange-100 text-lg">Manage EduLearnKit products and marketplace</p>
          </div>
          <button 
            onClick={() => setShowForm(true)}
            className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-white/20 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Product
          </button>
        </div>
      </div>

      {/* Form Modal */}
      {showForm && createPortal(
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" style={{zIndex: 999999}}>
<div className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl w-full max-w-3xl border border-indigo-200 shadow-2xl max-h-[90vh] overflow-y-auto scrollbar-hide md:scrollbar-thin">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-800">
                {editingProduct ? "Edit Product" : "Add New Product"}
              </h2>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Product Name</label>
                <input
                  type="text"
                  placeholder="Enter product name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full p-4 border border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/70 backdrop-blur-sm"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
                <textarea
                  placeholder="Enter product description"
                  value={formData.desc}
                  onChange={(e) => setFormData({...formData, desc: e.target.value})}
                  className="w-full p-4 border border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/70 backdrop-blur-sm"
                  rows="4"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Price (IDR)</label>
                  <input
                    type="number"
                    placeholder="Enter price in IDR"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    className="w-full p-4 border border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/70 backdrop-blur-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Marketplace URL</label>
                  <input
                    type="url"
                    placeholder="https://marketplace.com/product"
                    value={formData.marketplace_url}
                    onChange={(e) => setFormData({...formData, marketplace_url: e.target.value})}
                    className="w-full p-4 border border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/70 backdrop-blur-sm"
                  />
                </div>
              </div>
              
              <div className="flex gap-4 pt-4">
                <button 
                  type="submit" 
                  className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {editingProduct ? "Update Product" : "Create Product"}
                </button>
                <button 
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingProduct(null);
                    setFormData({ name: "", desc: "", price: "", marketplace_url: "" });
                  }}
                  className="px-6 py-4 border border-slate-300 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition-all duration-300 flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>, document.body
      )}

      {/* Products Grid */}
      <div className="grid gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="bg-white/70 backdrop-blur-sm border border-indigo-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
              <div className="flex justify-between items-start gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center text-white">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800">{product.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                          {formatPrice(product.price)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-slate-600 mb-4 leading-relaxed">{product.desc}</p>
                  
                  {product.marketplace_url && (
                    <div className="flex items-center gap-2 text-sm text-indigo-600">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      <a href={product.marketplace_url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        View on Marketplace
                      </a>
                    </div>
                  )}
                </div>
                
                <div className="flex gap-3">
                  <button 
                    onClick={() => handleEdit(product)}
                    className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                  </button>
                  <button 
                    onClick={() => setConfirmDialog({ show: true, id: product.id })}
                    className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-br from-slate-200 to-slate-300 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">No products available</h3>
            <p className="text-slate-500 mb-6">Start by adding your first product</p>
            <button 
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Create First Product
            </button>
          </div>
        )}
      </div>
    </div>
  );
}