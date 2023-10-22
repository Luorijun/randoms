'use client'
import {createContext, Key, ReactNode, useContext, useEffect, useState} from 'react'
import Button from '@/components/Button'

type Record = {
  str: string
  time: number
}

function time(tile: number) {
  const date = new Date(tile)
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}

const context = createContext<{
  result: string[]
  setResult: (result: string[]) => void,
  record: Record[]
  save: (str: string) => void
  remove: (str: string) => void
}>({
  result: [],
  setResult: () => {
  },
  record: [],
  save: () => {
  },
  remove: () => {
  },
})

export default function TextPage() {
  const [result, setResult] = useState<string[]>([])
  const [record, setRecord] = useState<Record[]>([])

  useEffect(() => {
    const record = localStorage.getItem('password-list')
    if (record) {
      setRecord(JSON.parse(record))
    }
  }, [])

  const save = (str: string) => {
    const strList = record.map(item => item.str)

    if (strList.indexOf(str) === -1) {
      record.unshift({str, time: Date.now()})
      setRecord([...record])
      localStorage.setItem('password-list', JSON.stringify(record))
    }
  }

  const remove = (str: string) => {
    const strList = record.map(item => item.str)
    const index = strList.indexOf(str)
    if (index !== -1) {
      record.splice(index, 1)
      setRecord([...record])
      localStorage.setItem('password-list', JSON.stringify(record))
    }
  }

  return (
    <main className={`flex-auto flex flex-row gap-8 overflow-hidden`}>
      <context.Provider value={{result, setResult, record, save, remove}}>

        {/* 配置面板 */}
        <Config/>

        {/* 结果列表 */}
        <div className={`flex-auto flex flex-col gap-8`}>
          <div className={`flex-none basis-72 flex overflow-hidden`}><History/></div>
          <div className={`flex-auto flex overflow-hidden`}><Result/></div>
        </div>

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

  const generate = () => {
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
            className={`h-10 p-1 border border-gray-950 rounded-lg`}
          />
        </label>

        {/* 密码长度 */}
        <label htmlFor="length" className={`flex flex-col`}>
          <span>密码长度</span>
          <input
            type="number" id="length"
            min="1" max="100" defaultValue={length}
            onChange={e => setLength(parseInt(e.target.value))}
            className={`h-10 p-1 border border-gray-950 rounded-lg`}
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
                type="checkbox" id="symbols" defaultChecked={symbols}
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
      <Button onClick={generate}>生成</Button>

    </section>
  )
}

function Result() {
  const {result, save} = useContext(context)

  return (
    <Section title={`结果`}>
      <ul className={`flex-auto flex flex-col gap-4 p-4 overflow-y-auto`}>
        {result.map((str, i) => (
          <Item key={i}>
            <span>{str}</span>
            <Button small onClick={() => save(str)}>保存</Button>
          </Item>
        ))}
      </ul>
    </Section>
  )
}

function History() {
  const {record, remove} = useContext(context)

  return (
    <Section title={`已保存`}>
      <ul className={`flex-auto flex flex-col p-4 overflow-y-auto`}>
        {record.map((record, i) => (
          <Item key={i}>
            <div className={`flex flex-col`}>
              <span>{record.str}</span>
              <span className={`text-xs text-gray-500`}>
                {time(record.time)}
              </span>
            </div>
            <Button small onClick={() => remove(record.str)}>删除</Button>
          </Item>
        ))}
      </ul>
    </Section>
  )
}

function Section(props: {
  title: string
  children: ReactNode
}) {
  return (
    <section className={`flex-auto flex flex-col bg-neutral-50 border rounded-2xl overflow-auto`}>
      <h3 className={`flex-none px-4 leading-10 border-b`}>
        {props.title}
      </h3>
      {props.children}
    </section>
  )
}

function Item(props: {
  key: Key
  children: ReactNode
}) {
  return (
    <li
      className={`
        flex-none py-2 border-b
        flex justify-between items-center 
      `}
    >
      {props.children}
    </li>
  )
}
