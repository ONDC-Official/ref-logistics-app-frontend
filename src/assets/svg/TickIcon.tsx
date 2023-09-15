import * as React from 'react'
import { SVGProps } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={110} height={110} viewBox="0 0 110 110" fill="none" {...props}>
    <path
      fill="#419E6A"
      fillRule="evenodd"
      d="M55 11c-24.3 0-44 19.7-44 44s19.7 44 44 44 44-19.7 44-44-19.7-44-44-44ZM0 55C0 24.624 24.624 0 55 0s55 24.624 55 55-24.624 55-55 55S0 85.376 0 55Zm75.39-14.89a5.5 5.5 0 0 1 0 7.78l-22 22a5.5 5.5 0 0 1-7.78 0l-11-11a5.5 5.5 0 1 1 7.78-7.78l7.11 7.112L67.61 40.11a5.5 5.5 0 0 1 7.78 0Z"
      clipRule="evenodd"
    />
  </svg>
)
export default SvgComponent
