import Image from "next/image"

export default function Button(props){
    return (
        <button 
            type={props.type}
            onClick={() => props.onClick()}
            className={ props.imgSrc ? 'flex items-center rounded text-lg font-semibold bg-[#ff4141] px-10 py-2' : 'rounded text-lg font-semibold bg-[#ff4141] hover:bg-[#d13535] px-10 py-2 cursor-pointer transition-all duration-300 ease-out'}
        >
            <span className="text-white">{props.value}</span>
            { props.imgSrc && <Image src={props.imgSrc} alt='' width={24} height={24} className="ml-4"/>}
        </button>
    )
}