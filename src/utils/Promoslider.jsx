import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const PromoSlider = () => {
  const promos = [
    {
      id: 1,
      title: "RAMADAN SALE",
      subtitle: "Diskon Topup hingga 70%",
      color: "from-orange-600 to-red-900",
      image:
        "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/7a4f2faf-7d57-48f8-8b4e-ea655774db6b/ddrfu5v-8497eeac-ad03-4abf-957a-63159599231e.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiIvZi83YTRmMmZhZi03ZDU3LTQ4ZjgtOGI0ZS1lYTY1NTc3NGRiNmIvZGRyZnU1di04NDk3ZWVhYy1hZDAzLTRhYmYtOTU3YS02MzE1OTU5OTIzMWUuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.KlCYwXtUx3ucHNS_XpyCfhGIIeHkPypPeodXfPZF3fI",
    },
    {
      id: 2,
      title: "NEW USER PROMO",
      subtitle: "Bonus 50 Diamond MLBB",
      color: "from-blue-600 to-indigo-900",
      image: "https://wallpapercave.com/wp/wc1765288.jpg",
    },
    {
      id: 3,
      title: "WEEKEND FLASH",
      subtitle: "Harga Termurah Se-Indonesia",
      color: "from-purple-600 to-pink-900",
      image:
        "https://marketplace.canva.com/EAE992exOJg/2/0/1600w/canva-deep-blue-and-white-futuristic-gaming-background-desktop-wallpaper-lI44SVUHuJE.jpg",
    },
  ];

  return (
    <section className="w-full rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/5">
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        modules={[Autoplay, Pagination]}
        className="mySwiper h-48 md:h-72 lg:h-80"
      >
        {promos.map((promo) => (
          <SwiperSlide key={promo.id}>
            <div
              className={`relative w-full h-full bg-linear-to-br ${promo.color} flex items-center px-8 md:px-16 overflow-hidden`}
            >
              {/* Teks Promo */}
              <div className="z-10 max-w-lg space-y-2 md:space-y-4">
                <span className="bg-white/20 backdrop-blur-md text-white text-[10px] md:text-xs font-black px-3 py-1 rounded-full tracking-[0.2em] uppercase">
                  Limited Offer
                </span>
                <h2 className="text-3xl md:text-5xl font-black italic text-white tracking-tighter leading-none">
                  {promo.title}
                </h2>
                <p className="text-white/80 text-xs md:text-lg font-medium">
                  {promo.subtitle}
                </p>
                <button className="mt-2 md:mt-4 bg-white text-gray-900 px-6 py-2.5 rounded-full font-bold text-xs md:text-sm hover:bg-orange-500 hover:text-white transition-all active:scale-95 shadow-lg">
                  AMBIL PROMO
                </button>
              </div>

              {/* Dekorasi / Gambar di Samping (Opsional) */}
              <div className="absolute right-0 top-0 h-full w-1/2 opacity-20 md:opacity-40">
                <img
                  src={promo.image}
                  alt="promo"
                  className="w-full h-full object-cover grayscale brightness-150"
                />
              </div>

              {/* Elemen Estetik (Lingkaran Glow) */}
              <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-[100px]"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom CSS untuk Bullet Pagination agar Oranye */}
      <style jsx global>{`
        .swiper-pagination-bullet {
          background: white !important;
          opacity: 0.5;
        }
        .swiper-pagination-bullet-active {
          background: #f97316 !important;
          opacity: 1;
          width: 20px;
          border-radius: 5px;
        }
      `}</style>
    </section>
  );
};

export default PromoSlider;
