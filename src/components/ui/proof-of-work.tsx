/** @jsxImportSource react */

import { qwikify$ } from "@builder.io/qwik-react";
import { useRef, useState } from "react";
import { HiAcademicCap, HiArrowTopRightOnSquare } from "react-icons/hi2";
import { motion, AnimatePresence } from "framer-motion";
import { HiCode } from "react-icons/hi";

const workExperience = [
  {
    id: 1,
    name: "Portfolio",
    urls: [
      {
        url: "https://portfolio-parakrama.netlify.app/",
        appName: "My Portfolio",
        repoUrl: "https://github.com/TMParakrama/my-portfolio",
      },
    ],
    docPage: "Portfolio",
  },
  {
    id: 2,
    name: "Souffle",
    urls: [
      {
        url: "https://app.souffle.com.au",
        appName: "Souffle - Financial Modeler App",
      },
      {
        url: "https://my.souffle.com.au",
        appName: "Souffle - Client App",
      },
      {
        url: "https://onboarding.souflle.com.au",
        appName: "Souffle - Lead's Pre-Meeting Form",
      },
    ],
    docPage: "Souffle",
  },
  {
    id: 3,
    name: "IPass",
    urls: [
      {
        url: "https://play.google.com/store/apps/details?id=com.visioinnovation.ipasscenter",
        appName: "IPass - Center App(Institute Management App",
      },
      {
        url: "https://play.google.com/store/apps/details?id=com.visioinnovation.ipassclient",
        appName: "IPass - Client App",
      },
    ],
    docPage: "iPass",
  },
];

const additionalExperience = [
  {
    id: 1,
    name: "TourGuru",
    urls: [{ url: "", appName: "TourGuru - Travel App", repoUrl: "" }],
    docPage: "TourGuru",
  },
  {
    id: 2,
    name: "Kredible",
    urls: [
      {
        url: "",
        appName: "Kredible - Micro Finance Insitute management app",
        repoUrl: "",
      },
    ],
    docPage: "Kredible",
  },
  {
    id: 3,
    name: "eDoc",
    urls: [
      {
        url: "",
        appName: "eDoc - Doctor Consultation and Patient management mobile app",
        repoUrl: "",
      },
    ],
    docPage: "eDoc",
  },
];

interface AppURLType {
  url?: string;
  appName?: string;
  repoUrl?: string;
}
interface ProofOfWorkType {
  id: number;
  name: string;
  urls?: AppURLType[] | undefined | null;
}

