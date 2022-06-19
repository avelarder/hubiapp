import React from "react";

function FileUpload({ onFileSelected }) {
  return (
    <div className="flex items-center justify-center w-full">
      <label className="flex flex-col rounded-lg border-2 border-dashed w-full h-20 p-10 group text-center">
        <div className="h-full w-full text-center flex flex-col  justify-center items-center  ">
          <p className="pointer-none text-gray-500 ">
            <span className="text-sm">Puede arrastrar</span> sus archivos acá{" "}
            <br /> o{" "}
            <a href="" id="" className="text-blue-600 hover:underline">
              seleccionar un archivo
            </a>{" "}
            desde su computador.
          </p>
        </div>
        <input
          type="file"
          onChange={(e) => {
            onFileSelected(e.target.files[0]);
          }}
          className="hidden"
        />
      </label>
    </div>
  );
}

export default FileUpload;
