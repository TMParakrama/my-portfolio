/** @jsxImportSource react */

import { qwikify$ } from "@builder.io/qwik-react";

import { motion } from "framer-motion";
import { FaLinkedin, FaHandshake } from "react-icons/fa";
import { HiChatBubbleOvalLeftEllipsis } from "react-icons/hi2";

const CollaborateInternal = () => {
  /**
   * @function handleWhatsappMessage
   * @returns {void}
   * @description Open whatsapp message in new tab
   */
  const handleWhatsappMessage = () => {
    const phoneNumber = "+94705143504"; // Replace with the desired phone number
    // const message = 'Hello!'; // Optional: Add a default message
    const whatsappURL = `https://wa.me/${phoneNumber}`; //?text=${encodeURIComponent(message)}
    window.open(whatsappURL, "_blank");
  };
  /**
   * @function handleLinkedInProfile
   * @returns {void}
   * @description Open linkedin profile in new tab
   */
  const handleLinkedInProfile = () => {
    const linkedInUrl = `https://www.linkedin.com/in/parakrama-thennakoon-msbwtm`; //linkedIn url
    window.open(linkedInUrl, "_blank");
  };

  return (
    <div className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-h-full tw-p-4 tw-px-4 sm:tw-px-10">
      <div className="tw-w-16 tw-h-16 tw-rounded-full tw-bg-[#28292b] tw-border tw-border-gray-600 tw-flex tw-items-center tw-justify-center tw-mb-4">
        <FaHandshake className="tw-w-8 tw-h-8 tw-text-purple-600" />
      </div>
      <h2 className="tw-text-2xl tw-text-white tw-mb-2">
        Let&apos;s Work Together
      </h2>
      <h3 className="tw-text-sm tw-text-gray-400 tw-mb-4">
        Let&apos;s transform your ideas into reality for your projects
      </h3>
      <motion.button
        className="tw-w-full tw-bg-[#28292b] tw-border tw-border-gray-800 tw-text-white tw-py-3 tw-rounded-xl nded-lg tw-flex tw-items-center tw-justify-center tw-mb-3 tw-relative tw-overflow-hidden"
        whileHover="hover"
        onClick={handleWhatsappMessage}
      >
        <motion.div
          className="tw-absolute tw-inset-0 tw-bg-purple-900"
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
          <HiChatBubbleOvalLeftEllipsis className="tw-w-5 tw-h-5 tw-mr-2 tw-text-purple-600" />
          Contact Me
        </span>
      </motion.button>
      <motion.button
        className="tw-w-full tw-bg-[#28292b] tw-border tw-border-gray-800 tw-text-white tw-py-3 tw-rounded-xl tw-flex tw-items-center tw-justify-center tw-relative tw-overflow-hidden"
        whileHover="hover"
        onClick={handleLinkedInProfile}
      >
        <motion.div
          className="tw-absolute tw-inset-0 tw-bg-purple-900"
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
          <FaLinkedin className="tw-w-5 tw-h-5 tw-mr-2 tw-text-purple-600" />
          Find me on LinkedIn
        </span>
      </motion.button>
    </div>
  );
};

export const Collaborate = qwikify$(CollaborateInternal);
