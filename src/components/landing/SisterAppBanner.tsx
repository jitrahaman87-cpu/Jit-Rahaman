import React from 'react';
import { ArrowRight, Sparkles, Image as ImageIcon, Crop, Maximize2, Layers } from 'lucide-react';

interface SisterAppBannerProps {
  onNavigateToImg: () => void;
}

export const SisterAppBanner: React.FC<SisterAppBannerProps> = ({ onNavigateToImg }) => {
  return (
    <section aria-labelledby="sister-app-heading" className="w-full">
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 lg:p-12 shadow-sm transition-all duration-300 hover:shadow-md">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Graphic Artwork matching the screenshot with crop handles and layered imagery */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-md aspect-4/3 rounded-2xl bg-gradient-to-br from-blue-50/50 via-slate-50 to-indigo-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 border border-slate-200/80 dark:border-slate-800 p-4 sm:p-6 flex items-center justify-center overflow-hidden group">
              {/* Blue crop frame with corner handles */}
              <div className="relative w-full h-full border-2 border-blue-500 rounded-lg p-2 flex items-center justify-center">
                {/* 4 corner handles */}
                <span className="absolute -top-2 -left-2 w-3.5 h-3.5 bg-blue-600 rounded-sm border-2 border-white dark:border-slate-900 shadow-xs" />
                <span className="absolute -top-2 -right-2 w-3.5 h-3.5 bg-blue-600 rounded-sm border-2 border-white dark:border-slate-900 shadow-xs" />
                <span className="absolute -bottom-2 -left-2 w-3.5 h-3.5 bg-blue-600 rounded-sm border-2 border-white dark:border-slate-900 shadow-xs" />
                <span className="absolute -bottom-2 -right-2 w-3.5 h-3.5 bg-blue-600 rounded-sm border-2 border-white dark:border-slate-900 shadow-xs" />

                {/* Resize icon badge top right */}
                <div className="absolute top-2 right-2 p-1 rounded-md bg-blue-600/90 text-white shadow-xs">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>

                {/* Layered Cards Artwork (simulating the architectural photo, flower with transparent checkerboard, and ocean photo from screenshot) */}
                <div className="flex items-center justify-center gap-2 sm:gap-3 w-full h-full">
                  {/* Card 1: Architectural Geo */}
                  <div className="w-1/3 h-4/5 rounded-lg bg-gradient-to-b from-blue-400 via-sky-300 to-indigo-400 opacity-90 shadow-sm flex flex-col justify-end p-2 overflow-hidden relative">
                    <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:8px_8px]" />
                    <span className="text-[10px] font-bold text-white/90 uppercase tracking-wider relative z-10">Crop</span>
                  </div>

                  {/* Card 2: Centerpiece with transparent grid & blue flower icon */}
                  <div className="w-2/5 h-full rounded-xl bg-white dark:bg-slate-800 shadow-md border border-slate-200/90 dark:border-slate-700 flex flex-col items-center justify-center p-3 relative overflow-hidden">
                    {/* Transparency checkerboard background */}
                    <div className="absolute inset-0 opacity-15 bg-[linear-gradient(45deg,#000_25%,transparent_25%,transparent_75%,#000_75%,#000)_0_0/12px_12px,linear-gradient(45deg,#000_25%,transparent_25%,transparent_75%,#000_75%,#000)_6px_6px/12px_12px]" />
                    <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-lg shadow-blue-500/30 relative z-10 group-hover:scale-110 transition duration-300">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 mt-2 relative z-10">AI Remove BG</span>
                  </div>

                  {/* Card 3: Ocean / Nature */}
                  <div className="w-1/3 h-4/5 rounded-lg bg-gradient-to-b from-teal-400 via-cyan-400 to-blue-500 opacity-90 shadow-sm flex flex-col justify-end p-2 overflow-hidden relative">
                    <span className="text-[10px] font-bold text-white/90 uppercase tracking-wider">Compress</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Copy and Call to Action */}
          <div className="lg:col-span-6 space-y-4 text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 text-xs font-semibold border border-rose-200/50 dark:border-rose-900/40">
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Companion Tool Suite</span>
            </div>

            <h2
              id="sister-app-heading"
              className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white"
            >
              Image editing made simple with OmniIMG
            </h2>

            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
              Experience the speed, simplicity, and security you expect from OmniPDF tailored for
              image editing. Compress, resize, crop, convert formats, and enhance your images with AI.
            </p>

            <div className="pt-2">
              <button
                onClick={onNavigateToImg}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-rose-500 hover:bg-rose-500 text-rose-600 hover:text-white dark:text-rose-400 dark:hover:text-white font-bold text-sm transition-all duration-200 cursor-pointer shadow-xs active:scale-98"
              >
                <span>Go to OmniIMG</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
