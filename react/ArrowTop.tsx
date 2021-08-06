import * as React from "react";

function SvgArrowTop(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit={2}
      {...props}
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M12 3h-.022a.993.993 0 00-.37.08h-.003a.987.987 0 00-.256.16l-7 6a1 1 0 001.302 1.519L11 6.174V20a1 1 0 002 0V6.174l5.35 4.585A1 1 0 0019.65 9.24l-7-6a.987.987 0 00-.256-.16l-.003-.001a.993.993 0 00-.37-.08H12z" />
    </svg>
  );
}

export default SvgArrowTop;
