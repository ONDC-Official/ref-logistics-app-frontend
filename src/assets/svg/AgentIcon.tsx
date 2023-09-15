import * as React from 'react'
import { SVGProps } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={49} height={49} viewBox="0 0 49 49" fill="none" {...props}>
    <path
      fill="#4AA1E0"
      d="M24.25 6.506a5.994 5.994 0 1 0 0 11.988 5.994 5.994 0 0 0 0-11.988ZM37.75 9.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Zm-27 0a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Zm4.5 14.979a3 3 0 0 1 3-2.98h12a3 3 0 0 1 3 3v9c0 .945-.148 1.883-.438 2.782A9.003 9.003 0 0 1 15.25 33.5v-9.021Zm-3 .02a5.94 5.94 0 0 1 .804-3H6.25a3 3 0 0 0-3 3V32a7.5 7.5 0 0 0 10.308 6.958 11.95 11.95 0 0 1-1.308-5.46V24.5Zm24 0v9c0 1.966-.471 3.82-1.308 5.458A7.501 7.501 0 0 0 45.25 32v-7.5a3 3 0 0 0-3-3h-6.804c.51.882.804 1.905.804 3Z"
    />
  </svg>
)
export default SvgComponent
