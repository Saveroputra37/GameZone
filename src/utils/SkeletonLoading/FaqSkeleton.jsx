import React from "react";
import { motion } from "framer-motion";

// Base Shimmer Component
const SkeletonBase = ({ className }) => (
  <motion.div
    initial={{ opacity: 0.3 }}
    animate={{ opacity: [0.3, 0.6, 0.3] }}
    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
    className={`bg-white/5 rounded-2xl ${className}`}
  />
);

const SupportSkeleton = () => {
  return (
    <div className="space-y-16 animate-in fade-in duration-500">
      {/* Header Skeleton */}
      <div className="flex flex-col items-center space-y-4">
        <SkeletonBase className="h-20 w-20 rounded-3xl" />
        <SkeletonBase className="h-14 w-full max-w-md rounded-2xl" />
        <SkeletonBase className="h-4 w-64 rounded-lg" />
      </div>

      {/* FAQ List Skeleton */}
      <div className="space-y-4 max-w-3xl mx-auto">
        {[1, 2, 3].map((i) => (
          <SkeletonBase key={i} className="h-20 w-full rounded-[2.5rem]" />
        ))}
      </div>

      {/* Form Section Skeleton */}
      <section className="grid lg:grid-cols-3 gap-8 pt-10 border-t border-white/5">
        {/* Left Side (Contact Info) */}
        <div className="lg:col-span-1">
          <div className="bg-[#1e2036]/50 p-8 rounded-[2.5rem] border border-white/5 space-y-8">
            <SkeletonBase className="h-6 w-32 rounded-lg" />
            <div className="space-y-4">
              <SkeletonBase className="h-12 w-full rounded-2xl" />
              <SkeletonBase className="h-12 w-full rounded-2xl" />
            </div>
          </div>
        </div>

        {/* Right Side (Form) */}
        <div className="lg:col-span-2">
          <div className="bg-[#1e2036]/50 border border-white/5 p-8 md:p-10 rounded-[2.5rem] space-y-5">
            <div className="grid md:grid-cols-2 gap-4">
              <SkeletonBase className="h-14 w-full rounded-2xl" />
              <SkeletonBase className="h-14 w-full rounded-2xl" />
            </div>
            <SkeletonBase className="h-14 w-full rounded-2xl" />
            <SkeletonBase className="h-32 w-full rounded-[2rem]" />
            <SkeletonBase className="h-14 w-full rounded-2xl" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default SupportSkeleton;