import { useMobile } from "../../hook/MobileNav";
import { AiFillSetting } from "react-icons/ai";
import { FaBookOpen, FaUserAlt } from "react-icons/fa";
import { ImBook } from "react-icons/im";
import { IoCloseCircle, IoGameController, IoLogOut } from "react-icons/io5";
import { LiaClipboardListSolid } from "react-icons/lia";
import { MdHome } from "react-icons/md";
import { PiClockFill } from "react-icons/pi";
import { NavLink, useLocation } from "react-router-dom";
import { logout } from "../../utils/logout";


 

export default function SSideBar() {
  
const sideLinks = [
        {
            label: "Início",
            inActive: <MdHome />,
            path: "/student/dashboard",
        },
        {
            label: "Visão Geral da Turma",
            inActive: <FaBookOpen />,
            path: "/student/dashboard/class-overview",
        },
        {
            label: "Conhecimento",
            inActive: <ImBook />,
            path: "/student/dashboard/student-knowledge",
        },
        {
            label: "Atividade",
            inActive: <PiClockFill />,
            path: "/student/dashboard/activty",
        },
        {
            label: "Ranking",
            inActive: <LiaClipboardListSolid />,
            path: "/student/dashboard/student-ranking",
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
    ];


    const config = [
        {
            label: "Configurações",
            inActive: <AiFillSetting />,
            path: "/student/dashboard/setting",
        },
        {
            label: "Sair",
            inActive: <IoLogOut />,
            path: "/",
            isLogout: true,
        },
    ];
    const location = useLocation()

    const pathSegments = location.pathname.split('/');


    const { toggleMobile, mobile } = useMobile()

     const handleLogout = async () => {
        await logout(); // Call the logout function
        toggleMobile(); // Close the mobile sidebar if it's open
      };
    return (

        <>
            {
                mobile && (<><div onClick={toggleMobile} className="w-screen lg:hidden block h-screen bg-opacity-5 z-20 absolute bg-black/50">

                </div>
                    <IoCloseCircle onClick={() => toggleMobile()} className="size-10 absolute block top-3 right-3 z-50 text-white" />
                </>)
            }

            {
                mobile && (

                    <div   className={`${
      mobile ? "absolute z-50" : "hidden lg:flex lg:w-[21%]"
    } h-screen lg:h-full flex flex-col lg:w-[21%] bg-bg items-center`}>
                        <div>
                            <img src="/teacher/avag.png" className="size-[110px] " alt="" />
                        </div>
                        <div className="h-full flex flex-col justify-between pb-2 p-2 w-full">
                            <div className="flex flex-col gap-1">
                                {sideLinks.map((link, id) => {

                                    const hrefSegments = link?.path?.split('/');

                                    return (
                                        <NavLink
                                            key={id}
                                            to={link.path}
                                            onClick={mobile ? toggleMobile : undefined}
                                            // className={({isActive}) => isActive ? "my-auto flex  p-[10px] rounded-lg  bg-main-dark text-white" : "my-auto flex  p-[10px] rounded-lg  bg-transparent text-black"}
                                            className={`${
                pathSegments[3] === hrefSegments[3] &&
                "bg-main-dark text-sm text-white"
              } my-auto flex p-[10px] text-sm rounded-lg items-center text-black`}
                                        >
                                            <span >{link.inActive}</span>
                                            <span className="inline  ml-2 ">{link.label}</span>
                                        </NavLink>
                                    )
                                })}
                            </div>
                            <div className="flex flex-col gap-1">
                                {config.map((link, id) => (
                                    <NavLink
                                        key={id}
                                         onClick={
              link.isLogout
                ? async () => {
                    await handleLogout();
                  }
                : mobile
                ? toggleMobile
                : undefined
            }
                                        to={link.path}
                                        className={` ${location.pathname === link.path && "bg-main-dark text-sm text-white"
                                            } my-auto flex  p-[10px] text-sm rounded-lg items-center text-black `}
                                    >
                                        <span >{link.inActive}</span>
                                        <span className="inline  ml-2 ">{link.label}</span>
                                    </NavLink>
                                ))}
                            </div>
                        </div>
                    </div>)
            }

            <div className={` hidden lg:flex flex-col w-[22%] h-screen bg-bg items-center`}>
                <div>
                    <img src="/teacher/avag.png" className="size-[110px] " alt="" />
                </div>
                <div className="h-full flex flex-col w-full justify-between pb-2 p-2">
                    <div className="flex flex-col gap-1">
                        {sideLinks.map((link, id) => {

                            const hrefSegments = link?.path?.split('/');

                            return (
                                <NavLink
                                    key={id}
                                    to={link.path}
                                    // className={({isActive}) => isActive ? "my-auto flex  p-[10px] rounded-lg  bg-main-dark text-white" : "my-auto flex  p-[10px] rounded-lg  bg-transparent text-black"}
                                     className={`${
              location.pathname === link.path &&
              "bg-main-dark text-sm text-white"
            } my-auto flex p-[10px] text-sm rounded-lg items-center text-black`}
                                >
                                    <span >{link.inActive}</span>
                                    <span className="inline  ml-2 ">{link.label}</span>
                                </NavLink>
                            )
                        })}
                    </div>
                    <div className="flex flex-col gap-1">
                        {config.map((link, id) => (
                            <NavLink
                                key={id}
                                to={link.path}
                                onClick={link.isLogout ? handleLogout : toggleMobile} // Logout action for "Sair"
                                className={` ${location.pathname === link.path && "bg-main-dark text-sm text-white"
                                    } my-auto flex  p-[10px] text-sm rounded-lg items-center text-black `}
                            >
                                <span >{link.inActive}</span>
                                <span className="inline  ml-2 ">{link.label}</span>
                            </NavLink>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
