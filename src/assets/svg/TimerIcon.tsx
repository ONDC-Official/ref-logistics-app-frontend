import * as React from 'react'
import { SVGProps } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={26} height={26} fill="none" {...props}>
    <path
      fill="#FC9595"
      fillRule="evenodd"
      d="M13 4.334a8.667 8.667 0 1 0 0 17.333 8.667 8.667 0 0 0 0-17.333ZM2.167 13C2.167 7.017 7.017 2.167 13 2.167c5.983 0 10.834 4.85 10.834 10.833 0 5.983-4.85 10.834-10.834 10.834-5.983 0-10.833-4.85-10.833-10.834ZM13 7.584c.599 0 1.084.485 1.084 1.083v3.885l2.932 2.932a1.083 1.083 0 0 1-1.532 1.532l-3.25-3.25a1.083 1.083 0 0 1-.317-.766V8.667c0-.598.485-1.083 1.083-1.083Z"
      clipRule="evenodd"
    />
  </svg>
)
export default SvgComponent
