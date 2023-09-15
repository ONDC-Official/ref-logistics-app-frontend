import * as React from 'react'
import { SVGProps } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
    <rect width={19} height={19} x={0.5} y={0.5} stroke="#64748B" rx={9.5} />
  </svg>
)
export default SvgComponent
