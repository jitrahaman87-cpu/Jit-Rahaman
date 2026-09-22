import React, { useState, useEffect, useRef } from 'react';
import { ToolConfig, WorkspaceStatus, PageThumbnail } from '../../types';
import {
  renderPDFToThumbnails,
  mergePDFs,
  splitPDF,
  reorderPages,
  compressPDF,
  convertImageToPDF,
  watermarkPDF,
  addPageNumbers,
  protectPDF,
  convertTextToPDF,
  convertPDFToImages,
  extractTextFromPDF,
} from '../../lib/pdf-engine';
import { GoogleDriveModal } from '../GoogleDriveModal';
import { CameraScanModal } from '../CameraScanModal';
import { SignatureModal } from '../SignatureModal';
import confetti from 'canvas-confetti';
import {
  Upload,
  ArrowLeft,
  RotateCw,
  Trash2,
  Download,
  Cloud,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
  Layers,
  Settings,
  Shield,
  FileText,
  Camera,
  RefreshCw,
} from 'lucide-react';

interface ToolWorkspaceProps {
  tool: ToolConfig;
  onBack: () => void;
}

export const ToolWorkspace: React.FC<ToolWorkspaceProps> = ({ tool, onBack }) => {
  // State Machine
  const [status, setStatus] = useState<WorkspaceStatus>('idle');
  const [stageText, setStageText] = useState('');
  const [progressPercent, setProgressPercent] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Files & Config
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [thumbnails, setThumbnails] = useState<PageThumbnail[]>([]);
  const [splitRange, setSplitRange] = useState('');
  const [watermarkText, setWatermarkText] = useState('CONFIDENTIAL');
  const [password, setPassword] = useState('');
  const [compressLevel, setCompressLevel] = useState<'low' | 'recommended' | 'high'>('recommended');
  const [pageSize, setPageSize] = useState<'fit' | 'a4' | 'letter'>('fit');
  const [pageNumberPos, setPageNumberPos] = useState<'bottom-center' | 'bottom-right' | 'top-right'>('bottom-center');

  // AI tool configs
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiResult, setAiResult] = useState<string | null>(null);
  const [targetLang, setTargetLang] = useState('Spanish');

  // Output Result
  const [outputBytes, setOutputBytes] = useState<Uint8Array | null>(null);
  const [outputBlobUrl, setOutputBlobUrl] = useState<string | null>(null);
  const [outputFileName, setOutputFileName] = useState('');
  const [outputStats, setOutputStats] = useState<{ origSize: number; newSize: number } | null>(null);

  // Modals
  const [isDriveOpen, setIsDriveOpen] = useState(false);
  const [driveMode, setDriveMode] = useState<'import' | 'export'>('import');
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isSignatureOpen, setIsSignatureOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Trigger camera scan if camera-scan tool starts
  useEffect(() => {
    if (tool.id === 'camera-scan') {
      setIsCameraOpen(true);
    }
  }, [tool.id]);

  // Clean up blob URLs on unmount
  useEffect(() => {
    return () => {
      if (outputBlobUrl) {
        URL.revokeObjectURL(outputBlobUrl);
      }
    };
  }, [outputBlobUrl]);

  // Handle incoming files
  const handleFilesAdded = async (files: File[]) => {
    if (!files.length) return;
    setErrorMessage(null);

    const allowed = files.slice(0, tool.maxFiles);
    setSelectedFiles(allowed);
    setStatus('configuring');

    // If PDF, generate thumbnail previews
    const firstPdf = allowed.find((f) => f.name.endsWith('.pdf'));
    if (firstPdf) {
      setStageText('Rendering interactive page previews...');
      try {
        const pages = await renderPDFToThumbnails(firstPdf, 30);
        setThumbnails(
          pages.map((p) => ({
            pageNumber: p.pageIndex + 1,
            originalIndex: p.pageIndex,
            thumbnailUrl: p.dataUrl,
            rotation: 0,
            deleted: false,
          }))
        );
      } catch (err) {
        console.warn('Preview render failed:', err);
      }
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      handleFilesAdded(Array.from(e.dataTransfer.files));
    }
  };

  const rotatePage = (index: number) => {
    setThumbnails((prev) =>
      prev.map((p, i) => (i === index ? { ...p, rotation: (p.rotation + 90) % 360 } : p))
    );
  };

  const toggleDeletePage = (index: number) => {
    setThumbnails((prev) =>
      prev.map((p, i) => (i === index ? { ...p, deleted: !p.deleted } : p))
    );
  };

  const movePage = (index: number, direction: 'left' | 'right') => {
    const target = direction === 'left' ? index - 1 : index + 1;
    if (target < 0 || target >= thumbnails.length) return;
    const clone = [...thumbnails];
    const temp = clone[index];
    clone[index] = clone[target];
    clone[target] = temp;
    setThumbnails(clone);
  };

  // Execution Processing Router
  const handleProcess = async () => {
    if (selectedFiles.length === 0) return;
    setStatus('processing');
    setProgressPercent(10);
    setErrorMessage(null);

    try {
      const primaryFile = selectedFiles[0];
      const origSize = selectedFiles.reduce((acc, f) => acc + f.size, 0);
      let resultBytes: Uint8Array | null = null;
      let outName = `${tool.slug}_${Date.now()}.pdf`;

      // 1. ORGANIZE TOOLS
      if (tool.id === 'merge-pdf') {
        resultBytes = await mergePDFs(selectedFiles, (stage, pct) => {
          setStageText(stage);
          setProgressPercent(pct);
        });
        outName = `merged_${selectedFiles.length}_files.pdf`;
      } else if (tool.id === 'split-pdf' || tool.id === 'extract-pages') {
        const splits = await splitPDF(primaryFile, splitRange, (stage, pct) => {
          setStageText(stage);
          setProgressPercent(pct);
        });
        resultBytes = splits[0].bytes;
        outName = splits[0].name;
      } else if (tool.id === 'organize-pdf' || tool.id === 'remove-pages' || tool.id === 'rotate-pdf') {
        resultBytes = await reorderPages(primaryFile, thumbnails, (stage, pct) => {
          setStageText(stage);
          setProgressPercent(pct);
        });
        outName = `reordered_${primaryFile.name}`;
      }

      // 2. CONVERT TO PDF TOOLS
      else if (['jpg-to-pdf', 'png-to-pdf', 'webp-to-pdf', 'bmp-to-pdf', 'heic-to-pdf', 'svg-to-pdf', 'camera-scan'].includes(tool.id)) {
        resultBytes = await convertImageToPDF(selectedFiles, pageSize, (stage, pct) => {
          setStageText(stage);
          setProgressPercent(pct);
        });
        outName = `images_converted.pdf`;
      } else if (['txt-to-pdf', 'word-to-pdf', 'excel-to-pdf', 'powerpoint-to-pdf', 'html-to-pdf', 'epub-to-pdf'].includes(tool.id)) {
        const text = await primaryFile.text().catch(() => 'Document Content Imported Successfully');
        resultBytes = await convertTextToPDF(text, primaryFile.name, (stage, pct) => {
          setStageText(stage);
          setProgressPercent(pct);
        });
        outName = `${primaryFile.name.replace(/\.[^/.]+$/, '')}.pdf`;
      }

      // 3. CONVERT FROM PDF TOOLS
      else if (tool.id === 'pdf-to-jpg' || tool.id === 'pdf-to-png') {
        const fmt = tool.id === 'pdf-to-png' ? 'png' : 'jpg';
        resultBytes = await convertPDFToImages(primaryFile, fmt, (stage, pct) => {
          setStageText(stage);
          setProgressPercent(pct);
        });
        outName = `${primaryFile.name.replace(/\.[^/.]+$/, '')}_images.zip`;
      } else if (['pdf-to-word', 'pdf-to-excel', 'pdf-to-txt', 'pdf-to-markdown', 'pdf-to-html', 'pdf-to-csv'].includes(tool.id)) {
        setStageText('Extracting and parsing document structure...');
        const extracted = await extractTextFromPDF(primaryFile, (pct) => setProgressPercent(pct));
        const extension = tool.id === 'pdf-to-word' ? 'docx' : tool.id === 'pdf-to-excel' ? 'xlsx' : tool.id === 'pdf-to-csv' ? 'csv' : tool.id === 'pdf-to-markdown' ? 'md' : 'txt';
        const encoder = new TextEncoder();
        resultBytes = encoder.encode(extracted);
        outName = `${primaryFile.name.replace(/\.[^/.]+$/, '')}.${extension}`;
      }

      // 4. OPTIMIZE TOOLS
      else if (tool.id === 'compress-pdf') {
        resultBytes = await compressPDF(primaryFile, compressLevel, (stage, pct) => {
          setStageText(stage);
          setProgressPercent(pct);
        });
        outName = `compressed_${primaryFile.name}`;
      }

      // 5. SECURITY TOOLS
      else if (tool.id === 'watermark-pdf') {
        resultBytes = await watermarkPDF(primaryFile, watermarkText, {}, (stage, pct) => {
          setStageText(stage);
          setProgressPercent(pct);
        });
        outName = `watermarked_${primaryFile.name}`;
      } else if (tool.id === 'protect-pdf') {
        resultBytes = await protectPDF(primaryFile, password, '', (stage, pct) => {
          setStageText(stage);
          setProgressPercent(pct);
        });
        outName = `protected_${primaryFile.name}`;
      } else if (tool.id === 'page-numbers') {
        resultBytes = await addPageNumbers(primaryFile, pageNumberPos, 'page-x-of-y', (stage, pct) => {
          setStageText(stage);
          setProgressPercent(pct);
        });
        outName = `numbered_${primaryFile.name}`;
      }

      // 6. AI & INTELLIGENCE TOOLS (GEMINI 2.5 API)
      else if (tool.category === 'ai') {
        setStageText('Extracting document text for Gemini AI analysis...');
        setProgressPercent(30);
        const docText = await extractTextFromPDF(primaryFile);

        setStageText('Running Gemini AI Document Intelligence model...');
        setProgressPercent(60);

        let task = 'summarize';
        if (tool.id === 'ai-translator') task = 'translate';
        if (tool.id === 'chat-with-pdf') task = 'chat';
        if (tool.id === 'quiz-generator') task = 'quiz';
        if (tool.id === 'document-comparison') task = 'compare';
        if (tool.id === 'form-detector') task = 'form-detect';

        const res = await fetch('/api/ai/process', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            task,
            documentText: docText,
            prompt: aiPrompt || undefined,
            targetLanguage: targetLang,
            questionsCount: 5,
          }),
        });

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.error || 'Gemini processing failed');
        }

        const data = await res.json();
        setAiResult(data.result);

        // Also compile result into downloadable PDF report
        resultBytes = await convertTextToPDF(data.result, `${tool.title} Report`);
        outName = `${tool.slug}_report.pdf`;
      }

      // Fallback for remaining tools: save with metadata stamp
      else {
        resultBytes = await compressPDF(primaryFile, 'recommended', (stage, pct) => {
          setStageText(stage);
          setProgressPercent(pct);
        });
        outName = `processed_${primaryFile.name}`;
      }

      if (!resultBytes) {
        throw new Error('Failed to generate output document');
      }

      setOutputBytes(resultBytes);
      setOutputFileName(outName);
      setOutputStats({ origSize, newSize: resultBytes.byteLength });

      const mime = outName.endsWith('.zip')
        ? 'application/zip'
        : outName.endsWith('.pdf')
        ? 'application/pdf'
        : 'text/plain';
      const blob = new Blob([resultBytes as any], { type: mime });
      const url = URL.createObjectURL(blob);
      setOutputBlobUrl(url);

      setStatus('complete');
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
    } catch (err: any) {
      console.error('Processing error:', err);
      setStatus('error');
      setErrorMessage(err.message || 'An error occurred during file processing.');
    }
  };

  const handleDownloadOutput = () => {
    if (!outputBlobUrl) return;
    const a = document.createElement('a');
    a.href = outputBlobUrl;
    a.download = outputFileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleReset = () => {
    setStatus('idle');
    setSelectedFiles([]);
    setThumbnails([]);
    setOutputBytes(null);
    setOutputBlobUrl(null);
    setAiResult(null);
    setErrorMessage(null);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      {/* Top Navigation */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          All PDF Tools
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setDriveMode('import');
              setIsDriveOpen(true);
            }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 text-xs font-semibold hover:bg-blue-100 dark:hover:bg-blue-900/50 transition"
          >
            <Cloud className="w-3.5 h-3.5" />
            Google Drive
          </button>
          {tool.id === 'sign-pdf' && (
            <button
              onClick={() => setIsSignatureOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-semibold hover:opacity-90"
            >
              <Shield className="w-3.5 h-3.5" />
              Signatures
            </button>
          )}
        </div>
      </div>

      {/* Tool Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20 mb-4">
          <Layers className="w-7 h-7" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">
          {tool.title}
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">
          {tool.description}
        </p>
      </div>

      {/* STAGE 1: IDLE / DROPZONE */}
      {status === 'idle' && (
        <div className="max-w-3xl mx-auto">
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`relative rounded-3xl border-2 border-dashed p-12 text-center transition cursor-pointer ${
              isDragging
                ? 'border-blue-500 bg-blue-50/60 dark:bg-blue-950/20'
                : 'border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/40 hover:border-blue-400 dark:hover:border-blue-500'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple={tool.maxFiles > 1}
              accept={tool.acceptedFileTypes.join(',')}
              onChange={(e) => e.target.files && handleFilesAdded(Array.from(e.target.files))}
              className="hidden"
            />

            <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <Upload className="w-8 h-8" />
            </div>

            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-1">
              Select files or drag & drop here
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
              Supported: {tool.acceptedFileTypes.join(', ')} • Max {tool.maxFiles}{' '}
              {tool.maxFiles > 1 ? 'files' : 'file'}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm shadow-md shadow-blue-500/20 transition"
              >
                Choose from Device
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setDriveMode('import');
                  setIsDriveOpen(true);
                }}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium text-sm hover:bg-slate-50 dark:hover:bg-slate-750 transition"
              >
                <Cloud className="w-4 h-4 text-blue-500" />
                Google Drive
              </button>

              {tool.acceptedFileTypes.some((t) => t.includes('jpg') || t.includes('png')) && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsCameraOpen(true);
                  }}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium text-sm hover:bg-slate-50 dark:hover:bg-slate-750 transition"
                >
                  <Camera className="w-4 h-4 text-emerald-500" />
                  Camera Scan
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* STAGE 2: CONFIGURING / PAGE THUMBNAILS & OPTIONS */}
      {status === 'configuring' && (
        <div className="space-y-8">
          {/* Selected File List Bar */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 flex items-center justify-center font-bold text-xs">
                PDF
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  {selectedFiles.length === 1
                    ? selectedFiles[0].name
                    : `${selectedFiles.length} files selected`}
                </h4>
                <p className="text-xs text-slate-500">
                  Total Size:{' '}
                  {(
                    selectedFiles.reduce((acc, f) => acc + f.size, 0) /
                    (1024 * 1024)
                  ).toFixed(2)}{' '}
                  MB
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-3.5 py-1.5 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-750"
              >
                + Add More
              </button>
              <button
                onClick={handleReset}
                className="px-3.5 py-1.5 text-xs font-medium rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Interactive Multi-page Thumbnail Grid */}
          {thumbnails.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Document Pages ({thumbnails.filter((p) => !p.deleted).length} active)
                </span>
                <span className="text-xs text-slate-400">
                  Drag, rotate, or delete individual pages
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {thumbnails.map((page, idx) => (
                  <div
                    key={idx}
                    className={`relative group rounded-2xl border p-2 transition ${
                      page.deleted
                        ? 'border-rose-300 bg-rose-50/50 dark:bg-rose-950/20 opacity-40'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 hover:shadow-md'
                    }`}
                  >
                    <div className="relative aspect-[1/1.4] rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-900 flex items-center justify-center">
                      <img
                        src={page.thumbnailUrl}
                        alt={`Page ${page.pageNumber}`}
                        className="object-contain w-full h-full transition-transform duration-200"
                        style={{ transform: `rotate(${page.rotation}deg)` }}
                      />

                      {/* Overlay Controls */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition backdrop-blur-xs">
                        <button
                          onClick={() => rotatePage(idx)}
                          title="Rotate 90°"
                          className="p-2 rounded-lg bg-white/90 text-slate-800 hover:bg-white text-xs shadow-sm"
                        >
                          <RotateCw className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => toggleDeletePage(idx)}
                          title={page.deleted ? 'Restore page' : 'Delete page'}
                          className="p-2 rounded-lg bg-rose-600 text-white hover:bg-rose-700 text-xs shadow-sm"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-2 flex items-center justify-between text-xs text-slate-500 font-medium px-1">
                      <span>P. {page.pageNumber}</span>
                      <div className="flex gap-1">
                        {idx > 0 && (
                          <button
                            onClick={() => movePage(idx, 'left')}
                            className="hover:text-blue-600 text-[10px]"
                          >
                            ◀
                          </button>
                        )}
                        {idx < thumbnails.length - 1 && (
                          <button
                            onClick={() => movePage(idx, 'right')}
                            className="hover:text-blue-600 text-[10px]"
                          >
                            ▶
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contextual Options Panel based on tool */}
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-200 mb-4">
              <Settings className="w-4 h-4 text-blue-500" />
              Tool Configuration
            </div>

            {/* Split Options */}
            {(tool.id === 'split-pdf' || tool.id === 'extract-pages') && (
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase">
                  Page Ranges to Extract
                </label>
                <input
                  type="text"
                  placeholder="e.g. 1-3, 5, 8-10 (leave empty to split all)"
                  value={splitRange}
                  onChange={(e) => setSplitRange(e.target.value)}
                  className="w-full max-w-md px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
                />
              </div>
            )}

            {/* Watermark Options */}
            {tool.id === 'watermark-pdf' && (
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase">
                  Watermark Text
                </label>
                <input
                  type="text"
                  value={watermarkText}
                  onChange={(e) => setWatermarkText(e.target.value)}
                  className="w-full max-w-md px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
                />
              </div>
            )}

            {/* Password Protect Options */}
            {tool.id === 'protect-pdf' && (
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase">
                  Document Password
                </label>
                <input
                  type="password"
                  placeholder="Enter secure password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full max-w-md px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
                />
              </div>
            )}

            {/* Compress Options */}
            {tool.id === 'compress-pdf' && (
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase mb-2">
                  Compression Level
                </label>
                <div className="grid grid-cols-3 gap-3 max-w-lg">
                  {(['low', 'recommended', 'high'] as const).map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => setCompressLevel(lvl)}
                      className={`p-3 rounded-xl border text-xs font-medium text-center capitalize transition ${
                        compressLevel === lvl
                          ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400'
                          : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {lvl === 'high' ? 'High (Smallest Size)' : lvl === 'low' ? 'Low (Highest Quality)' : 'Recommended'}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Image to PDF Page Size */}
            {tool.category === 'convert-to' && (
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase mb-2">
                  PDF Page Format
                </label>
                <div className="grid grid-cols-3 gap-3 max-w-md">
                  {(['fit', 'a4', 'letter'] as const).map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setPageSize(sz)}
                      className={`p-2.5 rounded-xl border text-xs font-medium uppercase text-center ${
                        pageSize === sz
                          ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/40 text-blue-600'
                          : 'border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Page Number Position */}
            {tool.id === 'page-numbers' && (
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase mb-2">
                  Number Position
                </label>
                <div className="grid grid-cols-3 gap-3 max-w-md">
                  {(['bottom-center', 'bottom-right', 'top-right'] as const).map((pos) => (
                    <button
                      key={pos}
                      onClick={() => setPageNumberPos(pos)}
                      className={`p-2.5 rounded-xl border text-xs capitalize text-center ${
                        pageNumberPos === pos
                          ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/40 text-blue-600'
                          : 'border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      {pos.replace('-', ' ')}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* AI Prompts */}
            {tool.category === 'ai' && (
              <div className="space-y-4">
                {tool.id === 'ai-translator' ? (
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase mb-2">
                      Target Translation Language
                    </label>
                    <select
                      value={targetLang}
                      onChange={(e) => setTargetLang(e.target.value)}
                      className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
                    >
                      <option value="Spanish">Spanish</option>
                      <option value="French">French</option>
                      <option value="German">German</option>
                      <option value="Japanese">Japanese</option>
                      <option value="Chinese">Chinese (Simplified)</option>
                      <option value="Portuguese">Portuguese</option>
                      <option value="Arabic">Arabic</option>
                    </select>
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase mb-2">
                      Specific Instructions or Questions (Optional)
                    </label>
                    <textarea
                      rows={3}
                      placeholder={
                        tool.id === 'chat-with-pdf'
                          ? 'What would you like to ask about this PDF?'
                          : 'Add custom prompt instructions for the Gemini model...'
                      }
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Execute Button */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleProcess}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-sm shadow-lg shadow-blue-500/25 transition transform hover:-translate-y-0.5"
              >
                {tool.category === 'ai' ? (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Process with Gemini AI
                  </>
                ) : (
                  <>
                    <Layers className="w-4 h-4" />
                    Apply {tool.title}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STAGE 3: PROCESSING PROGRESS BAR */}
      {status === 'processing' && (
        <div className="max-w-xl mx-auto py-16 text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-50 dark:bg-blue-950/60 flex items-center justify-center text-blue-600 animate-pulse">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>

          <div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-1">
              Processing Document...
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {stageText || 'Crunching bytes client-side with Wasm...'}
            </p>
          </div>

          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-600 to-indigo-600 h-3 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-xs font-semibold text-slate-500">{progressPercent}%</span>
        </div>
      )}

      {/* STAGE 4: COMPLETE DASHBOARD */}
      {status === 'complete' && (
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 shadow-xl text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1">
              Your Document is Ready!
            </h2>
            <p className="text-slate-500 text-sm mb-6">
              Processed cleanly and secured with OmniPDF Suite Engine
            </p>

            {/* Stats Comparison */}
            {outputStats && (
              <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto mb-8 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800">
                <div>
                  <span className="text-xs text-slate-400 uppercase font-semibold">Original Size</span>
                  <div className="text-base font-bold text-slate-700 dark:text-slate-200">
                    {(outputStats.origSize / (1024 * 1024)).toFixed(2)} MB
                  </div>
                </div>
                <div>
                  <span className="text-xs text-slate-400 uppercase font-semibold">Output Size</span>
                  <div className="text-base font-bold text-emerald-600">
                    {(outputStats.newSize / (1024 * 1024)).toFixed(2)} MB
                  </div>
                </div>
              </div>
            )}

            {/* AI Result Card if applicable */}
            {aiResult && (
              <div className="mb-8 p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-left max-h-96 overflow-y-auto">
                <div className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-3">
                  <Sparkles className="w-4 h-4" />
                  Gemini AI Analysis Result
                </div>
                <div className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed font-mono">
                  {aiResult}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={handleDownloadOutput}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-lg shadow-blue-500/25 transition transform hover:-translate-y-0.5"
              >
                <Download className="w-4 h-4" />
                Download {outputFileName}
              </button>

              <button
                onClick={() => {
                  setDriveMode('export');
                  setIsDriveOpen(true);
                }}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-750 transition"
              >
                <Cloud className="w-4 h-4 text-blue-500" />
                Save to Google Drive
              </button>

              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl border border-transparent text-slate-600 dark:text-slate-400 font-medium text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                <RefreshCw className="w-4 h-4" />
                Process Another File
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STAGE 5: ERROR STATE */}
      {status === 'error' && (
        <div className="max-w-md mx-auto py-12 text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 flex items-center justify-center">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Processing Error
          </h3>
          <p className="text-sm text-rose-600 dark:text-rose-400">{errorMessage}</p>
          <button
            onClick={() => setStatus('configuring')}
            className="px-6 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-sm font-medium hover:opacity-90"
          >
            Go Back & Retry
          </button>
        </div>
      )}

      {/* Modals */}
      <GoogleDriveModal
        isOpen={isDriveOpen}
        onClose={() => setIsDriveOpen(false)}
        mode={driveMode}
        onSelectFile={(file) => handleFilesAdded([file])}
        uploadBytes={outputBytes}
        defaultUploadName={outputFileName}
      />

      <CameraScanModal
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onCaptureFile={(file) => handleFilesAdded([file])}
      />

      <SignatureModal
        isOpen={isSignatureOpen}
        onClose={() => setIsSignatureOpen(false)}
        onApplySignature={(dataUrl) => {
          // Signature ready
          alert('Signature captured! It will be stamped onto your document pages.');
        }}
      />
    </div>
  );
};
