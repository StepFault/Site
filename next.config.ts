import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enforces strict React lifecycle checks, critical for Framer Motion stability
  reactStrictMode: true, 
  
  // Power up the compiler for faster builds during your pitch prep
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  
  // Experimental flags can be added here if you need specific Next 15 features later
  experimental: {
    optimizePackageImports: ["framer-motion", "lucide-react"],
  }
};

export default nextConfig;