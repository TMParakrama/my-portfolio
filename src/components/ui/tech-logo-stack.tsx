/** @jsxImportSource react */

import { qwikify$ } from "@builder.io/qwik-react";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaReact,
  FaHtml5,
  FaNodeJs,
  // FaAws,
  // FaGooglePlay,
  FaJava,
  FaCss3,
  FaDocker,
  FaBlender,
  FaVimeo,
  FaGithub,
  FaWindows,
} from "react-icons/fa";
import { RiFlutterLine, RiNextjsLine } from "react-icons/ri";
import {
  SiAnaconda,
  SiApacheguacamole,
  SiApachemaven,
  SiApachetomcat,
  SiAxios,
  SiBitbucket,
  SiC,
  SiCplusplus,
  SiDart,
  SiFirebase,
  SiGooglecloud,
  SiHibernate,
  SiInkscape,
  SiJavascript,
  SiJenkins,
  SiJira,
  SiMacos,
  SiMongoose,
  SiMysql,
  SiParrotsecurity,
  SiPerl,
  SiPhpmyadmin,
  SiPython,
  SiRedux,
  SiShell,
  SiSqlite,
  SiTailwindcss,
  SiQwik,
  // SiTypescript,
} from "react-icons/si";
import { DiYii } from "react-icons/di";
import { TbLambda } from "react-icons/tb";
import { BiLogoTypescript } from "react-icons/bi";

const logosData = [
  {
    icon: FaReact,
    title: "React_Native",
    bgColor: "tw-bg-blue-500",
  },
  {
    icon: SiQwik,
    title: "Qwik",
    bgColor: "tw-bg-blue-500",
  },
  {
    icon: FaNodeJs,
    title: "Node",
    bgColor: "tw-bg-yellow-500",
  },
  {
    icon: RiNextjsLine,
    title: "Next",
    bgColor: "tw-bg-red-500",
  },
  {
    icon: SiTailwindcss,
    title: "TailwindCSS",
    bgColor: "tw-bg-purple-500",
  },
  {
    icon: RiFlutterLine,
    title: "Flutter",
    bgColor: "tw-bg-indigo-500",
  },
  {
    icon: SiAxios,
    title: "Axios",
    bgColor: "tw-bg-pink-500",
  },
  {
    icon: SiRedux,
    title: "Redux",
    bgColor: "tw-bg-teal-500",
  },
  {
    icon: DiYii,
    title: "Yii2",
    bgColor: "tw-bg-orange-500",
  },
  {
    icon: SiHibernate,
    title: "Hibernate",
    bgColor: "tw-bg-cyan-500",
  },
  {
    icon: SiMongoose,
    title: "Mongoose",
    bgColor: "tw-bg-lime-500",
  },
  {
    icon: SiMysql,
    title: "MySQL",
    bgColor: "tw-bg-emerald-500",
  },
  {
    icon: SiSqlite,
    title: "SQLite",
    bgColor: "tw-bg-violet-500",
  },
  {
    icon: SiFirebase,
    title: "Firebase",
    bgColor: "tw-bg-fuchsia-500",
  },
  {
    icon: SiGooglecloud,
    title: "Google_Cloud",
    bgColor: "tw-bg-rose-500",
  },
  {
    icon: TbLambda,
    title: "AWS Lambda",
    bgColor: "tw-bg-amber-500",
  },
  {
    icon: SiJavascript,
    title: "JavaScript",
    bgColor: "tw-bg-blue-600",
  },
  {
    icon: SiDart,
    title: "Dart",
    bgColor: "tw-bg-green-600",
  },
  {
    icon: BiLogoTypescript,
    title: "TypeScript",
    bgColor: "tw-bg-yellow-600",
  },
  {
    icon: FaJava,
    title: "Java",
    bgColor: "tw-bg-red-600",
  },
  {
    icon: SiC,
    title: "C",
    bgColor: "tw-bg-purple-600",
  },
  {
    icon: SiCplusplus,
    title: "C++",
    bgColor: "tw-bg-indigo-600",
  },
  {
    icon: SiPython,
    title: "Python",
    bgColor: "tw-bg-pink-600",
  },
  {
    icon: SiPerl,
    title: "Perl",
    bgColor: "tw-bg-orange-600",
  },
  {
    icon: SiShell,
    title: "Shell",
    bgColor: "tw-bg-cyan-600",
  },
  {
    icon: FaHtml5,
    title: "HTML5",
    bgColor: "tw-bg-emerald-600",
  },
  {
    icon: FaCss3,
    title: "CSS3",
    bgColor: "tw-bg-sky-600",
  },
  {
    icon: SiAnaconda,
    title: "Anaconda",
    bgColor: "tw-bg-violet-600",
  },
  {
    icon: SiApacheguacamole,
    title: "Apache_Guacamole",
    bgColor: "tw-bg-fuchsia-600",
  },
  {
    icon: SiApachetomcat,
    title: "Apache_Tomcat",
    bgColor: "tw-bg-rose-600",
  },
  {
    icon: SiApachemaven,
    title: "Apache_Maven",
    bgColor: "tw-bg-amber-600",
  },
  {
    icon: FaDocker,
    title: "Docker",
    bgColor: "tw-bg-blue-700",
  },
  {
    icon: SiInkscape,
    title: "Inkscape",
    bgColor: "tw-bg-green-700",
  },
  {
    icon: FaBlender,
    title: "Blender",
    bgColor: "tw-bg-yellow-700",
  },
  {
    icon: SiJenkins,
    title: "Jenkins",
    bgColor: "tw-bg-red-700",
  },
  {
    icon: SiJira,
    title: "Jira",
    bgColor: "tw-bg-purple-700",
  },
  {
    icon: SiPhpmyadmin,
    title: "phpMyAdmin",
    bgColor: "tw-bg-indigo-700",
  },
  {
    icon: FaVimeo,
    title: "Vim",
    bgColor: "tw-bg-pink-700",
  },
  {
    icon: FaGithub,
    title: "GitHub",
    bgColor: "tw-bg-teal-700",
  },
  {
    icon: SiBitbucket,
    title: "BitBucket",
    bgColor: "tw-bg-cyan-700",
  },
  {
    icon: SiMacos,
    title: "MacOS",
    bgColor: "tw-bg-emerald-700",
  },
  {
    icon: SiParrotsecurity,
    title: "Parrot_Security",
    bgColor: "tw-bg-sky-700",
  },
  {
    icon: FaWindows,
    title: "Windows",
    bgColor: "tw-bg-violet-700",
  },
];

