import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental:{ //ตั้งค่าขนาดสูงสุดของรูป
    serverActions:{
      bodySizeLimit:'5mb'
    }
  },
  reactStrictMode:false,
  images:{ //ตั้งค่ารูปจาก supabase
    remotePatterns:[
      {
        protocol:'https',
        hostname:'izkvluwjhdtcqvmuopcp.supabase.co'
      }
    ]
  } 
};

export default nextConfig;
