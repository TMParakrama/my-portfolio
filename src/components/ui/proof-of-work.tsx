/** @jsxImportSource react */

import { qwikify$ } from "@builder.io/qwik-react";

import { useRef } from "react";
import { HiAcademicCap } from "react-icons/hi2";
import { motion } from "framer-motion";

const workExperience = [
  {
    id: 1,
    name: "Souffle",
    image: "./assets/netflix2.png",
  },
  {
    id: 2,
    name: "IPass",
    image: "./assets/netflix2.png",
  },
  {
    id: 3,
    name: "TourGuru",
    image: "./assets/netflix2.png",
  },
];

// const additionalExperience = [
//   {
//     id: 1,
//     name: "TourGuru",
//     image: "./assets/netflix2.png",
//   },
//   {
//     id: 1,
//     name: "TourGuru",
//     image: "./assets/netflix2.png",
//   },
// ];

const ProofWorkInternal = () => {
  const containerRef1 = useRef(null);
  // const containerRef2 = useRef(null);

  const variants1 = {
    animate: {
      x: [0, "calc(-50% - 1rem)"],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 20,
          ease: "linear",
        },
      },
    },
  };

  // const variants2 = {
  //   animate: {
  //     x: ["calc(-50% - 1rem)", 0],
  //     transition: {
  //       x: {
  //         repeat: Infinity,
  //         repeatType: "loop",
  //         duration: 20,
  //         ease: "linear",
  //       },
  //     },
  //   },
  // };

  return (
    <div className="tw-flex tw-flex-col tw-items-center tw-justify-start tw-h-full tw-p-0">
      <div className="tw-flex tw-items-center tw-mb-2 tw-mt-4">
        <HiAcademicCap className="tw-h-6 tw-w-6 tw-text-purple-600" />
        <span className="tw-ml-2 tw-text-gray-400 tw-text-sm">Work</span>
      </div>
      <h2 className="tw-text-white tw-text-xl tw-mb-2 tw-text-center">
        Explore my work experience
      </h2>
      <div className="tw-w-full tw-h-[1px] tw-bg-gray-600 tw-mb-2"></div>

      <div
        className="tw-overflow-hidden tw-w-full tw-h-40 md:tw-h-64 xl:tw-h-40 tw-mb-0 tw-bg-transparent tw-my-5"
        // style={{
        //   maskImage:
        //     "linear-gradient(to left, transparent 0%, black 10%, black 90%, transparent 99%)",
        // }}
      >
        <motion.div
          ref={containerRef1}
          variants={variants1}
          animate="animate"
          style={{ width: "fit-content", display: "flex" }}
          className="tw-flex tw-justify-center tw-items-center tw-gap-5 tw-bg-transparent"
        >
          {workExperience
            .concat(workExperience)
            .concat(workExperience)
            .map((data, index) => (
              <motion.div
                key={index}
                className="tw-w-36 tw-bg-[#1a1c1e] tw-border tw-border-gray-700 tw-rounded-xl tw-py-3 tw-px-0 tw-flex-shrink-0 tw-flex tw-items-center tw-justify-center"
              >
                <div>
                  <h1 className="tw-font-medium tw-text-white">{data.name}</h1>
                </div>
              </motion.div>
            ))}
        </motion.div>
      </div>
      {/* <div
        className="tw-overflow-hidden tw-w-full tw-h-[290px] tw-bg-transparent"
        // style={{
        //   maskImage:
        //     "linear-gradient(to left, transparent 0%, black 10%, black 90%, transparent 99%)",
        // }}
      >
        <motion.div
          ref={containerRef2}
          variants={variants2}
          animate="animate"
          style={{ width: "fit-content", display: "flex" }}
          className="tw-flex tw-justify-center tw-gap-5 tw-bg-transparent"
        >
          {additionalExperience
            .concat(additionalExperience)
            .concat(additionalExperience)
            .map((data, index) => (
              <motion.div
                key={index}
                className="tw-w-36 tw-bg-[#1a1c1e] tw-border tw-border-gray-700 tw-rounded-xl tw-py-3 tw-px-0 tw-flex-shrink-0 tw-flex tw-items-center tw-justify-center"
              >
                <div>
                  <h1 className="tw-font-medium tw-text-white">{data.name}</h1>
                </div>
              </motion.div>
            ))}
        </motion.div>
      </div> */}
    </div>
  );
};

export const ProofWork = qwikify$(ProofWorkInternal);
