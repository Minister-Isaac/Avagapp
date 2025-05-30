import React,{useState,useEffect } from "react";
import { Link } from "react-router-dom";
import KnowledgeCardList from "../../components/teacher/KnowledgeCardList";
import axios_instance from "../../utils/axios";

function StudentKnowledge() {
  const [courseData, setCourseData] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios_instance.get("learning/knowledge-trail/");
        const results = response.data;
        setCourseData(results);

      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    fetchStudents();
  }, []);

  return (
    <div className="pr-4 pt-3">
      <div className="flex justify-between p-2 items-center ">
       
        {/* <p  className='flex cursor-pointer p-[10px] items-center rounded-2xl gap-2 bg-main-dark'>Ver tudo</p> */}
        <p  className='font-bold text-[18px] lg:text-[22px] text-black'>Trilha de Conhecimento</p>
     
      </div>
        <KnowledgeCardList
          data={courseData}
          emptyMessage="Nenhuma trilha de conhecimento disponível ainda."
        />
      {/* <div className='flex justify-between p-2 items-center text-white'>
                <p className='font-bold text-[22px] text-black'>Trilha de Conhecimento Importante</p>
                <p  className='flex cursor-pointer p-[10px] items-center rounded-2xl gap-2 bg-main-dark'>Ver tudo</p>
            </div> */}
      {/* <div className='grid  grid-cols-2 lg:grid-cols-4 gap-2 p-3 '>
                {
                    [1,4,3,].map((item, index) => (
                        <Link to={"details"} key={index} className=' p-3 relative mb-4 flex flex-col gap-1 rounded-xl'>
                            <img src="/teacher/react.png" className="rounded-full size-14 bg-main-light p-2 absolute -right-2 -top-2 " />
                            <img src={`/teacher/course${item}.png`} alt="" />
                            <p className='flex justify-between items-end text-lg font-semibold'>
                                <span>Física</span>
                                <BsThreeDotsVertical size={15} className=' rotate-90' />
                            </p>
                            <span className='-mt-1 text-sm text-black/50 '>Atribuído por Sir Haseeb</span>
                         
                        </Link>
                    ))
                }
            </div> */}
    </div>
  );
}

export default StudentKnowledge;
