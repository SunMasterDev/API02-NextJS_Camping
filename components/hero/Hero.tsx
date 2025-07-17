'use client'
import { LandmarkCardProps } from "@/utils/types"
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import {Autoplay, Pagination, Navigation } from 'swiper/modules';
import OtherInfo from "./OtherInfo";
import Image from "next/image";

const Hero = ({Landmarks}:{Landmarks:LandmarkCardProps[]}) => {
  return (
  <div>
      <Swiper navigation={true} 
      modules={[Navigation,Autoplay,Pagination]} 
      autoplay={{
        delay:2000
      }}
      pagination={{
        clickable:true
      }}
      className="mySwiper">
      {
        Landmarks.map((landmark)=>{
          return (
              <SwiperSlide key={landmark.id}>
                <div className="relative rounded-md overflow-hidden group">
                    <Image src={landmark.image} alt={landmark.name} 
                    className="w-full h-[600px] object-cover
                    brightness-75 group-hover:brightness-50 
                    transition-all duration-300" width={1920} height={600}/>
                    <div className="absolute bottom-0 left-0 z-50">
                      <div className="col-span-4 mb-4 flex h-full flex-1
                      justify-end px-5 md:mb-4 md:justify-end md:px-10
                      ">
                        <OtherInfo Landmark={landmark}/>
                      </div>
                    </div>
                </div>
              </SwiperSlide>
          )
        })
      }
      </Swiper>
  </div>
  )
}
export default Hero