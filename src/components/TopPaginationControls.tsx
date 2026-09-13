import React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Flame,
  Sparkles,
  Layers,
  ArrowUpRight
} from 'lucide-react';

interface TopPaginationControlsProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange?: (limit: number) => void;
  sortBy?: string;
  onSortChange?: (sort: string) => void;
  position?: 'top' | 'bottom';
  accentTitle?: string;
}

export const TopPaginationControls: React.FC<TopPaginationControlsProps> = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  position = 'top',
  accentTitle
}) => {
  // Generate smart page numbers (e.g. 1, 2, 3, 4 ... 42)
  const getPageNumbers = (): (number | string)[] => {
    if (totalPages <= 7) {
      return Array.from({ length: Math.max(1, totalPages) }, (_, i) => i + 1);
    }

    const pages: (number | string)[] = [1];

    if (currentPage > 3) {
      pages.push('dots-left');
    }

    const start = Math.max(2, Math.min(currentPage - 1, totalPages - 3));
    const end = Math.min(totalPages - 1, Math.max(currentPage + 1, 4));

    for (let i = start; i <= end; i++) {
      if (!pages.includes(i)) {
        pages.push(i);
      }
    }

    if (currentPage < totalPages - 2 && !pages.includes('dots-right')) {
      pages.push('dots-right');
    }

    if (!pages.includes(totalPages)) {
      pages.push(totalPages);
    }

    return pages;
  };

  const startIndex = totalItems > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0;
  const endIndex = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div
      id={`pagination-bar-${position}`}
      className={`w-full bg-gradient-to-r from-[#1C1C1C] via-[#181818] to-[#1C1C1C] border-2 border-[#C5A059]/40 p-4 sm:p-5 rounded-none shadow-2xl flex flex-wrap items-center justify-between gap-4 relative z-10 ${
        position === 'top' ? 'mb-8 border-l-8 border-l-[#C5A059]' : 'mt-12'
      }`}
    >
      {/* Top Banner Accent */}
      <div className="absolute top-0 right-6 -translate-y-1/2 bg-[#C5A059] text-black font-mono font-bold text-[9px] uppercase tracking-widest px-3 py-0.5 shadow-md flex items-center space-x-1">
        <Layers className="w-3 h-3" />
        <span>NAVIGATION BAR • {position.toUpperCase()}</span>
      </div>

      {/* Left: Prominent Page Counter & Showing Range */}
      <div className="flex flex-wrap items-center gap-3 sm:gap-4">
        {/* Large Page Number Pill */}
        <div className="flex items-center space-x-2 bg-black/80 border border-[#C5A059]/60 px-3 py-1.5 shadow-inner">
          <span className="text-[11px] uppercase tracking-widest text-[#C5A059] font-mono font-bold">
            PAGE
          </span>
          <span className="px-2.5 py-0.5 bg-[#C5A059] text-black font-mono font-extrabold text-sm shadow">
            {currentPage}
          </span>
          <span className="text-[11px] uppercase tracking-widest text-[#F5F5F0]/80 font-mono">
            OF <strong className="text-white font-bold">{Math.max(1, totalPages)}</strong>
          </span>
        </div>

        <div className="text-xs text-[#F5F5F0]/80 flex items-center space-x-1.5">
          <span>Displaying</span>
          <span className="px-1.5 py-0.5 bg-[#252525] border border-[#F5F5F0]/20 text-[#C5A059] font-mono font-bold">
            {startIndex}–{endIndex}
          </span>
          <span>of</span>
          <span className="font-mono text-white font-bold">{totalItems}</span>
          <span>specimens</span>
        </div>

        {currentPage === 1 && (
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-amber-950/90 border border-amber-400 text-amber-300 text-[10px] uppercase tracking-widest font-bold shadow-md">
            <Flame className="w-3.5 h-3.5 text-amber-400 fill-current animate-pulse" />
            <span>PAGE 1: HOTTEST & MOST ATTRACTIVE FIRST</span>
          </span>
        )}
      </div>

      {/* Right: Interactive Page Number Buttons */}
      <div className="flex items-center flex-wrap gap-1.5 sm:gap-2">
        {/* First Page */}
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          aria-label="First page"
          title="Jump to Page 1"
          className="px-2.5 py-1.5 bg-[#242424] hover:bg-[#C5A059] hover:text-black border border-[#F5F5F0]/20 text-xs text-[#F5F5F0] disabled:opacity-30 disabled:pointer-events-none transition-all font-mono font-bold flex items-center space-x-1"
        >
          <ChevronsLeft className="w-3.5 h-3.5" />
          <span className="hidden sm:inline text-[10px] uppercase">First</span>
        </button>

        {/* Previous Page */}
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          aria-label="Previous page"
          title="Previous page"
          className="px-3 py-1.5 bg-[#242424] hover:bg-[#C5A059] hover:text-black border border-[#F5F5F0]/20 text-xs text-[#F5F5F0] disabled:opacity-30 disabled:pointer-events-none flex items-center space-x-1 transition-all font-mono font-bold"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span className="text-[10px] uppercase tracking-wider">Prev</span>
        </button>

        {/* Numeric Page Buttons */}
        <div className="flex items-center space-x-1 bg-black/60 p-1 border border-[#F5F5F0]/15">
          {getPageNumbers().map((num, idx) => {
            if (typeof num === 'string') {
              return (
                <span key={`dots-${position}-${idx}`} className="px-2 py-1 text-xs text-[#F5F5F0]/40 font-mono select-none">
                  …
                </span>
              );
            }

            const pageNum = num;
            const isActive = pageNum === currentPage;

            return (
              <button
                key={`page-btn-${position}-${pageNum}`}
                onClick={() => onPageChange(pageNum)}
                aria-label={`Go to page ${pageNum}`}
                aria-current={isActive ? 'page' : undefined}
                className={`min-w-[34px] h-[32px] text-xs font-mono font-bold transition-all flex items-center justify-center ${
                  isActive
                    ? 'bg-[#C5A059] text-black font-extrabold shadow-lg ring-2 ring-[#C5A059]'
                    : pageNum === 1
                    ? 'bg-amber-950/70 text-amber-300 border border-amber-500/50 hover:bg-amber-800 hover:text-white'
                    : 'bg-[#222222] hover:bg-[#333333] text-[#F5F5F0]/80 hover:text-white border border-[#F5F5F0]/10'
                }`}
              >
                {pageNum === 1 ? '1 🔥' : pageNum}
              </button>
            );
          })}
        </div>

        {/* Next Page */}
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages || totalPages === 0}
          aria-label="Next page"
          title="Next page"
          className="px-3 py-1.5 bg-[#242424] hover:bg-[#C5A059] hover:text-black border border-[#F5F5F0]/20 text-xs text-[#F5F5F0] disabled:opacity-30 disabled:pointer-events-none flex items-center space-x-1 transition-all font-mono font-bold"
        >
          <span className="text-[10px] uppercase tracking-wider">Next</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>

        {/* Last Page */}
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages || totalPages === 0}
          aria-label="Last page"
          title="Last page"
          className="px-2.5 py-1.5 bg-[#242424] hover:bg-[#C5A059] hover:text-black border border-[#F5F5F0]/20 text-xs text-[#F5F5F0] disabled:opacity-30 disabled:pointer-events-none transition-all font-mono font-bold flex items-center space-x-1"
        >
          <span className="hidden sm:inline text-[10px] uppercase">Last</span>
          <ChevronsRight className="w-3.5 h-3.5" />
        </button>

        {/* Items Per Page Selector */}
        {onItemsPerPageChange && (
          <div className="ml-2 flex items-center space-x-1.5 text-xs bg-black/60 px-2 py-1 border border-[#F5F5F0]/15">
            <span className="text-[10px] uppercase text-[#C5A059] font-mono font-bold hidden sm:inline">Per page:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
              aria-label="Items per page"
              className="bg-[#1E1E1E] border border-[#F5F5F0]/20 text-xs text-white px-2 py-0.5 font-mono focus:outline-none focus:border-[#C5A059] cursor-pointer"
            >
              <option value={9}>9 / page</option>
              <option value={12}>12 / page</option>
              <option value={18}>18 / page</option>
              <option value={24}>24 / page</option>
              <option value={48}>48 / page</option>
            </select>
          </div>
        )}
      </div>
    </div>
  );
};

