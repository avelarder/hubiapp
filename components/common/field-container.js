function FieldContainer({ title, children }) {
  return (
    <div className="mt-2 border-0 border-gray-50 rounded-xl p-2">
      {title && (
        <span className="ml-4 block text-xs font-semibold text-gray-400">
          {title}
        </span>
      )}
      {children}
    </div>
  );
}

export default FieldContainer;