const ProofWorkInternal = () => {
  const containerRef1 = useRef(null);
  const containerRef2 = useRef(null);
  const [selectedProject, setSelectedProject] =
    useState<null | ProofOfWorkType>(null);
  const [isHovered1, setIsHovered1] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);

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

  const variants2 = {
    animate: {
      x: ["calc(-50% - 1rem)", 0],
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

  const handleClose = () => setSelectedProject(null);

  const handleBackdropClick = (e: any) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const isUrlClickable = (url: string | undefined) => url && url.length > 0;

  /**
   * Handles navigation to the documentation page for the selected project.
   * @param docPage The docPage string to navigate to (e.g., 'Portfolio')
   */
  const handleNavigateToDoc = (docPage?: string) => {
    if (docPage) {
      window.location.href = `/docs/${docPage}`;
    }
  };

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
          animate={!isHovered1 && "animate"}
          style={{ width: "fit-content", display: "flex" }}
          className="tw-flex tw-justify-center tw-items-center tw-gap-5 tw-bg-transparent"
          onMouseEnter={() => setIsHovered1(true)}
          onMouseLeave={() => setIsHovered1(false)}
        >
          {workExperience
            .concat(workExperience)
            .concat(workExperience)
            .map((data, index) => (
              <motion.div
                key={index}
                className="tw-w-36 tw-bg-[#1a1c1e] tw-border tw-border-gray-700 tw-rounded-xl tw-py-3 tw-px-0 tw-flex-shrink-0 tw-flex tw-items-center tw-justify-center tw-cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNavigateToDoc(data.docPage)}
              >
                <div>
                  <h1 className="tw-font-medium tw-text-white">{data.name}</h1>
                </div>
              </motion.div>
            ))}
        </motion.div>
      </div>
      <div
        className="tw-overflow-hidden tw-w-full tw-h-[290px] tw-bg-transparent"
        // style={{
        //   maskImage:
        //     "linear-gradient(to left, transparent 0%, black 10%, black 90%, transparent 99%)",
        // }}
      >
        <motion.div
          ref={containerRef2}
          variants={variants2}
          animate={!isHovered2 && "animate"}
          style={{ width: "fit-content", display: "flex" }}
          className="tw-flex tw-justify-center tw-gap-5 tw-bg-transparent"
          onMouseEnter={() => setIsHovered2(true)}
          onMouseLeave={() => setIsHovered2(false)}
        >
          {additionalExperience
            .concat(additionalExperience)
            .concat(additionalExperience)
            .map((data, index) => (
              <motion.div
                key={index}
                className="tw-w-36 tw-bg-[#1a1c1e] tw-border tw-border-gray-700 tw-rounded-xl tw-py-3 tw-px-0 tw-flex-shrink-0 tw-flex tw-items-center tw-justify-center tw-cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNavigateToDoc(data.docPage)}
              >
                <div>
                  <h1 className="tw-font-medium tw-text-white">{data.name}</h1>
                </div>
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
              <div className="tw-flex tw-items-center tw-mb-4">
                <h3 className="tw-text-white tw-text-xl">
                  {selectedProject.name}
                </h3>
              </div>
              <div className="tw-w-full tw-h-[1px] tw-bg-gray-600 tw-mb-4"></div>
              <div className="tw-space-y-4">
                {(selectedProject.urls || []).map((item, index) => (
                  <div
                    key={index}
                    className="tw-bg-[#28292b] tw-p-4 tw-rounded-lg"
                  >
                    <h4 className="tw-text-white tw-mb-3">{item.appName}</h4>
                    <div className="tw-flex tw-space-x-4">
                      <motion.a
                        href={item.url}
                        className={`tw-flex-1 tw-flex tw-items-center tw-justify-center tw-bg-purple-600 tw-text-white tw-py-2 tw-rounded-md ${
                          !isUrlClickable(item.url)
                            ? "tw-opacity-50 tw-cursor-not-allowed"
                            : "tw-cursor-pointer"
                        }`}
                        whileHover={
                          isUrlClickable(item.url) ? { scale: 1.05 } : {}
                        }
                        whileTap={
                          isUrlClickable(item.url) ? { scale: 0.95 } : {}
                        }
                        onClick={(e) =>
                          !isUrlClickable(item.url) && e.preventDefault()
                        }
                      >
                        <HiArrowTopRightOnSquare className="tw-mr-2" />
                        Explore App
                      </motion.a>
                      <motion.a
                        href={item.repoUrl}
                        className={`tw-flex-1 tw-flex tw-items-center tw-justify-center tw-bg-gray-700 tw-text-white tw-py-2 tw-rounded-md ${
                          !isUrlClickable(item.repoUrl)
                            ? "tw-opacity-50 tw-cursor-not-allowed"
                            : "tw-cursor-pointer"
                        }`}
                        whileHover={
                          isUrlClickable(item.repoUrl) ? { scale: 1.05 } : {}
                        }
                        whileTap={
                          isUrlClickable(item.repoUrl) ? { scale: 0.95 } : {}
                        }
                        onClick={(e) =>
                          !isUrlClickable(item.repoUrl) && e.preventDefault()
                        }
                      >
                        <HiCode className="tw-mr-2" />
                        Source Code
                      </motion.a>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const ProofWork = qwikify$(ProofWorkInternal);
