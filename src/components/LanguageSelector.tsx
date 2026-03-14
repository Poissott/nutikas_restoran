import Select from "react-select";

const languageOptions = [
    { value: "en", label: "EN" },
    { value: "ee", label: "EE" }
];

function LanguageSelector() {
    return (
        <div className="fixed top-4 right-4 flex space-x-4">
            <Select
                options={languageOptions}
                defaultValue={languageOptions[0]}
                className="w-30"
                classNamePrefix="react-select"
                styles={{
                    control: (base) => ({
                        ...base,
                        backgroundColor: "#1f2937",
                        borderColor: "#4b5563",
                        color: "#f4f4f5",
                        "&:hover": {
                            borderColor: "#4b5563",
                        },
                    }),
                    singleValue: (base) => ({
                        ...base,    
                        color: "#f4f4f5",
                    }),
                    menu: (base) => ({
                        ...base,
                        backgroundColor: "#1f2937",
                    }),
                    option: (base, state) => ({
                        ...base,
                        backgroundColor: state.isFocused ? "#4b5563" : "#1f2937",
                        color: "#f4f4f5",
                        "&:active": {   
                            backgroundColor: "#4b5563",
                        },
                    }),
                }}
            />
        </div>
    );
}

export default LanguageSelector;