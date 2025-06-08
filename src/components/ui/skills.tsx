/** @jsxImportSource react */

import { qwikify$ } from "@builder.io/qwik-react";
import { useRef, useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { HiCode, HiLightningBolt } from "react-icons/hi";
import { HiAcademicCap, HiBeaker, HiCog, HiCommandLine } from "react-icons/hi2";

const rectangles = [
  {
    id: 1,
    title: "(B.Sc.) IT",
    icon: <HiAcademicCap className="tw-h-6 tw-w-6 tw-text-white" />,
    description:
      "Bachelor of Science in Information Technology with specialization in Software Engineering",
  },
  {
    id: 2,
    title:
      "Expertise in Software Development Life Cycle (SDLC) methodologies including Agile, Prototyping, Rapid Application Development (RAD), and Spiral models",
    icon: <HiCog className="tw-h-6 tw-w-6 tw-text-white" />,
    description:
      "Proficient in various SDLC methodologies with hands-on experience in implementing Agile practices, prototyping, RAD, and Spiral models in real-world projects",
    sourceCode: "https://github.com/username/e-learning-platform",
    liveLink: "https://e-learning-platform.live",
  },
  {
    id: 3,
    title:
      "Mentoring, Leading and architectural design for development of software products",
    icon: <HiCode className="tw-h-6 tw-w-6 tw-text-white" />,
    description:
      "Experienced in leading development teams, mentoring junior developers, and designing scalable software architectures for enterprise-level applications",
  },
  {
    id: 4,
    title: "Breakpoints, stepping, backtracing and log analysis for debugging",
    icon: <HiBeaker className="tw-h-6 tw-w-6 tw-text-white" />,
    description:
      "Skilled in advanced debugging techniques including breakpoint analysis, step-through debugging, stack trace analysis, and comprehensive log analysis for troubleshooting complex systems",
  },
  {
    id: 5,
    title:
      "Quick adaptation to technologies and staying up to date with OWASP, CERT and CWE for best practices",
    icon: <HiLightningBolt className="tw-h-6 tw-w-6 tw-text-white" />,
    description:
      "Proven ability to quickly learn and adapt to new technologies while maintaining up-to-date knowledge of security best practices through OWASP, CERT, and CWE standards",
  },
];

const SkillsInternal = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  /**
   * @description Effect to animate the skills
   */
  useEffect(() => {
    if (!isHovered) {
      controls.start({
        y: [scrollPosition + "%", scrollPosition - 100 + "%"],
        transition: {
          y: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 120,
            ease: "linear",
          },
        },
      });
    }
  }, [controls, scrollPosition, isHovered]);

  /**
   * @function handleHoverStart
   * @returns {void}
   * @description Handle hover start
   */
  const handleHoverStart = () => {
    setIsHovered(true);
    controls.stop();
    if (containerRef.current) {
      const transform = window.getComputedStyle(containerRef.current).transform;
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
  };
  /**
   * @function handleHoverEnd
   * @returns {void}
   * @description Handle hover end
   */
  const handleHoverEnd = () => {
    if (containerRef.current) {
      const transform = window.getComputedStyle(containerRef.current).transform;
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
    setIsHovered(false);
  };

  return (
    <div className="tw-flex tw-w-full tw-flex-col tw-items-center tw-justify-center tw-mt-4">
      <div className="tw-flex tw-items-center tw-mb-2">
        <HiCommandLine className="tw-h-6 tw-w-6 tw-text-purple-600" />
        <span className="tw-ml-2 tw-text-gray-400 tw-text-sm">My Skills</span>
      </div>
      <h2 className="tw-text-white tw-text-xl tw-mb-2 tw-text-center">
        Skills and Methodologies
      </h2>
      <div className="tw-w-full tw-h-[1px] tw-bg-gray-600 tw-mb-4"></div>
      <div
        className="tw-overflow-hidden tw-w-full tw-h-64 sm:tw-h-64 md:tw-h-64 xl:tw-h-52 tw-px-2"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
        }}
      >
        <motion.div
          ref={containerRef}
          animate={controls}
          style={{ width: "100%", display: "flex", flexDirection: "column" }}
          className="tw-flex tw-flex-col tw-items-center tw-gap-4 tw-justify-center tw-min-w-full"
        >
          {rectangles
            .concat(rectangles)
            .concat(rectangles)
            .map((rectangle, index) => (
              <motion.div
                key={index}
                style={{
                  width: "calc(100% - 64px)",
                }}
                className="tw-flex-1 tw-bg-[#1a1c1e] tw-border tw-border-gray-700 tw-rounded-xl tw-py-3 tw-px-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onHoverStart={handleHoverStart}
                onHoverEnd={handleHoverEnd}
              >
                <div className="tw-flex tw-items-center tw-gap-3">
                  <div className="tw-flex tw-items-center tw-justify-center tw-bg-[#28292b] tw-h-10 tw-w-10 tw-rounded-md tw-border tw-border-gray-600 tw-p-1">
                    {rectangle.icon}
                  </div>
                  <span className="tw-text-white tw-text-sm">
                    {rectangle.title}
                  </span>
                </div>
                <p className="tw-text-gray-400 tw-mt-2 tw-font-light tw-text-xs">
                  {rectangle.description}
                </p>
              </motion.div>
            ))}
        </motion.div>
      </div>
    </div>
  );
};

export default SkillsInternal;

export const Skills = qwikify$(SkillsInternal);
