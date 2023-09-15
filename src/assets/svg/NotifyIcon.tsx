import { SVGProps } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={22} height={20} fill="none" {...props}>
    <path
      fill="#F9C51C"
      fillRule="evenodd"
      d="M8.185 1.792c1.251-2.167 4.379-2.167 5.63 0l7.505 13c1.251 2.166-.313 4.874-2.814 4.874H3.494c-2.501 0-4.065-2.708-2.814-4.875l7.505-13Zm3.753 1.083a1.083 1.083 0 0 0-1.876 0l-7.506 13a1.083 1.083 0 0 0 .938 1.625h15.012c.834 0 1.355-.903.938-1.625l-7.506-13ZM11 6.667c.598 0 1.083.485 1.083 1.083v2.166a1.083 1.083 0 0 1-2.166 0V7.75c0-.598.485-1.083 1.083-1.083ZM9.917 14.25c0-.598.485-1.084 1.083-1.084h.01a1.083 1.083 0 1 1 0 2.167H11a1.083 1.083 0 0 1-1.083-1.083Z"
      clipRule="evenodd"
    />
  </svg>
)
export default SvgComponent
