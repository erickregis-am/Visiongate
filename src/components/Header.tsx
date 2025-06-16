import { Link } from "react-router-dom";
import { LogoIcon } from "./LogoIcon";
import { CircleUser, History, LogOut, Users } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";

export default function Header({shadow}: {shadow?: string}) {
    const { loggedUser, logout } = useAuth();
    const [profileMenu, setProfileMenu] = useState(false);

    function handleProfileMenu() {
        setProfileMenu(prev => !prev);
    }

   return (
    <>
        <header className={`flex sticky top-0 flex-row w-full justify-between items-center p-2.25  pl-4 pr-10 bg-[#0f172a] ${shadow} select-none`}>
            <Link to="/home" className="flex justify-center items-center px-8 rounded-lg bg-[#1f2941]">
                <LogoIcon percentSize={20.8} fill="#00A3EC" />
            </Link>

            <div className="flex flex-row justify-center items-center gap-10 text-white">
                <div className="flex justify-between items-center">
                    <Link to="/home/funcionarios" className="flex flex-row transition border-r-1 px-5 border-gray-600 hover:rounded-sm hover:bg-[#2c3a5b] hover:border-0 justify-center items-center p-2 gap-2 text-md font-medium">
                        <Users color="white" size={24}/>
                        <p>Funcionários</p>
                    </Link>

                    <Link to="/home/historico" className="flex flex-row transition border-l-1 px-5 border-gray-600 hover:rounded-sm hover:bg-[#2c3a5b] hover:border-0 justify-center items-center p-2 gap-2 text-md font-medium">
                        <History color="white" size={24}/>
                        <p>Histórico</p>
                    </Link>
                </div>
                
                <div className="relative">
                    <button className="flex flex-row transition rounded-md bg-[#2c3a5b] hover:bg-[#242d43] justify-start items-center p-3 px-4 gap-2 text-lg font-medium"
                        onClick={handleProfileMenu}>
                        <CircleUser color="#2c3a5b" fill="#00A3EC" size={32}/>
                        <p>{loggedUser}</p>
                    </button>

                    {profileMenu && (
                        <div className="absolute right-0 mt-2 w-40 transition bg-[#0f172a] border-[#2c3a5b] border-3 hover:bg-[#242d43] rounded-md shadow-lg z-50">
                            <button
                                onClick={logout}
                                className="w-full flex items-center gap-2 px-4 py-2 text-white"
                            >
                                <LogOut color="white" size={20}/>
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    </>
   );
}