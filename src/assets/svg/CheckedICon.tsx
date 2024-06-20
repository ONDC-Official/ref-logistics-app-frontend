import * as React from 'react'
import { SVGProps } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
    <g clipPath="url(#a)">
      <path
        fill="#419E6A"
        fillRule="evenodd"
        d="M10 20c5.523 0 10-4.477 10-10S15.523 0 10 0 0 4.477 0 10s4.477 10 10 10Zm6.423-13.577a.833.833 0 0 0-1.179-1.179L7.5 12.99l-2.744-2.745a.833.833 0 1 0-1.179 1.179l3.334 3.333a.833.833 0 0 0 1.178 0l8.334-8.333Z"
        clipRule="evenodd"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h20v20H0z" />
      </clipPath>
    </defs>
  </svg>
)
export default SvgComponent
