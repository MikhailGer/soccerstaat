interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

type PaginationItem = number | 'ellipsis'

function getPaginationItems(currentPage: number, totalPages: number): PaginationItem[] {
  if (totalPages <= 6) {
    return Array.from({ length: totalPages }, (_, index) => index + 1)
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, 6, 'ellipsis']
  }

  if (currentPage >= totalPages - 3) {
    return [
      'ellipsis',
      totalPages - 5,
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ]
  }

  return [
    'ellipsis',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    'ellipsis',
  ]
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null
  }

  return (
    <nav className="pagination" aria-label="Пагинация">
      <div className="pagination__pages">
        <button
          type="button"
          className="pagination__nav"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Предыдущая страница"
        >
          ‹
        </button>

        {getPaginationItems(currentPage, totalPages).map((item, index) =>
          item === 'ellipsis' ? (
            <span
              key={`ellipsis-${index}`}
              className="pagination__ellipsis"
              aria-hidden="true"
            >
              ...
            </span>
          ) : (
            <button
              key={item}
              type="button"
              className={
                item === currentPage
                  ? 'pagination__page pagination__page--active'
                  : 'pagination__page'
              }
              onClick={() => onPageChange(item)}
              aria-current={item === currentPage ? 'page' : undefined}
            >
              {item}
            </button>
          ),
        )}

        <button
          type="button"
          className="pagination__nav"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Следующая страница"
        >
          ›
        </button>
      </div>
    </nav>
  )
}
