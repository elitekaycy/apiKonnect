import { useSearchContext } from "../../context/SearchContext"
import { useDataContext } from "../../context/dataContext"
import { useEffect, useState } from 'react'
import emptu from '../../assets/emptu.png'

const ViewPage = () => {
    const { schemaKey }: any = useDataContext()
    const { isValidApi, apiObjects }: any = useSearchContext()
    const [apiData, setApiData]: any = useState([])
    const [loading, setLoading] = useState<Boolean>(false)

    const HandleApiDisplay = (schemaKey: any[], apiObjects: any): any[] => {
        setLoading(true)
        let populateSchemaValue = []
        let schemaHeaders = new Set(['imageKey', 'linkKey', 'others'])


        if (schemaKey.length > 0) {
            for (const value of apiObjects) {
                let schemaValue = value
                let predefinedSchema: any[] = []

                for (const key of schemaKey) {
                    const keySplit = key.split('.')
                    if (keySplit.length > 0 && schemaHeaders.has(keySplit[0])) {
                        // others, imagekey, linkey
                        if (keySplit[0] === 'others') {
                            predefinedSchema.push(`${key}.${schemaValue[keySplit[1]]}`)
                        }
                        else predefinedSchema.push(`${keySplit[0]}.${schemaValue[keySplit[1]]}`)
                    }
                    else {
                        predefinedSchema.push(`${key}.${schemaValue[key]}`)
                    }
                }
                populateSchemaValue.push(predefinedSchema)
            }

        }
        else {
            for (const item of apiObjects) {
                let predefindeSchema: any[] = []
                for (const [key, value] of Object.entries(item)) {
                    predefindeSchema.push(`${key}.${value}`)
                }
                populateSchemaValue.push(predefindeSchema)
            }
        }

        setLoading(false)
        return populateSchemaValue

    }

    useEffect(() => {
        if (apiObjects !== null) {
            setLoading(true)
            setApiData(HandleApiDisplay(schemaKey, apiObjects))
            setLoading(false)
        }
    }, [schemaKey, apiObjects])


    const EmptyApi = (): any => {
        return (
            <div className="mt-20 w-screen h-96 flex flex-col gap-5 justify-center items-center">
                <img src={emptu} className="w-60 h-60" />
                <div className="text-white font-semibold text-md rounded-md cursor-pointer p-2 search">
                    Create Schema
                </div>
            </div>
        )
    }

    const RenderViewPage = ({ id, view }: any) => {

        const PairView = ({ schemaKey, schemaValue }: { schemaKey: any, schemaValue: any }) => {
            return (
                <div className="text-white flex items-center flex-row gap-2 h-auto">
                    {schemaKey === 'imageKey' ? (
                        <>
                            <img src={schemaValue} className="w-12 h-12 rounded-md" />
                        </>
                    ) : (
                        <>
                            <div className="box text-xs rounded-full p-2 font-bold">{schemaKey}</div>
                            <div className="font-semibold text-xs">{schemaValue}</div>
                        </>

                    )}
                </div>
            )
        }

        return (
            <div className="flex flex-row w-full h-18 items-center justify-around search p-3 rounded-md">
                {view.slice(0, 3).map(((v: any) => [...v.split('.')])).map((v: any, idx: any): any => <PairView key={id + idx} schemaKey={v[0]} schemaValue={v[1]} />)}
            </div>
        )

    }


    return (<>
        {!isValidApi && apiObjects === null && <EmptyApi />}
        <div className="w-full p-8 flex flex-col gap-2">
            {loading && <div
                className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] text-neutral-100 motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"
            >
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                    Loading...
                </span>
            </div>}
            {apiObjects !== null && apiData.length > 0 && apiData.map((v: any, idx: any): any => <RenderViewPage id={idx} key={idx} view={v} />)}
        </div>
    </>
    )
}


export default ViewPage