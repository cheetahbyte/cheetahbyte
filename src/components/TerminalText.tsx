import * as React from 'react'

function TerminalText({ texts, isFocus }: { texts: string[]; isFocus: boolean }) {
  const [index, setIndex] = React.useState(0)
  const [subIndex, setSubIndex] = React.useState(0)
  const [reverse, setReverse] = React.useState(false)

  React.useEffect(() => {
    if (subIndex === texts[index].length + 1 && !reverse) {
      const t = setTimeout(() => setReverse(true), 2000)
      return () => clearTimeout(t)
    }
    if (subIndex === 0 && reverse) {
      setReverse(false)
      setIndex((prev) => (prev + 1) % texts.length)
      return
    }
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1))
    }, Math.max(reverse ? 50 : 100, Math.random() * 150))

    return () => clearTimeout(timeout)
  }, [subIndex, index, reverse, texts])

  return (
    <span className={`font-mono transition-colors duration-500 ${isFocus ? 'text-white/40' : 'text-[#0E4D47]'}`}>
      {`> ${texts[index].substring(0, subIndex)}`}
      <span className="animate-pulse">|</span>
    </span>
  )
}

export default TerminalText;
