import clsx from 'clsx'

// Mapa de variantes: cada valor da prop "variant" vira um conjunto de classes.
// As classes ficam escritas por completo para o Tailwind conseguir encontrá-las.
const variantes = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-300',
  secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-300',
  success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-300',
  danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-300',
  outline:
    'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-300',
}

const tamanhos = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
}

function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  type = 'button',
  onClick,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        'rounded-lg font-semibold transition-colors focus:outline-none focus:ring-4',
        variantes[variant],
        tamanhos[size],
        disabled && 'cursor-not-allowed opacity-50',
      )}
    >
      {children}
    </button>
  )
}

export default Button
