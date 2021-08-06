import * as React from "react";

function SvgArrowBottom(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M11 17.826l-5.35-4.585a1 1 0 00-1.301 1.518l7 6a.987.987 0 00.256.16l.003.001a.993.993 0 00.37.08h.044a.993.993 0 00.37-.08l.003-.001a.987.987 0 00.256-.16l7-6a1 1 0 00-1.302-1.518l-5.35 4.585V4a1 1 0 00-2 0v13.826z" />
    </svg>
  );
}

export default SvgArrowBottom;
