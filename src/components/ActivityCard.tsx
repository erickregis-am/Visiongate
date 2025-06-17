import { User } from "lucide-react";
import type { Employee } from "../contexts/EmployeeContext";
  
export default function ActivityCard({pullEmployee} : {pullEmployee: Employee | undefined}) {
    
    return (
        <>
        <div className="flex flex-col w-1/3 rounded-xl text-2xl h-160 justify-center items-center shadow-gray-400 shadow-sm bg-neutral-200 hover:shadow-md transition-shadow">
            {pullEmployee ? 
            
            <div className="flex flex-col w-full h-full justify-between items-center p-5 gap-3">
                {pullEmployee.idImageLocal ? 
                <div className="flex justify-center items-center border-10 border-neutral-100 rounded-sm">
                    <img className="flex justify-center items-center w-50 h-50 bg-contain rounded-md" src={pullEmployee.idImageLocal}/> 
                </div>
                
                : <div className="flex justify-center items-center w-1/2 h-full bg-[#d6d6d6] rounded-md">
                    <User color="#B9B9B9" className="flex justify-center items-center w-full h-full"/>    
                </div>}

                <span className="w-full border-b-2 p-5 py-0 border-gray-300"></span>

                <div className="flex flex-col w-full h-full justify-center items-start p-10 gap-5 bg-neutral-100 rounded-md">
                    <div className="flex flex-row w-full justify-between items-center gap-5 text-xl">
                        <p className="font-bold text-xl">ID: </p> 
                        <p>{pullEmployee.id}</p>
                    </div>

                    <div className="flex flex-row w-full justify-between items-center gap-5 text-xl">
                        <p className="font-bold text-xl">Nome: </p> 
                        <p>{pullEmployee.name}</p>
                    </div>

                    <div className="flex flex-row w-full justify-between items-center gap-5 text-xl">
                        <p className="font-bold text-xl">Organização: </p> 
                        <p>{pullEmployee.organization}</p>
                    </div>

                    <div className="flex flex-row w-full justify-between items-center gap-5 text-xl">
                        <p className="font-bold text-xl">Função: </p> 
                        <p>{pullEmployee.function}</p>
                    </div>

                    <div className="flex flex-row w-full justify-between items-start gap-5 text-xl">
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