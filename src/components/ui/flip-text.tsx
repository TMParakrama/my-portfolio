/** @jsxImportSource react */

import { qwikify$ } from "@builder.io/qwik-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface FlipTextAnimationProps {
  words: string[];
}
const FlipTextAnimationInternal = ({ words }: FlipTextAnimationProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const intervalRef = useRef<any | null>(null);

  const filpTextColors = [
    "tw-text-purple-500",
    "tw-text-green-500",
    "tw-text-red-500",
    "tw-text-yellow-500",
    "tw-text-teal-500",
  ];

  /**
   * @description Effect to set the interval
   */
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentStep((prevStep) => (prevStep + 1) % words.length);
    }, 3000);
    return () => clearInterval(intervalRef.current);
  }, [words.length]);

  return (
    <span className="tw-relative tw-text-primary tw-font-bold tw-flex-1">
      <span className="tw-invisible">{words[0]}</span>
      <span className="tw-absolute tw-left-0 tw-w-full tw-h-full tw-text-left">
        <AnimatePresence>
          {words.map(
            (word, index) =>
              currentStep === index && (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, rotateX: -90 }}
                  animate={{ opacity: 1, rotateX: 0 }}
                  exit={{ opacity: 0, rotateX: 90 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className={`tw-absolute tw-left-0 tw-w-full tw-text-pretty ${filpTextColors?.[currentStep]}`}
                  style={{ transformOrigin: "0% 0%" }}
                >
                  {word}
                </motion.span>
              )
          )}
        </AnimatePresence>
      </span>
    </span>
  );
};
export default FlipTextAnimationInternal;
export const FlipTextAnimation = qwikify$(FlipTextAnimationInternal);
