import Image from "next/image"

export default function SecondaryButton(props){
    return (
        <button 
            type={props.type}
            className={ 
                props.imgSrc ? 
                'flex items-center border-2 rounded text-lg font-semibold px-10 py-2' 
                : 'border-2 border-gray-600 rounded text-lg font-semibold mt-2 px-10 py-2'}>
            <span>{props.value}</span>
            { props.imgSrc && <Image src={props.imgSrc} alt='' width={24} height={24} className="ml-4"/>}
        </button>
    )
}