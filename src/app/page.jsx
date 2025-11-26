'use client';

import React, { useState, useEffect } from 'react';
import Image from "next/image"; 

import LoadingSpinner from '../component/Loading/LoadingSpinner'; 
import HeroSection from '@/component/HeroSection/HeroSection';
import Typography from '@/component/Typography/Typography';
import Reviews from '@/component/Reviews/Reviews';
import WhyChooseFyloTech from '@/component/WhyChooseFyloTech/WhyChooseFyloTech';

export default function Home() {
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); 

    
    return () => clearTimeout(timer);
  }, []); 


  if (loading) {
    
    return (
        <div className="flex items-center justify-center h-full min-h-[500px]">
            
            <LoadingSpinner message="Loading FyloTech..." /> 
        </div>
    );
  }


  return (
    <div className="flex flex-col items-center justify-center py-20 min-h-[500px] transition-colors duration-300">
      <HeroSection></HeroSection>
      <Typography></Typography>
      <Reviews></Reviews>
      <WhyChooseFyloTech></WhyChooseFyloTech>
    </div>
  );
}