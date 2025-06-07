import { useState } from "react";
import InputForm from "../../components/InputForm";
import { LogoIcon } from "../../components/LogoIcon";

export default function Login(){
    
    const [passwordVisible, setPasswordVisible] = useState(false);

    const [password, setPassword] = useState<string>('');
    

    return (
        <>
        <div id="container" className="flex-1 justify-center items-center">
            <form id="login-container" className="">
                <InputForm 
                icon={{name: 'lock', color: 'blue', size: 24}}
                inputName="Senha" type="password" placeholder="Digite sua senha"
                value={password} onChange={(e) => {setPassword(e.target.value)}} label='Email'
                isPasswordVisible={passwordVisible} togglePasswordVisible={() => {setPasswordVisible(!password)}} 
                />
            </form> 
        </div>
        </>
    );
}