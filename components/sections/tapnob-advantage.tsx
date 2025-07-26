"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import advantages from "@/app/data/advantages";
import { useRouter } from "next/navigation";
const TapnobAdvantage = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const router = useRouter();
  return (
    <section className="relative py-32 px-4 md:px-8 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-black bg-clip-text text-orange-600 mb-6">
            The Tapnob advantage
          </h2>
          <div className="w-24 h-1 bg-orange-600 mx-auto rounded-full"></div>
        </motion.div>

        <div className="space-y-8">
          {advantages.map((advantage, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              whileInView={{
                opacity: 1,
                x: 0,
                transition: {
                  delay: index * 0.2,
                  duration: 0.8,
                  ease: "easeOut",
                },
              }}
              viewport={{ once: true, amount: 0.3 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`relative flex flex-col md:flex-row items-center gap-8 p-8 rounded-3xl transition-all duration-500 cursor-pointer group ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } ${hoveredIndex === index ? "scale-105" : "hover:scale-102"}`}
            >
              {/* Background gradient that changes on hover */}
              <div
                className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${advantage.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
              ></div>

              {/* Icon section */}
              <motion.div
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.5 }}
                className={`relative flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-r ${advantage.color} shadow-2xl`}
              >
                <span className="text-3xl filter drop-shadow-lg">
                  {advantage.icon}
                </span>
                <div
                  className={`absolute inset-0 rounded-full ${advantage.accent} animate-ping opacity-75`}
                ></div>
              </motion.div>

              <div
                className={`flex-1 text-center md:text-left ${
                  index % 2 === 0 ? "md:text-left" : "md:text-right"
                }`}
              >
                <motion.h3 className="text-xl  md:text-3xl font-bold text-orange-600 mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:to-pink-500 transition-all duration-300">
                  {advantage.title}
                </motion.h3>
                <motion.p className="text-lg text-black leading-relaxed max-w-xl group-hover:text-black transition-colors duration-300">
                  {advantage.description}
                </motion.p>
              </div>

              <div className="absolute top-4 right-4 w-20 h-20 border border-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute bottom-4 left-4 w-16 h-16 border border-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-20"
        >
          <div
            className="inline-flex items-center gap-4 px-8 py-4 bg-orange-600 rounded-full text-white font-bold text-lg shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 cursor-pointer group"
            onClick={() => router.push("/app")}
          >
            <span className="group-hover:scale-110 transition-transform duration-300">
              Experience the Difference
            </span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="text-2xl"
            >
              →
            </motion.span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TapnobAdvantage;
