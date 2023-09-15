import * as React from 'react'
import { SVGProps } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={10} height={18} fill="none" {...props}>
    <path stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1.688 8.313 9 1 16.313" />
  </svg>
)
export default SvgComponent
