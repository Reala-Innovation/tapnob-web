import tweets from "@/app/data/tweets";
import { useState } from "react";
import TweetCard from "./tweet-card";
const TweetCarousel:React.FC<{tweets:typeof tweets}> = ({ tweets }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCount = 1;

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev > 0 ? prev - 1 : tweets.length - visibleCount
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev < tweets.length - visibleCount ? prev + 1 : 0
    );
  };

  const visibleTweets = tweets.slice(currentIndex, currentIndex + visibleCount);

  return (
    <div className="lg:hidden relative">
      <div className="flex items-center justify-between mb-2">
        <button onClick={handlePrev} className="p-2 bg-gray-200 rounded">
          ◀
        </button>
        <button onClick={handleNext} className="p-2 bg-gray-200 rounded">
          ▶
        </button>
      </div>
      <div className="overflow-hidden">
        <div className="flex transition-transform duration-300 ease-in-out">
          {visibleTweets.map((tweet, index) => (
            <TweetCard key={index} {...tweet} className="w-72 flex-shrink-0" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TweetCarousel;
