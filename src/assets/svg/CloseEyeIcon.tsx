import * as React from 'react'
import { SVGProps } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 18 18" fill="none" {...props}>
    <path
      stroke="#979797"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m1.5 1.5 2.991 2.991M16.5 16.5l-2.99-2.99m-2.948 1.177A8.337 8.337 0 0 1 1.048 9c.29-.92.734-1.772 1.303-2.524m4.881.756a2.5 2.5 0 1 1 3.536 3.536M7.232 7.232l3.536 3.536M7.232 7.232 4.491 4.491m6.277 6.277L4.49 4.49m6.277 6.277 2.741 2.741M4.491 4.491a8.337 8.337 0 0 1 12.461 4.51 8.353 8.353 0 0 1-3.443 4.508"
    />
  </svg>
)
export default SvgComponent
