import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import InputForm from "../../components/InputForm";
import { LogoIcon } from "../../components/LogoIcon";
import { Link, useNavigate } from "react-router-dom";
import Register from "./Register";

export default function Login(){

    const navigate = useNavigate();

    const { login } = useAuth();
    const [loginError, setLoginError] = useState(false);

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault()

        const isLogged = await login({username, password});
        
        if(isLogged){
            setLoginError(false);
            navigate("/home", {replace: true});
        } else {
            setLoginError(true);
        }
    }

    useEffect(() => {
        let timeout: ReturnType<typeof setTimeout>;

        if(loginError){
            timeout = setTimeout(() => {
                setLoginError(false);
            }, 3000);
        }

        return () => clearTimeout(timeout);
    },[loginError])
    

    return (
        <div id="container" className="flex w-full h-dvh justify-between items-center select-none font-[family-name: --font-rubik]">
            <div className="flex justify-center items-center  w-3/5 h-dvh p-5 bg-[url(./assets/images/visiongatebackground.png)] bg-cover">
                <div className="flex flex-col gap-10 w-9/10">
                    <div className="flex justify-center items-center w-full text-6xl font-bold text-white  ">
                        Uma plataforma segura para a gestão de catracas inteligentes.
                    </div>

                    <div className="flex justify-start items-center w-9/10 text-2xl font-md text-neutral-100">
                        O Visiongate busca integrar visão computacional e inteligência artificial para melhorar a segurança e eficiência das catracas.
                    </div>
                </div>       
            </div>
            
            <form id="login-container" onSubmit={handleLogin} className="flex flex-col justify-start items-center gap-6 w-2/5 h-dvh p-5 select-none bg-neutral-100 rounded-ee-md-md ">
                <div className="mb-3">
                    <LogoIcon percentSize={60} fill="#015e8f"/>  
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
                
                <div className="flex items-center -mt-5 w-9/12 h-10">
                    {loginError &&
                         <span className="text-sm text-red-500">Usuário ou senha inválidos.</span>
                    }
                </div>

                <button type="submit" className="transition mt-10 mb-5 w-9/12 bg-[#0288c7] hover:bg-[#176a91] text-white font-bold text-2xl py-2 rounded-md">
                    LOGIN
                </button>
                
                <div className="flex flex-row gap-1">
                    Não possui conta ainda? 
                    <Link to='/Register' className="text-[#0288c7] underline hover:text-[#5fafd4]">Cadastre-se</Link>
                </div> 
            </form> 
        </div>
    );
}