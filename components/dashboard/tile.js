import React from "react";

function Tile({ title, value }) {
  return (
    <div className="flex flex-col justify-around">
      {/* tile */}
      <div className="border-2 rounded-t-xs border-yellow-300 w-40 rounded-b-xs shadow-lg">
        <div className="font-bold uppercase text-lg bg-yellow-300 text-center px-2 h-8">
          {title}
        </div>
        <div className="box font-bold uppercase text-5xl text-center h-20">
          {value}
        </div>
      </div>
    </div>
  );
}

export default Tile;
