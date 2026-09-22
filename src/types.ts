export type ToolCategory =
  | 'organize'
  | 'convert-to'
  | 'convert-from'
  | 'optimize'
  | 'security'
  | 'edit'
  | 'ai'
  | 'utilities';

export interface ToolConfig {
  id: string;
  slug: string;
  title: string;
  category: ToolCategory;
  icon: string;
  description: string;
  acceptedFileTypes: string[];
  maxFiles: number;
  clientSideOnly: boolean;
  featured?: boolean;
  badge?: string;
}

export interface CategoryMeta {
  id: ToolCategory;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export const CATEGORIES: CategoryMeta[] = [
  {
    id: 'organize',
    name: 'Organize PDF',
    description: 'Merge, split, rotate, remove, reorder, crop, and restructure pages',
    icon: 'Layers',
    color: 'emerald',
  },
  {
    id: 'convert-to',
    name: 'Convert to PDF',
    description: 'Transform Word, Excel, PowerPoint, images, and text documents into PDF',
    icon: 'FileUp',
    color: 'blue',
  },
  {
    id: 'convert-from',
    name: 'Convert from PDF',
    description: 'Extract PDF content into Word, images, Excel, Markdown, CSV, and text',
    icon: 'FileDown',
    color: 'indigo',
  },
  {
    id: 'optimize',
    name: 'Optimize & OCR',
    description: 'Compress, convert to grayscale, run OCR, repair, and clean documents',
    icon: 'Zap',
    color: 'amber',
  },
  {
    id: 'security',
    name: 'Security & Sign',
    description: 'Protect with passwords, unlock, e-sign, watermark, redact, and sanitize',
    icon: 'ShieldCheck',
    color: 'rose',
  },
  {
    id: 'edit',
    name: 'Edit & Forms',
    description: 'Add page numbers, headers, annotations, fill forms, stamp Bates numbers',
    icon: 'PenTool',
    color: 'violet',
  },
  {
    id: 'ai',
    name: 'AI Intelligence',
    description: 'Summarize, translate, chat with PDF, compare docs, and generate quizzes',
    icon: 'Sparkles',
    color: 'teal',
  },
  {
    id: 'utilities',
    name: 'Utilities & Layouts',
    description: 'N-Up layout, booklet creator, split half, camera scan, margins, metadata',
    icon: 'Wrench',
    color: 'cyan',
  },
];

export interface PageThumbnail {
  pageNumber: number;
  originalIndex: number;
  thumbnailUrl: string;
  rotation: number;
  deleted?: boolean;
}

export interface WorkspaceFile {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  pageCount?: number;
  thumbnails?: PageThumbnail[];
}

export type WorkspaceStatus = 'idle' | 'configuring' | 'processing' | 'complete' | 'error';
