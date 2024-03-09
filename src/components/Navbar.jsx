import useDropdownToggle from "../hooks/useDropdownToggle";
import userImg from "../assets/user.png";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useLogoutMutation } from "../features/auth/userApiSlice";
import { logout } from "../features/auth/authSlice";

const Navbar = () => {
  const { isOpen, toggleDropdown, dropdownRef } = useDropdownToggle();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
      console.log("clicked");
    } catch (error) {
      console.log(error);
    }

    toggleDropdown();
  };

  return (
    <div>
      <nav className="bg-gray-800 p-4">
        <div className="flex items-center justify-between">
          <div className="text-white ml-10 text-xl font-bold">Test System</div>
          <div className="relative mr-10" ref={dropdownRef}>
            <button
              className="text-white flex items-center focus:outline-none"
              onClick={toggleDropdown}
            >
              <img src={userImg} alt="" className="w-6" />
            </button>
            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
                <div className="py-1">
                  {/* <button
                    onClick={() => console.log("My Profile")}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    My Profile
                  </button> */}
                  <Link
                    // to="/logout"
                    onClick={handleLogout}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    Logout
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
