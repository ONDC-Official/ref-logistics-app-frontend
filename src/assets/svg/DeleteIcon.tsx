import * as React from 'react'
import { SVGProps } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" {...props}>
    <path
      fill="#D83232"
      fillRule="evenodd"
      d="M6.667 3.333c0-.92.746-1.667 1.666-1.667h3.334c.92 0 1.666.747 1.666 1.667V5h2.492a.8.8 0 0 1 .015 0h.827a.833.833 0 0 1 0 1.667h-.058l-.667 9.344a2.5 2.5 0 0 1-2.494 2.322H6.552a2.5 2.5 0 0 1-2.494-2.322l-.667-9.345h-.058a.833.833 0 0 1 0-1.666h3.334V3.333ZM5.062 6.666l.659 9.226a.833.833 0 0 0 .83.774h6.897c.437 0 .8-.337.831-.774l.66-9.225H5.061ZM11.667 5H8.333V3.333h3.334V5ZM8.333 8.333c.46 0 .834.373.834.833v5a.833.833 0 0 1-1.667 0v-5c0-.46.373-.833.833-.833Zm3.334 0c.46 0 .833.373.833.833v5a.833.833 0 0 1-1.667 0v-5c0-.46.373-.833.834-.833Z"
      clipRule="evenodd"
    />
  </svg>
)
export default SvgComponent
