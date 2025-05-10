const NameCountHelper = ({
    name,
    value,
    onChange,
}: {
    value: string | number;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    name: string;
}) => {
    return (
        <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
            <div className="w-full flex gap-4">
                <div className="bg-gray-100 text-[#232B1F] p-1 text-base lg:text-lg flex-[2]">
                    {name}
                </div>
                <div className="flex-1">
                    <input
                        value={value}
                        onChange={onChange}
                        className="w-full p-1 text-xl border-2 border-gray-300 flex-1 text-right"
                        placeholder="0"
                    />
                </div>
            </div>
        </div>
    );
};

export default NameCountHelper