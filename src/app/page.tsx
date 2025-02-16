"use client";

import { useAnimate } from "motion/react";
import { motion } from "framer-motion";
import Floating, {
  FloatingElement,
} from "@/fancy/components/image/parallax-floating";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import React, { useState } from "react";
import VerticalCutReveal from "@/fancy/components/text/vertical-cut-reveal";

// import { exampleImages } from "@/utils/_helpers/exampleImages";

const textVariant = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
};

const imageVariant = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

const imagePaths = [
  "/block_logos/MSFT.png",
  "/block_logos/apple.png",
  "/block_logos/nvidia.png",
  "/block_logos/voo1.png",
  "/block_logos/ethereum2.png",
  "/block_logos/bitcoin1.png",
  "/block_logos/usdc.png",
  "/block_logos/google.png",
  "/block_logos/amazon.png",
  "/block_logos/meta.png",
  "/block_logos/adobe.png",
  "/block_logos/netflix.png",
];

const Preview = () => {
  const [scope] = useAnimate();
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  // useEffect(() => {
  //   animate(
  //     "img",
  //     { opacity: [0, 1] },
  //     { duration: 0.5, delay: stagger(0.05) }
  //   );
  // }, [animate]);

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 overflow-hidden"
      ref={scope}
    >
      {/* Wrap both elements in a container */}
      <div className="flex flex-col items-center gap-2 text-5xl text-[#180D68]">
        <motion.div
          className="text-center"
          variants={textVariant}
          initial="initial"
          animate="animate"
          transition={{ duration: 1, delay: 0.5 }}
        ></motion.div>
        <VerticalCutReveal
          splitBy="characters"
          staggerDuration={0.1}
          staggerFrom="first"
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 21,
          }}
        >
          {`AUTOMATE ASSETS`}
        </VerticalCutReveal>
        <VerticalCutReveal
          splitBy="characters"
          staggerDuration={0.1}
          staggerFrom="last"
          reverse={true}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 21,
            delay: 0.65,
          }}
        >
          {`MAXIMIZE GAINS`}
        </VerticalCutReveal>
        <VerticalCutReveal
          splitBy="characters"
          staggerDuration={0.1}
          staggerFrom="center"
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 21,
            delay: 1.3,
          }}
        >
          {`USE MACRO`}
        </VerticalCutReveal>
        <motion.div
          className="text-center mt-4"
          variants={textVariant}
          initial="initial"
          animate="animate"
          transition={{ duration: 1, delay: 1.5 }}
        >
          <p className="text-lg max-w-sm text-black">
            Our agents craft & execute portfolio management strategies so you
            can print money
          </p>
        </motion.div>
        <motion.div
          className="relative max-w-4xl mt-4"
          variants={textVariant}
          initial="initial"
          animate="animate"
          transition={{ duration: 1, delay: 1.9 }}
        >
          <Button
            onClick={() => console.log("Button clicked!")}
            className="bg-[#180D68] hover:bg-[#463c7c] text-white px-6 py-3 rounded flex items-center"
          >
            <Send className="h-4 w-4 mr-2" />
            Get Started
          </Button>
        </motion.div>
      </div>

      <Floating sensitivity={0} className="overflow-hidden">
        <FloatingElement depth={0.5} className="top-[50%] left-[85%]">
          <motion.img
            variants={imageVariant}
            initial="initial"
            animate="animate"
            transition={{ duration: 1, delay: 1.9 }}
            src={imagePaths[0]}
            className="w-12 h-12 md:w-18 md:h-18 object-cover"
          />
        </FloatingElement>
        <FloatingElement depth={1} className="top-[16%] left-[28%]">
          <motion.img
            variants={imageVariant}
            initial="initial"
            animate="animate"
            transition={{ duration: 1, delay: 2.1 }}
            src={imagePaths[1]}
            className="w-12 h-12 md:w-18 md:h-18 object-cover"
          />
        </FloatingElement>
        <FloatingElement depth={1} className="top-[10%] left-[73%]">
          <motion.img
            variants={imageVariant}
            initial="initial"
            animate="animate"
            transition={{ duration: 1, delay: 2.3 }}
            src={imagePaths[3]}
            className="w-12 h-12 md:w-18 md:h-18 object-cover"
          />
        </FloatingElement>
        <FloatingElement depth={1} className="top-[40%] left-[17%]">
          <motion.img
            variants={imageVariant}
            initial="initial"
            animate="animate"
            transition={{ duration: 1, delay: 2.5 }}
            src={imagePaths[4]}
            className="w-16 h-16 md:w-24 md:h-24 object-cover"
          />
        </FloatingElement>
        <FloatingElement depth={3} className="top-[73%] left-[15%]">
          <motion.img
            variants={imageVariant}
            initial="initial"
            animate="animate"
            transition={{ duration: 1, delay: 2.7 }}
            src={imagePaths[5]}
            className="w-12 h-12 md:w-18 md:h-18 object-cover"
          />
        </FloatingElement>
        <FloatingElement depth={1} className="top-[80%] left-[50%]">
          <motion.img
            variants={imageVariant}
            initial="initial"
            animate="animate"
            transition={{ duration: 1, delay: 2.9 }}
            src={imagePaths[6]}
            className="w-12 h-12 md:w-18 md:h-18 object-cover"
          />
        </FloatingElement>
        <FloatingElement depth={1} className="top-[73%] left-[32%]">
          <motion.img
            variants={imageVariant}
            initial="initial"
            animate="animate"
            transition={{ duration: 1, delay: 3.1 }}
            src={imagePaths[7]}
            className="w-12 h-12 md:w-18 md:h-18 object-cover"
          />
        </FloatingElement>
        <FloatingElement depth={1} className="top-[80%] left-[80%]">
          <motion.img
            variants={imageVariant}
            initial="initial"
            animate="animate"
            transition={{ duration: 1, delay: 3.3 }}
            src={imagePaths[8]}
            className="w-16 h-16 md:w-24 md:h-24 object-cover"
          />
        </FloatingElement>
        <FloatingElement depth={1} className="top-[50%] left-[75%]">
          <motion.img
            variants={imageVariant}
            initial="initial"
            animate="animate"
            transition={{ duration: 1, delay: 3.5 }}
            src={imagePaths[9]}
            className="w-12 h-12 md:w-18 md:h-18 object-cover"
          />
        </FloatingElement>
        <FloatingElement depth={1} className="top-[20%] left-[62%]">
          <motion.img
            variants={imageVariant}
            initial="initial"
            animate="animate"
            transition={{ duration: 1, delay: 3.7 }}
            src={imagePaths[10]}
            className="w-16 h-16 md:w-24 md:h-24 object-cover"
          />
        </FloatingElement>
        <FloatingElement depth={1} className="top-[20%] left-[45%]">
          <motion.img
            variants={imageVariant}
            initial="initial"
            animate="animate"
            transition={{ duration: 1, delay: 3.9 }}
            src={imagePaths[11]}
            className="w-12 h-12 md:w-18 md:h-18 object-cover"
          />
        </FloatingElement>
      </Floating>
    </div>
  );
};

export default Preview;
