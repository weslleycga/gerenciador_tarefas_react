import clsx from 'clsx'

const cores = {
  blue: 'bg-blue-100 text-blue-800',
  green: 'bg-green-100 text-green-800',
  red: 'bg-red-100 text-red-800',
  yellow: 'bg-yellow-100 text-yellow-800',
  gray: 'bg-gray-100 text-gray-800',
}

function Badge({ children, color = 'blue', rounded = true }) {
  return (
    <span
      className={clsx(
        'inline-block px-2.5 py-0.5 text-xs font-semibold',
        cores[color],
        rounded ? 'rounded-full' : 'rounded',
      )}
    >
      {children}
    </span>
  )
}

export default Badge
