import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { BackButton } from "../../components/BackButton";
import InputForm from "../../components/InputForm";
import { useNavigate } from "react-router-dom";

export default function Register(){

    const navigate = useNavigate();
    const { register } = useAuth();

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [passwordConfirmVisible, setPasswordConfirmVisible] = useState(false);

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [confirmPasswordErrorVisible, setConfirmPasswordErrorVisible] = useState(false);

    useEffect(() => {
        let timeout: ReturnType<typeof setTimeout>;

        if(confirmPasswordError){
            timeout = setTimeout(() => {
                setConfirmPasswordErrorVisible(false);
            }, 3000)
        }

        return () => clearTimeout(timeout);
    },[confirmPasswordError])
    
    useEffect(() => {
        if (confirmPassword === password) 
            setConfirmPasswordError(false);
    }, [confirmPassword, password]);

    const confirmStarted = confirmPassword.length > 0;

    async function handleSubmit(e: React.FormEvent){
        e.preventDefault();
        
        let hasError = false;

        if(password !== confirmPassword){
            setConfirmPasswordErrorVisible(true);
            setConfirmPasswordError(true);
            hasError = true;
        }

        if(hasError) console.log("error");

        const sucessSubmit = await register({username, password});

        if(sucessSubmit){
            navigate("/login", {replace: true});
        } else {
            alert("Esse usuário já existe!");
        }

        
    }

    

    return (
        <div id="container" className="flex w-full h-dvh justify-center items-center select-none font-[family-name: --font-rubik] bg-[url(./assets/images/visiongatebackgroundRegistro.png)] bg-cover">
            <form id="register-container" onSubmit={handleSubmit} className="flex flex-col justify-start items-center p-10 gap-6 w-3/5 h-9/10 rounded-md select-none bg-neutral-100 rounded-ee-md-md ">
                <div className="flex flex-row w-full justify-between items-center">
                    <BackButton path="/login"/>

                    <div className="mb-3 font-bold text-5xl text-[#015e8f] tracking-wider">
                        Cadastro
                    </div>

                    <span className="w-1/20"></span>
                </div>
                
                <InputForm 
                icon={{name: 'user', color: '#0288c7', size: 32}}
                inputName="User" type="text" placeholder="Usuário"
                value={username} onChange={(e) => {setUsername(e.target.value)}} label='Usuário'
                required/>

                <InputForm 
                icon={{name: 'lock', color: '#0288c7', size: 32}}
                inputName="Senha" type="password" placeholder="Digite sua senha"
                value={password} onChange={(e) => {setPassword(e.target.value)}} label='Senha'
                isPasswordVisible={passwordVisible} togglePasswordVisible={() => {setPasswordVisible(prev => !prev)}} 
                required/>

                <InputForm 
                icon={{name: 'shield', color: '#0288c7', size: 32}}
                inputName="Confirmar Senha" type="password" placeholder="Digite sua senha novamente"
                value={confirmPassword} onChange={(e) => {setConfirmPassword(e.target.value)}} label='Confirmar Senha'
                isPasswordVisible={passwordConfirmVisible} togglePasswordVisible={() => {setPasswordConfirmVisible(prev => !prev)}} 
                required={false} hasError={confirmPasswordError}/>
            
                <div className="flex items-center -mt-5 w-9/12 h-10">
                    {confirmPasswordError && confirmPasswordErrorVisible &&
                         <span className="text-sm text-red-500">As senhas não coincidem.</span>
                    }
                </div>
                
                <button type="submit" disabled={!confirmStarted} className={`mt-10 mb-5 w-9/12 font-bold text-2xl py-2 rounded-md transition ${confirmStarted ? 'bg-[#0288c7] hover:bg-[#176a91] text-white' : 'bg-gray-400 text-gray-200'}`}>
                    CRIAR CONTA
                </button>
                
                 
            </form> 
        </div>
    );
}