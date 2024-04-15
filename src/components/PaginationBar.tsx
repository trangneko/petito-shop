import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function PaginationBar({
  currentPage,
  totalPages,
}: PaginationProps) {
  const maxPage = Math.min(totalPages, Math.max(currentPage + 4, 7));
  const minPage = Math.max(1, Math.min(currentPage - 5, 6));

  const numberedPageItems: JSX.Element[] = [];

  for (let page = minPage; page <= maxPage; page++) {
    numberedPageItems.push(
      <PaginationLink
        href={"?page=" + page}
        key={page}
        isActive={currentPage === page ? true : false}
      >
        {page}
      </PaginationLink>
    );
  }
  return (
    <Pagination>
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationLink href={"?pages=" + (currentPage - 1)}>←</PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>{numberedPageItems}</PaginationItem>
        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationLink href={"?pages=" + (currentPage + 1)}>→</PaginationLink>
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
