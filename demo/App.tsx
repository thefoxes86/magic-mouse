import { useEffect, useState } from 'react'
import './App.css'
import MagicMouse from '../src/index'
import DatGui, {
  DatBoolean,
  DatButton,
  DatColor,
  DatNumber,
  DatString,
} from 'react-dat-gui'
import '../node_modules/react-dat-gui/dist/index.css'

type DataProps = {
  pointerColor: string
  outlineColor: string
  hoverBackground: string
  showCursor: boolean
  circleWidth: number
  circleWidthHover: number
  useSvgOnHover: boolean
  svg: string
}

function App() {
  const [data, setData] = useState<DataProps>({
    pointerColor: '#fff',
    outlineColor: '#fff',
    hoverBackground: 'red',
    showCursor: false,
    circleWidth: 64,
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
        <DatColor path="pointerColor" label="Pointer Color" />
        <DatColor path="outlineColor" label="Outline Color" />
        <DatColor path="hoverBackground" label="Hover Outline Color" />
        <DatNumber
          path="circleWidth"
          label="Circle Width"
          min={50}
          max={150}
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
        pointerColor={data.pointerColor}
        outlineColor={data.outlineColor}
        circleWidth={data.circleWidth}
        showCursor={data.showCursor}
        circleWidthHover={data.circleWidthHover}
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
