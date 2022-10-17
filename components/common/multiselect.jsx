import { SelectorIcon } from "@heroicons/react/solid";
import { useRef, useState } from "react";

const Multiselect = ({
  options,
  selectedOptions,
  dropdownHeight,
  onSelectionChange,
  ...props
}) => {
  const containerRef = useRef();
  const [dropdown, setDropdown] = useState(false);
  const [dropdownAbove, setDropdownAbove] = useState(false);
  const [items, setItems] = useState(options);
  const [selectedItems, setSelected] = useState(selectedOptions);

  const toogleDropdown = () => {
    if (!dropdown && (!items || !items.length)) {
      return;
    }
    const { height, y } = containerRef.current?.getBoundingClientRect();
    const bottomCoordenate = height + y;
    setDropdownAbove(
      window.innerHeight - bottomCoordenate <= items.length * 50
    );
    setDropdown(!dropdown);
  };

  const addTag = (item) => {
    const updateSelecteditems = [...selectedItems, item];
    setItems(options.filter((x) => !updateSelecteditems.includes(x.text)));
    setSelected(updateSelecteditems);
    setDropdown(false);
    onSelectionChange(updateSelecteditems);
  };
  const removeTag = (item) => {
    const filtered = selectedItems.filter((e) => e !== item);
    setItems(options.filter((x) => !filtered.includes(x.text)));
    setSelected(filtered);
    onSelectionChange(filtered);
  };

  return (
    <div className="autcomplete-wrapper" data-cy={props["data-cy"]}>
      <div className="autcomplete">
        <div className="w-full flex flex-col items-center mx-auto">
          <div className="w-full relative">
            <div
              ref={(ref) => (containerRef.current = ref)}
              className="flex flex-col items-center"
            >
              <div className="w-full">
                <div
                  className="my-2 py-0.5 px-1 flex border border-gray-300 bg-white rounded cursor-pointer"
                  onClick={toogleDropdown}
                >
                  <div className="flex flex-auto flex-wrap">
                    {!selectedOptions || !selectedOptions.length ? (
                      <div className="text-sm flex items-center text-gray-700 px-2">
                        Select a choice
                      </div>
                    ) : null}
                    {selectedOptions.map((tag, index) => {
                      return (
                        <div
                          key={index}
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                          className="flex justify-center items-center m-1 font-medium py-1 px-2 rounded-full text-indigo-700 bg-indigo-100 border border-indigo-300 "
                        >
                          <div
                            className="text-xs font-normal leading-none max-w-full flex-initial"
                            data-cy={`${props["data-cy"]}-tag`}
                          >
                            {tag}
                          </div>
                          <div className="flex flex-auto flex-row-reverse">
                            <div
                              data-cy={`${props["data-cy"]}-remove-${index}`}
                              onClick={() => removeTag(tag)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="100%"
                                height="100%"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="feather feather-x cursor-pointer hover:text-indigo-400 rounded-full w-4 h-4 ml-2"
                              >
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                              </svg>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div
                    className="text-gray-300 w-8 py-1 pl-2 pr-1 flex items-center"
                    onKeyDown={(e) => {
                      if (e.key === "Escape") toogleDropdown();
                    }}
                  >
                    <SelectorIcon
                      className="w-5 h-5 text-gray-400 cursor-pointer outline-none focus:outline-none"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>
            </div>
            {dropdown ? (
              <ExtendedDropdown
                height={dropdownHeight}
                isAbove={dropdownAbove}
                options={items}
                addItem={addTag}
                data-cy={props["data-cy"]}
              ></ExtendedDropdown>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

const ExtendedDropdown = ({ options, addItem, isAbove, height, ...props }) => {
  return (
    <div
      id="dropdown"
      className="absolute max-w-full border border-gray-200 bg-white z-40 w-72 lef-0 rounded overflow-y-auto"
      style={{
        top: isAbove ? "auto" : "100%",
        bottom: isAbove ? "100%" : "auto",
        height: height ? height : "",
      }}
    >
      <div className="flex flex-col w-full">
        {options.map((item, idx) => {
          return (
            <div
              key={idx}
              tabIndex={0}
              className="cursor-pointer w-full border-gray-100 rounded-t border-b hover:bg-indigo-100"
              onClick={() => addItem(item.text)}
            >
              <div className="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative hover:border-teal-100">
                <div className="w-full items-center flex">
                  <div
                    className="mx-2 leading-6"
                    data-cy={`${props["data-cy"]}-${idx}`}
                  >
                    {item.text}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Multiselect;
