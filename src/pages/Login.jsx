import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../features/auth/userApiSlice.js";
import { setCredentials } from "../features/auth/authSlice.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo && userInfo.role === "User") {
      navigate("/");
    } else if (userInfo && userInfo.role === "Admin") {
      navigate("/tests/create-test");
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      if (userInfo.role === "User") {
        navigate("/");
      }
      if (userInfo.role === "Admin") {
        navigate("/tests/create-test");
      }
    } catch (err) {
      console.log(err?.data?.message || err.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 flex h-[calc(100vh-60px)] items-center">
      <div className="w-full max-w-md mx-auto p-6">
        <div className="mt-7 border rounded-xl shadow-sm bg-gray-800 border-gray-700">
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-white">Login</h1>
            </div>
            <div className="mt-5">
              <form onSubmit={submitHandler}>
                <div className="grid gap-y-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm mb-2 text-white"
                    >
                      Email address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="py-3 px-4 block w-full rounded-lg text-sm focus:border-blue-500 disabled:opacity-50 disabled:pointer-events-none bg-slate-900 border-gray-700 text-gray-400 focus:ring-gray-600"
                        required
                        placeholder="example@domain.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm mb-2 text-white"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        id="password"
                        name="password"
                        className=" text-sm  py-3 px-4 block w-full  rounded-lg  focus:border-blue-500 disabled:opacity-50 disabled:pointer-events-none bg-slate-900 border-gray-700 text-gray-400 focus:ring-gray-600"
                        required
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-1 focus:ring-gray-600"
                  >
                    {loading ? "Loading..." : "Login"}
                  </button>

                  <div className="flex items-center">
                    <div>
                      <label
                        htmlFor="remember-me"
                        className="text-sm text-white"
                      >
                        Don’t have an account yet?
                        <Link
                          className="ml-1 text-blue-600 decoration-2 hover:underline font-medium focus:outline-none focus:ring-1 focus:ring-gray-600"
                          to="/register"
                        >
                          Register
                        </Link>
                      </label>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
