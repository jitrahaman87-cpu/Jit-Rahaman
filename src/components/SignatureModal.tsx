import React, { useRef, useState, useEffect } from 'react';
import { Pen, Type, Eraser, Check, X } from 'lucide-react';

interface SignatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplySignature: (signatureDataUrl: string) => void;
}

export const SignatureModal: React.FC<SignatureModalProps> = ({
  isOpen,
  onClose,
  onApplySignature,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [tab, setTab] = useState<'draw' | 'type'>('draw');
  const [typedName, setTypedName] = useState('');
  const [fontStyle, setFontStyle] = useState<'cursive' | 'serif' | 'sans-serif'>('cursive');
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);

  useEffect(() => {
    if (isOpen && tab === 'draw') {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.strokeStyle = '#1e293b';
          ctx.lineWidth = 3;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
        }
      }
    }
  }, [isOpen, tab]);

  if (!isOpen) return null;

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    setHasDrawn(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = ('clientX' in e ? e.clientX : e.touches[0].clientX) - rect.left;
    const y = ('clientY' in e ? e.clientY : e.touches[0].clientY) - rect.top;
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = ('clientX' in e ? e.clientX : e.touches[0].clientX) - rect.left;
    const y = ('clientY' in e ? e.clientY : e.touches[0].clientY) - rect.top;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  const handleConfirm = () => {
    if (tab === 'draw') {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dataUrl = canvas.toDataURL('image/png');
      onApplySignature(dataUrl);
    } else {
      if (!typedName.trim()) return;
      const canvas = document.createElement('canvas');
      canvas.width = 400;
      canvas.height = 120;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.fillStyle = '#1e293b';
      const fontFamilies: Record<string, string> = {
        cursive: 'Brush Script MT, cursive, Caveat',
        serif: 'Georgia, serif',
        'sans-serif': 'Helvetica, sans-serif',
      };
      ctx.font = `italic 38px ${fontFamilies[fontStyle] || 'cursive'}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(typedName, 200, 60);

      const dataUrl = canvas.toDataURL('image/png');
      onApplySignature(dataUrl);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
          <h3 className="font-semibold text-slate-900 dark:text-slate-100">
            Create Digital Signature
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 px-6 pt-3 gap-4">
          <button
            onClick={() => setTab('draw')}
            className={`pb-2.5 text-sm font-medium flex items-center gap-2 border-b-2 transition ${
              tab === 'draw'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Pen className="w-4 h-4" />
            Draw Signature
          </button>
          <button
            onClick={() => setTab('type')}
            className={`pb-2.5 text-sm font-medium flex items-center gap-2 border-b-2 transition ${
              tab === 'type'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Type className="w-4 h-4" />
            Type Signature
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {tab === 'draw' ? (
            <div className="space-y-3">
              <div className="relative border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800/50 p-2 overflow-hidden">
                <canvas
                  ref={canvasRef}
                  width={460}
                  height={180}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                  className="w-full h-44 cursor-crosshair touch-none bg-white dark:bg-slate-900 rounded-lg shadow-inner"
                />
                <div className="absolute bottom-4 left-6 right-6 border-b border-dashed border-slate-300 dark:border-slate-600 pointer-events-none" />
              </div>
              <div className="flex justify-between items-center text-xs text-slate-500">
                <span>Sign above the baseline</span>
                <button
                  onClick={clearCanvas}
                  className="inline-flex items-center gap-1 text-slate-500 hover:text-rose-500"
                >
                  <Eraser className="w-3.5 h-3.5" />
                  Clear
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase mb-2">
                  Full Legal Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Jane Doe"
                  value={typedName}
                  onChange={(e) => setTypedName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase mb-2">
                  Signature Style
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['cursive', 'serif', 'sans-serif'] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => setFontStyle(st)}
                      className={`p-2.5 rounded-xl border text-xs capitalize text-center ${
                        fontStyle === st
                          ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/40 text-blue-600'
                          : 'border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {typedName && (
                <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex items-center justify-center">
                  <span
                    className="text-3xl text-slate-800 dark:text-slate-100"
                    style={{
                      fontFamily: fontStyle === 'cursive' ? 'Brush Script MT, cursive' : fontStyle,
                      fontStyle: 'italic',
                    }}
                  >
                    {typedName}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-5 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-xl"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={tab === 'draw' ? !hasDrawn : !typedName.trim()}
            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium shadow-sm transition disabled:opacity-50"
          >
            <Check className="w-4 h-4" />
            Apply Signature
          </button>
        </div>
      </div>
    </div>
  );
};
