import * as React from 'react'
import { SVGProps } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} fill="none" {...props}>
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.711}
      d="M13.516 6.39v-.933a3.685 3.685 0 0 0-3.685-3.685H4.956a3.685 3.685 0 0 0-3.684 3.685v11.13a3.685 3.685 0 0 0 3.684 3.686h4.885a3.675 3.675 0 0 0 3.675-3.674v-.944M20.31 11.021H8.269M17.381 8.107l2.928 2.915-2.928 2.916"
    />
  </svg>
)
export default SvgComponent
