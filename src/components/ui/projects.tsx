/** @jsxImportSource react */

import { qwikify$ } from "@builder.io/qwik-react";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";

import {
  HiShieldCheck,
  HiAcademicCap,
  HiBeaker,
  HiBriefcase,
  HiGlobeAlt,
} from "react-icons/hi2";

const rectangles = [
  {
    id: 1,
    title: "IPass - Center App & IPass - Client App",
    icon: <HiBriefcase className="tw-h-6 tw-w-6 tw-text-white" />,
    description:
      "An all-in-one activity based center and client management app, designed to elevate fitness or lifestyle center's operations. ",
    sourceCode: "",
    liveLink:
      "https://play.google.com/store/apps/details?id=com.visioinnovation.ipasscenter",
  },
  {
    id: 2,
    title: "Souffle",
    icon: <HiAcademicCap className="tw-h-6 tw-w-6 tw-text-white" />,
    description:
      "An interactive e-learning platform offering courses, quizzes, and certifications for various subjects.",
    sourceCode: "",
    liveLink: "https://www.souffle.com.au/",
  },
  {
    id: 3,
    title: "Infirma - Health Information System",
    icon: <HiGlobeAlt className="tw-h-6 tw-w-6 tw-text-white" />,
    description: "",
    sourceCode: "",
    liveLink: "",
  },
  {
    id: 4,
    title: "BillionFinds",
    icon: <HiBeaker className="tw-h-6 tw-w-6 tw-text-white" />,
    description: "",
    sourceCode: "",
    liveLink: "",
  },
  {
    id: 5,
    title: "Health Information System Platform - Digital Pulz",
    icon: <HiShieldCheck className="tw-h-6 tw-w-6 tw-text-white" />,
    description: "",
    sourceCode: "",
    liveLink: "https://cybersecurity-dashboard.live",
  },
  {
    id: 6,
    title: "TourGuru - Research and Mobile App",
    icon: <HiShieldCheck className="tw-h-6 tw-w-6 tw-text-white" />,
    description:
      "Research paper published research project focused on eSociety topic",
    sourceCode: "",
    liveLink: "https://ieeexplore.ieee.org/document/9103380",
  },
  {
    id: 7,
    title: "Portfolio",
    icon: <HiShieldCheck className="tw-h-6 tw-w-6 tw-text-white" />,
    description: "Portfolio page built with Qwik and deployed on Netlify",
    sourceCode: "https://github.com/TMParakrama/my-portfolio",
    liveLink: "https://portfolio-parakrama.netlify.app/",
  },
];

interface ProjectType {
  id: number;
  title: string;
  icon?: any;
  description?: string;
  sourceCode?: string;
  liveLink?: string;
}

