import { useState, useEffect } from "react";
import { AiFillEyeInvisible } from "react-icons/ai";
import { BsEyeFill } from "react-icons/bs";
import { useNavigate,useLocation } from "react-router-dom";
import { sucessNotify, errorNotify } from "../../../helper/ToastLogin";
import ReCAPTCHA from "react-google-recaptcha";
import axios_instance from "../../utils/axios";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function SignIn() {
  const [captchaValue, setCaptchaValue] = useState(null);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [viewPassword, setViewPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState();

  const siteKey = "6Lf4inwqAAAAAD64ITgkHFsgBPk_qvE52l2_6ltd";
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const togglePassword = () => {
    setViewPassword((prev) => !prev);
  };

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };
  const location = useLocation();
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const roleFromQuery = queryParams.get("role");
    if (roleFromQuery) {
      setRole(roleFromQuery);
    }
  }, [location]);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!captchaValue) {
      alert("CAPTCHA not completed");
      return;
    }

    setLoading(true); // Start loader

    axios_instance
      .post("users/login/", {...credentials,role})
      .then((response) => {
        const { access, user: loggedInUser } = response.data;
        localStorage.setItem("USER_TOKEN", access);
        localStorage.setItem("USER_ROLE", loggedInUser.role);
        localStorage.setItem("USER_PROFILE", JSON.stringify(loggedInUser));
        sucessNotify();

        switch (loggedInUser.role) {
          case "admin":
            navigate("/admin/dashboard");
            break;
          case "teacher":
            navigate("/teacher/dashboard");
            break;
          case "student":
            navigate("/student/dashboard");
            break;
          default:
            navigate("/");
        }
      })
      .catch((error) => {
        console.error("Login failed:", error);
        errorNotify(error.response?.error || "Unknown error");
        // Handle error response here
      })
      .finally(() => {
        setLoading(false); // Stop loader in all cases
      });
  };

  return (
    <div className="flex overflow-hidden bg-white h-screen w-full">
      <div className=" h-full w-[25.5%] lg:block hidden relative">
        <img
          src="/teacher/avagwhite.png"
          className="absolute w-28 left-7 bottom-0"
        />
        <img src="/teacher/signin.png" className="h-screen flex" />
      </div>
      <div className="flex w-full lg:w-[74.5%] 2xl:gap-[30px] lg:gap-[25px] flex-col justify-center items-center h-full">
        <div className="flex mb-5 lg:mb-0 w-full items-center justify-center">
          <h1 className="text-main-dark text-3xl font-semibold 2xl:text-5xl">
            Bem-vindo de volta
          </h1>
          <img src="/teacher/hand.png" className="lg:size-24 size-20" />
        </div>
        <form
          onSubmit={handleLogin}
          className="2xl:p-[30px] w-[85%] lg:w-[50%] p-4 lg:p-5 flex flex-col gap-[18px] rounded-xl 2xl:rounded-3xl bg-main-light"
        >
          <label htmlFor="email" className="font-medium text-lg text-main-dark">
            Email
            <input
              type="email"
              autoComplete="off"
              placeholder="Email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              className="text-main-dark/70 lg:mt-[10px] mt-[7px] 2xl:px-[18px] lg:px-[10px] px-[7px] 2xl:placeholder:text-base lg:placeholder:text-sm text-sm 2xl:text-base placeholder:text-main-dark/70 border-none active:border-none outline-none bg-input rounded-lg 2xl:rounded-xl w-full py-3 2xl:py-4"
              id="email"
              required
            />
          </label>

          <label
            htmlFor="password"
            className="relative font-medium text-lg text-main-dark"
          >
            Senha
            <input
              name="password"
              value={credentials.password}
              onChange={handleChange}
              type={viewPassword ? "text" : "password"}
              autoComplete="off"
              placeholder="Senha"
              className="text-main-dark/70 lg:mt-[10px] mt-[7px] 2xl:px-[18px] lg:px-[10px] px-[7px] 2xl:placeholder:text-base lg:placeholder:text-sm text-sm 2xl:text-base placeholder:text-main-dark/70 border-none active:border-none outline-none bg-input rounded-lg 2xl:rounded-xl w-full py-3 2xl:py-4"
              id="password"
              required
            />
            <p className="top-[60%] right-3 absolute" onClick={togglePassword}>
              {!viewPassword ? (
                <BsEyeFill size={20} />
              ) : (
                <AiFillEyeInvisible size={20} />
              )}
            </p>
          </label>
          {/* Forgot Password? */}
          <p onClick={() => navigate("/auth/forgot-password")} className="text-main-dark/70 text-sm lg:text-base 2xl:text-lg cursor-pointer">
            Forgot Password?
          </p>
          <ReCAPTCHA
            hl={"pt-BR"}
            sitekey={siteKey}
            onChange={handleCaptchaChange}
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-main-dark w-[100%] cursor-pointer rounded-xl text-center text-white font-bold text-xl mt-2 2xl:text-2xl py-3 flex justify-center items-center gap-2 disabled:opacity-70"
          >
            {loading ? (
              <>
                <AiOutlineLoading3Quarters className="animate-spin" size={20} />
                Entrando...
              </>
            ) : (
              "Entrar"
            )}
          </button>
          <div className="flex flex-col gap-2 items-center">
            <p className="text-main-dark/70 text-sm lg:text-base 2xl:text-lg">
              Not registered yet?
              <span
                onClick={() => navigate("/auth/sign_up")}
                className="text-main-dark cursor-pointer font-semibold ml-2"
              >
                Create an account
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
