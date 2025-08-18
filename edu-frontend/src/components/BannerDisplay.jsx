import { useState, useEffect } from "react";

export default function BannerDisplay() {
  const [banners, setBanners] = useState([]);
  const [currentBanner, setCurrentBanner] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    fetchActiveBanners();
  }, []);

  useEffect(() => {
    if (banners.length > 1) {
      const interval = setInterval(() => {
        handleNext();
      }, 6000); // auto slide tiap 6 detik
      return () => clearInterval(interval);
    }
  }, [banners.length, currentBanner]);

  const fetchActiveBanners = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/banners/active");
      const data = await res.json();
      setBanners(data);
    } catch (error) {
      console.error("Error fetching banners:", error);
    }
  };

  const handleNext = () => {
    if (banners.length <= 1) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
      setIsTransitioning(false);
    }, 600);
  };

  const handlePrev = () => {
    if (banners.length <= 1) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
      setIsTransitioning(false);
    }, 600);
  };

  if (banners.length === 0) return null;
  const banner = banners[currentBanner];

  return (
    <div className="relative w-full h-[260px] md:h-[320px] lg:h-[380px] rounded-xl overflow-hidden shadow-xl">
      {/* Background image with smooth zoom */}
      <div className="absolute inset-0">
        <img
          src={banner.image_url || "https://via.placeholder.com/1200x400?text=Banner"}
          alt={banner.title}
          className={`w-full h-full object-cover transition-all duration-[1200ms] ease-in-out ${
            isTransitioning ? "opacity-0 scale-105" : "opacity-100 scale-100"
          }`}
        />
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
      </div>

      {/* Text content */}
      <div className="relative z-10 h-full flex items-center px-6 md:px-12">
        <div
          className={`max-w-lg text-white space-y-3 transition-all duration-700 ${
            isTransitioning ? "opacity-0 translate-y-3" : "opacity-100 translate-y-0"
          }`}
        >
          <h2 className="text-xl md:text-3xl lg:text-4xl font-bold leading-snug drop-shadow-md">
            {banner.title}
          </h2>
          <p className="text-sm md:text-lg opacity-90">{banner.content}</p>
        </div>
      </div>

      {/* Navigation arrows */}
      {banners.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/40 hover:bg-black/60 rounded-full transition"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/40 hover:bg-black/60 rounded-full transition"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </>
      )}

      {/* Dot indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentBanner(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentBanner
                ? "bg-white scale-125 shadow-md"
                : "bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
