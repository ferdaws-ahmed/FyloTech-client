'use client';

import { useEffect, useState } from "react";
import axios from "axios";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";

export default function HeroSlider() {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const res = await axios.get("https://fylo-tech-server.vercel.app/hero");
        setSlides(res.data);
      } catch (err) {
        console.error("Failed to fetch hero data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroData();
  }, []);

  if (loading) return <p className="text-center text-white">Loading...</p>;
  if (!slides.length) return <p className="text-center text-white">No slides available</p>;

  return (
    <div className="relative w-full h-[550px] bg-[#0a0f2b] overflow-hidden text-white rounded-2xl">
      <Swiper
        modules={[Autoplay, Pagination]}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="w-full h-full"
      >
        {slides.map((item) => (
          <SwiperSlide key={item._id}>
            <div className="w-full h-full flex items-center px-12 relative">
              
              {/* LEFT TEXT */}
              <div className="max-w-xl z-10">
                <h1 className="text-4xl font-bold mb-4">{item.title}</h1>
                <p className="text-lg opacity-80 mb-6">{item.subtitle}</p>

                <Link href="/products">
                  <button className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 transition">
                    {item.button}
                  </button>
                </Link>
              </div>

              {/* RIGHT IMAGE */}
              <img
                src={item.image}
                alt={item.title}
                className="absolute right-10 w-[420px]"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
