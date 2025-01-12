
const AuthLayout = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <div className="flex h-full justify-center items-center flex-col bg-sky-400">
            {children}
        </div>
    )
}

export default AuthLayout;