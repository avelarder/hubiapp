import Image from "next/image";

export default function EventScreen({ onCancel }) {
  return (
    <div className="flex flex-col w-full">
      {/* Photo and User */}
      <div className="flex items-center ">
        <Image
          className="w-6 h-6 rounded-full"
          src="/sample-profile.jpg"
          width="32"
          height="32"
          alt="User"
        />

        <span className="flex ml-4 text-sm">Oscar Velarde</span>
      </div>
    </div>
  );
}
