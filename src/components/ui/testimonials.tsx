/** @jsxImportSource react */

import { qwikify$ } from "@builder.io/qwik-react";

import { useRef } from "react";
import { HiChatBubbleLeftRight } from "react-icons/hi2";
import { motion } from "framer-motion";

const testimonials = [
  {
    id: 1,
    text: "Parakrama delivered an exceptional mobile app that exceeded our expectations. His technical expertise and attention to detail resulted in a polished, user-friendly product that our customers love.",
    author: "Lakshan Sampath, CEO at Visio Innovation",
  },
  {
    id: 2,
    text: "Working with Parakrama on our web application was a great experience. He has strong full-stack development skills and consistently delivered high-quality code on schedule.",
    author: "Sanusha Randika, Software Engineer",
  },
  {
    id: 3,
    text: "As a QA engineer, I was impressed by Parakrama's code quality and debugging practices. His applications were well-structured, thoroughly tested, and had minimal defects. He was always receptive to feedback and quick to resolve any issues identified during testing.",
    author: "Manjula Bandara, QA Lead",
  },
];

const TestimonialsInternal = () => {
  const containerRef = useRef(null);

  const variants = {
    animate: {
      y: [0, "-100%"],
      transition: {
        y: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 80,
          ease: "linear",
        },
      },
    },
  };

  return (
    <div className="tw-flex tw-w-full tw-flex-col tw-items-center tw-justify-center tw-mt-4">
      <div className="tw-flex tw-items-center tw-mb-2">
        <HiChatBubbleLeftRight className="tw-h-6 tw-w-6 tw-text-purple-600" />
        <span className="tw-ml-2 tw-text-gray-400 tw-text-sm">
          Testimonials
        </span>
      </div>
      <h2 className="tw-text-white tw-text-xl tw-mb-2 tw-text-center">
        Clients Word{" "}
      </h2>
      <div className="tw-w-full tw-h-[1px] tw-bg-gray-600 tw-mb-2 tw-pb-2"></div>
      <div
        className="tw-overflow-hidden tw-w-full tw-h-64  sm:tw-h-96 md:tw-h-60 xl:tw-h-52 tw-px-2"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
        }}
      >
        <motion.div
          ref={containerRef}
          variants={variants}
          animate="animate"
          style={{ width: "100%", display: "flex", flexDirection: "column" }}
          className="tw-flex tw-flex-col tw-items-center tw-gap-4"
        >
          {testimonials
            .concat(testimonials)
            .concat(testimonials)
            .map((testimonial, index) => (
              <motion.div
                key={index}
                style={{
                  width: "calc(100% - 38px)",
                }}
                className="tw-mw-full tw-flex-1 tw-bg-[#1a1c1e] tw-border tw-border-gray-700 tw-rounded-xl tw-py-1 tw-px-2 tw-mx-3 tw-flex-shrink-0"
              >
                <p className="tw-text-white tw-mb-2">
                  &quot;{testimonial.text}&quot;
                </p>
                <p className="tw-text-gray-400 tw-text-sm">
                  - {testimonial.author}
                </p>
              </motion.div>
            ))}
        </motion.div>
      </div>
    </div>
  );
};

export const Testimonials = qwikify$(TestimonialsInternal);
