/** @jsxImportSource react */

import { qwikify$ } from "@builder.io/qwik-react";

import { useState, useEffect } from "react";

import { HiSquare3Stack3D } from "react-icons/hi2";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaReact,
  FaHtml5,
  FaNodeJs,
  FaCss3,
  FaDocker,
  FaGithub,
} from "react-icons/fa";
import { RiFlutterLine, RiNextjsLine } from "react-icons/ri";
import {
  // SiAnaconda,
  // SiApacheguacamole,
  SiApachemaven,
  SiApachetomcat,
  SiAxios,
  SiBitbucket,
  SiC,
  SiCplusplus,
  SiDart,
  SiFirebase,
  SiSupabase,
  SiGooglecloud,
  SiHibernate,
  SiJavascript,
  SiJenkins,
  SiJira,
  SiMysql,
  SiPerl,
  SiPhpmyadmin,
  SiPython,
  SiRedux,
  SiShell,
  SiSqlite,
  SiTailwindcss,
  SiQwik,
  SiHuggingface,
  SiBootstrap,
  SiDjango,
  SiMongoose,
  SiMongodb,
} from "react-icons/si";
import { TbBrandFramerMotion } from "react-icons/tb";
import { AiOutlineJava } from "react-icons/ai";

const languages = [
  {
    id: 1,
    title: "Java",
    icon: (
      <AiOutlineJava
        className="tw-h-6 tw-w-6 tw-text-[#ee252e]"
        width={24}
        height={24}
      />
    ),
    bgColor: "tw-bg-white",
  },
  {
    id: 2,
    title: "C++",
    icon: <SiCplusplus className="tw-h-6 tw-w-6" width={24} height={24} />,
    bgColor: "tw-bg-[#6399d1]",
  },
  {
    id: 3,
    title: "Python",
    icon: <SiPython className="tw-h-6 tw-w-6" width={24} height={24} />,
    bgColor: "tw-bg-blue-500",
  },
  {
    id: 4,
    title: "JavaScript",
    icon: <SiJavascript className="tw-h-6 tw-w-6" width={24} height={24} />,
    bgColor: "tw-bg-yellow-500",
  },
  {
    id: 5,
    title: "Dart",
    icon: <SiDart className="tw-h-6 tw-w-6" width={24} height={24} />,
    bgColor: "tw-bg-green-500",
  },
  {
    id: 6,
    title: "C",
    icon: <SiC className="tw-h-6 tw-w-6" width={24} height={24} />,
    bgColor: "tw-bg-red-500",
  },
  {
    id: 7,
    title: "Perl",
    icon: <SiPerl className="tw-h-6 tw-w-6" width={24} height={24} />,
    bgColor: "tw-bg-purple-500",
  },
  {
    id: 8,
    title: "Shell",
    icon: <SiShell className="tw-h-6 tw-w-6" width={24} height={24} />,
    bgColor: "tw-bg-gray-500",
  },
  {
    id: 9,
    title: "SQLite",
    icon: <SiSqlite className="tw-h-6 tw-w-6" width={24} height={24} />,
    bgColor: "tw-bg-blue-300",
  },
];

