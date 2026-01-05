interface Props {
    children: React.ReactNode;
}

export const FormContainer: React.FC<Props> = ({ children }) => {
    return (
        <div className={"w-full md:min-w-lg flex flex-wrap flex-col items-center justify-center lg:flex-row lg:gap-20 lg:flex-nowrap"}>
            <div className="w-full max-w-xl">
                {children}
            </div>
        </div>
    );
};