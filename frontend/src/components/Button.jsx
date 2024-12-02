

export const Button = ({label,onpress})=>{
    return <div>
        <button
        onClick={onpress}
         className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800"
        >
            {label}
        </button>
    </div>
}