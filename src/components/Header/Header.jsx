function Header({ pendentes }) {
  return (
    <header className="bg-gray-900 px-6 py-6">
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-sky-400">Gerenciador de Tarefas</h1>
          <p className="text-sm text-gray-300">Lifting state up + useEffect</p>
        </div>
        <span className="rounded-full bg-sky-500 px-4 py-1.5 text-sm font-bold text-white">
          {pendentes} {pendentes === 1 ? 'pendente' : 'pendentes'}
        </span>
      </div>
    </header>
  )
}

export default Header
