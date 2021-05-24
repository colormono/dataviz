import { useState, useRef, useEffect } from 'react'
import { useInterval } from 'ahooks'
import * as d3 from 'd3'
import { download, saveSvg } from '@/utils'
import { Button, Canvas, Caption, Container, Details } from '@/components'
import { IconDownload } from '@/components/icons'

const generateDataset = () =>
  Array(33)
    .fill(0)
    .map(() => [Math.random() * 80 + 10, Math.random() * 80 + 10, Math.random() * 5 + 1])

const MyDrawing = () => {
  const [dataset, setDataset] = useState(generateDataset())
  const ref = useRef()

  useEffect(() => {
    const svgElement = d3.select(ref.current)

    // svgElement
    //   .append('line')
    //   .attr('fill', 'none')
    //   .attr('stroke', '#CCC')
    //   .attr('stroke-width', 1)
    //   .attr('x1', 0)
    //   .attr('y1', 0)
    //   .attr('x2', 100)
    //   .attr('y2', 100)

    svgElement
      .append('g')
      .selectAll('rect')
      .data(dataset)
      .join('rect')
      .attr('fill', 'none')
      .attr('stroke', '#2118D4')
      .attr('stroke-width', 0.15)
      .attr('x', (d) => d[0])
      .attr('y', (d) => d[1])
      .attr('width', (d) => d[2])
      .attr('height', (d) => d[2])

    svgElement
      .selectAll('circle')
      .data(dataset)
      .join('circle')
      .attr('fill', 'none')
      .attr('stroke', '#000')
      .attr('stroke-width', 0.5)
      .attr('cx', (d) => d[0] + d[2] * 0.5)
      .attr('cy', (d) => d[1] + d[2] * 0.5)
      .attr('r', (d) => d[2] * 0.33)
  }, [dataset])

  useInterval(() => {
    const newDataset = generateDataset()
    setDataset(newDataset)
  }, 2000)

  return <svg viewBox="0 0 100 100" ref={ref} />
}

export default function Home() {
  const ref = useRef()

  const exportSvg = (data) => {
    const drawing = saveSvg(data)
    return download(drawing, 'day-002.svg')
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
          <strong>Day 2:</strong> Basic shapes
        </Caption>
        <Button onClick={() => exportSvg(ref.current)}>
          <IconDownload /> Download
        </Button>
      </Details>
    </Container>
  )
}
