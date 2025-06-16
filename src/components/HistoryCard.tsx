import {type Employee } from "../contexts/EmployeeContext";
import { User } from "lucide-react";

interface HistoryCardProps {
    employee: Employee,
}

export default function HistoryCard({ employee }: HistoryCardProps) {
    
  return (
    <div className="flex flex-col w-full gap-3 rounded-xl shadow-sm hover:shadow-md transition-shadow">
        <div className="flex flex-col justify-start items-center w-full min-h-[100px] p-2 rounded-xl bg-white shadow transition-all duration-300">
            <div className="flex flex-col justify-between w-full  items-center gap-4  rounded-lg">
                <div className="w-9/10 p-3 py-6 gap-3 flex flex-row justify-start items-center border-b-2 border-gray-300">
                    {employee.idImage ? (
                    <img
                    className="w-20 h-20 object-cover rounded-md"
                    src={employee.idImageLocal}
                    alt="Foto do funcionário"
                    />
                    ) : (
                    <div className="w-28 h-28 bg-[#d6d6d6] flex items-center justify-center rounded-md">
                        <User color="#B9B9B9" size={72} />
                    </div>
                    )}

                    <div className="flex flex-col gap-1">
                        <p className="font-bold text-gray-900 text-lg">{employee.name}</p>
                            <div className="flex text-md text-gray-500 gap-1">
                            <p>ID:</p>
                            <p>{employee.id}</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col w-9/10 p-3 flex-1 justify-between text-lg gap-3">
                        <div className="flex w-full justify-between items-center">
                            <p className="font-medium text-[#0288c7]">Função:</p>
                            <p className="text-gray-900">{employee.function}</p>
                        </div>
                             
                        <div className="flex w-full justify-between items-center">
                            <p className="font-medium text-[#0288c7]">Data:</p>
                            <p className="text-gray-900">{`${employee.history?.toLocaleDateString("pt-BR")}`}</p>
                        </div>

                        <div className="flex w-full justify-between items-center">
                            <p className="font-medium text-[#0288c7]">Hora:</p>
                            <p className="text-gray-900">{`${employee.history?.toLocaleTimeString("pt-BR")}`}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}