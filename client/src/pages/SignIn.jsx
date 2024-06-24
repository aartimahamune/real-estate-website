import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log(data);

      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="py-6">
          <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
            <div
              className="lg:block lg:w-1/2 bg-cover"
              style={{
                backgroundImage: 'url("https://www.pinoyhouseplans.com/wp-content/uploads/2018/05/Dream.jpg")',
              }}
            ></div>

            <div className="w-full p-8 lg:w-1/2">
              <h2 className="text-2xl font-serif font-semibold text-black text-center">
                Sign In
              </h2>
              <p className="text-xl font-serif  text-black text-center">
                with Dream Park
              </p>

              <div className="mt-4 flex items-center justify-between">
                <span className="border-b w-1/5 lg:w-1/4"></span>
                <span className="border-b w-1/5 lg:w-1/4"></span>
              </div>
              <div className="mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email Address
                </label>
                <input
                  className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                  type="email"
                  id="email"
                  onChange={handleChange}
                />
              </div>
              <div className="mt-4">
                <div className="flex justify-between">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Password
                  </label>
                </div>
                <input
                  className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                  type="password"
                  id="password"
                  onChange={handleChange}
                />
              </div>
              <div className="mt-8">
                <button
                  disabled={loading}
                  className="bg-black text-white font-bold py-2 px-4 w-full rounded-lg hover:opacity-80 disabled:opacity-70"
                >
                  {loading ? "Loading..." : "Sign In"}
                </button>
              </div>
              <p className="d-flex text-xs text-gray-500 uppercase text-center mt-2">
                OR
              </p>
              <OAuth />
              <div className="mt-4 flex items-center justify-between">
                <span className="border-b w-1/5 md:w-1/4"></span>
                <p className='d-flex text-xs text-gray-500 uppercase"'>
                  Don't have an account?
                </p>
                <Link to={"/sign-up"}>
                  <span>Sign up</span>
                </Link>
                <span className="border-b w-1/5 md:w-1/4"></span>
              </div>
              {error && <p className="text-red-500 mt-5">{error}</p>}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
