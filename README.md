# Gerenciador de Tarefas – Lifting State Up + useEffect

Aplicação React em que vários componentes **compartilham o mesmo estado** usando *lifting state up*, com `useEffect` para sincronizar com sistemas externos: o **título da aba**, um **timer** com `setInterval` e o `localStorage` do navegador.

![Tela da aplicação](./print.png)

## Como executar

```bash
npm install
npm run dev
```

Abra no navegador o endereço que aparecer no terminal (normalmente `http://localhost:5173`).

## Estrutura do projeto

```
src/
├── components/
│   ├── ExercicioLifting/
│   │   ├── ExercicioLifting.jsx  ← pai com o estado "nome" (Parte 1)
│   │   ├── CampoNome.jsx         ← filho que ALTERA o nome
│   │   ├── Saudacao.jsx          ← irmão que LÊ o nome
│   │   └── ContadorLetras.jsx    ← irmão que LÊ o nome
│   ├── Formulario/Formulario.jsx ← Filho 1: recebe a função onAdicionar
│   ├── Lista/Lista.jsx           ← Filho 2: recebe o array de tarefas
│   ├── Filtros/Filtros.jsx       ← troca o filtro (estado também no pai)
│   ├── TempoAberto/TempoAberto.jsx ← timer com setInterval + cleanup (Parte 3)
│   ├── Header/Header.jsx         ← mostra quantas tarefas estão pendentes
│   ├── Button/, Input/, Badge/, Alert/, Footer/ ← reaproveitados das semanas anteriores
├── App.jsx                       ← componente pai com o estado das tarefas
├── index.css
└── main.jsx
```

## Parte 1 – Refatoração com lifting state up

**Antes:** o estado ficava dentro do componente filho `CampoNome`. Os irmãos `Saudacao` e `ContadorLetras` não tinham como saber o que foi digitado.

```jsx
// ❌ ANTES – estado preso no filho
function CampoNome() {
  const [nome, setNome] = useState('')
  return <input value={nome} onChange={(e) => setNome(e.target.value)} />
}

function ExercicioLifting() {
  return (
    <>
      <CampoNome />
      <Saudacao />        {/* não tem acesso ao nome */}
      <ContadorLetras />  {/* não tem acesso ao nome */}
    </>
  )
}
```

**Depois:** o estado subiu para o pai (`ExercicioLifting`), que é o ancestral comum dos três. O pai passa o **valor** para baixo e a **função** que permite mudar esse valor.

```jsx
// ✅ DEPOIS – estado no pai, compartilhado via props
function ExercicioLifting() {
  const [nome, setNome] = useState('')
  return (
    <>
      <CampoNome nome={nome} onMudarNome={setNome} />
      <Saudacao nome={nome} />
      <ContadorLetras nome={nome} />
    </>
  )
}
```

Agora, ao digitar, a saudação e o contador de letras atualizam juntos.

## Parte 2 – Gerenciador de tarefas

- **Pai (`App`)** guarda o estado `tarefas`, além do `filtro` escolhido. Ele também tem as funções `adicionarTarefa`, `alternarTarefa`, `removerTarefa` e `limparConcluidas`, todas imutáveis (spread, `map` e `filter`).
- **Filho 1 (`Formulario`)** recebe `onAdicionar` via props. O texto digitado é estado **local**, porque só o formulário precisa dele. Se o campo estiver vazio, mostra um erro.
- **Filho 2 (`Lista`)** recebe o array de tarefas já filtrado, além de `onAlternar` e `onRemover`. Ele não guarda tarefas: só exibe o que o pai mandou.
- **`Header`** e **`Filtros`** também leem o mesmo estado, o que mostra o compartilhamento entre vários componentes.

**`useEffect` para o título da aba:**

```jsx
useEffect(() => {
  document.title =
    pendentes === 0
      ? '✅ Tudo feito! | Tarefas'
      : `(${pendentes}) ${pendentes === 1 ? 'tarefa pendente' : 'tarefas pendentes'}`
}, [pendentes])
```

O efeito roda depois da renderização, e **só quando `pendentes` muda**.

**Extra:** um segundo `useEffect` salva as tarefas no `localStorage`. Assim a lista continua lá depois de recarregar a página.

## Parte 3 – Timer com cleanup

