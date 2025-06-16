import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import ApiRequest from '../services/apiRequest';

type User = {
    username: string,
    password: string
}

type LoggedUser = string;


type AuthContextType = {
    loggedUser: LoggedUser | null,
    login: (user: User) => Promise<boolean>;
    register: (user: User) => Promise<boolean>;
    logout: () => void;
    isAuthenticated: boolean;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children} : {children: ReactNode}) => {
    const [loggedUser, setLoggedUser] = useState<LoggedUser | null>(null);
    const [loading, setLoading] = useState(true);

     useEffect(() => {
        const storedToken = localStorage.getItem(loggedUserKey);
        if(storedToken) {
            setLoggedUser(JSON.parse(storedToken));
            console.log(loggedUser);
        }
        setLoading(false);
    }, [])

    async function login (user: User) : Promise<boolean>{
        const { token, usuario } = await ApiRequest("login", {
            method: "POST",
            body: {usuario: user.username, senha: user.password},
        })
        

        if(token){
            setLoggedUser(usuario);
            localStorage.setItem(loggedUserTokenKey, JSON.stringify(token));
            localStorage.setItem(loggedUserKey, JSON.stringify(usuario));
            return true;
        
        } else {
            return false;
        }
    };

    async function register(user: User) : Promise<boolean>{
        try {
            await ApiRequest("register", {
            method: "POST",
            body: {usuario: user.username, senha: user.password},
            token: ""
            
        });

        return true
        } catch (error) {
            return false
            console.log(error)
        }
}

    function logout () {
        localStorage.removeItem(loggedUserKey);
    };

    const isAuthenticated = !!loggedUser;

    return (
        <AuthContext.Provider value={{loggedUser, login, logout, register,isAuthenticated, loading}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth tem que estar dentro de um AuthProvider');
    } return context;
}

const loggedUserTokenKey = 'loggedUserKey';
const loggedUserKey = 'loggedUser'



 





