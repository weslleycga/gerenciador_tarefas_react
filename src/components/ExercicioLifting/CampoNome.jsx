// DEPOIS do lifting: o CampoNome não tem mais estado próprio.
// Ele recebe o valor e a função de mudança do componente pai.
function CampoNome({ nome, onMudarNome }) {
  return (
    <input
      type="text"
      value={nome}
      onChange={(evento) => onMudarNome(evento.target.value)}
      placeholder="Digite seu nome"
      className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-200"
    />
  )
}

export default CampoNome
