import { useEffect, useState } from 'react'

// Converte segundos em "hh:mm:ss"
function formatarTempo(totalSegundos) {
  const horas = Math.floor(totalSegundos / 3600)
  const minutos = Math.floor((totalSegundos % 3600) / 60)
  const segundos = totalSegundos % 60
  return [horas, minutos, segundos]
    .map((parte) => String(parte).padStart(2, '0'))
    .join(':')
}

// PARTE 3 – Timer com setInterval e cleanup
function TempoAberto() {
  const [segundos, setSegundos] = useState(0)

  useEffect(() => {
    console.log('⏱️ Timer iniciado')

    const id = setInterval(() => {
      // forma com função: sempre parte do valor mais recente
      setSegundos((anterior) => anterior + 1)
    }, 1000)

    // CLEANUP: roda quando o componente sai da tela.
    // Sem isso, o intervalo continuaria rodando para sempre (vazamento de memória).
    return () => {
      clearInterval(id)
      console.log('🧹 Timer limpo (clearInterval)')
    }
  }, []) // [] = roda só uma vez, quando o componente aparece

  return (
    <p className="font-mono text-3xl font-bold tabular-nums text-sky-700">
      {formatarTempo(segundos)}
    </p>
  )
}

export default TempoAberto
