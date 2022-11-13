import classNames from "classnames";

export default function RoundedFieldValue({ value, multilines }) {
  return (
    <div
      className={classNames(
        "flex  bg-gradient-to-r from-gray-50 to-white text-xs text-gray-500  w-full border-grayt-200  border-b-1 focus:border-purple-900 pl-6 ",
        { "h-32 rounded-xl items-start py-4": multilines },
        { "h-10 rounded-full items-center": !multilines }
      )}
    >
      {value}
    </div>
  );
}
