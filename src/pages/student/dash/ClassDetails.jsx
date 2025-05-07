import { Dialog, Tab, TabPanel, Tabs, TabsBody, TabsHeader } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'
import { subtitle } from '../../../../helper/data';
import { useParams } from 'react-router-dom';

function ClassDetails() {
    const [activeTab, setActiveTab] = useState("Transcrição")

    const {id} =useParams()

    const [open, setOpen] = useState(false);

    const handleOpen = () => {

        setOpen(!open)
    }

    useEffect(() => {
        const interval = setTimeout(() => {
            setOpen(!open)
        }, 3000)

        return () => {
            clearTimeout(interval)
        }
    }, [])

    const data = [
        {
            label: "Transcrição",
            value: "Transcrição",
            desc: `It really matters and then like it really doesn't matter.
          What matters is the people who are sparked by it. And the people 
          who are like offended by it, it doesn't matter.`,
        },
        {
            label: "Notas",
            value: "Notas",
            desc: `Because it's about motivating the doers. Because I'm here
          to follow my dreams and inspire other people to follow their dreams, too.`,
        },
        {
            label: "Downloads",
            value: "downloads",
            desc: `We're not always in the position that we want to be at.
          We're constantly growing. We're constantly making mistakes. We're
          constantly trying to express ourselves and actualize our dreams.`,
        },
        {
            label: "PDFs",
            value: "pDFs",
            desc: `Because it's about motivating the doers. Because I'm here
          to follow my dreams and inspire other people to follow their dreams, too.`,
        },

    ];
    return (
        <div className='p-3 flex gap-3 flex-col pt-5 pr-10'>


            <Dialog
                open={open}
                handler={handleOpen}
                size="xs"
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0.9, y: -100 },
                }}
                className="border-2 border-main-dark"
            >
                <div className='2xl:p-[30px]  justify-center items-center font-num w-[100%]  p-4 lg:p-5 flex flex-col gap-[18px] rounded-xl 2xl:rounded-3xl  bg-main-light'>
                    <img src="/student/congrat.png" className="w-[50%]" />

                    <div className="w-full flex text-center flex-col items-center jusc'">
                        <p className="text-main-dark font-semibold text-2xl">Parabéns</p>
                        <p className='text-center text-lg font-medium'>Você concluiu com sucesso
                        </p>
                        <p className='text-center text-sm'>Clique no botão abaixo para gerar e baixar seu certificado de conclusão de curso

                        </p>
                    </div>

                    <p className='bg-main-dark w-[100%] rounded-xl text-center text-white font-bold text-xl mt-2 2xl:text-2xl py-3 cursor-pointer' onClick={handleOpen}>
                    Gerar certificado

                    </p>
                </div>

            </Dialog>
            <p className='font-bold text-[22px] text-black'>Visão Geral da Aula</p>
            <div className='flex w-full h-[30dvh] overflow-hidden'>
                <img src={`/teacher/course${id}.png`} className='w-full object-cover h-full' alt="" />
            </div>
            <p className='font-bold text-[22px] text-black'>Lição 01: O que é UX?</p>

            <Tabs value={activeTab}>
                <TabsHeader
                    className="rounded-none border-b w-[35%] border-blue-gray-50 bg-transparent p-0"
                    indicatorProps={{
                        className:
                            "bg-transparent border-b-4 border-main-dark  shadow-none rounded-[3px]",
                    }}
                >
                    {data.map(({ label, value }) => (
                        <Tab
                            key={value}
                            value={value}
                            onClick={() => setActiveTab(value)}
                            className={activeTab === value ? "text-main-dark " : ""}
                        >
                            {label}
                        </Tab>
                    ))}
                </TabsHeader>
                <TabsBody className='border-t border-black/20'>
                    {data.map(({ value }) => (
                        <TabPanel key={value} value={value}>
                            {
                                value === "Transcrição" ? (<div className='flex gap-5 flex-col'  >
                                    {
                                        subtitle.map((data, i) => (
                                            <div key={i} className='flex gap-6'>
                                                <p className='flex w-[30%]'>{data.time}</p>
                                                <p className='text-start text-sm'>{data.transcript}</p>
                                            </div>
                                        ))
                                    }
                                </div>) : (<div>
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit velit perspiciatis nesciunt, impedit ipsa atque magni possimus expedita iure ea tempora magnam non ab nemo qui provident assumenda totam? Inventore?
                                </div>)
                            }
                        </TabPanel>
                    ))}
                </TabsBody>
            </Tabs>

        </div>
    )
}

export default ClassDetails