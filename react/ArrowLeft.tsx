import * as React from "react";

function SvgArrowLeft(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M17.804 11.002H4.018a1 1 0 000 2H17.8l-4.561 5.349a1 1 0 001.522 1.298l5.969-7a1.002 1.002 0 000-1.298l-5.97-7a1 1 0 00-1.521 1.298l4.565 5.353z" />
    </svg>
  );
}

export default SvgArrowLeft;
