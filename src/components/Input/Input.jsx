import clsx from 'clsx'

function Input({
  id,
  name,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
}) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={clsx(
          'rounded-lg border px-3 py-2 outline-none transition focus:ring-4',
          error
            ? 'border-2 border-red-500 bg-red-50 focus:ring-red-200'
            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200',
        )}
      />
      {error && (
        <span className="text-sm font-medium text-red-600">⚠ {error}</span>
      )}
    </div>
  )
}

export default Input
