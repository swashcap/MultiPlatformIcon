import * as React from "react";

function SvgArrowRight(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M6.156 12.979H18.98a1 1 0 000-2H6.192l4.567-5.328a1 1 0 00-1.518-1.302l-6 7a1 1 0 000 1.302l6 7a1 1 0 001.518-1.302l-4.603-5.37z" />
    </svg>
  );
}

export default SvgArrowRight;
