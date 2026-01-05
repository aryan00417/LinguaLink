import React from 'react'
import { Link } from 'react-router';
import { LANGUAGE_TO_FLAG } from '../constants';

const FriendCard = ({ friend }) => {
  return (
    <div className="card bg-base-200 hover:shadow-md transition-shadow w-full">
      <div className="card-body p-5">
        {/* USER INFO */}
        <div className="flex items-center gap-3 mb-4">
          <div className="avatar">
            <div className="w-14 h-14 rounded-full">
              <img src={friend.profilePic} alt={friend.fullName} />
            </div>
          </div>
          <h3 className="font-semibold text-base truncate flex-1">{friend.fullName}</h3>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4">
          <span className="badge badge-secondary text-xs w-full justify-center">
            {getLanguageFlag(friend.nativeLanguage)}
            Native: {friend.nativeLanguage}
          </span>
          <span className="badge badge-outline text-xs w-full justify-center">
            {getLanguageFlag(friend.learningLanguage)}
            Learning: {friend.learningLanguage}
          </span>
        </div>

        <Link to={`/chat/${friend._id}`} className="btn btn-outline btn-sm w-full">
          Message
        </Link>
      </div>
    </div>
  );
}
export default FriendCard

export function getLanguageFlag(language) {
  if (!language) return null;

  const langLower = language.toLowerCase();
  const countryCode = LANGUAGE_TO_FLAG[langLower];

  if (countryCode) {
    return (
      <img
        src={`https://flagcdn.com/24x18/${countryCode}.png`}
        alt={`${langLower} flag`}
        className="h-3 mr-1 inline-block"
      />
    );
  }
  return null;
}