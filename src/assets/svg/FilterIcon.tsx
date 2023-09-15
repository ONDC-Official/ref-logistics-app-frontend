import { SVGProps } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} fill="none" {...props}>
    <path
      fill="#196AAB"
      fillRule="evenodd"
      d="M.667 2.334c0-.92.746-1.667 1.667-1.667h13.333c.92 0 1.667.746 1.667 1.667v2.154c0 .443-.176.866-.488 1.179L11.5 11.012v2.155a.833.833 0 0 1-.244.59L7.923 17.09A.833.833 0 0 1 6.5 16.5v-5.488L1.155 5.667a1.667 1.667 0 0 1-.488-1.179V2.334Zm15 0H2.334v2.154l5.345 5.346c.312.312.488.736.488 1.178v3.476l1.667-1.666v-1.81c0-.442.175-.866.488-1.178l5.345-5.346V2.334Z"
      clipRule="evenodd"
    />
  </svg>
)
export default SvgComponent
