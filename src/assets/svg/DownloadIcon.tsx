import * as React from 'react'
import { SVGProps } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={14} height={17} fill="none" {...props}>
    <path
      fill="#196AAB"
      fillRule="evenodd"
      d="M0 15.5a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H1a1 1 0 0 1-1-1Zm3.293-7.707a1 1 0 0 1 1.414 0L6 9.086V1.5a1 1 0 1 1 2 0v7.586l1.293-1.293a1 1 0 0 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 0-1.414Z"
      clipRule="evenodd"
    />
  </svg>
)
export default SvgComponent
