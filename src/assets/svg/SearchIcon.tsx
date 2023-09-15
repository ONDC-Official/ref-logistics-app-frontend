import * as React from 'react'
import { SVGProps } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} fill="none" {...props}>
    <path
      fill="#979797"
      fillRule="evenodd"
      d="M7.333 2.333a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm-6.666 5A6.667 6.667 0 1 1 12.6 11.421l4.49 4.49a.833.833 0 1 1-1.18 1.178l-4.489-4.49A6.667 6.667 0 0 1 .666 7.333Z"
      clipRule="evenodd"
    />
  </svg>
)
export default SvgComponent
