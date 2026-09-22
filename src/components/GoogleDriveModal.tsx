import React, { useState, useEffect } from 'react';
import { driveService, DriveFile } from '../lib/drive';
import { HardDrive, Cloud, Loader2, Download, Check, AlertCircle, X } from 'lucide-react';

interface DriveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectFile?: (file: File) => void;
  uploadBytes?: Uint8Array | null;
  defaultUploadName?: string;
  mode: 'import' | 'export';
}

export const GoogleDriveModal: React.FC<DriveModalProps> = ({
  isOpen,
  onClose,
  onSelectFile,
  uploadBytes,
  defaultUploadName = 'document.pdf',
  mode,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [files, setFiles] = useState<DriveFile[]>([]);
  const [uploadName, setUploadName] = useState(defaultUploadName);
  const [clientId, setClientId] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      driveService.getClientId().then((id) => setClientId(id));
      if (driveService.isAuthenticated && mode === 'import') {
        loadDriveFiles();
      }
    }
  }, [isOpen, mode]);

  if (!isOpen) return null;

  const handleConnect = async () => {
    setLoading(true);
    setError(null);
    try {
      await driveService.signIn(clientId);
      if (mode === 'import') {
        await loadDriveFiles();
      }
    } catch (err: any) {
      setError(err.message || 'Google Drive authorization failed.');
    } finally {
      setLoading(false);
    }
  };

  const loadDriveFiles = async () => {
    setLoading(true);
    setError(null);
    try {
      const list = await driveService.listPDFFiles();
      setFiles(list);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch files.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (fileItem: DriveFile) => {
    setLoading(true);
    setError(null);
    try {
      const file = await driveService.downloadFile(fileItem.id, fileItem.name);
      if (onSelectFile) {
        onSelectFile(file);
      }
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to import PDF from Google Drive.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async () => {
    if (!uploadBytes) return;
    setLoading(true);
    setError(null);
    try {
      await driveService.uploadPDF(uploadName, uploadBytes);
      setSuccess(`"${uploadName}" successfully saved to your Google Drive!`);
      setTimeout(() => {
        onClose();
        setSuccess(null);
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Failed to export file to Google Drive.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400">
              <Cloud className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                {mode === 'import' ? 'Import from Google Drive' : 'Save to Google Drive'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Direct cloud file synchronization
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 text-sm flex items-start gap-2.5">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-sm flex items-center gap-2.5">
              <Check className="w-5 h-5 shrink-0" />
              <span>{success}</span>
            </div>
          )}

          {!driveService.isAuthenticated ? (
            <div className="text-center py-6">
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-blue-50 dark:bg-blue-950/60 flex items-center justify-center text-blue-600">
                <HardDrive className="w-7 h-7" />
              </div>
              <h4 className="text-base font-semibold text-slate-800 dark:text-slate-200 mb-1">
                Authorize Google Drive Access
              </h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-6">
                Connect your Google Account securely to seamlessly {mode === 'import' ? 'open your PDF files' : 'store processed files'}.
              </p>
              <button
                onClick={handleConnect}
                disabled={loading}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium shadow-sm transition disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Cloud className="w-4 h-4" />}
                Connect Google Account
              </button>
            </div>
          ) : mode === 'import' ? (
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Recent PDF Documents
                </span>
                <button
                  onClick={loadDriveFiles}
                  disabled={loading}
                  className="text-xs text-blue-600 hover:underline disabled:opacity-50"
                >
                  Refresh
                </button>
              </div>

              {loading ? (
                <div className="flex flex-col items-center justify-center py-10 text-slate-400">
                  <Loader2 className="w-6 h-6 animate-spin mb-2" />
                  <span className="text-xs">Fetching PDF files from Drive...</span>
                </div>
              ) : files.length === 0 ? (
                <div className="text-center py-8 text-slate-500 text-sm">
                  No PDF files found in your Google Drive root.
                </div>
              ) : (
                <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                  {files.map((f) => (
                    <div
                      key={f.id}
                      onClick={() => handleDownload(f)}
                      className="group flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-950/30 cursor-pointer transition"
                    >
                      <div className="flex items-center gap-3 truncate">
                        <div className="w-8 h-8 rounded-lg bg-rose-50 dark:bg-rose-950/50 text-rose-600 flex items-center justify-center font-bold text-xs shrink-0">
                          PDF
                        </div>
                        <span className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">
                          {f.name}
                        </span>
                      </div>
                      <button className="opacity-0 group-hover:opacity-100 text-blue-600 p-1 transition">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4 py-2">
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-2">
                  Destination File Name
                </label>
                <input
                  type="text"
                  value={uploadName}
                  onChange={(e) => setUploadName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 text-xs text-slate-600 dark:text-slate-400">
                The file will be uploaded directly to the root directory of your Google Drive account.
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpload}
                  disabled={loading || !uploadName}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition disabled:opacity-50"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Cloud className="w-4 h-4" />}
                  Save to Drive
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