const ProjectsInternal = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [selectedProject, setSelectedProject] = useState<null | ProjectType>(
    null
  );
  const [isHovered, setIsHovered] = useState(false);

  /**
   * @description Start scroll animation
   */
  const startScrollAnimation = useCallback(() => {
    controls.start({
      y: [scrollPosition + "%", scrollPosition - 100 + "%"], // Start from current position
      transition: {
        y: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 120,
          ease: "linear",
        },
      },
    });
  }, [scrollPosition, controls]);

  /**
   * @description Pause scroll animation
   */
  const pauseScrollAnimation = useCallback(() => {
    controls.stop();
    if (containerRef.current) {
      const transform = window.getComputedStyle(containerRef.current).transform;

      // Parse matrix values - matrix(1, 0, 0, 1, 0, Y)
      const matrixValues = transform.match(/matrix.*\((.*)\)/)?.[1].split(",");
      if (matrixValues && matrixValues.length === 6) {
        // Get Y translation value (last number in matrix)
        const yTranslation = parseFloat(matrixValues[5]);
        // Convert pixels to percentage based on container height
        const containerHeight = containerRef.current.offsetHeight;
        const percentage = (yTranslation / containerHeight) * 100;

        setScrollPosition(percentage);
        controls.set({ y: percentage + "%" });
      }
    }
  }, [controls]);

  /**
   * @description Effect to start and pause scroll animation
   */
  useEffect(() => {
    if (!selectedProject && !isHovered) {
      startScrollAnimation();
    } else {
      pauseScrollAnimation();
    }
  }, [controls, scrollPosition, selectedProject, isHovered]);

  /**
   * @function handleClose
   * @returns {void}
   * @description Handle close
   */
  const handleClose = () => {
    setSelectedProject(null);
  };

  /**
   * @function handleBackdropClick
   * @returns {void}
   * @description Handle backdrop click
   */
  const handleBackdropClick = (e: any) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  /**
   * @function isProjectClickable
   * @returns {boolean}
   * @description Check if project is clickable
   */
  const isProjectClickable = (project: ProjectType) => {
    return project.description || project.sourceCode || project.liveLink;
  };

  return (
    <div className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-w-full">
      <div className="tw-flex tw-items-center tw-mb-2 tw-mt-4">
        <HiShieldCheck className="tw-h-6 tw-w-6 tw-text-purple-600" />
        <span className="tw-ml-2 tw-text-gray-400 tw-text-sm">My projects</span>
      </div>
      <h2 className="tw-text-white tw-text-xl tw-mb-2">
        Review my best projects
      </h2>
      <div className="tw-w-full tw-h-[1px] tw-bg-gray-600 tw-mb-4"></div>
      <div
        className="tw-overflow-hidden tw-w-full tw-h-[380px] tw-px-2"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
        }}
      >
        <motion.div
          ref={containerRef}
          animate={controls}
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            maxWidth: "calc(100% - 32px)",
          }}
          className="tw-flex tw-flex-col tw-items-center tw-gap-4 tw-mx-4"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {rectangles
            .concat(rectangles)
            .concat(rectangles)
            .map((rectangle, index) => (
              <motion.div
                key={index}
                className={`tw-bg-[#1a1c1e] tw-rounded-md tw-flex tw-items-center tw-p-2 tw-border tw-border-gray-700 ${
                  isProjectClickable(rectangle)
                    ? "tw-cursor-pointer"
                    : "tw-cursor-not-allowed"
                } tw-w-full`}
                onClick={() =>
                  isProjectClickable(rectangle) && setSelectedProject(rectangle)
                }
                whileHover={
                  isProjectClickable(rectangle) ? { scale: 1.05 } : {}
                }
                whileTap={isProjectClickable(rectangle) ? { scale: 0.95 } : {}}
              >
                <div className="tw-flex tw-items-center tw-justify-center tw-bg-[#28292b] tw-h-10 tw-w-10 tw-rounded-md tw-border tw-border-gray-600 tw-p-1 tw-mr-2">
                  {rectangle.icon}
                </div>
                <span className="tw-text-white">{rectangle.title}</span>
              </motion.div>
            ))}
        </motion.div>
      </div>
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="tw-fixed tw-inset-0 tw-bg-black tw-bg-opacity-80 tw-flex tw-items-center tw-justify-center tw-z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleBackdropClick}
          >
            <motion.div
              className="tw-bg-[#1a1c1e] tw-rounded-lg tw-p-6 tw-border tw-border-gray-700 tw-w-11/12 tw-md:w-2/3 tw-lg:w-1/2 tw-relative"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <button
                className="tw-absolute tw-top-4 tw-right-4 tw-text-gray-700 tw-hover:text-gray-200"
                onClick={handleClose}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="tw-h-6 tw-w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <div className="tw-flex tw-items-center tw-mb-4 tw-z-50">
                <div className="tw-flex tw-items-center tw-justify-center tw-bg-[#28292b] tw-h-10 tw-w-10 tw-rounded-md tw-border tw-border-gray-600 tw-p-1 tw-mr-2 ">
                  {selectedProject.icon}
                </div>
                <span className="tw-text-white tw-text-xl">
                  {selectedProject.title}
                </span>
              </div>
              <div className="tw-w-full tw-h-[1px] tw-bg-gray-600 tw-mb-4"></div>
              <p className="tw-text-white tw-mb-4">
                {selectedProject.description}
              </p>
              <div className="tw-flex tw-space-x-4">
                <motion.a
                  href={selectedProject.sourceCode}
                  className={`tw-flex-1 tw-flex tw-items-center tw-justify-center tw-bg-purple-600 tw-text-white tw-text-center tw-py-2 tw-rounded-md tw-relative tw-overflow-hidden ${
                    !selectedProject.sourceCode
                      ? "tw-opacity-50 tw-cursor-not-allowed"
                      : ""
                  }`}
                  whileHover={selectedProject.sourceCode ? "hover" : undefined}
                  onClick={(e) =>
                    !selectedProject.sourceCode && e.preventDefault()
                  }
                >
                  <motion.div
                    className="tw-absolute tw-inset-0 tw-bg-purple-800"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 0 }}
                    variants={{
                      hover: {
                        scaleX: 1,
                        transition: { duration: 0.3, ease: "easeInOut" },
                      },
                    }}
                    style={{ transformOrigin: "left" }}
                  />
                  <span className="tw-relative tw-z-10 tw-flex tw-items-center">
                    <HiGlobeAlt className="tw-h-5 tw-w-5 tw-mr-2" />
                    Source Code
                  </span>
                </motion.a>
                <motion.a
                  href={selectedProject.liveLink}
                  className={`tw-flex-1 tw-flex tw-items-center tw-justify-center tw-bg-white tw-text-black tw-text-center tw-py-2 tw-rounded-md tw-relative tw-overflow-hidden ${
                    !selectedProject.liveLink
                      ? "tw-opacity-50 tw-cursor-not-allowed"
                      : ""
                  }`}
                  whileHover={selectedProject.liveLink ? "hover" : undefined}
                  onClick={(e) =>
                    !selectedProject.liveLink && e.preventDefault()
                  }
                >
                  <motion.div
                    className="tw-absolute tw-inset-0 tw-bg-gray-200"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 0 }}
                    variants={{
                      hover: {
                        scaleX: 1,
                        transition: { duration: 0.3, ease: "easeInOut" },
                      },
                    }}
                    style={{ transformOrigin: "left" }}
                  />
                  <span className="tw-relative tw-z-10 tw-flex tw-items-center">
                    <HiGlobeAlt className="tw-h-5 tw-w-5 tw-mr-2" />
                    Live Link
                  </span>
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectsInternal;

export const Projects = qwikify$(ProjectsInternal);
