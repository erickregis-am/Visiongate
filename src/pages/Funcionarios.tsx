import { CirclePlus , ChevronRight, Edit, Trash2, User } from "lucide-react";
import Header from "../components/Header";
import FuncionarioModal from "../components/FuncionarioModal";
import { use, useEffect, useState } from "react";
import { useEmployee, type Employee } from "../contexts/EmployeeContext";

export default function Funcionarios(){
  const { employees } = useEmployee();
  const isEmployeeNull = !employees || employees.length === 0;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState<Employee | undefined>(undefined);

  function handleOpenModal() {
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setEmployeeToEdit(undefined); // limpa a seleção ao fechar
  }

  function handleEdit(employee: Employee) {
    setEmployeeToEdit(employee);
    setIsModalOpen(true);
  }

  useEffect(() => {
    
  },[employees])

  return (
    <div className="flex flex-col w-full h-dvh justify-start items-center select-none">
      <Header shadow="shadow-lg" />

      <div className="flex flex-col w-full h-full justify-start items-center bg-neutral-50">
        <div className="flex flex-col w-9/10 pb-10 justify-center items-center">
          <div className="flex flex-row w-full justify-start items-center font-bold text-3xl gap-5 py-6 text-[#0288c7] border-b-2 border-neutral-300">
            <p>Funcionários</p>
            <p>-</p>
            <button
              className="flex flex-row justify-center items-center gap-1 text-2xl p-3 bg-[#0288c7] hover:bg-[#176a91] text-white rounded-xl"
              onClick={() => {
                setEmployeeToEdit(undefined); // abrir modal para criar novo
                handleOpenModal();
              }}
            >
              criar funcionário
              <CirclePlus size={32} />
            </button>
          </div>

          {isEmployeeNull ? (
            <p className="flex justify-center items-center w-full h-full p-50 text-gray-600">
              Nenhum funcionário está cadastrado.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full p-2">
              {employees.map((employee) => (
                <FuncionarioCards
                  key={employee.id}
                  employee={employee}
                  onEdit={handleEdit} // passa função para editar
                />
              ))}
            </div>
          )}

          <FuncionarioModal
            onClose={handleCloseModal}
            isOpen={isModalOpen}
            employeeToEdit={employeeToEdit} // passa o funcionário selecionado para editar
          />
        </div>
      </div>
    </div>
  );
}


function FuncionarioCards({ employee, onEdit}: {employee: Employee, onEdit: (employee: Employee) => void;}) {
  const { removeEmployee } = useEmployee();
  const [cardInfoVisible, setCardInfoVisible] = useState(false);

  function toggleCardInfo() {
    setCardInfoVisible((prev) => !prev);
  }

  return (
    <div className="flex flex-col w-full gap-3 shadow-sm hover:shadow-md transition-shadow rounded-lg">
      <div className="flex flex-col justify-start items-center w-full min-h-[200px] p-2 rounded-lg bg-neutral-200 shadow transition-all duration-300">
        <div className="flex w-full justify-end p-1">
          <div className="flex gap-2">
            <button
              className="p-1 transition hover:bg-neutral-300 rounded-sm"
              onClick={() => onEdit(employee)} 
            >
              <Edit color="#0288c7" />
            </button>

            <button
              className="p-1 transition hover:bg-neutral-300 rounded-sm"
              onClick={() => removeEmployee(employee.id)}
            >
              <Trash2 color="red" />
            </button>
          </div>
        </div>

        <div className="flex justify-between w-full items-center p-4 gap-4 bg-neutral-100 rounded-lg">
          <div className="w-36 h-36 flex justify-center items-center">
            {employee.idImageLocal ? (
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

          <div className="flex flex-col flex-1 gap-1 text-lg">
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

          <button
            className="p-1 transition hover:bg-neutral-300 rounded-sm"
            onClick={toggleCardInfo}
          >
            <ChevronRight
              color="#4a5565"
              size={36}
              className={`transform transition-transform duration-200 ${
                cardInfoVisible ? "rotate-90" : "rotate-0"
              }`}
            />
          </button>
        </div>

        {cardInfoVisible && (
          <div className="flex flex-col w-full mt-4 bg-neutral-100 p-4 rounded-lg gap-3 text-lg">
            <div className="flex gap-1">
              <p className="font-bold">Organização:</p>
              <p>{employee.organization}</p>
            </div>

            <div className="flex flex-col gap-1">
              <p className="font-bold">Autorização:</p>
              <p className="underline text-[#0288c7]">{employee.authorization.authorizationName}</p>
              <p className="italic">"{employee.authorization.level}"</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
