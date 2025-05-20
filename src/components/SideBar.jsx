import { AiFillSetting } from "react-icons/ai";
import { FaBook, FaUserAlt } from "react-icons/fa";
import { GiTeacher } from "react-icons/gi";
import { IoCloseCircle, IoGameController, IoLogOut } from "react-icons/io5";
import { LiaClipboardListSolid } from "react-icons/lia";
import { MdHome } from "react-icons/md";
import { RiAiGenerate } from "react-icons/ri";
import { NavLink, useLocation } from "react-router-dom";
import { useMobile } from "../hook/MobileNav";
import { logout } from "../utils/logout";
import { getUserProfile } from "../utils/auth";
import { PiClockFill } from "react-icons/pi";
import { FaBookOpen } from "react-icons/fa";
import { ImBook } from "react-icons/im";
export default function TSideBar() {
  const userProfile = getUserProfile(); // Assume it returns an object with a role property
  const location = useLocation();
  const { toggleMobile, mobile } = useMobile();

  const handleLogout = async () => {
    await logout();
    toggleMobile();
  };

  const pathSegments = location.pathname.split("/");

  // Define role-based links
  const sideLinks =
    userProfile.role === "teacher"
      ? [
          {
            label: "Início",
            inActive: <MdHome />,
            path: "/teacher/dashboard",
          },
          {
            label: "Alunos",
            inActive: <FaUserAlt />,
            path: "/teacher/dashboard/management",
          },
          {
            label: "Geração de Certificado",
            inActive: <RiAiGenerate />,
            path: "/teacher/dashboard/generate",
          },
          {
            label: "Conhecimento",
            inActive: <FaBook />,
            path: "/teacher/dashboard/knowledge",
          },
          {
            label: "Ranking",
            inActive: <LiaClipboardListSolid />,
            path: "/teacher/dashboard/ranking",
          },
          {
            label: "Jogos",
            inActive: <IoGameController />,
            path: "/teacher/dashboard/game",
          },
        ]
      : userProfile.role === "student"
      ? [
          {
            label: "Início",
            inActive: <MdHome />,
            path: "/student/dashboard",
          },
          {
            label: "Conhecimento",
            inActive: <ImBook />,
            path: "/student/dashboard/knowledge",
          },
          {
            label: "Atividade",
            inActive: <PiClockFill />,
            path: "/student/dashboard/activty",
          },

          {
            label: "Gestão de Perfil",
            inActive: <FaUserAlt />,
            path: "/student/dashboard/student-profile",
          },

          {
            label: "Jogos",
            inActive: <IoGameController />,
            path: "/student/dashboard/student-game",
          },
        ]
      : [
          {
            label: "Início",
            inActive: <MdHome />,
            path: "/admin/dashboard",
          },
          {
            label: "Gestão de Professores",
            inActive: <FaUserAlt />,
            path: "/admin/dashboard/register-teacher",
          },
          {
            label: "Gestão de Usuários",
            inActive: <FaUserAlt />,
            path: "/admin/dashboard/teacher-management",
          },
          {
            label: "Conhecimento",
            inActive: <FaBook />,
            path: "/admin/dashboard/knowledge",
          },
          {
            label: "Ranking",
            inActive: <LiaClipboardListSolid />,
            path: "/admin/dashboard/ranking",
          },
          {
            label: "Jogos",
            inActive: <IoGameController />,
            path: "/admin/dashboard/game",
          },
        ];

  const config = [
    {
      label: "Configurações",
      inActive: <AiFillSetting />,
      path:
        userProfile.role === "teacher"
          ? "/teacher/dashboard/setting"
          : userProfile.role === "student"
          ? "/student/dashboard/setting"
          : userProfile.role === "admin"
          ? "/admin/dashboard/setting"
          : "/dashboard/setting", // fallback if role is unknown
    },
    {
      label: "Sair",
      inActive: <IoLogOut />,
      path: "/",
      isLogout: true,
    },
  ];

  return (
    <>
      {mobile && (
        <>
          <div
            onClick={toggleMobile}
            className="w-screen lg:hidden block h-screen bg-opacity-5 z-20 absolute bg-black/50"
          ></div>
          <IoCloseCircle
            onClick={() => toggleMobile()}
            className="size-10 absolute block top-3 right-3 z-50 text-white"
          />
        </>
      )}

      {mobile && (
        <div className="lg:relative absolute z-50 h-screen lg:h-full flex flex-col lg:w-[22%] bg-bg items-center">
          <div>
            <img src="/teacher/avag.png" className="size-[110px]" alt="" />
          </div>
          <div className="h-full flex flex-col justify-between pb-2 p-2">
            <div className="flex flex-col gap-1">
              {sideLinks.map((link, id) => {
                const hrefSegments = link?.path?.split("/");
                return (
                  <NavLink
                    key={id}
                    to={link.path}
                    onClick={() => toggleMobile()}
                    className={`${
                      pathSegments[3] === hrefSegments[3] &&
                      "bg-main-dark text-sm text-white"
                    } my-auto flex p-[10px] text-sm rounded-lg items-center text-black`}
                  >
                    <span>{link.inActive}</span>
                    <span className="inline ml-2">{link.label}</span>
                  </NavLink>
                );
              })}
            </div>
            <div className="flex flex-col gap-1">
              {config.map((link, id) => (
                <NavLink
                  key={id}
                  to={link.path}
                  onClick={link.isLogout && handleLogout}
                  className={`${
                    location.pathname === link.path &&
                    "bg-main-dark text-sm text-white"
                  } my-auto flex p-[10px] text-sm rounded-lg items-center text-black`}
                >
                  <span>{link.inActive}</span>
                  <span className="inline ml-2">{link.label}</span>
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="hidden lg:flex flex-col w-[22%] bg-bg items-center">
        <div>
          <img src="/teacher/avag.png" className="size-[110px]" alt="" />
        </div>
        <div className="h-full flex flex-col justify-between pb-2 p-2">
          <div className="flex flex-col gap-1">
            {sideLinks.map((link, id) => {
              const hrefSegments = link?.path?.split("/");
              return (
                <NavLink
                  key={id}
                  to={link.path}
                  className={`${
                    pathSegments[3] === hrefSegments[3] &&
                    "bg-main-dark text-sm text-white"
                  } my-auto flex p-[10px] text-sm rounded-lg items-center text-black`}
                >
                  <span>{link.inActive}</span>
                  <span className="inline ml-2">{link.label}</span>
                </NavLink>
              );
            })}
          </div>
          <div className="flex flex-col gap-1">
            {config.map((link, id) => (
              <NavLink
                key={id}
                to={link.path}
                onClick={link.isLogout && handleLogout}
                className={`${
                  location.pathname === link.path &&
                  "bg-main-dark text-sm text-white"
                } my-auto flex p-[10px] text-sm rounded-lg items-center text-black`}
              >
                <span>{link.inActive}</span>
                <span className="inline ml-2">{link.label}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
