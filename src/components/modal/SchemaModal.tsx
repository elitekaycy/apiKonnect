import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { useDataContext } from '../../context/dataContext'


export const SchemaModal = ({ open, toggleModal }: any) => {
    const [details, setDetail] = useState<string[]>([])
    const [requiredInput, setRequiredInput] = useState<any>({})
    const schemaDetail: any = useDataContext()
    const { setSchemaKey } = schemaDetail
    const [loading, setLoading] = useState<boolean>(false)


    // this function stores the schemakeys in an array in the data context state
    const connectSchema = (e: any) => {
        e.preventDefault()
        setLoading(true)
        let newRequiredInputs = []
        for (const [key, value] of Object.entries(requiredInput)) {
            newRequiredInputs.push(`${key}.${value}`)
        }
        const detail = [...newRequiredInputs, ...details]
        setSchemaKey([...detail])
        setLoading(false)
        toggleModal()
    }

    const RequiredInput = ({ title, keyholder }: { title: any, keyholder: any }) => {
        return (
            <div className='w-full flex flex-row items-center'>
                <div className=' w-24 bg-blue-600 text-sm text-white text-center font-semibold p-1 rounded-l-md'>{title}</div>
                <input className='box w-full text-sm text-white rounded-r-md p-1 focus:outline-none pl-2' placeholder={`enter ${title} link`}
                    value={requiredInput[keyholder]}
                    onChange={(e) => {

                        let newInput = requiredInput
                        newInput[keyholder] = e.target.value
                        setRequiredInput(newInput)
                    }}
                />
            </div>
        )
    }


    const OptionalInput = () => {
        const [optionalText, setOptionalText] = useState<string>('')
        return (
            <div className='w-full flex flex-row items-center'>
                <input className='box w-full text-sm text-white rounded-r-md p-1 focus:outline-none pl-2'
                    value={optionalText}
                    onChange={(e) => setOptionalText(e.target.value)}
                    placeholder={'add new key'} />
                <div
                    onClick={() => {
                        if (optionalText === '') return alert("empty optional text")
                        let prevDetail: string[] = [...details, optionalText]
                        setDetail(prevDetail)
                        setOptionalText('')
                        console.log("details are ...", details)
                    }}
                    className='cursor-pointer w-24 bg-blue-600 text-sm text-white text-center font-semibold p-1 rounded-r-md hover:bg-blue-500'>{"add"}</div>
            </div>
        )
    }


    const OptionBox = ({ option }: { option: any }) => {
        return (
            <div className='w-full flex flex-row items-center'>
                <div className='box w-full text-sm text-white rounded-r-md p-1 pl-2'>
                    {option}
                </div>
                <div
                    onClick={() => {
                        let prevDetail: string[] = details.filter(k => k !== option)
                        setDetail(prevDetail)
                    }}
                    className='cursor-pointer w-24 bg-blue-600 text-sm text-white text-center font-semibold p-1 rounded-r-md hover:bg-blue-500'>{"delete"}</div>
            </div>
        )

    }

    return (
        <>
            <Transition appear show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={toggleModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl search p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-white"
                                    >
                                        Create Schema for Api data
                                    </Dialog.Title>
                                    <div className="mt-2 flex flex-col gap-3">
                                        <p className="text-sm text-gray-500">
                                            add keys that reflect the api
                                        </p>

                                        {/* image link */}
                                        <RequiredInput
                                            title={"image"}
                                            keyholder={"imageKey"}
                                        />

                                        <RequiredInput
                                            title={"link"}
                                            keyholder={"linkKey"}
                                        />

                                        {details.length > 0 && details.map((k, idx): any => <OptionBox key={idx} option={k} />)}



                                        <OptionalInput />
                                    </div>

                                    <div className="mt-10">
                                        <button
                                            type="button"
                                            className="inline-flex text-white justify-center rounded-lg border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium hover:bg-blue-200 focus:outline-none"
                                            onClick={(e) => connectSchema(e)}
                                        >
                                            {!loading ? 'Connect Schema' : (
                                                <div
                                                    className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] text-neutral-100 motion-reduce:animate-[spin_1.5s_linear_infinite]"
                                                    role="status"
                                                >
                                                    <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                                                        Loading...
                                                    </span>
                                                </div>
                                            )}
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
