import React, { useState, useEffect, useRef } from 'react';
import {
  Image as ImageIcon,
  Minimize2,
  Crop,
  RotateCw,
  Download,
  UploadCloud,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';
import { updateSEO } from '../lib/seo';

interface OmniImgPageProps {
  onNavigateHome: () => void;
}

export const OmniImgPage: React.FC<OmniImgPageProps> = ({ onNavigateHome }) => {
  const [selectedImage, setSelectedImage] = useState<{
    file: File;
    url: string;
    width: number;
    height: number;
    size: number;
  } | null>(null);

  const [activeTool, setActiveTool] = useState<'compress' | 'resize' | 'convert' | 'rotate'>('compress');
  const [quality, setQuality] = useState(80);
  const [targetWidth, setTargetWidth] = useState(800);
  const [targetHeight, setTargetHeight] = useState(600);
  const [targetFormat, setTargetFormat] = useState<'image/jpeg' | 'image/png' | 'image/webp'>('image/jpeg');
  const [rotationAngle, setRotationAngle] = useState(0);

  const [processedUrl, setProcessedUrl] = useState<string | null>(null);
  const [processedSize, setProcessedSize] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    updateSEO({
      title: 'OmniIMG – Fast, Free Online Image Editor & Compressor',
      description:
        'Compress, resize, convert, and crop images directly in your browser with bank-grade privacy. Experience the speed and security of OmniPDF tailored for images.',
      canonicalUrl: `${window.location.origin}/#/omni-img`,
      keywords: ['image compressor', 'resize image', 'image converter', 'omniimg'],
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'OmniIMG Suite',
        applicationCategory: 'MultimediaApplication',
        description: 'Client-side image optimizer, compressor, and format converter.',
      },
    });
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      setSelectedImage({
        file,
        url,
        width: img.naturalWidth,
        height: img.naturalHeight,
        size: file.size,
      });
      setTargetWidth(img.naturalWidth);
      setTargetHeight(img.naturalHeight);
      setProcessedUrl(null);
      setProcessedSize(null);
    };
    img.src = url;
  };

  const processImage = async () => {
    if (!selectedImage) return;
    setIsProcessing(true);

    try {
      const img = new Image();
      img.src = selectedImage.url;
      await new Promise((res) => (img.onload = res));

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;

      if (activeTool === 'rotate') {
        const rad = (rotationAngle * Math.PI) / 180;
        const isOrthogonal = rotationAngle % 180 !== 0;
        canvas.width = isOrthogonal ? img.naturalHeight : img.naturalWidth;
        canvas.height = isOrthogonal ? img.naturalWidth : img.naturalHeight;

        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(rad);
        ctx.drawImage(img, -img.naturalWidth / 2, -img.naturalHeight / 2);
      } else if (activeTool === 'resize') {
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
      } else {
        // compress or convert
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        ctx.drawImage(img, 0, 0);
      }

      const mime = activeTool === 'convert' ? targetFormat : selectedImage.file.type || 'image/jpeg';
      const q = activeTool === 'compress' ? quality / 100 : 0.92;

      canvas.toBlob(
        (blob) => {
          if (blob) {
            const outUrl = URL.createObjectURL(blob);
            setProcessedUrl(outUrl);
            setProcessedSize(blob.size);
          }
          setIsProcessing(false);
        },
        mime,
        q
      );
    } catch (err) {
      console.error(err);
      setIsProcessing(false);
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Top Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={onNavigateHome}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to PDF Tools</span>
        </button>
        <span className="text-xs text-rose-500 font-bold uppercase tracking-wider">
          OmniIMG Companion App
        </span>
      </div>

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>100% Client-Side WebAssembly</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Image editing made simple with OmniIMG
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          Compress, resize, rotate, and convert photos without uploading to remote servers.
        </p>
      </div>

      {/* Main Workspace Area */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-6">
        {!selectedImage ? (
          /* Dropzone */
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-rose-500 rounded-3xl p-12 text-center cursor-pointer transition flex flex-col items-center justify-center gap-4 bg-slate-50/50 dark:bg-slate-950/40 group"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileSelect}
            />
            <div className="w-16 h-16 rounded-2xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 flex items-center justify-center group-hover:scale-110 transition shadow-xs">
              <UploadCloud className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <div className="text-base font-bold text-slate-900 dark:text-white">
                Select or drop an image here
              </div>
              <div className="text-xs text-slate-400">
                Supports JPG, PNG, WebP, GIF, BMP, and SVG (up to 50MB)
              </div>
            </div>
            <button
              type="button"
              className="px-5 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs shadow-md shadow-rose-500/20 transition pointer-events-none"
            >
              Choose Image
            </button>
          </div>
        ) : (
          /* Editor Layout */
          <div className="space-y-6">
            {/* Tool Tabs */}
            <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 overflow-x-auto">
              <button
                onClick={() => {
                  setActiveTool('compress');
                  setProcessedUrl(null);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  activeTool === 'compress'
                    ? 'bg-rose-500 text-white'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Minimize2 className="w-3.5 h-3.5" />
                <span>Compress</span>
              </button>

              <button
                onClick={() => {
                  setActiveTool('resize');
                  setProcessedUrl(null);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  activeTool === 'resize'
                    ? 'bg-rose-500 text-white'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Crop className="w-3.5 h-3.5" />
                <span>Resize</span>
              </button>

              <button
                onClick={() => {
                  setActiveTool('convert');
                  setProcessedUrl(null);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  activeTool === 'convert'
                    ? 'bg-rose-500 text-white'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Convert Format</span>
              </button>

              <button
                onClick={() => {
                  setActiveTool('rotate');
                  setProcessedUrl(null);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  activeTool === 'rotate'
                    ? 'bg-rose-500 text-white'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>Rotate</span>
              </button>

              <div className="ml-auto">
                <button
                  onClick={() => {
                    setSelectedImage(null);
                    setProcessedUrl(null);
                  }}
                  className="text-xs text-slate-400 hover:text-slate-600 underline"
                >
                  Choose different file
                </button>
              </div>
            </div>

            {/* Visual Preview and Settings Split */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              {/* Image Preview */}
              <div className="md:col-span-7 bg-slate-100 dark:bg-slate-950 rounded-2xl p-4 flex items-center justify-center min-h-[300px] max-h-[440px] overflow-hidden border border-slate-200 dark:border-slate-800">
                <img
                  src={processedUrl || selectedImage.url}
                  alt="Preview"
                  className="max-h-full max-w-full object-contain rounded-lg shadow-xs"
                />
              </div>

              {/* Controls */}
              <div className="md:col-span-5 space-y-4">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 space-y-1 text-xs">
                  <div className="font-bold text-slate-900 dark:text-white truncate">
                    {selectedImage.file.name}
                  </div>
                  <div className="text-slate-500">
                    Original: {selectedImage.width} × {selectedImage.height} px •{' '}
                    {formatBytes(selectedImage.size)}
                  </div>
                  {processedSize && (
                    <div className="text-emerald-600 dark:text-emerald-400 font-bold pt-1 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>
                        Optimized: {formatBytes(processedSize)} (
                        {Math.round((1 - processedSize / selectedImage.size) * 100)}% smaller)
                      </span>
                    </div>
                  )}
                </div>

                {/* Subtool Controls */}
                {activeTool === 'compress' && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                      <span>Compression Quality</span>
                      <span>{quality}%</span>
                    </div>
                    <input
                      type="range"
                      min={20}
                      max={95}
                      value={quality}
                      onChange={(e) => setQuality(Number(e.target.value))}
                      className="w-full accent-rose-500 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>Max Compression</span>
                      <span>Best Quality</span>
                    </div>
                  </div>
                )}

                {activeTool === 'resize' && (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Width (px)
                      </label>
                      <input
                        type="number"
                        value={targetWidth}
                        onChange={(e) => setTargetWidth(Number(e.target.value))}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Height (px)
                      </label>
                      <input
                        type="number"
                        value={targetHeight}
                        onChange={(e) => setTargetHeight(Number(e.target.value))}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>
                )}

                {activeTool === 'convert' && (
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Target Image Format
                    </label>
                    <select
                      value={targetFormat}
                      onChange={(e) => setTargetFormat(e.target.value as any)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                    >
                      <option value="image/jpeg">JPG / JPEG (Standard photo)</option>
                      <option value="image/png">PNG (Lossless transparency)</option>
                      <option value="image/webp">WebP (Modern web format)</option>
                    </select>
                  </div>
                )}

                {activeTool === 'rotate' && (
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Rotate Clockwise
                    </label>
                    <div className="flex gap-2">
                      {[90, 180, 270].map((deg) => (
                        <button
                          key={deg}
                          type="button"
                          onClick={() => setRotationAngle(deg)}
                          className={`flex-1 py-2 rounded-xl text-xs font-bold border transition ${
                            rotationAngle === deg
                              ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-600'
                              : 'border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          +{deg}°
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Process / Apply Button */}
                <button
                  onClick={processImage}
                  disabled={isProcessing}
                  className="w-full py-3 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs shadow-md shadow-rose-500/20 transition cursor-pointer disabled:opacity-50"
                >
                  {isProcessing ? 'Processing Image...' : 'Apply Image Edit'}
                </button>

                {/* Download Button */}
                {processedUrl && (
                  <a
                    href={processedUrl}
                    download={`omni-edit-${selectedImage.file.name}`}
                    className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Edited Image</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
