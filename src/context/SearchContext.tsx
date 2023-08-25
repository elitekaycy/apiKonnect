import { ReactNode, createContext, useContext, useState } from "react";

const searchStateContext = createContext<null>(null)

export const useSearchContext = () => useContext(searchStateContext)

interface Props {
    children: ReactNode
}

export const SearchContext = (props: Props) => {
    const [apiObjects, setApiObjects] = useState(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [isValidApi, setIsValidApi] = useState<Boolean | null>(null)

    // getters and setters

    const getApi0bjects = () => { return apiObjects }
    const handleApiStateChange = (apiObjects: any) => { setApiObjects(apiObjects) }


    const contextValue: any = {
        loading,
        setLoading,
        isValidApi,
        setIsValidApi,
        getApi0bjects,
        handleApiStateChange
    }


    return (
        <searchStateContext.Provider value={contextValue}>
            {props.children}
        </searchStateContext.Provider>
    )
}


