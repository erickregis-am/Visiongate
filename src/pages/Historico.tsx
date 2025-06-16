import { useEffect } from "react";
import Header from "../components/Header";
import HistoryCard from "../components/HistoryCard";
import { useEmployee } from "../contexts/EmployeeContext";

export default function Historico(){

    const { historyEmployees, employees,addHistoryEmployee} = useEmployee();

    useEffect(() => {
        console.log(employees);
        addHistoryEmployee("239436", "entrada");
    },[])

    return (
        <div className="flex flex-col w-full h-dvh justify-start items-center select-none">
            <Header shadow="shadow-lg"/>

            <div className="flex flex-col w-full h-full justify-start items-center bg-neutral-50">
                <div className="flex flex-col w-9/10 pb-10 justify-center gap-10 items-center">
                    <div className="flex flex-row w-full justify-start items-center font-bold text-3xl gap-5 py-10 text-[#0288c7] border-b-2 border-neutral-300">
                        <p>Histórico</p>
                    </div>

                    {historyEmployees.map((employee) => (
                        <HistoryCard key={employee.id}
                        employee={employee} 
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}