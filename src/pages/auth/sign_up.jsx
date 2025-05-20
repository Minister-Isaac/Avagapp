import { AiFillEyeInvisible } from "react-icons/ai";
import { BsEyeFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { errorNotify, goodNotify } from "../../../helper/ToastLogin";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import axios_instance from "../../utils/axios";

export default function Signup() {
  const [captchaValue, setCaptchaValue] = useState(null);

  const [formData, setFormData] = useState({});
  const [viewPassword, setViewPassword] = useState(false);
  const [viewConfirm_password, setViewConfirm_password] = useState(false);

  const siteKey = "6Lf4inwqAAAAAD64ITgkHFsgBPk_qvE52l2_6ltd";
  const location = useLocation(); // To access the query parameters

  const navigate = useNavigate();

  const toggleConfirmPassword = () => {
    setViewConfirm_password((prev) => !prev);
  };
  const togglePassword = () => {
    setViewPassword((prev) => !prev);
  };

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };
  // Extract role from the query parameters
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const roleFromQuery = queryParams.get("role");
    if (roleFromQuery) {
      setFormData((prev) => ({
        ...prev,
        role: roleFromQuery,
      }));
    }
  }, [location]);

  const handleSubmit = async () => {
    if (!captchaValue) {
      return alert("Por favor, complete o reCAPTCHA");
    }
    if (formData.password !== formData.confirm_password) {
      return errorNotify("As senhas não coincidem");
    }
    await axios_instance
      .post("api/users/sign-up/", formData)
      .then((response) => {
        goodNotify(response?.message || " Registration successful ");
        navigate(`/auth/sign_in?role=${formData.role}`);
      })
      .catch((error) => {
        errorNotify(error.response.data.non_field_errors[0] ||error.response.data.subject_taught[0] || "Unknown error");
      });
  };

  return (
    <div className="flex overflow-auto lg:overflow-hidden  bg-white lg:h-screen w-full ">
      <div className="h-full w-[25.5%] lg:block hidden ">
        <img
          src="/teacher/avagwhite.png"
          className="absolute w-28 left-7 bottom-0"
        />
        <img src="/teacher/signup.png" className="h-screen flex" />
      </div>
      <div
        className={`overflow-auto pb-5 flex w-full lg:w-[74.5%] 2xl:gap-[30px] lg:gap-[3px] flex-col justify-center items-center h-full ${
          formData.role === "teacher" ? "lg:pt-96 2xl:pt-[120px]" : "lg:pt-80"
        }`}
      >
        <div className="flex mb-5 lg:mb-0 w-full items-center justify-center">
          <h1 className="text-main-dark text-3xl font-semibold 2xl:text-5xl">
            Bem-vindo
          </h1>
          <img src="/teacher/hand.png" className="lg:size-20 size-20" />
        </div>

        <div className="2xl:p-[30px] w-[85%] lg:w-[50%] p-4 lg:p-5 flex flex-col gap-[18px] rounded-xl 2xl:rounded-3xl bg-main-light">
          <label
            htmlFor="first_name"
            className="font-medium 2xl:text-lg text-main-dark"
          >
            Nome de Usuário
            <input
              type="text"
              autoComplete="off"
              placeholder="Nome de Usuário"
              className="text-main-dark/70  mt-[5px] 2xl:px-[18px] lg:px-[10px] px-[7px] 2xl:placeholder:text-base lg:placeholder:text-sm text-sm 2xl:text-base placeholder:text-main-dark/70 border-none active:border-none outline-none bg-input rounded-lg 2xl:rounded-xl w-full py-3 2xl:py-4"
              id="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
          </label>
          {/* value={formData.last_name} */}

          <label
            htmlFor="last_name"
            className="font-medium 2xl:text-lg text-main-dark"
          >
            Sobrenome
            <input
              type="text"
              autoComplete="off"
              placeholder="Nome de Usuário"
              className="text-main-dark/70 lg:mt-[10px] mt-[7px] 2xl:px-[18px] lg:px-[10px] px-[7px] 2xl:placeholder:text-base lg:placeholder:text-sm text-sm 2xl:text-base placeholder:text-main-dark/70 border-none active:border-none outline-none bg-input rounded-lg 2xl:rounded-xl w-full py-3 2xl:py-4"
              id="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
          </label>

          <label htmlFor="email" className="font-medium text-lg text-main-dark">
            Email
            <input
              type="email"
              autoComplete="off"
              placeholder="Email"
              className="text-main-dark/70 lg:mt-[10px] mt-[7px] 2xl:px-[18px] lg:px-[10px] px-[7px] 2xl:placeholder:text-base lg:placeholder:text-sm text-sm 2xl:text-base placeholder:text-main-dark/70 border-none active:border-none outline-none bg-input rounded-lg 2xl:rounded-xl w-full py-3 2xl:py-4"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>

          <label
            htmlFor="password"
            className="relative font-medium text-lg text-main-dark"
          >
            Senha
            <input
              type={viewPassword ? "text" : "password"}
              autoComplete="off"
              placeholder="Senha"
              className="text-main-dark/70 mt-[5px] 2xl:px-[18px] lg:px-[10px] px-[7px] 2xl:placeholder:text-base lg:placeholder:text-sm text-sm 2xl:text-base placeholder:text-main-dark/70 border-none active:border-none outline-none bg-input rounded-lg 2xl:rounded-xl w-full py-3 2xl:py-4"
              id="password"
              value={formData.password}
              onChange={handleChange}
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
          <label
            htmlFor="confirm_password"
            className="relative font-medium text-lg text-main-dark"
          >
            Confirmar Senha
            <input
              type={viewConfirm_password ? "text" : "password"}
              autoComplete="off"
              placeholder=" Confirmar Senha"
              className="text-main-dark/70 mt-[5px] 2xl:px-[18px] lg:px-[10px] px-[7px] 2xl:placeholder:text-base lg:placeholder:text-sm text-sm 2xl:text-base placeholder:text-main-dark/70 border-none active:border-none outline-none bg-input rounded-lg 2xl:rounded-xl w-full py-3 2xl:py-4"
              id="confirm_password"
              value={formData.confirm_password}
              onChange={handleChange}
              required
            />
            <p
              className="top-[60%] right-3 absolute"
              onClick={toggleConfirmPassword}
            >
              {!viewConfirm_password ? (
                <BsEyeFill size={20} />
              ) : (
                <AiFillEyeInvisible size={20} />
              )}
            </p>
          </label>

          <div className="flex gap-4">
            <label
              htmlFor="role"
              className="font-medium text-lg text-main-dark flex-1"
            >
              Papel
              <select
                id="role"
                className="text-main-dark/70 mt-[5px] 2xl:px-[18px] lg:px-[10px] px-[7px] 2xl:placeholder:text-base lg:placeholder:text-sm text-sm 2xl:text-base placeholder:text-main-dark/70 border-none active:border-none outline-none bg-input rounded-lg 2xl:rounded-xl w-full py-3 2xl:py-4"
                value={formData.role || ""}
                onChange={handleChange}
                required
              >
                <option value="">Selecione um papel</option>
                <option value="teacher">Professor</option>
                <option value="student">Estudante</option>
                <option value="admin">Administrador</option>
              </select>
            </label>

            {formData?.role === "teacher" && (
              <label
                htmlFor="years_experience"
                className="font-medium text-lg text-main-dark flex-1"
              >
                Anos de Experiência
                <input
                  type="number"
                  min={0}
                  id="experience_years"
                  placeholder="Anos de Experiência"
                  className="text-main-dark/70 mt-[5px] 2xl:px-[18px] lg:px-[10px] px-[7px] 2xl:placeholder:text-base lg:placeholder:text-sm text-sm 2xl:text-base placeholder:text-main-dark/70 border-none active:border-none outline-none bg-input rounded-lg 2xl:rounded-xl w-full py-3 2xl:py-4"
                  value={formData.experience_years || ""}
                  onChange={handleChange}
                  required={formData.role === "teacher"}
                />
              </label>
            )}
          </div>
          {formData.role === "teacher" && (
            <label
              htmlFor="subject"
              className="font-medium text-lg text-main-dark"
            >
              Matéria
              <input
                type="text"
                id="subject_taught"
                placeholder="Matéria"
                className="text-main-dark/70 mt-[5px] 2xl:px-[18px] lg:px-[10px] px-[7px] 2xl:placeholder:text-base lg:placeholder:text-sm text-sm 2xl:text-base placeholder:text-main-dark/70 border-none active:border-none outline-none bg-input rounded-lg 2xl:rounded-xl w-full py-3 2xl:py-4"
                value={formData.subject_taught || ""}
                onChange={handleChange}
                required={formData.role === "teacher"}
              />
            </label>
          )}
          <ReCAPTCHA
            className="g-recaptcha -mb-7"
            data-size="compact"
            hl="pt-BR"
            sitekey={siteKey}
            onChange={handleCaptchaChange}
          />
          <p
            onClick={handleSubmit}
            className="bg-main-dark w-[100%] cursor-pointer rounded-xl text-center text-white font-bold text-xl mt-2 2xl:text-2xl py-3"
          >
            Cadastre-se
          </p>
        </div>
        <p className="w-full cursor-pointer mt-1 text-center">
          Já tem uma conta?{" "}
          <Link
            to={`/auth/sign_in?role=${formData?.role}`}
            className="text-main-dark"
          >
            Entre
          </Link>
        </p>
      </div>
    </div>
  );
}
