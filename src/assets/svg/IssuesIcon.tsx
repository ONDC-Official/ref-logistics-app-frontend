import * as React from 'react'
import { SVGProps } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={27} height={27} viewBox="0 0 27 27" fill="none" {...props}>
    <path
      fill="#fff"
      d="M18 2.25H9A6.757 6.757 0 0 0 2.25 9v14.625a1.125 1.125 0 0 0 1.125 1.125H18A6.757 6.757 0 0 0 24.75 18V9A6.757 6.757 0 0 0 18 2.25ZM22.5 18c0 2.482-2.018 4.5-4.5 4.5H4.5V9c0-2.482 2.018-4.5 4.5-4.5h9c2.482 0 4.5 2.018 4.5 4.5v9Z"
    />
    <path fill="#fff" d="M7.875 10.125h11.25v2.25H7.875v-2.25Zm0 4.5h7.875v2.25H7.875v-2.25Z" />
  </svg>
)
export default SvgComponent
