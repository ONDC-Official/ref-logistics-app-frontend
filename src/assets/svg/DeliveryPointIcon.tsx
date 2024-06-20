import * as React from 'react'
import { SVGProps } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={38} height={38} fill="none" {...props}>
    <circle cx={19} cy={19} r={19} fill="#F29C49" />
    <path
      fill="#fff"
      d="M19 10.25a6.884 6.884 0 0 0-6.875 6.875 6.806 6.806 0 0 0 1.385 4.125s.188.247.218.282L19 27.75l5.274-6.22c.028-.034.216-.28.216-.28v-.002a6.803 6.803 0 0 0 1.385-4.123A6.883 6.883 0 0 0 19 10.25Zm0 9.375a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z"
    />
  </svg>
)
export default SvgComponent
