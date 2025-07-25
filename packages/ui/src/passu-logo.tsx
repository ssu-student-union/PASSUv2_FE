import { SVGProps } from "react";
import { cn } from "./utils";

type PassuLogoProps = Omit<SVGProps<SVGSVGElement>, "viewBox">;

export const PassuLogo = ({ className, ...props }: PassuLogoProps) => {
  return (
    <svg
      aria-label="PASSU 로고"
      className={cn("w-26", className)}
      role="img"
      viewBox="0 0 104 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clip-path="url(#clip0_1351_1396)">
        <path
          d="M30.0008 0.0996094L16.3008 21.9996H22.6008L24.5008 18.8996L28.4008 12.5996L32.1008 6.69961L33.5008 21.9996H39.8008L37.8008 0.0996094H30.0008Z"
          fill="url(#paint0_linear_1351_1396)"
        />
        <path
          d="M23.3008 7.89961C24.7008 2.69961 22.8008 0.0996094 17.6008 0.0996094H6.60078L0.800781 21.9996H7.00078L8.70078 15.7996H13.4008C18.6008 15.7996 21.9008 13.1996 23.3008 7.99961V7.89961ZM17.0008 7.89961C16.7008 8.89961 16.1008 9.49961 15.0008 9.49961H10.3008L11.1008 6.39961H15.8008C16.8008 6.39961 17.2008 6.89961 16.9008 7.99961L17.0008 7.89961Z"
          fill="url(#paint1_linear_1351_1396)"
        />
        <path
          d="M96.8998 0.0996094L93.9998 10.9996C93.1998 14.0996 91.6998 15.6996 89.5998 15.6996C87.4998 15.6996 86.8998 14.0996 87.6998 10.9996L90.6998 0.0996094H84.4998L81.5998 10.9996C79.5998 18.2996 81.7998 21.8996 87.9998 21.8996C94.1998 21.8996 98.3998 18.2996 100.3 10.9996L103.2 0.0996094H96.8998Z"
          fill="url(#paint2_linear_1351_1396)"
        />
        <path
          d="M54.0992 7.89922H49.3992C48.3992 7.89922 47.8992 7.59922 48.0992 7.09922C48.1992 6.59922 48.7992 6.39922 49.8992 6.39922H60.0992L61.7992 0.199219H51.5992C46.3992 0.199219 43.1992 2.49922 41.8992 7.19922C40.5992 11.8992 42.5992 14.2992 47.7992 14.2992H52.4992C53.4992 14.2992 53.9992 14.4992 53.8992 14.9992C53.6992 15.5992 53.0992 15.7992 52.0992 15.7992H41.8992L40.1992 21.9992H50.3992C55.5992 21.9992 58.7992 19.5992 60.0992 14.8992C61.2992 10.2992 59.3992 7.89922 54.0992 7.89922Z"
          fill="url(#paint3_linear_1351_1396)"
        />
        <path
          d="M73.7008 7.89922H69.0008C68.0008 7.89922 67.5008 7.59922 67.7008 7.09922C67.8008 6.59922 68.4008 6.39922 69.5008 6.39922H79.7008L81.4008 0.199219H71.2008C66.0008 0.199219 62.8008 2.49922 61.5008 7.19922C60.2008 11.8992 62.2008 14.2992 67.4008 14.2992H72.1008C73.1008 14.2992 73.6008 14.4992 73.5008 14.9992C73.3008 15.5992 72.7008 15.7992 71.7008 15.7992H61.5008L59.8008 21.9992H70.0008C75.2008 21.9992 78.4008 19.5992 79.7008 14.8992C80.9008 10.2992 79.0008 7.89922 73.7008 7.89922Z"
          fill="url(#paint4_linear_1351_1396)"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_1351_1396"
          x1="40.9008"
          y1="13.6996"
          x2="19.1008"
          y2="9.49961"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#006FFF" />
          <stop offset="1" stop-color="#004299" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_1351_1396"
          x1="21.9008"
          y1="13.3996"
          x2="3.50078"
          y2="9.79961"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#006FFF" />
          <stop offset="1" stop-color="#004299" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_1351_1396"
          x1="100.4"
          y1="12.0996"
          x2="82.1998"
          y2="8.59961"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#006FFF" />
          <stop offset="1" stop-color="#004299" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_1351_1396"
          x1="60.0992"
          y1="12.7992"
          x2="41.6992"
          y2="9.29922"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#006FFF" />
          <stop offset="1" stop-color="#004299" />
        </linearGradient>
        <linearGradient
          id="paint4_linear_1351_1396"
          x1="79.7008"
          y1="12.7992"
          x2="61.3008"
          y2="9.29922"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#006FFF" />
          <stop offset="1" stop-color="#004299" />
        </linearGradient>
        <clipPath id="clip0_1351_1396">
          <rect width="104" height="22" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
