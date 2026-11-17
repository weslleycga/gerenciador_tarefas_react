import clsx from 'clsx'

// Filho 2: recebe o ARRAY de tarefas e as funções para alterar/remover.
// Ele não guarda as tarefas: só exibe o que o pai mandou.
function Lista({ tarefas, onAlternar, onRemover }) {
  if (tarefas.length === 0) {
    return (
      <p className="rounded-lg bg-gray-50 p-6 text-center text-gray-500">
        Nenhuma tarefa por aqui. 🎉
      </p>
    )
  }

  return (
    <ul className="divide-y divide-gray-100">
      {tarefas.map((tarefa) => (
        <li key={tarefa.id} className="flex items-center gap-3 py-3">
          <input
            type="checkbox"
            id={`tarefa-${tarefa.id}`}
            checked={tarefa.concluida}
            onChange={() => onAlternar(tarefa.id)}
            className="h-5 w-5 cursor-pointer accent-green-600"
          />
          <label
            htmlFor={`tarefa-${tarefa.id}`}
            className={clsx(
              'flex-1 cursor-pointer',
              tarefa.concluida && 'text-gray-400 line-through',
            )}
          >
            {tarefa.texto}
          </label>
          <button
            type="button"
            onClick={() => onRemover(tarefa.id)}
            className="rounded px-2 py-1 text-red-500 hover:bg-red-50 hover:text-red-700"
            aria-label={`Remover tarefa ${tarefa.texto}`}
          >
            🗑️
          </button>
        </li>
      ))}
    </ul>
  )
}

export default Lista
