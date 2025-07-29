"use client";
import React from "react";

import TweetCard from "./tweet-card";
import tweets from "@/app/data/tweets";
import AmountForm from "./amountCard";
import TweetCarousel from "./tweetCarousel";

const Hero = () => {
  return (
    <section className="mt-10 lg:mt-1 relative w-full h-screen overflow-hidden bg-white">
      <div className="absolute inset-0 opacity-1">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #000 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-50 z-0"
      >
        <source src="/videos/background_hero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <TweetCard
        {...tweets[0]}
        className="absolute top-24 right-[0px] skew-y-3 z-10 hidden lg:block"
      />
      <TweetCard
        {...tweets[1]}
        className="absolute top-[50%] right-[80px] skew-y-[-3deg] z-10 hidden lg:block"
      />
      <TweetCard
        {...tweets[2]}
        className="absolute bottom-24 right-[0px] skew-y-2 z-10 hidden xl:block"
      />
      <TweetCard
        {...tweets[3]}
        className="absolute top-1/4 right-[140px] skew-y-[-4deg] z-10 hidden xl:block"
      />

      <div className="relative z-30 flex flex-col justify-center items-center lg:items-start h-full px-6 md:px-16 max-w-7xl mx-auto">
        <div className="w-full flex justify-center items-center z-50 relative">
          <p className="bg-orange-600 text-white text-center w-fit text-sm rounded-full p-2">
            Currently in Beta
          </p>
        </div>

        <div className="text-center lg:text-left lg:w-1/2">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-light mb-8 leading-tight text-gray-900">
            Spend your
            <br />
            <span className="font-normal bg-orange-600 text-white">
              Bitcoin
            </span>
            <br />
            Instantly
          </h1>

          <p className="text-lg md:text-xl text-gray-600 mb-12  leading-tight font-light text-center sm:text-left">
            Fast, secure, and effortless for everyday spending across Africa.
          </p>

          <div className="flex items-center flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
            <AmountForm />
          </div>

          <div className="lg:hidden">
            <TweetCarousel tweets={tweets} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
