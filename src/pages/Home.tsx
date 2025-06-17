import { useEffect } from "react";
import ActivityCard from "../components/ActivityCard";
import Header from "../components/Header";
import { useEmployee } from "../contexts/EmployeeContext";
import StatCard from "../components/StatCard";
 



export default function Home(){


    const { addRecentEmployee, recentEmployee, employees, historyEmployees } = useEmployee();

    useEffect(() => {
        addRecentEmployee;
    }, [addRecentEmployee]);

    

    return (
        <div className="flex flex-col w-full h-dvh justify-start items-center select-none">
           <Header shadow="shadow-lg"/>
           <div className="flex flex-col w-full h-full justify-start items-center bg-neutral-50">
               <div className="flex flex-col w-9/10 justify-center gap-10 items-center ">
                    <div className="flex flex-row w-full justify-center items-start gap-10 py-10">
                        <div className="flex flex-col w-2/3 h-full justify-center items-center gap-20">
                            <StatCard icon={{name: "contact"}} 
                            title="Total de Funcionários" value={employees.length} color="bg-blue-500"/>

                            <StatCard icon={{name: "trending-up"}} 
                            title="Entradas Hoje" value={historyEmployees.length} color="bg-green-500"/>


                        </div>

                        <ActivityCard pullEmployee={recentEmployee} />
                    </div>
                    
                </div>
           </div>
        </div>
    );
}