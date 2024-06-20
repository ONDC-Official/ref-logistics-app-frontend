import * as React from 'react'
import { SVGProps } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" {...props}>
    <path
      fill="#1C75BC"
      fillRule="evenodd"
      d="M16.423 3.577a.833.833 0 0 0-1.179 0l-6.91 6.911v1.178h1.178l6.91-6.91a.833.833 0 0 0 0-1.179ZM14.066 2.4A2.5 2.5 0 1 1 17.6 5.934l-7.155 7.155a.833.833 0 0 1-.589.244H7.5a.833.833 0 0 1-.833-.833v-2.357c0-.221.087-.433.244-.59L14.066 2.4ZM5 4.999a.833.833 0 0 0-.833.834V15c0 .46.373.833.833.833h9.167c.46 0 .833-.373.833-.833v-4.167a.833.833 0 1 1 1.667 0V15a2.5 2.5 0 0 1-2.5 2.5H5A2.5 2.5 0 0 1 2.5 15V5.833a2.5 2.5 0 0 1 2.5-2.5h4.167a.833.833 0 0 1 0 1.667H5Z"
      clipRule="evenodd"
    />
  </svg>
)
export default SvgComponent
