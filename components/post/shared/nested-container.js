

const NestedContainer = ({ title, children }) => {
    return (
        <div className="mt-2 border-1 border-gray-100 shadow-lg rounded-md sm:text-center p-5" >
            <span className="block sm:text-md text-sm font-bold text-gray-500 mb-2 border-b-1 border-gray-200">
                {title}
            </span>
            <span className="block text-gray-600 h-full">
                {children}
            </span>
        </div >
    )
}

export default NestedContainer;