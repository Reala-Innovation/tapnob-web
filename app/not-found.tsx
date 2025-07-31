"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="h-screen flex flex-col justify-center items-center px-4 text-center bg-white"
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="mb-6"
      >
        <Image
          src="/rocket.svg"
          alt="Rocket floating"
          width={120}
          height={120}
        />
      </motion.div>

      <h1 className="text-4xl font-extrabold mb-4 text-orange-600">
        Oops,You&apos;ve wandered too far...
      </h1>

      <p className="text-gray-600 text-lg mb-6 max-w-md">
        Looks like this page doesn&apos;t exist. But we&apos;ve got the boosters
        ready — let&apos;s get you home.
      </p>

      <Button
        className="bg-orange-600 hover:bg-orange-700 text-white"
        onClick={() => router.push("/")}
      >
        🚀 Take me home
      </Button>
    </motion.div>
  );
}
