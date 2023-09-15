import * as React from 'react'
import { SVGProps } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={30} height={28} viewBox="0 0 30 28" fill="none" {...props}>
    <path
      fill="#196AAB"
      d="M28.291 11.666c0-.619-.254-1.212-.707-1.65a2.461 2.461 0 0 0-1.71-.683h-7.636L19.398 4c.024-.117.036-.245.036-.373 0-.479-.205-.922-.531-1.237l-1.281-1.225L9.67 8.843a2.289 2.289 0 0 0-.713 1.656v11.667c0 .619.255 1.212.708 1.65a2.461 2.461 0 0 0 1.709.683H22.25c1.003 0 1.86-.583 2.223-1.423l3.65-8.225c.108-.268.168-.548.168-.852v-2.333ZM1.708 24.499h4.833v-14H1.708v14Z"
    />
  </svg>
)
export default SvgComponent
