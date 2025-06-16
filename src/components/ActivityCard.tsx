import { User } from "lucide-react";
import type { Employee } from "../contexts/EmployeeContext";
  
export default function ActivityCard({pullEmployee} : {pullEmployee: Employee | undefined}) {
    
    return (
        <>
        <div className="flex flex-col w-1/3 rounded-xl text-2xl h-150 justify-center items-center shadow-gray-400 shadow-sm bg-neutral-200 hover:shadow-md transition-shadow">
            {pullEmployee ? 
            
            <div className="flex flex-row w-full h-full justify-between items-center p-5 gap-3">
                {pullEmployee.idImageLocal ? 
                <img className="flex justify-center items-center w-1/2 h-full bg-contain rounded-md" src={pullEmployee.idImageLocal}/> 
                : <div className="flex justify-center items-center w-1/2 h-full bg-[#d6d6d6] rounded-md">
                    <User color="#B9B9B9" className="flex justify-center items-center w-full h-full"/>    
                </div>}

                <div className="flex flex-col w-1/2 h-full justify-center items-start p-10 gap-5 bg-neutral-100 rounded-md">
                    <div className="flex flex-row justify-start items-center gap-5 text-xl">
                        <p className="font-bold text-xl">Nome: </p> {pullEmployee.name}
                    </div>

                    <div className="flex flex-row justify-start items-center gap-5 text-xl">
                        <p className="font-bold text-xl">ID: </p> {pullEmployee.id}
                    </div>

                    <div className="flex flex-row justify-start items-center gap-5 text-xl">
                        <p className="font-bold text-xl">Organização: </p> {pullEmployee.organization}
                    </div>

                    <div className="flex flex-row justify-start items-center gap-5 text-xl">
                        <p className="font-bold text-xl">Função: </p> {pullEmployee.function}
                    </div>

                    <div className="flex flex-row justify-start items-start gap-5 text-xl">
                        <p className="font-bold text-xl">Autorizações: </p> 
                        <div className="flex flex-col  justify-start items-start gap-1">
                            <p className="underline text-[#0288c7]">{pullEmployee.authorization.authorizationName}</p>
                            <p className="italic">{`"${pullEmployee.authorization.level}"`}</p>
                        </div>
                    </div>
                </div>
            </div>

    : <p className="text-xl">Sem correspondência atual</p>}
        </div>
        </>
    );
}