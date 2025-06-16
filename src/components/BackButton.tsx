import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
 

type typeofBackButton = {
    path: string,       
}

export function BackButton({path}: typeofBackButton){
    return(
        <button type="button" className="flex justify-center items-center border-none w-8 h-8">
            <Link to={path} className="decoration-0 text-[#757474] hover:text-[#a8a8a8]">
                <ArrowLeft className="w-10 h-10"></ArrowLeft>
            </Link>
        </button>
    );
} 