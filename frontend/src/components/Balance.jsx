import axios from "axios";
import { useEffect, useState } from "react"


export const Balance = ({value})=>{
    const[balance, setBalance] = useState(0);

    useEffect(()=>{

 axios.get("http://localhost:3000/api/v1/account/balance",{
        headers:{
            Authorization:"Bearer "+ localStorage.getItem("token")
        },
    }).then((res)=>{
        setBalance(res.data.balance)
    })

    },)

   


    return <div className="flex m-5 ">
        <div className="font-bold text-lg">
            Your balance
        </div>
        <div className="font-semibold ml-4 text-lg">
        ₹ {Math.floor(balance)}
        </div>
    </div>
}