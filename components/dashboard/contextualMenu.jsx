import { DotsVerticalIcon } from "@heroicons/react/solid";
import React, { useState, useRef, useEffect } from "react";
import Transition from "../../utils/Transition";

function ContextualMenu({ icon, children, ...rest }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef(null);
  const dropdown = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (
        !dropdownOpen ||
        dropdown.current?.contains(target) ||
        trigger.current?.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [dropdownOpen, setDropdownOpen]);

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  }, [dropdownOpen, setDropdownOpen]);

  return (
    <div {...rest}>
      <button
        ref={trigger}
        className={`flex w-5 h-5 text-gray-400 hover:text-gray-500 rounded-full ${
          dropdownOpen && "bg-gray-100 text-gray-500"
        }`}
        aria-haspopup="true"
        onClick={() => {
          setDropdownOpen(!dropdownOpen);
        }}
        aria-expanded={dropdownOpen}
      >
        <span className="sr-only">Menu</span>
        {icon ?? <DotsVerticalIcon></DotsVerticalIcon>}
      </button>
      <Transition
        show={dropdownOpen}
        tag="div"
        className="origin-top-right z-10 absolute top-full right-0 min-w-80 bg-white border border-gray-200 py-1.5 rounded shadow-lg overflow-hidden mt-1"
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        <ul
          ref={dropdown}
          onFocus={() => {
            setDropdownOpen(true);
          }}
          onBlur={() => setDropdownOpen(false)}
        >
          {children}
        </ul>
      </Transition>
    </div>
  );
}

export default ContextualMenu;
