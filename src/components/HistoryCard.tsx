import { useState } from "react";
import { useEmployee, type Employee } from "../contexts/EmployeeContext";
import { User } from "lucide-react";

interface HistoryCardProps {
    employee: Employee,
}

export default function HistoryCard({ employee }: HistoryCardProps) {


  return (
        <div className="flex flex-col w-full gap-3 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col justify-start items-center w-full min-h-[100px] p-2 rounded-lg bg-neutral-200 shadow transition-all duration-300">
                <div className="flex justify-between w-full items-center p-4 gap-4 bg-neutral-100 rounded-lg">
                    <div className="w-36 h-36 flex justify-center items-center">
                        {employee.idImage ? (
                        <img
                        className="w-28 h-28 object-cover rounded-md"
                        src={employee.idImageLocal}
                        alt="Foto do funcionário"
                        />
                        ) : (
                        <div className="w-28 h-28 bg-[#d6d6d6] flex items-center justify-center rounded-md">
                            <User color="#B9B9B9" size={72} />
                        </div>
                        )}
                    </div>

                    <div className="flex flex-row flex-1 justify-between pr-15">
                        <div className="flex flex-col gap-1 text-lg">
                            <div className="flex gap-1">
                                <p className="font-bold">ID:</p>
                                <p>{employee.id}</p>
                            </div>

                            <div className="flex gap-1">
                                <p className="font-bold">Nome:</p>
                                <p>{employee.name}</p>
                            </div>

                            <div className="flex gap-1">
                                <p className="font-bold">Função:</p>
                                <p>{employee.function}</p>
                            </div>
                        </div>

                        <div className="flex flex-col justify-between gap-1 text-lg">
                            <div className="flex gap-1">
                                <p className="font-bold">Data de Acesso:</p>
                                <p>{employee.history?.date instanceof Date 
                                    ? employee.history.date.toLocaleString() 
                                    : employee.history?.date}</p>
                            </div>

                            <div className="flex flex-col justiify-center items-center gap-2">
                                <p className="p-3 rounded-md px-10 text-white bg-green-500">{employee.history?.action}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  );
}