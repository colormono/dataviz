import { useState, useRef, useEffect } from 'react'
import { useInterval } from 'ahooks'
import * as d3 from 'd3'
import { download, saveSvg } from '@/utils'
import { Button, Canvas, Caption, Container, Details } from '@/components'
import { IconDownload } from '@/components/icons'

function polygon(sides) {
  var length = sides,
    s = 1,
    phase = 0
  const radial = d3
    .lineRadial()
    .curve(d3.curveLinearClosed)
    .angle((_, i) => (i / length) * 2 * Math.PI + phase)
    .radius(() => s)
  const poly = function () {
    return radial(Array.from({ length }))
  }
  poly.context = function (_) {
    return arguments.length ? (radial.context(_), poly) : radial.context()
  }
  poly.n = function (_) {
    return arguments.length ? ((length = +_), poly) : length
  }
  poly.rotate = function (_) {
    return arguments.length ? ((phase = +_), poly) : phase
  }
  poly.scale = function (_) {
    return arguments.length ? ((s = +_), poly) : s
  }
  poly.curve = function (_) {
    return arguments.length ? (radial.curve(_), poly) : radial.curve()
  }
  poly.radius = radial.radius
  poly.angle = radial.angle
  return poly
}

const generateDataset = () =>
  Array.from({ length: 76 }, (_, i) => [
    (Math.PI / 3) * i, // angle (in radians)
    2 * i, // radius
  ])

const MyDrawing = () => {
  const [dataset, setDataset] = useState(generateDataset())
  const ref = useRef()

  useEffect(() => {
    const svgElement = d3.select(ref.current)

    svgElement.selectAll('*').remove()

    // const spiral = d3.lineRadial()(dataset)

    const spiral = polygon((3 + ((d3.now() / 1500) % 8)) | 0)
      .scale(150)
      .rotate(d3.now() / 4000)()

    svgElement
      .append('path')
      .attr('fill', 'none')
      .attr('stroke', '#2118D4')
      .attr('stroke-width', 1)
      .attr('d', spiral)
      .attr('transform', 'translate(200,200)')
  }, [dataset])

  useInterval(() => {
    const newDataset = generateDataset()
    setDataset(newDataset)
  }, 2000)

  return <svg viewBox="0 0 400 400" ref={ref} />
}

export default function Home() {
  const ref = useRef()

  const exportSvg = (data) => {
    const drawing = saveSvg(data)
    return download(drawing, 'day-003.svg')
  }

  return (
    <Container>
      <Canvas>
        <figure ref={ref}>
          <MyDrawing />
        </figure>
      </Canvas>

      <Details>
        <Caption>
          <strong>Day 3:</strong> Polygons
        </Caption>
        <Button onClick={() => exportSvg(ref.current)}>
          <IconDownload /> Download
        </Button>
      </Details>
    </Container>
  )
}
