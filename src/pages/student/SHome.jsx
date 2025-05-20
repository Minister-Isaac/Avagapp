import React, { useState, useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoTriangle } from "react-icons/io5";
import { studentData, studentNotify } from "../../../helper/data";
import { getUserProfile } from "../../utils/auth";
import { Link } from 'react-router-dom';
import KnowledgeCardList from "../../components/teacher/KnowledgeCardList";
import axios_instance from "../../utils/axios";

export default function SHome() {
  const profile = getUserProfile();
  const [courseData, setCourseData] = useState([]);
  const [courseDataB, setCourseDataB] = useState([]);
  
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios_instance.get("learning/knowledge-trail/");
        const results = response.data || [];
        setCourseData(results);
        setCourseDataB(results.filter((row) => row.is_watched === true));
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    fetchStudents();
  }, []);
  return (
    <div className="pr-4 px-3 lg:px-0 flex flex-col gap-4">
      <div className="flex items-center">
        <h1 className="text-center -mb-1 text-2xl font-bold">
          Olá, {profile.first_name} {profile.last_name}
        </h1>
        <img src="/teacher/avatar.png" className="size-12" />
      </div>

      <div className="grid gap-3 lg:grid-cols-3">
        <div className="grid col-span-2 gap-3 grid-cols-2">
          {studentData.map((card, id) => (
            <div
              key={id}
              className="flex p-3 lg:p-5 gap-4 bg-main-light justify-start items-center rounded-lg"
            >
              <div className=" bg-[#A9E8FF] p-2 rounded-full ">
                <img src={card.img} alt={card.label} />
              </div>
              <div>
                <p className="font-semibold text-xl">{card.label}</p>
                <div className="flex gap-2 items-center">
                  <p>{card.value} </p>
                  <span
                    className={`flex text-xs items-end ${
                      card.label === "Medalhas"
                        ? "text-[#FF0000]"
                        : "text-main-dark"
                    }`}
                  >
                    <IoTriangle
                      size={10}
                      className=" rotate-180   mb-[3px] mr-[2px]"
                    />
                    {card.desp}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className=" grid lg:col-span-1 col-span-2 lg:flex flex-col px-5 gap-3">
          <p className="px-8 text-main-dark font-medium flex">
            Classificação
            <img src="/student/star.png" alt="" />
          </p>
          {studentNotify.map((winner, id) => (
            <div key={id} className="flex items-center gap-3">
              <p className="bg-main-light text-center flex items-center justify-center  size-10 text-xs text-main-dark w-7 font-medium rounded-full h-7 ">
                #{winner.value}
              </p>
              <div className="bg-main-light py-[3px] items-center relative flex w-full gap-2 px-3 rounded-lg">
                <img src={winner.img} className="size-8" />
                <div>
                  <p className="text-base font-medium">{winner.name}</p>
                  <p className="text-xs text-black/50">{winner.desp}</p>
                </div>
                <img
                  src="/student/award.png"
                  className="absolute -top-[14px] right-0"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex justify-between p-2 items-center text-white">
          <p className="font-bold text-[22px] text-black">
            Trilha do Conhecimento
          </p>
          <Link
            to="/student/dashboard/knowledge"
            className="flex cursor-pointer p-[10px] items-center rounded-2xl gap-2 bg-main-dark"
          >
            Ver tudo
          </Link>
        </div>
          <KnowledgeCardList
            data={courseData}
            emptyMessage="Nenhuma trilha de conhecimento disponível ainda."
          />
        <div className="flex justify-between p-2 items-center text-white">
          <p className="font-bold text-[22px] text-black">Trilha das Aulas</p>
          <Link
            to="/student/dashboard/knowledge"
            className="flex cursor-pointer p-[10px] items-center rounded-2xl gap-2 bg-main-dark"
          >
            Ver tudo
          </Link>
        </div>
        {/* <div className="grid  grid-cols-2 lg:grid-cols-4 gap-2 p-3 "> */}
          <KnowledgeCardList
            data={courseDataB}
            offset={10}
            emptyMessage="Nenhuma trilha importante marcada."
          />
        {/* </div> */}
      </div>
    </div>
  );
}
