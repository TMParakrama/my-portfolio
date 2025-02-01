/** @jsxImportSource react */

import { qwikify$ } from "@builder.io/qwik-react";
import { useEffect, useState } from "react";

import { CgWebsite, CgStack } from "react-icons/cg";
import { HiStar } from "react-icons/hi";

import { motion, useSpring } from "framer-motion";

interface TickerBoxProps {
  number: number;
  title: string;
  iconType?: string;
  noPlus?: boolean;
  uomStr?: string;
}

const TickerBoxInternal = ({
  number,
  title,
  iconType,
  noPlus,
  uomStr,
}: TickerBoxProps) => {
  const [count, setCount] = useState(0);

  const spring = useSpring(0, { stiffness: 30, damping: 15 });

  useEffect(() => {
    spring.set(number);
    spring.onChange((value) => setCount(Math.round(value)));
  }, [spring, number]);

  return (
    <div className="tw-flex tw-flex-col tw-justify-center tw-items-center tw-h-full tw-text-center">
      <div className="tw-text-5xl tw-font-bold tw-mb-2 tw-flex tw-items-center tw-gradient-text">
        <motion.span className="tw-text-white">{count}</motion.span>
        {!noPlus && (
          <span className="tw-ml-2 tw-text-transparent tw-bg-clip-text tw-bg-gradient-to-r tw-from-purple-500 tw-to-purple-700">
            +
          </span>
        )}
        {uomStr ? (
          <span className="tw-ml-2 tw-text-transparent tw-text-2xl tw-bg-clip-text tw-bg-gradient-to-r tw-from-purple-500 tw-to-purple-700">
            {uomStr}
          </span>
        ) : null}
      </div>
      <div className="tw-flex tw-items-center tw-justify-center tw-bg-transparent tw-w-40 tw-text-white tw-rounded-full tw-border-2 tw-border-[#28292b] tw-p-1 tw-mt-2">
        {iconType === "PROJECTS" ? (
          <CgWebsite className="tw-h-4 tw-w-4 tw-mr-2 tw-text-purple-600" />
        ) : iconType === "EXPERIENCE" ? (
          <HiStar className="tw-h-4 tw-w-4 tw-mr-2 tw-text-blue-600" />
        ) : iconType === "TECH_STACK" ? (
          <CgStack className="tw-h-4 tw-w-4 tw-mr-2 tw-text-green-600" />
        ) : null}
        <span className="tw-gradient-text">{title}</span>
      </div>
    </div>
  );
};

export const TickerBox = qwikify$(TickerBoxInternal);