```jsx
useEffect(() => {
  const id = setInterval(() => {
    setSegundos((anterior) => anterior + 1)
  }, 1000)

  return () => clearInterval(id) // cleanup
}, [])
```

- O `[]` faz o efeito rodar **uma vez**, quando o componente aparece.
- A função retornada (**cleanup**) roda quando o componente **sai da tela**, e chama `clearInterval`. Sem ela, o intervalo continuaria rodando para sempre, gastando memória e tentando atualizar um componente que não existe mais.
- O botão **"Esconder timer"** desmonta o componente de propósito. No console (F12) aparece a mensagem `🧹 Timer limpo (clearInterval)`, comprovando que o cleanup rodou.

> **Observação:** em modo de desenvolvimento (`npm run dev`), o `<StrictMode>` do React monta, desmonta e monta de novo cada componente. Por isso o console mostra "Timer iniciado → Timer limpo → Timer iniciado" logo ao abrir a página. É de propósito: o React faz isso para revelar efeitos que esquecem o cleanup. Em produção, isso não acontece.

## Parte 4 – Reflexão

### O que acontece se omitirmos o array de dependências do `useEffect`?

O array de dependências diz ao React **quando** o efeito deve rodar:

| Forma | Quando o efeito roda |
|---|---|
| `useEffect(fn)` (sem array) | depois de **toda** renderização |
| `useEffect(fn, [])` | **uma vez**, quando o componente aparece |
| `useEffect(fn, [a, b])` | na primeira vez e sempre que `a` ou `b` mudarem |

Se omitirmos o array, o efeito roda **depois de toda renderização**. Isso causa alguns problemas:

- **Trabalho desnecessário:** o título da aba seria reescrito a cada tecla digitada no formulário, mesmo sem nenhuma tarefa ter mudado.
- **Loop infinito:** se o efeito atualiza um estado (por exemplo, `setSegundos`), essa atualização causa uma nova renderização, que roda o efeito de novo, que atualiza o estado de novo... e a página trava.
- **Timers recriados o tempo todo:** no exercício do timer, sem o `[]`, a cada segundo o componente renderizaria, o cleanup apagaria o intervalo e um novo seria criado. Funcionaria por acaso, mas de forma desperdiçada. E, se esquecêssemos o cleanup, vários intervalos ficariam rodando ao mesmo tempo, e o contador começaria a pular números.

Por isso, devemos sempre informar no array **todas as variáveis de fora do efeito que ele usa**, e nada além delas.

### Como funciona o fluxo de dados no lifting state up?

No React, os dados seguem um **fluxo de mão única**: **dados descem, eventos sobem**.

1. **O estado fica no ancestral comum** dos componentes que precisam dele. Neste projeto, o `App` guarda as tarefas, porque `Formulario`, `Lista`, `Filtros` e `Header` dependem delas.
2. **Os dados descem por props:** o `App` passa o array para a `Lista` e o número de pendentes para o `Header`. Os filhos só leem, não alteram as props.
3. **Os eventos sobem por funções:** o `App` também passa funções como `onAdicionar`. Quando o usuário envia o formulário, o `Formulario` chama `onAdicionar(texto)`, avisando o pai.
4. **O pai atualiza o próprio estado** (`setTarefas`) com um array novo.
5. **O React renderiza de novo** o pai e todos os filhos que recebem aquele estado, então a lista, o contador do cabeçalho, os filtros e o título da aba ficam **sincronizados automaticamente**.

```
                ┌──────────── App (estado: tarefas) ────────────┐
   dados ↓      │                                                │     ↑ eventos
                ▼                                                ▼
   Formulario(onAdicionar)   Lista(tarefas, onAlternar)   Header(pendentes)
        │                           │
        └── onAdicionar(texto) ─────┴── onAlternar(id) ──→ sobe para o App
```

A vantagem é que existe **uma única fonte da verdade**: as tarefas existem em um só lugar, então nunca acontece de a lista mostrar uma coisa e o contador mostrar outra. A desvantagem é que, em árvores muito profundas, passar props por muitos níveis fica trabalhoso (*prop drilling*). Para esses casos o React oferece soluções como o `Context`.

## Tecnologias

- [React](https://react.dev/)
- [Vite](https://vite.dev/)
- [Tailwind CSS](https://v3.tailwindcss.com/)
- [clsx](https://github.com/lukeed/clsx)
