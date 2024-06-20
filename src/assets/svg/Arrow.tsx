import { SVGProps } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={9} height={14} fill="none" {...props}>
    <path
      fill="#196AAB"
      fillRule="evenodd"
      d="M.91 13.423a.833.833 0 0 1 0-1.179L6.156 7 .91 1.756A.833.833 0 1 1 2.089.577l5.834 5.834a.833.833 0 0 1 0 1.178l-5.834 5.834a.833.833 0 0 1-1.178 0Z"
      clipRule="evenodd"
    />
  </svg>
)
export default SvgComponent
