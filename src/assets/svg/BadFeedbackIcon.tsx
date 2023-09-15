import * as React from 'react'
import { SVGProps } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={26} height={24} viewBox="0 0 26 24" fill="none" {...props}>
    <path
      fill="#D83232"
      d="M20.875 14.5h4.5V.5h-4.5m-4.5 0H6.25c-.934 0-1.732.583-2.07 1.423L.783 10.148A2.38 2.38 0 0 0 .624 11v2.333c0 .62.237 1.213.659 1.65a2.21 2.21 0 0 0 1.591.684h7.099l-1.069 5.331a1.877 1.877 0 0 0-.034.362c0 .49.191.922.495 1.237l1.193 1.236 7.402-7.688c.417-.42.664-1.003.664-1.645V2.833c0-.619-.237-1.212-.659-1.65A2.21 2.21 0 0 0 16.375.5Z"
    />
  </svg>
)
export default SvgComponent
