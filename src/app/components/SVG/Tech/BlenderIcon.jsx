import * as React from "react"
const BlenderIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={48} height={48} {...props}>
    <linearGradient
      id="a"
      x1={406.501}
      x2={407.446}
      y1={543.694}
      y2={503.773}
      gradientUnits="userSpaceOnUse"
    >
      <stop offset={0} stopColor="#f15f19" />
      <stop offset={1} stopColor="#fbb521" />
    </linearGradient>
    <linearGradient
      id="c"
      x1={-413.595}
      x2={-413.608}
      y1={-531.744}
      y2={-523.629}
      gradientUnits="userSpaceOnUse"
    >
      <stop offset={0} stopColor="#197cf1" />
      <stop offset={1} stopColor="#21c9fb" />
    </linearGradient>
    <linearGradient
      id="b"
      x1={413.491}
      x2={413.703}
      y1={537.256}
      y2={517.876}
      gradientUnits="userSpaceOnUse"
    >
      <stop offset={0} stopColor="#e8ebec" />
      <stop offset={1} stopColor="#fdfeff" />
    </linearGradient>
    <g transform="translate(-430.798 -559.862) scale(1.11468)">
      <path
        fill="url(#a)"
        d="M407.446 503.773a3 3 0 0 0-1.705 5.402l3.41 2.623h-16.58a3 3 0 1 0 0 6h7.52l-12.283 8.924a3 3 0 1 0 3.525 4.853l6.277-4.56a16 16 0 0 0-.039.783 16 16 0 0 0 16 16 16 16 0 0 0 16-16 16 16 0 0 0-6.955-13.197 3 3 0 0 0-.216-.182l-13-10a3 3 0 0 0-1.954-.646z"
      />
      <circle cx={413.571} cy={527.798} r={10} fill="url(#b)" />
      <circle
        cx={-413.571}
        cy={-527.798}
        r={4}
        fill="url(#c)"
        transform="scale(-1)"
      />
    </g>
  </svg>
)
export default BlenderIcon
