/** @jsxImportSource react */

import { qwikify$ } from "@builder.io/qwik-react";

import { useState } from "react";
import {
  HiMapPin,
  HiAcademicCap,
  HiClock,
  HiBriefcase,
  HiLanguage,
} from "react-icons/hi2";
import { MdOutlineLanguage } from "react-icons/md";
import { RiSpeakFill, RiWhatsappFill, RiMailSendFill } from "react-icons/ri";
// import Lottie from "react-lottie";
import { motion } from "framer-motion";

import FlipTextAnimation from "./flip-text";
import ShinyText from "./shiny-text/shiny-text";
// import downloadAnimationData from "../../media/assets/animations/lotties/download.json";
// import messageAnimationData from "~/media/assets/animations/lotties/message.json";
// import emailAnimationData from "~/media/assets/animations/lotties/email.json";
// import { Avatar } from "@mui/material";

const tags = [
  {
    name: "Sri Lanka",
    icon: <HiMapPin className="tw-h-4 tw-w-4 tw-text-purple-500" />,
  },
  {
    name: "Native: Sinhala",
    icon: <RiSpeakFill className="tw-h-4 tw-w-4 tw-text-purple-500" />,
  },
  {
    name: "Fluent: English",
    icon: <MdOutlineLanguage className="tw-h-4 tw-w-4 tw-text-purple-500" />,
  },
  {
    name: "Basic: Japanese",
    icon: <HiLanguage className="tw-h-4 tw-w-4 tw-text-purple-500" />,
  },
  {
    name: "SLIIT",
    icon: <HiAcademicCap className="tw-h-4 tw-w-4 tw-text-purple-500" />,
  },
  {
    name: "GMT+5.30",
    icon: <HiClock className="tw-h-4 tw-w-4 tw-text-purple-500" />,
  },
  {
    name: "Senior Software Engineer",
    icon: <HiBriefcase className="tw-h-4 tw-w-4 tw-text-purple-500" />,
  },
  // {
  //   name: "Visio",
  //   icon: <BuildingOffice2Icon className="tw-h-4 tw-w-4 tw-text-purple-500" />,
  // },
  // {
  //   name: "Climbing",
  //   icon: <SparklesIcon className="tw-h-4 tw-w-4 tw-text-purple-500" />,
  // },
];

const roles = [
  "Full Stack Developer",
  "Mobile App Developer",
  "Tester",
  "Coder",
];

