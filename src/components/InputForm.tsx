import { useEffect, useState } from 'react';
import type { IconName } from 'lucide-react/dynamic';
import type { Dispatch, SetStateAction } from 'react';
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
    
}

 

export default function InputForm({
    icon, type, label,inputName,value,onChange, placeholder,
    togglePasswordVisible, isPasswordVisible
}: InputFormType) {

    const isPassword = type === 'password';
    const inputType = isPassword ? (isPasswordVisible ? 'text' : 'password') : type
    
        return (
        <div>
            <div>
                 {icon ? <DynamicIcon name={icon.name} color={icon.color} size={icon.size} strokeWidth={icon.strokeWidth}/> : null}
            </div>

            <div>
                <label htmlFor={inputName}>{`${label}:`}
                    <input name={inputName} type={inputType} placeholder={placeholder}
                    value={value} onChange={onChange}/>
                </label>

                {isPassword && togglePasswordVisible && (
                    <button onClick={togglePasswordVisible}>
                        {isPasswordVisible ? <EyeOff/> : <Eye/>}
                    </button>
                )}
                
            </div>
        </div>
    );
}

