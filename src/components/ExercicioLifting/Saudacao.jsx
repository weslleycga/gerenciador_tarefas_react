// Irmão 1: só LÊ o nome que vem por props
function Saudacao({ nome }) {
  return (
    <p className="rounded-lg bg-blue-50 p-3 text-blue-800">
      👋 Olá, <strong>{nome.trim() === '' ? 'visitante' : nome}</strong>!
    </p>
  )
}

export default Saudacao
