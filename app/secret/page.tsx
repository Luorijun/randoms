'use client'
import {createContext, useContext, useState} from 'react'

const context = createContext<{
  result: string[]
  setResult: (result: string[]) => void
}>({
  result: [],
  setResult: () => {
  },
})

export default function TextPage() {
  const [result, setResult] = useState<string[]>([])

  return (
    <main className={`flex-auto flex flex-row gap-8`}>
      <context.Provider value={{result, setResult}}>

        {/* 配置面板 */}
        <Config/>

        {/* 结果列表 */}
        <Result/>

      </context.Provider>
    </main>
  )
}

function Config() {
  const [count, setCount] = useState<number>(10)
  const [length, setLength] = useState<number>(16)
  const [upper, setUpper] = useState<boolean>(true)
  const [lower, setLower] = useState<boolean>(true)
  const [number, setNumber] = useState<boolean>(true)
  const [symbols, setSymbols] = useState<boolean>(false)
  const [similar, setSimilar] = useState<boolean>(true)

  const {setResult} = useContext(context)

  function generate() {
    const chars = []
    if (upper) chars.push(...'ABCDEFGHJKLMNPQRSTUVWXYZ')
    if (lower) chars.push(...'abcdefghijkmnpqrstuvwxyz')
    if (number) chars.push(...'123456789')
    if (symbols) chars.push(...'!@#$%^&*()_+-=[]{};:,.<>?')
    if (!similar) chars.push(...'0OoIl')
    console.log(chars)

    const result = []
    for (let i = 0; i < count; i++) {
      let str = ''
      for (let j = 0; j < length; j++) {
        str += chars[Math.floor(Math.random() * chars.length)]
      }
      result.push(str)
    }
    console.log(result)

    setResult(result)
  }

  return (
    <section className={`flex-none basis-96 flex flex-col bg-neutral-50 p-4 border rounded-2xl`}>

      {/* 编辑 */}
      <div className={`flex-auto flex flex-col gap-4`}>

        {/* 生成数量 */}
        <label htmlFor="count" className={`flex flex-col`}>
          <span>生成数量</span>
          <input
            type="number" id="count"
            min="1" max="100" defaultValue={count}
            onChange={e => setCount(parseInt(e.target.value))}
            className={`h-8 p-1 border border-gray-950 rounded-lg`}
          />
        </label>

        {/* 密码长度 */}
        <label htmlFor="length" className={`flex flex-col`}>
          <span>密码长度</span>
          <input
            type="number" id="length"
            min="1" max="100" defaultValue={length}
            onChange={e => setLength(parseInt(e.target.value))}
            className={`h-8 p-1 border border-gray-950 rounded-lg`}
          />
        </label>

        {/* 字符类型 */}
        <div className={`flex flex-col`}>
          <span>字符类型</span>
          <div className={`flex flex-col pl-4`}>
            <label htmlFor="upper">
              <input
                type="checkbox" id="upper" defaultChecked={upper}
                onChange={e => setUpper(e.target.checked)}
              />
              <span>大写字母</span>
            </label>
            <label htmlFor="lower">
              <input
                type="checkbox" id="lower" defaultChecked={lower}
                onChange={e => setLower(e.target.checked)}
              />
              <span>小写字母</span>
            </label>
            <label htmlFor="number">
              <input
                type="checkbox" id="number" defaultChecked={number}
                onChange={e => setNumber(e.target.checked)}
              />
              <span>数字</span>
            </label>
            <label htmlFor="symbols">
              <input
                type="checkbox" id="symbol-dot" defaultChecked={symbols}
                onChange={e => setSymbols(e.target.checked)}
              />
              <span>符号</span>
            </label>
          </div>
        </div>

        {/* 相似字符 */}
        <label htmlFor="similar">
          <input
            type="checkbox" id="similar" defaultChecked={similar}
            onChange={e => setSimilar(e.target.checked)}
          />
          <span>排除相似字符：(0,O,o,I,l)</span>
        </label>
      </div>

      {/* 生成 */}
      <button
        onClick={generate}
        className={`
          flex-none h-10 px-4 rounded-lg bg-emerald-100 border-emerald-400
          hover:bg-emerald-200 active:bg-emerald-300
          transition-all duration-150
        `}
      >
        生成
      </button>

    </section>
  )
}

function Result() {
  const {result} = useContext(context)

  return (
    <section className={`flex-auto flex flex-col bg-neutral-50 border rounded-2xl overflow-hidden`}>
      <div className={`flex-none h-10 px-4 flex items-center border-b`}>
        <span>结果</span>
      </div>
      <div className={`flex-auto flex flex-col gap-4 p-4 overflow-y-auto`}>
        {result.map((str, i) => (
          <div key={i} className={`flex-none h-8`}>
            <span>{str}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
