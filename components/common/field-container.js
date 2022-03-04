import React from 'react'

const FieldContainer = ({ title, children }) => {
    return (<div className="mt-2 border-1 border-gray-100 rounded-xl p-2">
        <span className="block text-xs font-semibold text-gray-400">
            {title}
        </span>
        {children}
    </div>)
}
export default FieldContainer
