import { createContext, useContext, useState, useEffect, useRef } from "react";
import type { ReactNode } from "react";

export type Employee = {
    idImage?: File;
    binaryImage?: Uint8Array;
    idImageLocal?: string;
    name: string,
    id: string | number;
    organization: string;
    function: string;
    authorization: {
        authorizationName: string,
        level: string;
    };
    history?: Date;
}

type EmployeeContextType = {
    employees: Employee[] | [];
    recentEmployees: Employee[] | [];
    historyEmployees: Employee[] | [];
    recentEmployee: Employee | undefined;
    addRecentEmployee: (id: string | number) => void;
    searchedEmployee: Employee | undefined;
    addEmployee: (employee: Employee) => void;
    addHistoryEmployee: (id: string | number) => void
    removeEmployee: (id: string | number) => void;
    findEmployee: (id: string | number) => void;
    updateEmployee: (employee: Employee) => void;
    debugEmployeers: () => void
}

const EmployeeContext = createContext<EmployeeContextType | undefined>(undefined);
const EmployeesKey = "funcionarios";
const EmployeesHistoryKey = "funcionarios-historico";



export const EmployeeProvider = ({ children }: { children: ReactNode }) => {
    const ws1Ref = useRef<WebSocket | null>(null);
    const ws2Ref = useRef<WebSocket | null>(null);
    const ws3Ref = useRef<WebSocket | null>(null);
    const ws4Ref = useRef<WebSocket | null>(null);

    const [employees, setEmployees] = useState<Employee[] | []>([]);
    const [historyEmployees, setHistoryEmployees] = useState<Employee[] | []>([]);
    const [recentEmployee, setRecentEmployee] = useState<Employee | undefined>(undefined);
    const [searchedEmployee, setSearchedEmployee] = useState<Employee | undefined>(undefined);
    const [recentEmployees, setRecentEmployees] = useState<Employee[] | []>([]);

    useEffect(() => {
        const stored = localStorage.getItem(EmployeesKey);
        if (stored) {
            setEmployees(JSON.parse(stored));
        }
    }, []);

    function addEmployee (employee: Employee) {
        const updatedEmployees = [...(employees || []), employee];
        setEmployees(updatedEmployees);
        localStorage.setItem(EmployeesKey, JSON.stringify(updatedEmployees));
            
        ws1Ref.current = new WebSocket('ws://192.168.43.190:4000/history/criar-autorizacao');
        ws2Ref.current = new WebSocket('ws://192.168.43.190:4000/history/registrar-funcionario');
        ws3Ref.current = new WebSocket('ws://192.168.43.190:4000/history/registrar-imagens');

        ws1Ref.current.onopen = () => {
            console.log("ws1 conectado");
            ws1Ref.current?.send(JSON.stringify(employee.authorization));
        }

        ws2Ref.current.onopen = () => {
            console.log("ws2 conectado");
                ws2Ref.current?.send(JSON.stringify({
                    id: employee.id,
                    name: employee.name,
                    function: employee.function,
                    organization: employee.organization,
                    authorizationName: employee.authorization.authorizationName
            }));
        }

        ws3Ref.current.onopen = () => {
            console.log("ws3 conectado");
            ws3Ref.current?.send(JSON.stringify({id: employee.id, quantidade: 1}));

            setTimeout(() => {
                ws3Ref.current?.send(employee.binaryImage!);
            }, 200);
        }
    }


    function findEmployee(id: string | number) {
        const searchedEmployee = employees.find((emp: Employee) => 
            emp.id === id
        );
        setSearchedEmployee(searchedEmployee);
    }

    function addHistoryEmployee(id: string | number) {
        const searchedEmployee = employees.find((emp: Employee) => 
            emp.id === id
        );

        if(!searchedEmployee) return;

        const newHistoryEmployee: Employee = {
            ...searchedEmployee,
            history: new Date()
        }  

        const updatedHistoryEmployees = [...historyEmployees , newHistoryEmployee];

        localStorage.setItem(EmployeesHistoryKey, JSON.stringify(updatedHistoryEmployees));
        setHistoryEmployees(updatedHistoryEmployees);
    }

    function removeEmployee (id: string | number) {
        if(!employees) return;

        const newEmployees = employees.filter(emp => emp.id !== id);
        localStorage.setItem(EmployeesKey, JSON.stringify(newEmployees));
        setEmployees(newEmployees);
    }

   function updateEmployee(updated: Employee) {
        const updatedEmployees = employees.map(emp => {
        if (emp.id === updated.id) {
            return {
                ...emp,
                ...updated,
                idImageLocal: updated.idImageLocal ?? emp.idImageLocal,
                idImage: updated.idImage ?? emp.idImage,
            };
        }
            return emp;
        });

    setEmployees(updatedEmployees);
    localStorage.setItem(EmployeesKey, JSON.stringify(updatedEmployees));
    }

    function addRecentEmployee(){
        ws4Ref.current = new WebSocket('ws://192.168.43.190:4000/history/ultima-entrada');
        

        ws4Ref.current.onopen = () => {
            console.log("ws1 conectado");
        }

        let data: Employee;
        ws4Ref.current.onmessage = (event) => {
            try {
                data = JSON.parse(event.data);
                console.log("Mensagem recebida:", data);
            } catch {
                console.log("Recebido (raw):", event.data);
            }
        }
    }


    function debugEmployeers(){
        console.log(employees)    
    }


    return (
        <EmployeeContext.Provider value={{employees, recentEmployees,searchedEmployee, historyEmployees ,updateEmployee ,addEmployee, removeEmployee, debugEmployeers, findEmployee
            ,addHistoryEmployee, addRecentEmployee, recentEmployee
        }}>
            {children}
        </EmployeeContext.Provider>
    );
}

export function useEmployee() {
        const context = useContext(EmployeeContext);
        if (!context) {
            throw new Error('useEmployee tem que estar dentro de um EmployeeProvider');
        } return context;
}



