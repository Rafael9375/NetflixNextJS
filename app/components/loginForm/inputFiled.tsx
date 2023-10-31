import { useLayoutEffect, useState } from "react";

interface InputFieldProps {
    placeholder: string,
    idName: string,
    classList?: string
    errorMessage?: string
    onChange?: (value: string) => void | Promise<void>
}


  
export default function InputField({placeholder, idName, classList, onChange, errorMessage }: InputFieldProps){

    const changeHandler = !onChange ? undefined : (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };


    const [errorStyleInput, setErrorStyleInput] = useState('')
    const [errorStyleLabel, setErrorStyleLabel] = useState('')

    useLayoutEffect(() => {
        if(errorMessage != ""){
            setErrorStyleInput('border-[#ff833b] border-b-2')
            setErrorStyleLabel('')
        }else{
            setErrorStyleInput('')
            setErrorStyleLabel('')
        }
    }, [errorMessage])

    return(
        <div>
            <div className="w-full relative group">
                <input type="text" id={idName} required className={`
                    rounded
                    left-2
                    w-full 
                    h-12 
                    px-4 
                    text-lg 
                    peer 
                    bg-[#2e2e2e] 
                    focus:bg-[#535353]
                    outline-none 
                    pt-3
                    font-normal
                    border-solid
                    text-white
                    
                    ${errorStyleInput}`}
                    onChange={changeHandler}
                    >

                </input>
                
                <label className={`
                    
                    text-[#818181]
                    text-base
                    transform 
                    transition-all 
                    absolute 
                    top-0
                    left-2 
                    h-full 
                    flex 
                    items-center 
                    pl-2 
                    group-focus-within:text-xs 
                    peer-valid:text-xs 
                    group-focus-within:h-2
                    group-focus-within:top-2
                    peer-valid:h-2
                    peer-valid:top-2
                    ${errorStyleLabel}`}>{placeholder}
                </label>

                

            </div>
            {errorMessage != ""? <div className="text-[#ff833b]">{errorMessage}</div> : <></> }
        </div>
    )
}