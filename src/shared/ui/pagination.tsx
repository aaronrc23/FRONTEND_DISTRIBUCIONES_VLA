import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../../lib/utils";

interface PaginationProps {
  currentPage: number;
  lastPage: number;
  total: number;
  onPageChange: (page: number) => void;
  className?: string;
}

/**
 * Reusable Pagination component.
 * Renders a horizontal set of page buttons with prev/next arrows.
 */
export default function Pagination({
  currentPage,
  lastPage,
  total,
  onPageChange,
  className,
}: PaginationProps) {
  if (lastPage <= 1) return null;

  const getPageNumbers = (): (number | "ellipsis")[] => {
    const pages: (number | "ellipsis")[] = [];
    const delta = 1; // pages around current

    const rangeStart = Math.max(2, currentPage - delta);
    const rangeEnd = Math.min(lastPage - 1, currentPage + delta);

    pages.push(1);

    if (rangeStart > 2) {
      pages.push("ellipsis");
    }

    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i);
    }

    if (rangeEnd < lastPage - 1) {
      pages.push("ellipsis");
    }

    if (lastPage > 1) {
      pages.push(lastPage);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  const btnBase =
    "flex items-center justify-center min-w-[36px] h-9 px-2 text-sm font-medium rounded-lg transition-all duration-200 select-none";

  return (
    <nav
      aria-label="Paginación"
      className={cn("flex items-center justify-center gap-1.5 py-6", className)}
    >
      {/* Anterior */}
      <button
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Página anterior"
        className={cn(
          btnBase,
          "gap-1 text-muted-foreground hover:bg-accent hover:text-accent-foreground",
          "disabled:opacity-30 disabled:pointer-events-none"
        )}
      >
        <ChevronLeft className="size-4" />
        <span className="hidden sm:inline">Anterior</span>
      </button>

      {/* Números de página */}
      {pageNumbers.map((page, idx) =>
        page === "ellipsis" ? (
          <span
            key={`ellipsis-${idx}`}
            className="flex items-center justify-center w-9 h-9 text-sm text-muted-foreground"
          >
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            aria-current={page === currentPage ? "page" : undefined}
            aria-label={`Página ${page}`}
            className={cn(
              btnBase,
              page === currentPage
                ? "bg-shoprimary text-white shadow-sm shadow-shoprimary/30 font-semibold"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            {page}
          </button>
        )
      )}

      {/* Siguiente */}
      <button
        disabled={currentPage >= lastPage}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Página siguiente"
        className={cn(
          btnBase,
          "gap-1 text-muted-foreground hover:bg-accent hover:text-accent-foreground",
          "disabled:opacity-30 disabled:pointer-events-none"
        )}
      >
        <span className="hidden sm:inline">Siguiente</span>
        <ChevronRight className="size-4" />
      </button>

      {/* Total de resultados */}
      <span className="ml-3 text-xs text-muted-foreground hidden sm:inline">
        {total} producto{total !== 1 ? "s" : ""}
      </span>
    </nav>
  );
}
