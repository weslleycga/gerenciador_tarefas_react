import { useState } from 'react'
import Input from '../Input/Input'
import Button from '../Button/Button'

// Filho 1: recebe do pai a FUNÇÃO onAdicionar via props.
// O texto digitado é um estado local, porque só este componente precisa dele.
function Formulario({ onAdicionar }) {
  const [texto, setTexto] = useState('')
  const [erro, setErro] = useState('')

  function handleSubmit(evento) {
    evento.preventDefault()

    if (texto.trim() === '') {
      setErro('Digite uma tarefa antes de adicionar.')
      return
    }

    onAdicionar(texto.trim()) // evento sobe para o pai
    setTexto('')
    setErro('')
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex items-start gap-3">
      <div className="flex-1">
        <Input
          id="nova-tarefa"
          name="tarefa"
          placeholder="O que você precisa fazer?"
          value={texto}
          onChange={(evento) => {
            setTexto(evento.target.value)
            if (erro) setErro('')
          }}
          error={erro}
        />
      </div>
      <Button type="submit" variant="primary">
        Adicionar
      </Button>
    </form>
  )
}

export default Formulario
