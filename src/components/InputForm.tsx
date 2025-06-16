import type { IconName } from 'lucide-react/dynamic'; 
import { DynamicIcon } from 'lucide-react/dynamic';
import { Eye, EyeOff } from 'lucide-react';
interface InputFormType {
    icon?: {
        name: IconName;
        size: number;
        color: string;
        strokeWidth?: number;
    }
    type?: string;
    label?: string;
    placeholder?: string;
    inputName: string;
    onChange: (e: any) => void;
    value: string | number;
    isPasswordVisible?: boolean;
    togglePasswordVisible?: () => void;
    required?: boolean;
    hasError?: boolean;
    disabled?: boolean;
    
}

 

export default function InputForm({
    icon, type, label,inputName,value,onChange, placeholder,
    togglePasswordVisible, isPasswordVisible, required, hasError,
    disabled
}: InputFormType) {

    const isPassword = type === 'password';
    const inputType = isPassword ? (isPasswordVisible ? 'text' : 'password') : type
    
        return (
            <div className='flex flex-col w-9/12 gap-2'>
                <div>
                    <label className='font-semibold' htmlFor={inputName}>{label}</label>
                </div>

                <div className={`flex flex-row p-2 justify-between items-center group-disabled:select-none rounded-lg transition focus-within:outline-2 ${hasError ? 'bg-red-100 border border-red-500' : 'bg-gray-300  hover:bg-gray-200 focus-within:bg-white  focus-within:hover:bg-white'}`}>
                    <div className='flex flex-row w-9/10 gap-4'>
                        {icon ? <DynamicIcon name={icon.name} color={disabled ? "#99a1af" : icon.color} size={icon.size} strokeWidth={icon.strokeWidth}/> : null}
                        
                        <input className={`flex w-full placeholder:text-gray-400 focus:outline-none focus:text-black ${hasError ? "text-red-500" : "text-gray-400"}`}  name={inputName} type={inputType} placeholder={placeholder}
                        value={value} onChange={onChange} autoComplete='off' disabled={disabled} required={required}/>
                    </div>

                    <div className='flex flex-row justify-center items-center rounded-lg p-0.5'>
                        {isPassword && togglePasswordVisible && (
                            <button type='button' onClick={togglePasswordVisible}>
                                {isPasswordVisible ? <EyeOff color='#333333'/> : <Eye color='#333333'/>}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        
    );
}

