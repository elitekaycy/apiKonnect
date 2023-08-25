import logo from "../../assets/logo.png";
import schema from "../../assets/schema.png";
import { useState, FormEvent } from "react";
import { useSearchContext } from "../../context/SearchContext";
import { SchemaModal } from "..";

const Navigation = () => {
    const apiContext: any = useSearchContext();
    const [placeholder, setplaceHolder] = useState<string>("www.placeholder.com");
    const [isSchemaModalOpen, setIsSchemaModalOpen] = useState<Boolean>(false)

    const { loading } = apiContext;

    const SearchBar = () => {
        const [search, setSearch] = useState<string>("");
        const apiContext: any = useSearchContext();

        // api Context
        const { setLoading, isValidApi, setIsValidApi, handleApiStateChange } = apiContext;

        const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            setLoading(true);
            setplaceHolder(search);

            fetch(search)
                .then((response) => {
                    if (!response.ok) {
                        setIsValidApi(false);
                        throw new Error("response not ok");
                    }

                    return response.json();
                })
                .then((data) => {
                    console.log("data is ", data);

                    handleApiStateChange(data);
                    setLoading(false);
                    setIsValidApi(true);
                })
                .catch((err) => {
                    setIsValidApi(false);
                    setLoading(false);
                    console.log("err", err);
                });
        };

        return (
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="w-72 md:w-96">
                    <input
                        className={`w-full text-center text-white h-full ${isValidApi === true
                            ? " bg-teal-500 bg-opacity-20"
                            : isValidApi === false
                                ? "bg-red-500 bg-opacity-20"
                                : "search"
                            } focus:outline-none p-2 rounded-md text-xs`}
                        placeholder={placeholder}
                        value={search}
                        onClick={() => setIsValidApi(null)}
                        onChange={(e) => {
                            setSearch(e.target.value);
                        }}
                    />
                </div>
            </form>
        );
    };


    //logo and header
    const HeaderBar = () => {
        return (
            <div className="flex flex-row items-center gap-3 justify-center w-100 p-2">
                <div className="text-white bg-blue-700 p-1 md:p-2 rounded-sm">
                    <img src={logo} className=" w-6 h-6 md:w-8 md:h-8" />
                </div>
                <div className="text-white text-md md:text-lg font-bold tracking-tighter">
                    apiKonnect
                </div>
            </div>
        );
    };

    return (
        <>
            <div className="w-screen flex flex-row items-center justify-between p-2">
                <HeaderBar />

                <div className="flex flex-row gap-2 items-center">
                    {/* add api functionality */}
                    <SearchBar />
                    {loading && (
                        <div
                            className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] text-neutral-100 motion-reduce:animate-[spin_1.5s_linear_infinite]"
                            role="status"
                        >
                            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                                Loading...
                            </span>
                        </div>
                    )}
                </div>

                {/* create the schema modal */}
                <div
                    onClick={() => setIsSchemaModalOpen(!isSchemaModalOpen)}
                    className="mr-4 cursor-pointer hover:bg-blue-700 rounded-sm transition ease-in duration-100  p-2">
                    <img src={schema} className="w-6 h-6" />
                </div>
            </div>
            <SchemaModal open={isSchemaModalOpen} toggleModal={() => setIsSchemaModalOpen(!isSchemaModalOpen)} />
        </>
    );
};

export default Navigation;
