import * as React from 'react'
import { SVGProps } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={69} height={68} fill="none" {...props}>
    <path
      fill="#196AAB"
      d="M24.75 67.75 19.5 62.5l9.75-9.75L19.5 43l5.25-5.25 9.75 9.75 9.75-9.75L49.5 43l-9.75 9.75 9.75 9.75-5.25 5.25L34.5 58l-9.75 9.75Zm-16.5-60v3.75h52.5V7.75H8.25ZM19.875 19 21 22.75h27L49.125 19h-29.25Zm-4.313 11.25L12 19H.75V.25h67.5V19H57l-4.313 11.25H15.563Z"
    />
  </svg>
)
export default SvgComponent
