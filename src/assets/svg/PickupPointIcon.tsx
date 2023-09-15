import * as React from 'react'
import { SVGProps } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={38} height={38} fill="none" {...props}>
    <circle cx={19} cy={19} r={19} fill="#4AA1E0" />
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M13.3 13.3a1.9 1.9 0 0 1 1.9-1.9h7.6a1.9 1.9 0 0 1 1.9 1.9v11.4a.95.95 0 0 1 0 1.9h-2.85a.95.95 0 0 1-.95-.95v-1.9a.95.95 0 0 0-.95-.95h-1.9a.95.95 0 0 0-.95.95v1.9a.95.95 0 0 1-.95.95H13.3a.95.95 0 1 1 0-1.9V13.3Zm2.85.95h1.9v1.9h-1.9v-1.9Zm1.9 3.8h-1.9v1.9h1.9v-1.9Zm1.9-3.8h1.9v1.9h-1.9v-1.9Zm1.9 3.8h-1.9v1.9h1.9v-1.9Z"
      clipRule="evenodd"
    />
  </svg>
)
export default SvgComponent
