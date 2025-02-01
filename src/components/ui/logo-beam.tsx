/** @jsxImportSource react */

import { motion } from "framer-motion";
import { qwikify$ } from "@builder.io/qwik-react";

const logos = [
  "https://res.cloudinary.com/dl2adjye7/image/upload/v1716817722/Amazon_icon.svg_a4qmtg.png",
  "https://res.cloudinary.com/dl2adjye7/image/upload/v1716800282/Apple_logo_black.svg_seeetv.png",
  "https://res.cloudinary.com/dl2adjye7/image/upload/v1716800359/WISE.L-b3d3de3c_rexehe.png",
];

const lineWidth = 80; // width of the line in pixels
const lineHeight = 2; // height of the line

const LogoBeamInternal = () => {
  return (
    <div className="tw-flex tw-items-center tw-justify-center tw-min-h-52">
      <div className="relative flex items-center">
        {/* Left Square */}
        <div className="bg-[#2b2836] border-2 border-[#33313d] rounded-2xl flex items-center justify-center w-14 h-14 p-4">
          <img
            src={logos[0]}
            alt="Logo 1"
            width={64}
            height={64}
            className="tw-filter tw-invert tw-brightness-0"
          />
        </div>

        {/* Line connecting Left Square to Middle Square with Light Beam */}
        <div
          className="relative"
          style={{
            width: `${lineWidth}px`,
            height: `${lineHeight}px`,
            backgroundColor: "#33313d",
            overflow: "hidden",
          }}
        >
          <motion.div
            className="tw-absolute tw-top-0 tw-left-0 tw-h-full tw-w-10 tw-bg-gradient-to-r tw-from-transparent tw-via-teal-500 tw-to-transparent tw-opacity-75"
            initial={{ x: "-40px" }}
            animate={{ x: `calc(${lineWidth}px + 40px)` }}
            transition={{
              repeat: Infinity,
              duration: 0.5,
              repeatDelay: 2.5,
              ease: "linear",
            }}
          />
        </div>

        {/* Middle Square with Teal BG, Shiny Effect, and Glowing Effect */}
        <div className="tw-relative tw-bg-teal-500 tw-border-2 tw-border-[#00FFFF] tw-rounded-2xl tw-flex tw-items-center tw-justify-center tw-w-16 tw-h-16 tw-p-4 tw-overflow-hidden shadow-[0_0_15px_5px_rgba(56,189,248,0.5)]">
          <img
            src={logos[1]}
            width={70}
            height={70}
            alt="Logo 2"
            className="tw-filter tw-invert tw-brightness-0"
          />
          {/* Shiny Effect */}
          <motion.div
            className="tw-absolute tw-top-0 tw-left-0 tw-w-full tw-h-full tw-bg-gradient-to-r tw-from-transparent tw-via-white tw-to-transparent tw-opacity-30"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              duration: 2,
              ease: "linear",
              repeat: Infinity,
              repeatType: "loop",
            }}
          />
        </div>

        {/* Line connecting Middle Square to Right Square with Light Beam */}
        <div
          className="tw-relative"
          style={{
            width: `${lineWidth}px`,
            height: `${lineHeight}px`,
            backgroundColor: "#33313d",
            overflow: "hidden",
          }}
        >
          <motion.div
            className="tw-absolute tw-top-0 tw-right-0 tw-h-full tw-w-10 tw-bg-gradient-to-r tw-from-transparent tw-via-teal-500 tw-to-transparent tw-opacity-75"
            initial={{ x: "40px" }}
            animate={{ x: `calc(-${lineWidth}px - 40px)` }}
            transition={{
              repeat: Infinity,
              duration: 0.5,
              repeatDelay: 3.5,
              ease: "linear",
            }}
          />
        </div>

        {/* Right Square */}
        <div className="tw-bg-[#2b2836] tw-border-2 tw-border-[#33313d] tw-rounded-2xl tw-flex tw-items-center tw-justify-center tw-w-14 tw-h-14 tw-p-4">
          <img
            src={logos[2]}
            alt="Logo 3"
            width={64}
            height={64}
            className="tw-filter tw-invert tw-brightness-0"
          />
        </div>
      </div>
    </div>
  );
};

export default LogoBeamInternal;

export const LogoBeam = qwikify$(LogoBeamInternal);
