import React from "react";
import { Heart, MessageCircle, Repeat2, Share, Verified } from "lucide-react";
interface ITweetCard {
  author: string;
  handle: string;
  content: string;
  likes: number | string;
  retweets: number | string;
  replies: string;
  isVerified: boolean;
  profileImg?: string;
  className?: string;
}
const TweetCard: React.FC<ITweetCard> = ({
  author,
  handle,
  content,
  likes,
  retweets,
  replies,
  isVerified,
  profileImg,
  className,
}) => (
  <div
    className={`bg-white rounded-xl p-4 shadow-sm border border-gray-100 max-w-xs hover:shadow-md transition-all duration-300 ${className}`}
  >
    <div className="flex items-start gap-3 mb-3">
      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 text-xs font-medium">
        {profileImg || author[0]}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1">
          <h4 className="font-medium text-gray-900 text-sm truncate">
            {author}
          </h4>
          {isVerified && (
            <Verified className="w-3 h-3 text-blue-500 fill-current" />
          )}
        </div>
        <p className="text-gray-500 text-xs">@{handle}</p>
      </div>
    </div>
    <p className="text-gray-700 text-sm leading-relaxed mb-3">{content}</p>
    <div className="flex items-center gap-4 text-gray-400 text-xs">
      <div className="flex items-center gap-1">
        <Heart className="w-3 h-3" />
        <span>{likes}</span>
      </div>
      <div className="flex items-center gap-1">
        <Repeat2 className="w-3 h-3" />
        <span>{retweets}</span>
      </div>
      <div className="flex items-center gap-1">
        <MessageCircle className="w-3 h-3" />
        <span>{replies}</span>
      </div>
    </div>
  </div>
);
export default TweetCard;
