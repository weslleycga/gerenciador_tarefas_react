// Irmão 2: também LÊ o mesmo nome, sem precisar de estado próprio
function ContadorLetras({ nome }) {
  const letras = nome.replace(/\s/g, '').length

  return (
    <p className="rounded-lg bg-gray-100 p-3 text-gray-700">
      🔤 Seu nome tem <strong>{letras}</strong> {letras === 1 ? 'letra' : 'letras'}.
    </p>
  )
}

export default ContadorLetras
