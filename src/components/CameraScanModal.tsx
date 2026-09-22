import React, { useRef, useState, useEffect } from 'react';
import { Camera, RefreshCw, Check, X } from 'lucide-react';

interface CameraScanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCaptureFile: (file: File) => void;
}

export const CameraScanModal: React.FC<CameraScanModalProps> = ({
  isOpen,
  onClose,
  onCaptureFile,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      startCamera();
    } else {
      stopCamera();
    }
    return () => {
      stopCamera();
    };
  }, [isOpen]);

  const startCamera = async () => {
    setError(null);
    setCapturedImage(null);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1920 }, height: { ideal: 1080 } },
        audio: false,
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err: any) {
      setError('Unable to access camera. Please grant camera permission in your browser.');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const handleCapture = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
    setCapturedImage(dataUrl);
  };

  const handleConfirm = async () => {
    if (!capturedImage) return;
    const res = await fetch(capturedImage);
    const blob = await res.blob();
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const file = new File([blob], `scan_${timestamp}.jpg`, { type: 'image/jpeg' });
    onCaptureFile(file);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4">
      <div className="w-full max-w-xl rounded-2xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <Camera className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-slate-900 dark:text-slate-100">
              Web Camera Document Scanner
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Viewport */}
        <div className="relative bg-black flex items-center justify-center min-h-[320px] max-h-[440px] overflow-hidden">
          {error ? (
            <div className="p-6 text-center text-rose-400 text-sm">
              <p className="mb-3">{error}</p>
              <button
                onClick={startCamera}
                className="px-4 py-2 rounded-xl bg-slate-800 text-white text-xs hover:bg-slate-700"
              >
                Retry
              </button>
            </div>
          ) : capturedImage ? (
            <img src={capturedImage} alt="Captured" className="max-h-[420px] object-contain" />
          ) : (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="max-h-[420px] w-full object-contain"
            />
          )}

          {!capturedImage && !error && (
            <div className="absolute inset-8 border-2 border-dashed border-white/40 pointer-events-none rounded-xl flex items-center justify-center">
              <span className="text-white/60 text-xs px-3 py-1 bg-black/40 rounded-full">
                Align document inside frame
              </span>
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="p-5 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-xl"
          >
            Cancel
          </button>

          {!capturedImage ? (
            <button
              onClick={handleCapture}
              disabled={!!error}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium shadow-md transition disabled:opacity-50"
            >
              <Camera className="w-4 h-4" />
              Capture Page
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => setCapturedImage(null)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <RefreshCw className="w-4 h-4" />
                Retake
              </button>
              <button
                onClick={handleConfirm}
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium shadow-md"
              >
                <Check className="w-4 h-4" />
                Use Photo
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
