import { Checkbox, Radio, Switch, Typography } from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import { FaHome } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { getUserProfile } from "../utils/auth";
import axios_instance from "../utils/axios";

function Setting() {
  const profile = getUserProfile();

  const location = useLocation();
  const create = location.pathname.includes("admin");

  const [activeTab, setActiveTab] = useState("notifications");
  const [rate, setRate] = useState("");
  const [recom, setRecom] = useState("");
  const [form, setForm] = useState(false);
  const [desp, setDesp] = useState("");
  const [title, setTitle] = useState("");

  const [sendNotifyModal, setSendNotifyModal] = useState(false);

  const [selectedRecipient, setSelectedRecipient] = useState(""); // Track selected checkbox
  const [notifications, setNotifications] = useState([]);

  const handleSend = () => {
    if (!desp || !title) {
      return alert("Todos os campos são obrigatórios");
    }
    setSendNotifyModal(true);
  };

  const handlePublish = () => {
    if (!selectedRecipient) {
      return alert("Por favor, selecione um usuário para publicar");
    }
    setSendNotifyModal(false);
    alert(`Notificação enviada para ${selectedRecipient}`);
    resetValues();
  };

  useEffect(() => {
    if (activeTab === "notifications") {

      axios_instance
        .get("/api/notifications") // Replace with your real API URL
        .then((res) => {
          setNotifications(res.data);
        })
        .catch((err) => {
          setError("Failed to load notifications",err);
        });
    }
  }, [activeTab]);

  const resetValues = () => {
    setDesp(""); // Reset description
    setTitle(""); // Reset title
    setSelectedRecipient(""); // Reset selected recipient
    setSendNotifyModal(false); // Close the modal
  };

  return (
    <div className="flex h-full overflow-x-hidden bg-main-light cursor-pointer flex-col py-3  px-2 gap-4">
      <div className="flex border-b">
        <button
          onClick={() => setActiveTab("notifications")}
          className={`w-1/2 py-2 text-center text-lg font-semibold ${
            activeTab === "notifications"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-600"
          }`}
        >
          Notificações
        </button>
        <button
          onClick={() => setActiveTab("settings")}
          className={`w-1/2 py-2 text-center text-lg font-semibold ${
            activeTab === "settings"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-600"
          }`}
        >
          Configurações
        </button>
      </div>

      <div className="mt-4">
        {activeTab === "settings" ? (
          <>
            <Link
              to={"/student/dashboard/student-profile"}
              className={`flex  flex-col p-2 ${create ? "hidden" : "flex"}`}
            >
              <header className="flex font-semibold text-lg">
                Configurações de Perfil do Usuário
              </header>
              <ul>
                <li> - Perfil da Criança </li>
                <li> - Seleção de Avatar </li>
              </ul>
            </Link>

            <div className="flex  flex-col p-2 ">
              <header className="flex font-semibold text-lg">
                Notificações e Alertas{" "}
              </header>
              <ul>
                <li className="flex justify-between">
                  {" "}
                  - Alertas de Atividade <Switch color="blue" defaultChecked />
                </li>
                <li className="flex justify-between">
                  {" "}
                  - Configurações de Lembrete <Switch color="blue" />
                </li>
              </ul>
            </div>
            <div className="flex  flex-col p-2 ">
              <header className="flex font-semibold text-lg">
                Controles de Som e Músicas
              </header>
              <ul>
                <li className="flex justify-between">
                  {" "}
                  - Narração por Voz
                  <Switch color="blue" />
                </li>
              </ul>
            </div>

            <Link
              to={"/student/dashboard"}
              className="p-2 bg-white text-main-dark rounded-full lg:hidden absolute bottom-4 left-4 size-12 shadow-md flex justify-center items-center"
            >
              <FaHome className="size-full" />
            </Link>
          </>
        ) : (
          <>
            <div
              className={`p-4 flex flex-col gap-5 divide-y rounded-md  ${
                create ? "hidden" : "flex"
              } `}
            >
              {/* <p className="mt-2">Nenhuma notificação disponível.</p> */}
              <div className="block gap-6 px-2 space-y-4">
                {notifications && notifications.length > 0 ? (
                  notifications.map((data, index) => <p key={index}>{data}</p>)
                ) : (
                  <p className="flex justify-center ">Sem notificações no momento.</p>
                )}
              </div>
            </div>

            <div
              className={`p-4 flex flex-col gap-5 divide-y rounded-md  ${
                create ? "flex" : "hidden"
              } `}
            >
              <label
                htmlFor="name"
                className="font-medium text-base text-black"
              >
                Título da Notificação
                <input
                  style={{ resize: "none" }}
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  rows={6}
                  type="text"
                  autoComplete="off"
                  placeholder="Título da Notificação"
                  className="text-[#545454]  2xl:px-[18px] mt-2 lg:px-[10px] px-[7px] 2xl:placeholder:text-base lg:placeholder:text-sm text-sm 2xl:text-base placeholder:text-[#545454] border-none active:border-none outline-none bg-input rounded-lg 2xl:rounded-xl w-full py-3 2xl:py-4"
                  id="name"
                />
              </label>
              <label
                htmlFor="name"
                className="font-medium text-base text-black"
              >
                Notifications
                <textarea
                  style={{ resize: "none" }}
                  value={desp}
                  onChange={(e) => setDesp(e.target.value)}
                  rows={6}
                  type="text"
                  autoComplete="off"
                  placeholder="Detalhes da notificação"
                  className="text-[#545454]  2xl:px-[18px] mt-2 lg:px-[10px] px-[7px] 2xl:placeholder:text-base lg:placeholder:text-sm text-sm 2xl:text-base placeholder:text-[#545454] border-none active:border-none outline-none bg-input rounded-lg 2xl:rounded-xl w-full py-3 2xl:py-4"
                  id="name"
                />
              </label>

              <p
                onClick={handleSend}
                className="capitalize w-full p-3 rounded-lg bg-main-dark text-white text-center mt-5"
              >
                Publicar notificações
              </p>
              {sendNotifyModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                  <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                    <h2 className="text-lg font-bold mb-4">
                      Selecionar Destinatário
                    </h2>
                    <div className="flex flex-col gap-3">
                      <Radio
                        color="blue"
                        type="radio"
                        name="recipient"
                        value="Professor"
                        onChange={(e) => setSelectedRecipient(e.target.value)}
                        label={
                          <div>
                            <Typography
                              color="blue-gray"
                              className="font-semibold"
                            >
                              Professor
                            </Typography>
                            <Typography
                              variant="small"
                              color="gray"
                              className="font-normal"
                            >
                              A notificação será enviada apenas para professores
                            </Typography>
                          </div>
                        }
                        containerProps={{
                          className: "-mt-5",
                        }}
                      />
                      <Radio
                        color="blue"
                        type="radio"
                        name="recipient"
                        value="Estudante"
                        onChange={(e) => setSelectedRecipient(e.target.value)}
                        label={
                          <div>
                            <Typography
                              color="blue-gray"
                              className="font-semibold"
                            >
                              Estudante
                            </Typography>
                            <Typography
                              variant="small"
                              color="gray"
                              className="font-normal"
                            >
                              A notificação será enviada apenas para estudantes
                            </Typography>
                          </div>
                        }
                        containerProps={{
                          className: "-mt-5",
                        }}
                      />
                      <Radio
                        color="blue"
                        type="radio"
                        name="recipient"
                        value="Ambos Professor e Estudante"
                        onChange={(e) => setSelectedRecipient(e.target.value)}
                        label={
                          <div>
                            <Typography
                              color="blue-gray"
                              className="font-semibold"
                            >
                              Ambos
                            </Typography>
                            <Typography
                              variant="small"
                              color="gray"
                              className="font-normal"
                            >
                              A notificação será enviada para professores e
                              estudantes
                            </Typography>
                          </div>
                        }
                        containerProps={{
                          className: "-mt-5",
                        }}
                      />
                    </div>

                    <div className="flex justify-end mt-3 gap-3">
                      <button
                        onClick={() => setSendNotifyModal(false)}
                        className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={handlePublish}
                        className="px-4 py-2 rounded-md bg-main-dark text-white hover:bg-opacity-90"
                      >
                        Publicar
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Setting;
