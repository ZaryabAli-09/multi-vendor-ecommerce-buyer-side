import { Link } from "react-router-dom";

import { LuLogOut } from "react-icons/lu";
import { LuHistory } from "react-icons/lu";
import { LuMessageSquare } from "react-icons/lu";
import { VscAccount } from "react-icons/vsc";
import { RiBox3Line } from "react-icons/ri";
import { CiHeart } from "react-icons/ci";

// * with icons *

function ProfileDropDown({ isProfileDDVisible }) {
  return (
    <div
      className={`absolute z-20 top-[52px] w-[165px] right-[50%] translate-x-[50%] text-sm font-medium flex flex-col text-gray-500 bg-white shadow-md border-[1px]  ${
        isProfileDDVisible ? "block" : "hidden"
      }`}
    >
      <Link
        to="/profile"
        className="flex items-center gap-2 px-3 py-2 hover:text-black hover:bg-gray-200"
      >
        <VscAccount className="relative top-[0.5px] text-[15px]" />
        <span>My Profile</span>
      </Link>

      <Link
        to={"my-orders"}
        className="flex items-center gap-2 px-3 py-2 hover:text-black hover:bg-gray-200"
      >
        <RiBox3Line className="relative top-[0.5px] text-[15px]" />
        <span>My Orders</span>
      </Link>

      <Link
        to={`/my-messages`}
        className="flex items-center gap-2 px-3 py-2  hover:text-black hover:bg-gray-200"
      >
        <LuMessageSquare className="relative top-[1.25px] text-[15px]" />
        <span>My Messages</span>
      </Link>

      <Link
        to="/browsing-history"
        className="flex items-center gap-2 px-3 py-2  hover:text-black hover:bg-gray-200"
      >
        <LuHistory className="relative top-[0.7px] text-[15px]" />
        <span>Browsing History</span>
      </Link>
      <Link
        to="/my-liked-reels"
        className="flex items-center gap-2 px-3 py-2  hover:text-black hover:bg-gray-200"
      >
        <CiHeart className="relative top-[0.7px] text-[15px]" />
        <span>My Liked Reels</span>
      </Link>

      <Link
        className="flex items-center gap-2 px-3 py-2  hover:text-black hover:bg-gray-200"
        to="/auth/logout"
      >
        <LuLogOut className="relative top-[0.5px] text-[15px]" />
        <span>Logout</span>
      </Link>
    </div>
  );
}

export default ProfileDropDown;

// * without icons *

// function ProfileDropDown({ isProfileDDVisible }) {
//   return (
//     <div
//       className={`absolute z-[1] top-[52px] w-[165px] right-[50%] translate-x-[50%] text-sm font-medium flex flex-col text-gray-500 bg-white shadow-md border-[1px]  ${
//         isProfileDDVisible ? "block" : "hidden"
//       }`}
//     >
//       <Link
//         to="/profile"
//         className="px-3 py-2 hover:text-black hover:bg-gray-200"
//       >
//         My Profile
//       </Link>

//       <Link className="px-3 py-2 hover:text-black hover:bg-gray-200">
//         My Orders
//       </Link>

//       <Link className="px-3 py-2  hover:text-black hover:bg-gray-200">
//         My Messages
//       </Link>

//       <Link className="px-3 py-2  hover:text-black hover:bg-gray-200">
//         Recently Viewed
//       </Link>

//       <Link
//         className="px-3 py-2  hover:text-black hover:bg-gray-200"
//         to="/auth/logout"
//       >
//         Logout
//       </Link>
//     </div>
//   );
// }

// export default ProfileDropDown;
