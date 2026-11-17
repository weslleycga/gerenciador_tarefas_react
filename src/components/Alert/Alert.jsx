import clsx from 'clsx'

// Cada variante muda a cor de fundo, do texto e da borda
const variantes = {
  success: {
    classes: 'bg-green-100 text-green-800 border-green-500',
    icone: '✅',
    tituloPadrao: 'Sucesso!',
  },
  error: {
    classes: 'bg-red-100 text-red-800 border-red-500',
    icone: '❌',
    tituloPadrao: 'Erro!',
  },
  warning: {
    classes: 'bg-yellow-100 text-yellow-800 border-yellow-500',
    icone: '⚠️',
    tituloPadrao: 'Atenção!',
  },
}

function Alert({ variant = 'success', title, children }) {
  const estilo = variantes[variant] ?? variantes.success

  return (
    <div
      role="alert"
      className={clsx('flex gap-3 rounded-lg border-l-4 p-4', estilo.classes)}
    >
      <span aria-hidden="true">{estilo.icone}</span>
      <div>
        <p className="font-bold">{title ?? estilo.tituloPadrao}</p>
        <p className="text-sm">{children}</p>
      </div>
    </div>
  )
}

export default Alert
