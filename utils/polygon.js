import * as d3 from 'd3'

export function polygon(sides) {
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
