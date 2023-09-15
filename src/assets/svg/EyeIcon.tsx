import * as React from 'react'
import { SVGProps } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={18} height={14} viewBox="0 0 18 14" fill="none" {...props}>
    <path
      fill="#979797"
      fillRule="evenodd"
      d="M1.927 7a7.504 7.504 0 0 0 14.147 0A7.504 7.504 0 0 0 1.927 7ZM.254 6.75a9.17 9.17 0 0 1 17.493 0 .834.834 0 0 1 0 .5 9.17 9.17 0 0 1-17.493 0 .833.833 0 0 1 0-.5ZM9 5.333a1.667 1.667 0 1 0 0 3.334 1.667 1.667 0 0 0 0-3.334ZM5.667 7a3.333 3.333 0 1 1 6.666 0 3.333 3.333 0 0 1-6.666 0Z"
      clipRule="evenodd"
    />
  </svg>
)
export default SvgComponent
