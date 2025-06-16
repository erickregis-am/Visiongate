import { useEffect, useRef, useState } from "react";
import { useEmployee, type Employee } from "../contexts/EmployeeContext";
import InputForm from "./InputForm";
import ImageUploader from "./ImageUploader";

interface FuncionarioModalProps {
  isOpen: boolean;
  onClose: () => void;
  employeeToEdit?: Employee;
}

export default function FuncionarioModal({ isOpen, onClose, employeeToEdit }: FuncionarioModalProps) {
  const [idImage, setIdImage] = useState<File | undefined>(undefined);
  const [localImage, setLocalImage] = useState<string | undefined>(undefined);
  const [binaryImage, setBinaryImage] = useState<Uint8Array | undefined>(undefined); 
  const [id, setId] = useState<string | number>("");
  const [name, setName] = useState("");
  const [organization, setOrganization] = useState("");
  const [position, setPosition] = useState("");
  const [authorizationName, setAuthorizationName] = useState("");
  const [authorizationlevel, setAuthorizationlevel] = useState("");

  const { addEmployee, updateEmployee, employees } = useEmployee();
  const initialized = useRef(false);

  useEffect(() => {
    if(!isOpen){
      initialized.current = false;
    } else if (isOpen && employeeToEdit) {
      initialized.current = true;
      setId(employeeToEdit.id);
      setName(employeeToEdit.name);
      setOrganization(employeeToEdit.organization);
      setPosition(employeeToEdit.function);
      setAuthorizationName(employeeToEdit.authorization.authorizationName);
      setAuthorizationlevel(employeeToEdit.authorization.level);
      setLocalImage(employeeToEdit.idImageLocal);  
    } else if (isOpen && !employeeToEdit && !initialized.current) {
      initialized.current = true;
      setId("");
      setName("");
      setOrganization("");
      setPosition("");
      setAuthorizationName("");
      setAuthorizationlevel("");
      setIdImage(undefined);
      setLocalImage(undefined);
    }
  }, [isOpen, employeeToEdit]);

  if (!isOpen) return null;

  function handleImageUpload(file: File | undefined, localImage: string, binaryImage: Uint8Array | undefined) {
    setIdImage(file);
    setLocalImage(localImage);
    setBinaryImage(binaryImage);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const newEmployee = {
      idImage,
      idImageLocal: localImage ?? employeeToEdit?.idImageLocal,
      binaryImage,
      id,
      name,
      organization,
      function: position,
      authorization: {
        authorizationName,
        level: authorizationlevel
      }
    };

    const existing = employees.find(emp => emp.id === id);
    if (existing) {
      updateEmployee(newEmployee);
    } else {
      addEmployee(newEmployee);
    }

    if(!localImage && !employeeToEdit?.idImageLocal){
      return
    }

    onClose();
  }

  return (
    <div className="fixed inset-0 bg-[#000000b7] flex justify-center items-center z-50">
      <div className="flex flex-col bg-white rounded-lg w-3/5 h-19/20 justify-center items-center shadow-lg">
        <h2 className="text-xl text-[#0f172a] font-bold p-2 underline">
          {employeeToEdit ? "Editar Funcionário" : "Novo Funcionário"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-2.5 w-9/10 h-9/10 justify-center items-center">
          <div className="flex flex-col justify-start items-center overflow-auto w-9/10 p-2">
            <ImageUploader onImageSelect={handleImageUpload} label="Foto de Perfil do Funcionário" initialPreview={localImage}/>

            <InputForm 
              icon={{name: 'key', color: '#0288c7', size: 32}}
              inputName="id" type="text" placeholder="ID"
              value={id} onChange={(e) => setId(e.target.value)} label='ID do Funcionário'
              required disabled={!!employeeToEdit} // evita alterar o ID
            />

            <InputForm 
              icon={{name: 'user', color: '#0288c7', size: 32}}
              inputName="name" type="text" placeholder="Nome"
              value={name} onChange={(e) => setName(e.target.value)} label='Nome do Funcionário'
              required
            />

            <InputForm 
              icon={{name: 'building-2', color: '#0288c7', size: 32}}
              inputName="organization" type="text" placeholder="Organização"
              value={organization} onChange={(e) => setOrganization(e.target.value)} label='Organização'
              required
            />

            <InputForm 
              icon={{name: 'refresh-ccw-dot', color: '#0288c7', size: 32}}
              inputName="position" type="text" placeholder="Função"
              value={position} onChange={(e) => setPosition(e.target.value)} label='Função'
              required
            />

            <InputForm 
              icon={{name: 'file-stack', color: '#0288c7', size: 32}}
              inputName="authorizationName" type="text" placeholder="Autorização"
              value={authorizationName} onChange={(e) => setAuthorizationName(e.target.value)} label='Autorização'
              required
            />

            <InputForm 
              icon={{name: 'network', color: '#0288c7', size: 32}}
              inputName="authorizationlevel" type="text" placeholder="Nível"
              value={authorizationlevel} onChange={(e) => setAuthorizationlevel(e.target.value)} label='Nível'
              required
            />
          </div>

          <div className="flex flex-row w-full justify-between gap-3">
            <button type="button" onClick={onClose} className="text-gray-600 hover:underline">
              Cancelar
            </button>
            <button type="submit" className="bg-[#0288c7] transition text-white px-4 py-2 rounded-lg hover:bg-[#176a91]">
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
