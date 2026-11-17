import clsx from 'clsx'

const opcoes = [
  { valor: 'todas', rotulo: 'Todas' },
  { valor: 'pendentes', rotulo: 'Pendentes' },
  { valor: 'concluidas', rotulo: 'Concluídas' },
]

// O filtro escolhido também é estado do pai: este componente só
// mostra qual está ativo e avisa o pai quando o usuário troca.
function Filtros({ filtroAtual, onMudarFiltro, contagem }) {
  return (
    <div className="flex flex-wrap gap-2">
      {opcoes.map((opcao) => (
        <button
          key={opcao.valor}
          type="button"
          onClick={() => onMudarFiltro(opcao.valor)}
          className={clsx(
            'rounded-full px-4 py-1.5 text-sm font-semibold transition',
            filtroAtual === opcao.valor
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
          )}
        >
          {opcao.rotulo} ({contagem[opcao.valor]})
        </button>
      ))}
    </div>
  )
}

export default Filtros
