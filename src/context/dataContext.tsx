import { ReactNode, createContext, useContext, useState } from "react";

const dataStateContext = createContext<null>(null)

export const useDataContext = () => useContext(dataStateContext)

interface Props {
    children: ReactNode
}

export const DataContext = (props: Props) => {
    const [schemaKey, setSchemaKey] = useState<string[]>([])

    const contextValue: any = {
        schemaKey,
        setSchemaKey
    }


    return (
        <dataStateContext.Provider value={contextValue}>
            {props.children}
        </dataStateContext.Provider>
    )
}


