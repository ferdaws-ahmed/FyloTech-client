'use client';

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

const ReviewsSection = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/reviews`);
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <section className="py-16 bg-gray-900 mt-10 w-full">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-2 text-white">Customer Reviews</h2>
        <p className="text-gray-400 text-lg">
          What our customers say about our service
        </p>
      </div>

      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView="auto"
        coverflowEffect={{
          rotate: 20,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false, // shadows off for simple style
        }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        modules={[EffectCoverflow, Pagination, Autoplay]} 
        className="w-full"
      >
        {reviews.map((review) => (
          <SwiperSlide
            key={review._id}
            className="w-80 flex flex-col items-center text-center bg-gray-800 rounded-2xl p-6 border border-gray-700"
          >
            <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border-2 border-gray-600 mx-auto">
              <img
                src={review.user_photoURL}
                alt={review.userName}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-lg font-semibold text-white mb-1">{review.userName}</h3>
            <p className="text-yellow-400 font-semibold mb-2">⭐ {review.ratings.toFixed(1)}</p>
            <p className="text-gray-300 mb-2 px-2">{review.review}</p>
            <span className="text-gray-500 text-sm">{new Date(review.date).toLocaleDateString()}</span>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default ReviewsSection;
