"use client"
import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

interface AILoadingAnimationProps {
    message?: string
}

export default function AILoadingAnimation({ message }: AILoadingAnimationProps) {
    return (

        <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-gray-600" />
            <motion.div
                className="relative z-10 text-base font-normal text-black"
                animate={{
                    backgroundPosition: ["200% 0%", "0% 0%"],
                }}
                transition={{
                    backgroundPosition: {
                        duration: 1,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                        repeatType: "loop",
                    },
                }}
                style={{
                    backgroundImage: "linear-gradient(90deg, #000000, #9ca3af, #000000, #000000)",
                    backgroundSize: "200% 100%",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                }}
            >
                {message || "Processing..."}
            </motion.div>
        </div>

    )
}