interface TechLogoStackProps {
  logos?: {
    icon: React.ComponentType<any>;
    title: string;
    bgColor: string;
  }[];
}

const TechLogoStackInternal = ({ logos }: TechLogoStackProps) => {
  const [currentLogoIndex, setCurrentLogoIndex] = useState(0);

  const techStackLogos = logos || logosData;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLogoIndex(
        (prevIndex) => (prevIndex + 1) % techStackLogos.length
      );
    }, 3000); // Change logo every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="tw-flex tw-items-center tw-justify-center tw-h-full">
      <div className="tw-relative tw-w-32 tw-h-32">
        {/* Skeleton Cards */}
        <div
          className="tw-absolute tw-inset-0 tw-w-full tw-h-full tw-bg-gray-500 tw-rounded-3xl"
          style={{ transform: "translateY(-40px) scale(0.8)", zIndex: 0 }}
        ></div>
        <div
          className="tw-absolute tw-inset-0 tw-w-full tw-h-full tw-bg-gray-50 tw-rounded-3xl"
          style={{ transform: "translateY(-20px) scale(0.9)", zIndex: 1 }}
        ></div>

        {/* Current Logo Card */}
        <AnimatePresence initial={false}>
          {techStackLogos.map(
            (logo, index) =>
              index === currentLogoIndex && (
                <motion.div
                  key={`${index}-tech-stack-logo`}
                  className={
                    "tw-absolute tw-inset-0 tw-w-full tw-h-full tw-rounded-3xl " +
                    logo.bgColor +
                    " tw-flex tw-items-center tw-justify-center"
                  }
                  initial={{ opacity: 0, scale: 0.5, y: -20 }}
                  animate={{ opacity: 1, scale: [1.1, 0.9, 1], y: 0 }}
                  exit={{ opacity: 0, scale: 0.5, y: 50 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  style={{ zIndex: 2 }}
                >
                  <logo.icon size={75} />
                </motion.div>
              )
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export const TechLogoStack = qwikify$(TechLogoStackInternal);
