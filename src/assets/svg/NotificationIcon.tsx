import * as React from 'react'
import { SVGProps } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={51} height={51} fill="none" {...props}>
    <circle cx={25.5} cy={25.5} r={25.5} fill="#4AA1E0" />
    <path
      fill="#fff"
      d="M31.25 23.584a5.75 5.75 0 1 0-11.5 0v7.666h11.5v-7.666Zm1.917 8.306.383.51a.48.48 0 0 1-.383.767H17.833a.48.48 0 0 1-.383-.767l.383-.51v-8.306a7.667 7.667 0 1 1 15.334 0v8.306Zm-10.063 2.235h4.792a2.396 2.396 0 0 1-4.792 0Z"
    />
  </svg>
)
export default SvgComponent
