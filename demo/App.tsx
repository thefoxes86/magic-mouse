import { useEffect, useState } from 'react'
import './App.css'
import MagicMouse from '../src/index'
import DatGui, {
  DatBoolean,
  DatButton,
  DatColor,
  DatSelect,
  DatNumber,
  DatString,
} from 'react-dat-gui'
import '../node_modules/react-dat-gui/dist/index.css'

type DataProps = {
  type: 'light' | 'dark' | 'custom'
  pointerColor: string
  outlineColor: string
  hoverBackground: string
  showCursor: boolean
  circleWidth: number
  outlineWidth: number
  circleWidthHover: number
  useSvgOnHover: boolean
  svg: string
}

const optionsType = ['light', 'dark', 'custom']

function App() {
  const [data, setData] = useState<DataProps>({
    type: 'light',
    pointerColor: '#fff',
    outlineColor: '#fff',
    hoverBackground: 'red',
    showCursor: false,
    outlineWidth: 64,
    circleWidth: 8,
    circleWidthHover: 150,
    useSvgOnHover: false,
    svg: '../demo/assets/arrow.svg',
  })

  const handleUpdate = (newData: DataProps) => {
    setData((prevState: DataProps) => ({
      ...prevState,
      ...newData,
    }))
  }

  return (
    <div className="App">
      <DatGui data={data} onUpdate={handleUpdate}>
        <DatSelect path="type" options={optionsType} />
        {data.type === 'custom' ? (
          <DatColor path="pointerColor" label="Pointer Color" />
        ) : null}
        {data.type === 'custom' ? (
          <DatColor path="outlineColor" label="Outline Color" />
        ) : null}
        <DatColor path="hoverBackground" label="Hover Outline Color" />
        <DatNumber
          path="outlineWidth"
          label="Outline Width"
          min={50}
          max={200}
          step={1}
        />
        <DatNumber
          path="circleWidth"
          label="Circle Width"
          min={5}
          max={20}
          step={1}
        />
        <DatNumber
          path="circleWidthHover"
          label="Circle Width Hover"
          min={100}
          max={250}
          step={1}
        />
        <DatBoolean path="showCursor" label="Show Cursor" />
        <DatBoolean path="useSvgOnHover" label="Show SVG on Hover" />
      </DatGui>
      <MagicMouse
        type={data.type}
        pointerColor={data.pointerColor}
        outlineColor={data.outlineColor}
        circleWidth={data.circleWidth}
        showCursor={data.showCursor}
        circleWidthHover={data.circleWidthHover}
        outlineWidth={data.outlineWidth}
        hoverBackground={data.hoverBackground}
        useSvgOnHover={data.useSvgOnHover}
        svg={data.svg}
      ></MagicMouse>
      <h1>
        <a>TITOLO DI PROVA</a>
      </h1>
    </div>
  )
}

export default App
