import { useEffect, useState } from 'react'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import ExercicioLifting from './components/ExercicioLifting/ExercicioLifting'
import Formulario from './components/Formulario/Formulario'
import Filtros from './components/Filtros/Filtros'
import Lista from './components/Lista/Lista'
import TempoAberto from './components/TempoAberto/TempoAberto'
import Button from './components/Button/Button'

const CHAVE_STORAGE = 'gerenciador-tarefas'

const tarefasIniciais = [
  { id: 1, texto: 'Estudar useState', concluida: true },
  { id: 2, texto: 'Entender lifting state up', concluida: false },
  { id: 3, texto: 'Praticar useEffect com timer', concluida: false },
]

// Lê as tarefas salvas no navegador (ou usa as iniciais na primeira visita)
function carregarTarefas() {
  try {
    const salvas = localStorage.getItem(CHAVE_STORAGE)
    return salvas ? JSON.parse(salvas) : tarefasIniciais
  } catch {
    return tarefasIniciais
  }
}

function App() {
  // ESTADO NO PAI: a lista de tarefas é compartilhada por Formulario,
  // Filtros, Lista e Header, então ela mora no ancestral comum (App)
  const [tarefas, setTarefas] = useState(carregarTarefas)
  const [filtro, setFiltro] = useState('todas')
  const [mostrarTimer, setMostrarTimer] = useState(true)

  // ---------- Funções que os filhos chamam (eventos para cima) ----------
  function adicionarTarefa(texto) {
    const nova = { id: Date.now(), texto, concluida: false }
    setTarefas((anteriores) => [...anteriores, nova])
  }

  function alternarTarefa(id) {
    setTarefas((anteriores) =>
      anteriores.map((tarefa) =>
        tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa,
      ),
    )
  }

  function removerTarefa(id) {
    setTarefas((anteriores) => anteriores.filter((tarefa) => tarefa.id !== id))
  }

  function limparConcluidas() {
    setTarefas((anteriores) => anteriores.filter((tarefa) => !tarefa.concluida))
  }

  // ---------- Valores derivados (calculados a partir do estado) ----------
  const pendentes = tarefas.filter((tarefa) => !tarefa.concluida).length
  const concluidas = tarefas.length - pendentes

  const tarefasVisiveis = tarefas.filter((tarefa) => {
    if (filtro === 'pendentes') return !tarefa.concluida
    if (filtro === 'concluidas') return tarefa.concluida
    return true
  })

  // ---------- PARTE 2: useEffect que atualiza o título da aba ----------
  // Roda depois da renderização, e SÓ quando "pendentes" muda.
  useEffect(() => {
    document.title =
      pendentes === 0
        ? '✅ Tudo feito! | Tarefas'
        : `(${pendentes}) ${pendentes === 1 ? 'tarefa pendente' : 'tarefas pendentes'}`
  }, [pendentes])

  // ---------- Extra: useEffect que salva as tarefas no navegador ----------
  useEffect(() => {
    localStorage.setItem(CHAVE_STORAGE, JSON.stringify(tarefas))
  }, [tarefas])

  return (
    <>
      <Header pendentes={pendentes} />

      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-8 px-4 pt-8">
        <ExercicioLifting />

        <section className="rounded-xl bg-white p-6 shadow-md">
          <h2 className="text-xl font-bold">Parte 2 – Minhas tarefas</h2>
          <p className="mb-4 mt-1 text-sm text-gray-500">
            Olhe o título da aba do navegador: ele muda sempre que o número de
            tarefas pendentes muda.
          </p>

          <Formulario onAdicionar={adicionarTarefa} />

          <div className="my-5 flex flex-wrap items-center justify-between gap-3">
            <Filtros
              filtroAtual={filtro}
              onMudarFiltro={setFiltro}
              contagem={{ todas: tarefas.length, pendentes, concluidas }}
            />
            {concluidas > 0 && (
              <Button variant="outline" size="sm" onClick={limparConcluidas}>
                Limpar concluídas
              </Button>
            )}
          </div>

          <Lista
            tarefas={tarefasVisiveis}
            onAlternar={alternarTarefa}
            onRemover={removerTarefa}
          />
        </section>

        <section className="rounded-xl bg-white p-6 shadow-md">
          <h2 className="text-xl font-bold">Parte 3 – Tempo com a página aberta</h2>
          <p className="mb-4 mt-1 text-sm text-gray-500">
            Um <code>setInterval</code> dentro do <code>useEffect</code> soma 1
            segundo por vez. Clique em &quot;Esconder timer&quot; para desmontar o
            componente: o cleanup chama <code>clearInterval</code> (veja no
            console, F12).
          </p>

          <div className="flex flex-wrap items-center gap-6">
            {mostrarTimer ? (
              <TempoAberto />
            ) : (
              <p className="text-gray-400">Timer desmontado (intervalo limpo).</p>
            )}
            <Button
              variant={mostrarTimer ? 'danger' : 'success'}
              size="sm"
              onClick={() => setMostrarTimer((anterior) => !anterior)}
            >
              {mostrarTimer ? 'Esconder timer' : 'Mostrar timer'}
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

export default App
