import * as React from 'react'
import { SVGProps } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} fill="none" {...props}>
    <path
      stroke="#D83232"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11 21c5.523 0 10-4.477 10-10S16.523 1 11 1 1 5.477 1 11s4.477 10 10 10Z"
    />
    <path
      stroke="#D83232"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m13.829 8.171-5.657 5.657m0-5.657 5.656 5.657"
    />
  </svg>
)
export default SvgComponent
