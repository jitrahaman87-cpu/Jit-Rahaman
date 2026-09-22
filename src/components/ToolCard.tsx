import React from 'react';
import { ToolConfig } from '../types';
import {
  Combine,
  Scissors,
  Trash2,
  FileOutput,
  ArrowUpDown,
  RotateCw,
  Crop,
  Maximize2,
  Copy,
  Layers,
  FileText,
  FileSpreadsheet,
  Presentation,
  Image,
  ImagePlus,
  FileImage,
  Smartphone,
  BookOpen,
  Code2,
  AlignLeft,
  FileType2,
  Table,
  Sliders,
  Images,
  FileCode,
  Globe,
  Book,
  Archive,
  ImageDown,
  Table2,
  Minimize2,
  Moon,
  Activity,
  Eye,
  Grid,
  Compass,
  Lock,
  Unlock,
  SquareSlash,
  Stamp,
  FileSignature,
  ShieldAlert,
  ShieldOff,
  BadgeCheck,
  Type,
  Edit3,
  Highlighter,
  Binary,
  CheckSquare,
  FormInput,
  PanelTop,
  Hash,
  Paperclip,
  FolderDown,
  Sparkles,
  Languages,
  MessageSquare,
  GitCompare,
  GraduationCap,
  ScanLine,
  LayoutGrid,
  BookMarked,
  Columns2,
  ArrowDownUp,
  Contrast,
  Camera,
  Minimize,
  Info,
} from 'lucide-react';

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Combine,
  Scissors,
  Trash2,
  FileOutput,
  ArrowUpDown,
  RotateCw,
  Crop,
  Maximize2,
  Copy,
  Layers,
  FileText,
  FileSpreadsheet,
  Presentation,
  Image,
  ImagePlus,
  FileImage,
  Smartphone,
  BookOpen,
  Code2,
  AlignLeft,
  FileType2,
  Table,
  Sliders,
  Images,
  FileCode,
  Globe,
  Book,
  Archive,
  ImageDown,
  Table2,
  Minimize2,
  Moon,
  Activity,
  Eye,
  Grid,
  Compass,
  Lock,
  Unlock,
  SquareSlash,
  Stamp,
  FileSignature,
  ShieldAlert,
  ShieldOff,
  BadgeCheck,
  Type,
  Edit3,
  Highlighter,
  Binary,
  CheckSquare,
  FormInput,
  PanelTop,
  Hash,
  Paperclip,
  FolderDown,
  Sparkles,
  Languages,
  MessageSquare,
  GitCompare,
  GraduationCap,
  ScanLine,
  LayoutGrid,
  BookMarked,
  Columns2,
  ArrowDownUp,
  Contrast,
  Camera,
  Minimize,
  Info,
};

interface ToolCardProps {
  tool: ToolConfig;
  onClick: () => void;
}

export const ToolCard: React.FC<ToolCardProps> = ({ tool, onClick }) => {
  const IconComponent = ICON_MAP[tool.icon] || Layers;

  return (
    <div
      onClick={onClick}
      className="group relative flex flex-col justify-between p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-blue-500/60 dark:hover:border-blue-500/60 shadow-xs hover:shadow-lg hover:shadow-blue-500/5 hover:-translate-y-1 transition-all duration-200 cursor-pointer overflow-hidden"
    >
      <div>
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition flex items-center justify-center">
            <IconComponent className="w-5 h-5" />
          </div>

          {tool.badge && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200/50 dark:border-blue-800/40">
              {tool.badge}
            </span>
          )}
        </div>

        <h3 className="font-semibold text-sm text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition mb-1">
          {tool.title}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
          {tool.description}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[11px] font-medium text-slate-400">
        <span className="capitalize">{tool.category.replace('-', ' ')}</span>
        <span className="text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition">
          Launch →
        </span>
      </div>
    </div>
  );
};
