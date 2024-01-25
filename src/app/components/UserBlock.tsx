import { useDispatch, useSelector } from "react-redux";
import { userId, userName } from "../redux/user/userSelectors";
import { logoutUser } from "../redux/user/userSlice";

export function UserBlock() {
  const name = useSelector(userName);
  const userID = useSelector(userId);
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col w-[400px] grow shrink-0 mt-[400px] px-[20px]">
      <h2 className="text-[32px] mb-[20px]">
        <div className="text-border">Welcome!!!</div>
        <span className="font-semibold">{name}</span>
      </h2>
      <p className="text-title mb-[20px]">
        If you want download you schedule click on link bellow.
      </p>
      <a
        href={`events_${userID}.json`}
        download
        className="hover:underline text-border text-main mb-[80px]"
      >
        Click to download
      </a>

      <button
        className="w-full py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        type="button"
        onClick={() => dispatch(logoutUser())}
      >
        Logout
      </button>
    </div>
  );
}
