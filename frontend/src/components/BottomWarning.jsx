import { Link } from "react-router-dom"


export const BottomWarning = ({label,buttonText,to})=>{
    return <div className="flex mt-2 items-center justify-center">
        <div className="py-2 text-sm flex justify-center">
            {label}
        </div>
            <Link className="text-sm underline pl-1 cursor-pointer" to={to}>
                    {buttonText}
            </Link>
    </div>
}