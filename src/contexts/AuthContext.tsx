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
    users: User[] | [],
    login: (user: User) => boolean;
    register: (user: User) => boolean;
    logout: () => void;
    isAuthenticated: boolean;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children} : {children: ReactNode}) => {
    const [users, setUsers] = useState<User[] | []>([]);
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

     function login (user: User) {
        const tokenFalse = "adfadsfadfasdfasdf";
        //const { token, usuario } = await ApiRequest("login", {
          //  method: "POST",
            //body: {usuario: user.username, senha: user.password},
        //})
        

        //if(token){
          //  setLoggedUser(usuario);
           // localStorage.setItem(loggedUserTokenKey, JSON.stringify(token));
           // localStorage.setItem(loggedUserKey, JSON.stringify(usuario));
           // return true;
        
        if(tokenFalse){
            setLoggedUser(user.username)
            localStorage.setItem(loggedUserTokenKey, JSON.stringify(tokenFalse));
            localStorage.setItem(loggedUserKey, JSON.stringify(user.username));
            return true;
        } else {
            return false;
        }
    };

     function register(user: User){
       // try {
         //   await ApiRequest("register", {
           // method: "POST",
            //body: {usuario: user.username, senha: user.password},
            //token: ""
            
        //});
        
        //return true;
      //  }
       
       // catch (error) {
         //   return false
          //  console.log(error)
        // }

        try {
            setUsers([...(users || []), user]);
            localStorage.setItem(UsersKey, JSON.stringify([...(users || []), user]));
            return true;
        } catch (err){
            console.error("Esse usuário já está registrado", err);
            return false
        }
}

    function logout () {
        localStorage.removeItem(loggedUserKey);
    };

    const isAuthenticated = !!loggedUser;

    return (
        <AuthContext.Provider value={{loggedUser, users,login, logout, register,isAuthenticated, loading}}>
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
const UsersKey = 'users';



 