const ProfileBoxInternal = () => {
  // const [isDownloadStopped, setIsDownloadStopped] = useState(true);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isMessageStopped, setIsMessageStopped] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isCallStopped, setIsCallStopped] = useState(true);

  // const defaultOptions = (animationData: object) => ({
  //   loop: true,
  //   autoplay: false,
  //   animationData: animationData,
  //   rendererSettings: {
  //     preserveAspectRatio: "xMidYMid slice",
  //   },
  // });

  /**
   * @function handleSendEmail
   * @returns {void}
   * @description Handle send email
   */
  const handleSendEmail = () => {
    const email = "t.m.parakrama@gmail.com";
    const subject = "<---Your Subject--->";
    const body = `Hi Parakrama,\n\nI came across your portfolio and would like to discuss potential opportunities.\n\nBest regards`;

    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="tw-relative tw-bg-[#121416] tw-rounded-xl tw-col-span-2 tw-row-span-2 tw-h-auto sm:tw-h-auto tw-border-2 tw-border-[#28292b] sm:col-span-4 md:col-span-3 tw-flex tw-flex-col tw-py-10 max-sm:tw-pt-4 tw-px-6 tw-overflow-hidden">
      <div className="tw-flex tw-flex-row tw-mb-4 tw-items-center tw-justify-between tw-w-full">
        <div className="tw-flex tw-flex-1 tw-items-center">
          {/* <div className="tw-rounded-full tw-h-28 tw-w-28 tw-overflow-hidden tw-border-none tw-bg-none tw-relative">
            <Avatar
              src={"../../media/assets/images/my-profile-image.jpg"}
              alt="Parakrama Thennakoon"
              className="tw-h-full tw-w-full tw-object-cover"
            />
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
          </div> */}
          <div className="tw-flex tw-flex-1 tw-flex-col tw-justify-start tw-ml-4 tw-pt-1 tw-overflow-hidden">
            <div className="tw-inline-flex tw-items-center tw-gap-x-1.5 tw-rounded-full tw-px-4 tw-py-2 tw-text-xs tw-font-medium tw-text-white tw-ring-1 tw-ring-inset tw-ring-[#28292b] tw-mb-2 tw-relative tw-overflow-hidden">
              <svg
                className="tw-h-1.5 tw-w-1.5 tw-fill-green-400"
                viewBox="0 0 6 6"
                aria-hidden="true"
              >
                <circle cx={3} cy={3} r={3} />
              </svg>
              Onlook for opportunities
              <motion.div
                className="tw-absolute tw-top-0 tw-left-0 tw-w-full tw-h-full tw-bg-gradient-to-r tw-from-transparent tw-via-white tw-to-transparent tw-opacity-30"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  duration: 5,
                  ease: "linear",
                  repeat: Infinity,
                  repeatType: "loop",
                }}
              />
            </div>
            <span className="tw-text-white tw-text-lg">
              <ShinyText
                text="Parakrama Thennakoon"
                disabled={false}
                speed={5}
              />
            </span>
            <div className="tw-flex tw-flex-1 tw-gap-2 tw-justify-center tw-items-center">
              <span className="tw-flex tw-text-white tw-text-sm tw-mt-2">
                I am a
              </span>
              <span className="tw-flex tw-flex-1 tw-mt-2">
                <FlipTextAnimation words={roles} />
              </span>
            </div>
          </div>
        </div>
        {/* <button
          className="tw-absolute tw-top-4 tw-right-4 tw-inline-flex tw-items-center tw-justify-center tw-px-4 tw-py-2 tw-border tw-border-transparent tw-text-sm tw-font-medium tw-rounded-md tw-shadow-sm tw-text-white tw-bg-[#3a3b3c] hover:tw-bg-[#505152] tw-focus:outline-none tw-focus:ring-2 tw-focus:ring-offset-2 tw-focus:ring-[#121416] tw-mt- z-40 sm:inline-flex"
          onMouseEnter={() => setIsDownloadStopped(false)}
          onMouseLeave={() => setIsDownloadStopped(true)}
        >
          <span className="tw-mr-2">Download</span> */}
        {/* <Lottie
            options={defaultOptions(downloadAnimationData)}
            height={20}
            width={20}
            isStopped={isDownloadStopped}
            isPaused={false}
            style={{ marginBottom: "8px" }}
          /> */}
        {/* </button> */}
      </div>
      <div className="tw-bg-[#121412] tw-border-2 tw-border-[#28292b] tw-rounded-lg tw-w-auto tw-h-42 sm:h-24 tw-p-4">
        <div className="tw-flex tw-flex-wrap tw-gap-2">
          {tags.map((tag, index) => (
            <div
              key={index}
              className="tw-inline-flex tw-items-center tw-gap-x-1.5 tw-rounded-full tw-px-4 tw-py-1 tw-text-xs tw-font-medium tw-text-white tw-bg-[#28292b]"
            >
              {tag.icon}
              {tag.name}
            </div>
          ))}
        </div>
      </div>
      <div className="tw-flex tw-gap-2 tw-mb-1 tw-w-full tw-mt-6">
        <button
          className="tw-w-1/2 tw-flex tw-items-center tw-justify-center tw-px-4 tw-py-3 tw-border tw-border-transparent tw-text-sm tw-font-medium tw-rounded-md tw-shadow-sm tw-text-white tw-bg-[#28292b] hover:tw-bg-[#3a3b3c] tw-z-40 "
          onMouseEnter={() => setIsMessageStopped(false)}
          onMouseLeave={() => setIsMessageStopped(true)}
          onClick={() => {
            const phoneNumber = "+94705143504"; // Replace with the desired phone number
            // const message = 'Hello!'; // Optional: Add a default message
            const whatsappURL = `https://wa.me/${phoneNumber}`; //?text=${encodeURIComponent(message)}
            window.open(whatsappURL, "_blank");
          }}
        >
          <div className="tw-flex tw-items-center tw-gap-3">
            <RiWhatsappFill size={20} />
            <span>Message Me</span>
          </div>
        </button>
        <button
          className="tw-w-1/2 tw-flex tw-items-center tw-justify-center tw-px-4 tw-py-2 tw-border tw-border-transparent tw-text-sm tw-font-medium tw-rounded-md tw-shadow-sm tw-text-white tw-bg-[#28292b] hover:tw-bg-[#3a3b3c] tw-z-40"
          onMouseEnter={() => setIsCallStopped(false)}
          onMouseLeave={() => setIsCallStopped(true)}
          onClick={handleSendEmail}
        >
          <div className="tw-flex tw-items-center overflow-clip tw-gap-3">
            <RiMailSendFill size={20} />
            <span>Send a mail</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export const ProfileBox = qwikify$(ProfileBoxInternal);
