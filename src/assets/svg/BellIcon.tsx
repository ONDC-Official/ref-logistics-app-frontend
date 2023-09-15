import * as React from 'react'
import { SVGProps } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={18} height={20} fill="none" {...props}>
    <path
      fill="#1D1D1D"
      fillRule="evenodd"
      d="M6.019 2.665a3 3 0 0 1 5.963 0A7 7 0 0 1 16 9v3.159c0 .273.109.535.302.729l1.405 1.405A1 1 0 0 1 17 16h-4a4 4 0 1 1-8 0H1a1 1 0 0 1-.707-1.707l1.405-1.405c.193-.194.302-.456.302-.73V9a7 7 0 0 1 4.019-6.335ZM7 16a2 2 0 1 0 4 0H7ZM9 2a1 1 0 0 0-1 1v.341a1 1 0 0 1-.667.943A5.002 5.002 0 0 0 4 9v3.159c0 .669-.221 1.315-.623 1.841h11.246A3.032 3.032 0 0 1 14 12.159V9a5.002 5.002 0 0 0-3.333-4.716A1 1 0 0 1 10 3.341V3a1 1 0 0 0-1-1Z"
      clipRule="evenodd"
    />
  </svg>
)
export default SvgComponent
