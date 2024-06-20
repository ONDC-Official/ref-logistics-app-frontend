import * as React from 'react'
import { SVGProps } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={21} height={21} viewBox="0 0 21 21" fill="none" {...props}>
    <path
      fill="#fff"
      d="M.375.375v20.25h20.25V.375H.375Zm9 18h-6.75v-6.75h6.75v6.75Zm0-9h-6.75v-6.75h6.75v6.75Zm9 9h-6.75v-6.75h6.75v6.75Zm0-9h-6.75v-6.75h6.75v6.75Z"
    />
  </svg>
)
export default SvgComponent
