import {
  Checkbox,
  Radio,
  Switch,
  Typography,
} from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getUserProfile } from "../utils/auth";
import axios_instance from "../utils/axios";

function Setting() {
  const profile = getUserProfile();
  const role = profile?.role?.toLowerCase();

  const isAdmin = role === "admin";
  const isTeacher = role === "teacher";

  const canAddNotification = isAdmin || isTeacher;
  const canSeeAllTabs = isTeacher;

  const [activeTab, setActiveTab] = useState(
    isTeacher ? "add-notification" : isAdmin ? "add-notification" : "notifications"
  );

  const [desp, setDesp] = useState("");
  const [title, setTitle] = useState("");
  const [selectedRecipient, setSelectedRecipient] = useState("");
  const [sendNotifyModal, setSendNotifyModal] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const apifuntion = async () => {
     try {
      const payload = {
        title,
        message: desp,
        recipient:selectedRecipient,
      };

      await axios_instance.post("api/notifications/", payload);
      resetValues();
    } catch (error) {
      console.error("Erro ao enviar notificação:", error);
      alert("Falha ao enviar a notificação. Tente novamente.");
    } finally {
      setSendNotifyModal(false);
    }
  };

  const handleSend = () => {
    if (!desp || !title) {
      return alert("Todos os campos são obrigatórios");
    }
    if (canSeeAllTabs) {
       apifuntion()
       setSelectedRecipient("student");
    }
    else {
    setSendNotifyModal(true);
    }
  };

  const handlePublish = async () => {
    if (!selectedRecipient) {
      return alert("Por favor, selecione um usuário para publicar");
    }
    apifuntion()
  };

  useEffect(() => {
    if (activeTab === "notifications") {
      axios_instance
        .get("api/notifications")
        .then((res) => {
          setNotifications(res.data);
        })
        .catch((err) => {
          console.error("Failed to load notifications", err);
        });
    }
  }, [activeTab]);

  const resetValues = () => {
    setDesp("");
    setTitle("");
    setSelectedRecipient("");
    setSendNotifyModal(false);
  };

  return (
    <div className="flex h-full overflow-x-hidden bg-main-light cursor-pointer flex-col py-3 px-2 gap-4">
      <div className="flex border-b">
        {canSeeAllTabs ? (
          <>
            <button
              onClick={() => setActiveTab("add-notification")}
              className={`w-1/3 py-2 text-center text-lg font-semibold ${
                activeTab === "add-notification"
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-600"
              }`}
            >
              Adicionar Notificação
            </button>
            <button
              onClick={() => setActiveTab("notifications")}
              className={`w-1/3 py-2 text-center text-lg font-semibold ${
                activeTab === "notifications"
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-600"
              }`}
            >
              Notificações
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`w-1/3 py-2 text-center text-lg font-semibold ${
                activeTab === "settings"
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-600"
              }`}
            >
              Configurações
            </button>
          </>
        ) : isAdmin ? (
          <>
            <button
              onClick={() => setActiveTab("add-notification")}
              className={`w-1/2 py-2 text-center text-lg font-semibold ${
                activeTab === "add-notification"
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-600"
              }`}
            >
              Adicionar Notificação
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
          </>
        ) : (
          <>
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
          </>
        )}
      </div>

      <div className="mt-4">
        {activeTab === "add-notification" && canAddNotification && (
          <div className="p-4 flex flex-col gap-5 divide-y rounded-md">
            <label htmlFor="title" className="font-medium text-base text-black">
              Título da Notificação
              <input
                style={{ resize: "none" }}
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                autoComplete="off"
                placeholder="Título da Notificação"
                className="text-[#545454] mt-2 px-[10px] placeholder:text-sm text-sm border-none outline-none bg-input rounded-lg w-full py-3"
              />
            </label>
            <label htmlFor="message" className="font-medium text-base text-black">
              Notificação
              <textarea
                style={{ resize: "none" }}
                value={desp}
                onChange={(e) => setDesp(e.target.value)}
                rows={6}
                autoComplete="off"
                placeholder="Detalhes da notificação"
                className="text-[#545454] mt-2 px-[10px] placeholder:text-sm text-sm border-none outline-none bg-input rounded-lg w-full py-3"
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
                  {  <Radio
                      color="blue"
                      name="recipient"
                      value="teacher"
                      onChange={(e) => setSelectedRecipient(e.target.value)}
                      label={
                        <div>
                          <Typography color="blue-gray" className="font-semibold">
                            Professor
                          </Typography>
                          <Typography variant="small" color="gray">
                            A notificação será enviada apenas para professores
                          </Typography>
                        </div>
                      }
                      containerProps={{ className: "-mt-5" }}
                    />}
                    <Radio
                      color="blue"
                      name="recipient"
                      value="student"
                      onChange={(e) => setSelectedRecipient(e.target.value)}
                      label={
                        <div>
                          <Typography color="blue-gray" className="font-semibold">
                            Estudante
                          </Typography>
                          <Typography variant="small" color="gray">
                            A notificação será enviada apenas para estudantes
                          </Typography>
                        </div>
                      }
                      containerProps={{ className: "-mt-5" }}
                    />
                    <Radio
                      color="blue"
                      name="recipient"
                      value="both"
                      onChange={(e) => setSelectedRecipient(e.target.value)}
                      label={
                        <div>
                          <Typography color="blue-gray" className="font-semibold">
                            Ambos
                          </Typography>
                          <Typography variant="small" color="gray">
                            A notificação será enviada para professores e estudantes
                          </Typography>
                        </div>
                      }
                      containerProps={{ className: "-mt-5" }}
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
        )}

        {activeTab === "notifications" && (
          <div className="p-4 flex flex-col gap-5 divide-y rounded-md">
            <div className="block gap-6 px-2 space-y-4">
              {notifications.map((data, index) => (
                <div key={index}>
                  <p>Título: {data.title}</p>
                  <p>Mensagem: {data.message}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <>
            {!isAdmin && (
              <Link
                to={"/student/dashboard/student-profile"}
                className="flex flex-col p-2"
              >
                <header className="flex font-semibold text-lg">
                  Configurações de Perfil do Usuário
                </header>
                <ul>
                  <li> - Perfil da Criança </li>
                  <li> - Seleção de Avatar </li>
                </ul>
              </Link>
            )}

            <div className="flex flex-col p-2">
              <header className="flex font-semibold text-lg">
                Notificações e Alertas
              </header>
              <ul>
                <li className="flex justify-between">
                  - Alertas de Atividade <Switch color="blue" defaultChecked />
                </li>
                <li className="flex justify-between">
                  - Configurações de Lembrete <Switch color="blue" />
                </li>
              </ul>
            </div>
            <div className="flex flex-col p-2">
              <header className="flex font-semibold text-lg">
                Controles de Som e Músicas
              </header>
              <ul>
                <li className="flex justify-between">
                  - Narração por Voz <Switch color="blue" />
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
        )}
      </div>
    </div>
  );
}

export default Setting;
