import * as React from 'react'
import { SVGProps } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} fill="none" {...props}>
    <path stroke="#151515" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 13 13 1M1 1l12 12" />
  </svg>
)
export default SvgComponent
