import { useState } from 'react'
import CampoNome from './CampoNome'
import Saudacao from './Saudacao'
import ContadorLetras from './ContadorLetras'

// PARTE 1 – Lifting state up
// ANTES: o estado "nome" ficava dentro do CampoNome, e os irmãos
// (Saudacao e ContadorLetras) não tinham como acessar esse valor.
// DEPOIS: o estado subiu para este componente pai, que é o ancestral
// comum dos três. Ele passa o valor e a função para baixo via props.
function ExercicioLifting() {
  const [nome, setNome] = useState('')

  return (
    <section className="rounded-xl bg-white p-6 shadow-md">
      <h2 className="text-xl font-bold">Parte 1 – Lifting State Up</h2>
      <p className="mb-4 mt-1 text-sm text-gray-500">
        O estado <code>nome</code> fica no pai. O campo envia a mudança para
        cima, e os dois irmãos recebem o valor atualizado por props.
      </p>

      <div className="flex flex-col gap-3">
        <CampoNome nome={nome} onMudarNome={setNome} />
        <div className="grid gap-3 sm:grid-cols-2">
          <Saudacao nome={nome} />
          <ContadorLetras nome={nome} />
        </div>
      </div>
    </section>
  )
}

export default ExercicioLifting
