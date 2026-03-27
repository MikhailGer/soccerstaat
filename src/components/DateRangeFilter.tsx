import { useState } from 'react'

interface DateRangeFilterProps {
  appliedDateFrom?: string
  appliedDateTo?: string
  onApply: (dateRange: { dateFrom?: string; dateTo?: string }) => void
}

export function DateRangeFilter({
  appliedDateFrom,
  appliedDateTo,
  onApply,
}: DateRangeFilterProps) {
  const [dateFrom, setDateFrom] = useState(appliedDateFrom ?? '')
  const [dateTo, setDateTo] = useState(appliedDateTo ?? '')

  const isIncomplete = Boolean((dateFrom && !dateTo) || (!dateFrom && dateTo))
  const isInvalidRange = Boolean(dateFrom && dateTo && dateFrom > dateTo)

  function syncDateRange(nextDateFrom: string, nextDateTo: string) {
    if (!nextDateFrom && !nextDateTo) {
      onApply({})
      return
    }

    if (!nextDateFrom || !nextDateTo || nextDateFrom > nextDateTo) {
      return
    }

    onApply({
      dateFrom: nextDateFrom,
      dateTo: nextDateTo,
    })
  }

  return (
    <form className="date-filter">
      <div className="date-filter__inline">
        <label className="date-filter__inline-label" htmlFor="date-from">
          Матчи с
        </label>
        <label className="date-filter__field date-filter__field--inline">
          <input
            id="date-from"
            type="date"
            value={dateFrom}
            onChange={(event) => {
              const nextValue = event.target.value
              setDateFrom(nextValue)
              syncDateRange(nextValue, dateTo)
            }}
          />
        </label>

        <span className="date-filter__inline-separator">по</span>
        <label className="date-filter__field date-filter__field--inline">
          <input
            id="date-to"
            type="date"
            value={dateTo}
            onChange={(event) => {
              const nextValue = event.target.value
              setDateTo(nextValue)
              syncDateRange(dateFrom, nextValue)
            }}
          />
        </label>
      </div>

      <p className="date-filter__hint">
        {isIncomplete
          ? 'Для фильтрации по API заполни обе даты.'
          : isInvalidRange
            ? 'Дата "с" должна быть раньше или равна дате "по".'
            : 'Очисти обе даты, чтобы снова показать все доступные матчи.'}
      </p>
    </form>
  )
}