const techStacks = [
  {
    id: 1,
    title: "Node.js",
    icon: <FaNodeJs className="tw-h-6 tw-w-6" width={24} height={24} />,
    bgColor: "tw-bg-[#83cd29]",
  },
  {
    id: 2,
    title: "Bootstrap",
    icon: <SiBootstrap className="tw-h-6 tw-w-6" width={24} height={24} />,
    bgColor: "tw-bg-orange-500",
  },
  {
    id: 3,
    title: "CSS",
    icon: <FaCss3 className="tw-h-6 tw-w-6" width={24} height={24} />,
    bgColor: "tw-bg-emerald-500",
  },
  {
    id: 4,
    title: "Django",
    icon: <SiDjango className="tw-h-6 tw-w-6" width={24} height={24} />,
    bgColor: "tw-bg-sky-500",
  },
  {
    id: 5,
    title: "Framer Motion",
    icon: (
      <TbBrandFramerMotion className="tw-h-6 tw-w-6" width={24} height={24} />
    ),
    bgColor: "tw-bg-indigo-500",
  },
  {
    id: 6,
    title: "HTML",
    icon: <FaHtml5 className="tw-h-6 tw-w-6" width={24} height={24} />,
    bgColor: "tw-bg-red-500",
  },
  {
    id: 7,
    title: "Hugging Face",
    icon: <SiHuggingface className="tw-h-6 tw-w-6" width={24} height={24} />,
    bgColor: "tw-bg-yellow-500",
  },
  {
    id: 8,
    title: "Supabase",
    icon: <SiSupabase className="tw-h-6 tw-w-6" width={24} height={24} />,
    bgColor: "tw-bg-green-500",
  },
  {
    id: 9,
    title: "Tailwind CSS",
    icon: <SiTailwindcss className="tw-h-6 tw-w-6" width={24} height={24} />,
    bgColor: "tw-bg-blue-500",
  },
  {
    id: 10,
    title: "React",
    icon: <FaReact className="tw-h-6 tw-w-6" width={24} height={24} />,
    bgColor: "tw-bg-slate-500",
  },
  {
    id: 11,
    title: "Next.js",
    icon: <RiNextjsLine className="tw-h-6 tw-w-6" width={24} height={24} />,
    bgColor: "tw-bg-gray-800",
  },
  {
    id: 12,
    title: "Flutter",
    icon: <RiFlutterLine className="tw-h-6 tw-w-6" width={24} height={24} />,
    bgColor: "tw-bg-blue-400",
  },
  {
    id: 13,
    title: "Docker",
    icon: <FaDocker className="tw-h-6 tw-w-6" width={24} height={24} />,
    bgColor: "tw-bg-blue-600",
  },
  {
    id: 14,
    title: "Firebase",
    icon: <SiFirebase className="tw-h-6 tw-w-6" width={24} height={24} />,
    bgColor: "tw-bg-yellow-600",
  },
  {
    id: 15,
    title: "MongoDB",
    icon: (
      <SiMongodb
        className="tw-h-6 tw-w-6 tw-text-[#0e9349]"
        width={24}
        height={24}
      />
    ),
    bgColor: "tw-bg-white",
  },
  {
    id: 16,
    title: "MySQL",
    icon: (
      <SiMysql
        className="tw-h-6 tw-w-6 tw-text-[#007999]"
        width={24}
        height={24}
      />
    ),
    bgColor: "tw-bg-white",
  },
  {
    id: 17,
    title: "Redux",
    icon: <SiRedux className="tw-h-6 tw-w-6" width={24} height={24} />,
    bgColor: "tw-bg-purple-600",
  },
  {
    id: 18,
    title: "Git",
    icon: <FaGithub className="tw-h-6 tw-w-6" width={24} height={24} />,
    bgColor: "tw-bg-gray-700",
  },
  {
    id: 19,
    title: "Qwik",
    icon: <SiQwik className="tw-h-6 tw-w-6" width={24} height={24} />,
    bgColor: "tw-bg-purple-400",
  },
  {
    id: 20,
    title: "Google Cloud",
    icon: <SiGooglecloud className="tw-h-6 tw-w-6" width={24} height={24} />,
    bgColor: "tw-bg-blue-200",
  },
  {
    id: 21,
    title: "Jenkins",
    icon: <SiJenkins className="tw-h-6 tw-w-6" width={24} height={24} />,
    bgColor: "tw-bg-red-400",
  },
  {
    id: 22,
    title: "Jira",
    icon: <SiJira className="tw-h-6 tw-w-6" width={24} height={24} />,
    bgColor: "tw-bg-blue-400",
  },
  {
    id: 23,
    title: "Bitbucket",
    icon: <SiBitbucket className="tw-h-6 tw-w-6" width={24} height={24} />,
    bgColor: "tw-bg-blue-500",
  },
  {
    id: 24,
    title: "Apache Maven",
    icon: <SiApachemaven className="tw-h-6 tw-w-6" width={24} height={24} />,
    bgColor: "tw-bg-orange-600",
  },
  {
    id: 25,
    title: "Apache Tomcat",
    icon: <SiApachetomcat className="tw-h-6 tw-w-6" width={24} height={24} />,
    bgColor: "tw-bg-yellow-400",
  },
  {
    id: 26,
    title: "Axios",
    icon: <SiAxios className="tw-h-6 tw-w-6" width={24} height={24} />,
    bgColor: "tw-bg-purple-300",
  },
  {
    id: 27,
    title: "Hibernate",
    icon: <SiHibernate className="tw-h-6 tw-w-6" width={24} height={24} />,
    bgColor: "tw-bg-yellow-500",
  },
  {
    id: 28,
    title: "PHPMyAdmin",
    icon: <SiPhpmyadmin className="tw-h-6 tw-w-6" width={24} height={24} />,
    bgColor: "tw-bg-orange-500",
  },
  {
    id: 29,
    title: "Mongoose",
    icon: <SiMongoose className="tw-h-6 tw-w-6" width={24} height={24} />,
    bgColor: "tw-bg-red-600",
  },
];

