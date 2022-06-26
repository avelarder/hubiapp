export default function PostTile({ type, onClick, children }) {
  return (
    <div
      className="mt-2 border-1 bg-gradient-to-tr from-gray-200 to-gray-100  w-52 h-48 text-lg font-medium cursor-pointer hover:border-gray-400"
      onClick={() => onClick(type)}
    >
      {children}
    </div>
  );
}
