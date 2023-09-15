import * as React from 'react'
import { SVGProps } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" {...props}>
    <path
      fill="#196AAB"
      fillRule="evenodd"
      d="M10 3.333a6.667 6.667 0 1 0 0 13.334 6.667 6.667 0 0 0 0-13.334ZM1.667 10a8.333 8.333 0 1 1 16.666 0 8.333 8.333 0 0 1-16.666 0ZM10 6.667c.46 0 .833.373.833.833v1.666H12.5a.833.833 0 1 1 0 1.667h-1.667V12.5a.833.833 0 1 1-1.666 0v-1.667H7.5a.833.833 0 0 1 0-1.667h1.667V7.5c0-.46.373-.833.833-.833Z"
      clipRule="evenodd"
    />
  </svg>
)
export default SvgComponent
