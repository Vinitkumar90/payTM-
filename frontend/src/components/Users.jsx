import axios from "axios";
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";



const Users = ()=>{
    const[users, setUsers] = useState([]);
    const[filter , setFilter] = useState("");

    useEffect(()=>{
        axios.get("http://localhost:3000/api/v1/user/bulk?filter="+filter)
        .then((res)=>{
            console.log(res.data.user); //log the response
            setUsers(res.data.user);  // set the users state

        })
    },[filter]) //dependency array

    return <div className="px-3">
    <div className="font-bold mt-6 ml-2 mb-2 text-lg">
        Users
    </div>
    <div className="mb-2">
        <input
        onChange={(e)=>{
            setFilter(e.target.value)
        }}
        type="text" placeholder="Search users...." className="w-full px-2 py-1 border rounded border-slate-200" />
    </div>
    <div>
        {users.map(user => <User user={user} />)}
    </div>
    </div>
}

const User = ({user})=>{
    const navigate = useNavigate();

    return <div className="flex justify-between">
        <div className="flex">

            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstName[0]}
                </div>
            </div>
            
            <div className="flex flex-col justify-center h-full">
                <div>
                    {user.firstName}
                    {user.lastName}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-full">
            <button
                className="w-full bg-black text-white p-2 rounded hover:bg-gray-800"
                onClick={()=>{
                    navigate(`/send/?id=${user._id}&name=${user.firstName}`)
                }}
            >
                Send Money
            </button>
        </div>
    </div>
}

export default Users;