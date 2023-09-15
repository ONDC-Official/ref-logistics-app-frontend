import * as React from 'react'
import { SVGProps } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={21} height={20} fill="none" {...props}>
    <path
      fill="#787878"
      fillRule="evenodd"
      d="M9.793.293a1 1 0 0 1 1.414 0l9 9a1 1 0 0 1-1.414 1.414l-.293-.293V18a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2v-7.586l-.293.293A1 1 0 0 1 .793 9.293l9-9ZM4.5 8.414V18h3v-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4h3V8.414l-6-6-6 6Zm7 9.586v-4h-2v4h2Z"
      clipRule="evenodd"
    />
  </svg>
)
export default SvgComponent
