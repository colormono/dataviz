import { useState, useRef, useEffect } from 'react';
import { useInterval } from 'ahooks';
import * as d3 from 'd3';
import { download, saveSvg } from '@/utils';
import { Button, Canvas, Caption, Container, Details } from '@/components';
import { IconDownload } from '@/components/icons';

const generateDataset = () =>
  Array(33)
    .fill(0)
    .map(() => [Math.random() * 80 + 10, Math.random() * 80 + 10, Math.random() * 5 + 1]);

const Circles = () => {
  const [dataset, setDataset] = useState(generateDataset());
  const ref = useRef();

  useEffect(() => {
    const svgElement = d3.select(ref.current);
    svgElement
      .selectAll('circle')
      .data(dataset)
      .join('circle')
      .attr('cx', (d) => d[0])
      .attr('cy', (d) => d[1])
      .attr('r', (d) => d[2]);
  }, [dataset]);

  useInterval(() => {
    const newDataset = generateDataset();
    setDataset(newDataset);
  }, 2000);

  return <svg viewBox="0 0 100 100" ref={ref} />;
};

export default function Home() {
  const ref = useRef();

  const exportSvg = (data) => {
    const drawing = saveSvg(data);
    return download(drawing, 'day-001.svg');
  };

  return (
    <Container>
      <Canvas>
        <figure ref={ref}>
          <Circles />
        </figure>
      </Canvas>

      <Details>
        <Caption>
          <strong>Day 1:</strong> Hello D3
        </Caption>
        <Button onClick={() => exportSvg(ref.current)}>
          <IconDownload /> Download
        </Button>
      </Details>
    </Container>
  );
}
