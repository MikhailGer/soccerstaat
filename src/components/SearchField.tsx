interface SearchFieldProps {
  label: string
  placeholder: string
  value: string
  onChange: (value: string) => void
  className?: string
  hideLabel?: boolean
}

export function SearchField({
  label,
  placeholder,
  value,
  onChange,
  className,
  hideLabel = false,
}: SearchFieldProps) {
  return (
    <label className={className ? `search-field ${className}` : 'search-field'}>
      <span className={hideLabel ? 'search-field__label sr-only' : 'search-field__label'}>
        {label}
      </span>

      <span className="search-field__control">
        <span className="search-field__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" focusable="false">
            <path
              d="M10.5 5a5.5 5.5 0 1 0 0 11a5.5 5.5 0 0 0 0-11Zm0-2a7.5 7.5 0 1 1 4.73 13.33l4.22 4.22l-1.42 1.41l-4.22-4.22A7.5 7.5 0 0 1 10.5 3Z"
              fill="currentColor"
            />
          </svg>
        </span>

        <input
          type="search"
          className="search-field__input"
          placeholder={placeholder}
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />

        {value ? (
          <button
            type="button"
            className="search-field__clear"
            aria-label="Очистить поиск"
            onClick={() => onChange('')}
          >
            <svg viewBox="0 0 24 24" focusable="false">
              <path
                d="M6.7 5.3L12 10.6l5.3-5.3l1.4 1.4L13.4 12l5.3 5.3l-1.4 1.4L12 13.4l-5.3 5.3l-1.4-1.4l5.3-5.3l-5.3-5.3l1.4-1.4Z"
                fill="currentColor"
              />
            </svg>
          </button>
        ) : null}
      </span>
    </label>
  )
}
