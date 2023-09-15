import * as React from 'react'
import { SVGProps } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={80} height={80} fill="none" {...props}>
    <g clipPath="url(#a)">
      <path
        fill="#196AAB"
        fillRule="evenodd"
        d="M44.881 11.075a3 3 0 0 0-2.046 3.716L47.29 30.16a3 3 0 0 0 3.717 2.046L78.86 24.13 73.57 5.88a3 3 0 0 0-3.717-2.045l-24.972 7.239Zm3.447 3.166a2 2 0 0 0 1.113 3.842l9.33-2.705a2 2 0 0 0-1.113-3.842l-9.33 2.705Zm.167 7.76a1.5 1.5 0 0 1 1.023-1.858l21.267-6.165a1.5 1.5 0 1 1 .835 2.881l-21.267 6.165a1.5 1.5 0 0 1-1.858-1.023Zm2.415 2.944a1.5 1.5 0 0 0 .835 2.881l21.268-6.165a1.5 1.5 0 0 0-.836-2.882L50.91 24.945Z"
        clipRule="evenodd"
      />
      <path
        fill="#4AA1E0"
        fillRule="evenodd"
        d="M19.246 29a3 3 0 0 0-2.99 3.235l3.529 45A3 3 0 0 0 22.775 80h34.453a3 3 0 0 0 2.99-2.765l3.53-45A3 3 0 0 0 60.758 29H19.245Zm10.756 8a3 3 0 0 0-3 3v29a3 3 0 1 0 6 0V40a3 3 0 0 0-3-3Zm7 3a3 3 0 1 1 6 0v29a3 3 0 0 1-6 0V40Zm13-3a3 3 0 0 0-3 3v29a3 3 0 1 0 6 0V40a3 3 0 0 0-3-3Z"
        clipRule="evenodd"
      />
      <path
        fill="#4AA1E0"
        d="M2.828 39.598a4 4 0 0 1 0-5.657L33.941 2.828a4 4 0 0 1 5.657 0l3.535 3.536a1 1 0 0 1 0 1.414L7.779 43.133a1 1 0 0 1-1.414 0l-3.536-3.535Z"
      />
      <path
        fill="#4AA1E0"
        fillRule="evenodd"
        d="M9.898 24.041a5 5 0 0 1 0-7.07l7.071-7.072a5 5 0 0 1 7.072 0l3.535 3.536-2.828 2.828-3.536-3.535a1 1 0 0 0-1.414 0l-7.071 7.07a1 1 0 0 0 0 1.415l3.535 3.535-2.828 2.829-3.536-3.536Z"
        clipRule="evenodd"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h80v80H0z" />
      </clipPath>
    </defs>
  </svg>
)
export default SvgComponent
