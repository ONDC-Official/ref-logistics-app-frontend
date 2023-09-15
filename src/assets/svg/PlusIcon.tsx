import * as React from 'react'
import { SVGProps } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} fill="none" {...props}>
    <path
      fill="#1C75BC"
      fillRule="evenodd"
      d="M9 2.333a6.667 6.667 0 1 0 0 13.334A6.667 6.667 0 0 0 9 2.333ZM.667 9a8.333 8.333 0 1 1 16.666 0A8.333 8.333 0 0 1 .667 9ZM9 5.667c.46 0 .833.373.833.833v1.667H11.5a.833.833 0 0 1 0 1.666H9.833V11.5a.833.833 0 0 1-1.666 0V9.833H6.5a.833.833 0 0 1 0-1.666h1.667V6.5c0-.46.373-.833.833-.833Z"
      clipRule="evenodd"
    />
  </svg>
)
export default SvgComponent