const TechStackInternal = () => {
  const [visibleTechIndices, setVisibleTechIndices] = useState([0, 1]);
  const [visibleLangIndices, setVisibleLangIndices] = useState([0, 1]);

  /**
   * @description Effect to set the interval
   */
  useEffect(() => {
    const techInterval = setInterval(() => {
      visibleTechIndices.forEach((_, rowIndex) => {
        setTimeout(() => {
          setVisibleTechIndices((prevIndices) => {
            const newIndices = [...prevIndices];
            newIndices[rowIndex] =
              (newIndices[rowIndex] + 3) % techStacks.length;
            return newIndices;
          });
        }, rowIndex * 200);
      });
    }, 6000);

    const langInterval = setInterval(() => {
      visibleLangIndices.forEach((_, rowIndex) => {
        setTimeout(() => {
          setVisibleLangIndices((prevIndices) => {
            const newIndices = [...prevIndices];
            newIndices[rowIndex] =
              (newIndices[rowIndex] + 3) % languages.length;
            return newIndices;
          });
        }, rowIndex * 200);
      });
    }, 6000);

    return () => {
      clearInterval(techInterval);
      clearInterval(langInterval);
    };
  }, [visibleTechIndices, visibleLangIndices]);

  /**
   * @description Variants for the animation
   */
  const variants = {
    enter: {
      x: "100%",
      opacity: 0,
      transition: { type: "spring", stiffness: 100 },
    },
    center: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
    exit: {
      x: "-100%",
      opacity: 0,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <div className="tw-flex tw-flex-col tw-w-full tw-items-center tw-justify-center">
      <div className="tw-flex tw-items-center tw-mb-2 tw-mt-4">
        <HiSquare3Stack3D className="tw-h-6 tw-w-6 tw-text-purple-600" />
        <span className="tw-ml-2 tw-text-gray-400 tw-text-sm">Tech Stack</span>
      </div>
      <div className="tw-w-full tw-mt-4 tw-relative tw-h-96 tw-overflow-hidden">
        <div className="tw-space-y-2">
          <div className="tw-w-full tw-h-[1px] tw-bg-gray-300"></div>

          <h3 className="tw-text-white tw-text-lg tw-mb-2 tw-text-center">
            Languages I use
          </h3>
          <div className="tw-w-full tw-h-[1px] tw-bg-gray-300"></div>

          {visibleLangIndices.map((index, rowIndex) => (
            <div key={rowIndex} className="tw-w-full tw-relative tw-h-16">
              <AnimatePresence initial={false}>
                <motion.div
                  key={`${languages[index].id}-languages`}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  variants={variants}
                  className="tw-absolute tw-w-full tw-flex tw-justify-center tw-items-center tw-mr-2"
                >
                  <div className="tw-w-full tw-px-2">
                    <div className="tw-bg-[#1a1c1e] tw-rounded-md tw-flex tw-items-center tw-p-2 tw-border tw-border-gray-700">
                      <div
                        className={`tw-flex tw-items-center tw-justify-center ${languages[index].bgColor} tw-h-10 tw-w-10 tw-rounded-md tw-border tw-border-gray-600 tw-p-1 tw-mr-2`}
                      >
                        {languages[index].icon}
                      </div>
                      <span className="tw-text-white">
                        {languages[index].title}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          ))}
          <div className="tw-w-full tw-h-[1px] tw-bg-gray-300"></div>

          <h3 className="tw-text-white tw-text-lg tw-mb-2 tw-text-center">
            Technologies I use
          </h3>
          <div className="tw-w-full tw-h-[1px] tw-bg-gray-300"></div>

          {visibleTechIndices.map((index, rowIndex) => (
            <div key={rowIndex} className="tw-w-full tw-relative tw-h-16">
              <AnimatePresence initial={false}>
                <motion.div
                  key={`${techStacks[index].id}-technologies`}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  variants={variants}
                  className="tw-absolute tw-w-full tw-flex tw-justify-center tw-items-center tw-mr-2"
                >
                  <div className="tw-w-full tw-px-2">
                    <div className="tw-bg-[#1a1c1e] tw-rounded-md tw-flex tw-items-center tw-p-2 tw-border tw-border-gray-700">
                      <div
                        className={`tw-flex tw-items-center tw-justify-center ${techStacks[index].bgColor} tw-h-10 tw-w-10 tw-rounded-md tw-border tw-border-gray-600 tw-p-1 tw-mr-2`}
                      >
                        {techStacks[index].icon}
                      </div>
                      <span className="tw-text-white">
                        {techStacks[index].title}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const TechStack = qwikify$(TechStackInternal);
