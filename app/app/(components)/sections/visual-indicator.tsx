import React from "react";
import { CheckCircle2, Circle, Dot } from "lucide-react";
import { motion } from "framer-motion";

interface Step {
  title: string;
}

interface Props {
  currentStep: number;
  steps: Step[];
}

const VisualStepper = ({ currentStep, steps }: Props) => {
  return (
    <>
      <div className="flex justify-center gap-6 items-center md:hidden mb-6">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isActive = stepNumber === currentStep;

          return (
            <div
              key={index}
              className="flex flex-col items-center gap-1 min-w-[32px]"
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: isActive ? 1.2 : 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {isCompleted ? (
                  <CheckCircle2 className="text-green-500 w-5 h-5" />
                ) : isActive ? (
                  <Dot className="text-orange-500 w-6 h-6" />
                ) : (
                  <Circle className="text-gray-300 w-5 h-5" />
                )}
              </motion.div>

             
              {isActive && (
                <p className="text-xs text-orange-500 font-medium text-center max-w-[64px]">
                  {step.title}
                </p>
              )}


              {index !== steps.length && (
                <div className="w-6 h-px bg-gray-300 mt-1" />
              )}
            </div>
          );
        })}
      </div>

      <div className="hidden md:flex flex-col gap-10 pt-4 pr-4 border-r border-gray-200 min-w-[160px]">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isActive = stepNumber === currentStep;

          return (
            <div key={index} className="flex items-start gap-3 relative">
              <div className="flex flex-col items-center">
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: isActive ? 1.1 : 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="text-green-500 w-4 h-4" />
                  ) : isActive ? (
                    <Dot className="text-orange-500 w-5 h-5" />
                  ) : (
                    <Circle className="text-gray-300 w-4 h-4" />
                  )}
                </motion.div>

                {index !== steps.length - 1 && (
                  <div className="w-px flex-1 bg-gray-200 mt-1 mb-1" />
                )}
              </div>

              <div className="pt-0.5">
                <p
                  className={`text-sm ${
                    isActive
                      ? "text-orange-500 font-semibold"
                      : isCompleted
                      ? "text-gray-700"
                      : "text-gray-400"
                  }`}
                >
                  {step.title}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default VisualStepper;
