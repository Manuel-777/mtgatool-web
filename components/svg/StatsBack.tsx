import { CSSProperties, PropsWithChildren } from "react";

export default function SvgComponent(
  props: PropsWithChildren<{ style: CSSProperties }>
) {
  const { style } = props;

  return (
    <svg
      width="38.667mm"
      height="26.773mm"
      version="1.1"
      viewBox="0 0 38.667 26.773"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      <g transform="translate(-104.19 -160.37)">
        <path
          d="m105.38 160.37h36.299c0.6512 0 1.184 0.55329 1.184 1.2295v24.314c0 0.67625-0.5328 1.2295-1.184 1.2295h-36.299c-0.6512 0-1.184-0.55329-1.184-1.2295v-24.314c0-0.67625 0.5328-1.2295 1.184-1.2295z"
          fill="#141516"
          fill-rule="evenodd"
        />
      </g>
    </svg>
  );
}
