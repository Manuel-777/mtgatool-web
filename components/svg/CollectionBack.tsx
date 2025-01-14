import { CSSProperties, PropsWithChildren } from "react";

export default function SvgComponent(props: PropsWithChildren<{ style: CSSProperties }>) {
  const { style } = props;

  return (
    <svg
      width="32.876mm"
      height="23.802mm"
      version="1.1"
      viewBox="0 0 32.876 23.802"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      <style />
      <g transform="translate(-87.403 -116.64)" fill-rule="evenodd">
        <path
          d="m88.459 116.64h30.764c0.58214 0 1.0557 0.49182 1.0557 1.0963v21.609c0 0.60452-0.4736 1.0963-1.0557 1.0963h-30.764c-0.58213 0-1.0557-0.49182-1.0557-1.0963v-21.609c0-0.60452 0.4736-1.0963 1.0557-1.0963z"
          fill="#141516"
        />
        <g fill="#393c43">
          <path d="m88.903 118.75c0.30587 0 0.5624-0.25616 0.5624-0.57379s-0.25653-0.58403-0.5624-0.58403c-0.30587 0-0.55253 0.2664-0.55253 0.58403s0.24667 0.57379 0.55253 0.57379z" />
          <path d="m90.61 118.75c0.30587 0 0.55253-0.25616 0.55253-0.57379s-0.24667-0.58403-0.55253-0.58403c-0.30587 0-0.55253 0.2664-0.55253 0.58403s0.24667 0.57379 0.55253 0.57379z" />
          <path d="m92.317 118.75c0.30587 0 0.55253-0.25616 0.55253-0.57379s-0.24667-0.58403-0.55253-0.58403-0.55253 0.2664-0.55253 0.58403 0.24667 0.57379 0.55253 0.57379z" />
        </g>
      </g>
    </svg>
  );
}
