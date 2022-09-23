/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import Firebase from "../../firebase";
import { XIcon } from "@heroicons/react/solid";

function Thumbnail({ sourceId, imagePath, icon, isActionable, onRemove }) {
  let defaultPathImage = "/hubi-logo.jpg";
  const [image, setImage] = useState(defaultPathImage);

  const storage = Firebase.default.storage();

  useEffect(() => {
    if (image == defaultPathImage && imagePath) {
      storage
        .ref()
        .child(imagePath)
        .getDownloadURL()
        .then((url) => {
          setImage(url);
        })
        .catch((error) => {});
    }
  }, [image, imagePath, storage, defaultPathImage]);

  return (
    <div className="grid relative w-32 h-32  m-2">
      {icon ? (
        <div>
          <svg
            width="94"
            height="118"
            viewBox="0 0 94 118"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M58.6667 0.666672H12C8.90582 0.666672 5.93835 1.89583 3.75043 4.08376C1.56251 6.27168 0.333344 9.23915 0.333344 12.3333V105.667C0.333344 108.761 1.56251 111.728 3.75043 113.916C5.93835 116.104 8.90582 117.333 12 117.333H82C85.0942 117.333 88.0617 116.104 90.2496 113.916C92.4375 111.728 93.6667 108.761 93.6667 105.667V35.6667L58.6667 0.666672ZM32.405 83.4417C30.6025 85.1333 27.9425 85.8917 24.845 85.8917C24.2444 85.8982 23.6441 85.8631 23.0483 85.7867V94.105H17.8333V71.145C20.1868 70.7939 22.5649 70.634 24.9442 70.6667C28.1933 70.6667 30.5033 71.285 32.0608 72.5275C33.5425 73.7058 34.5458 75.6367 34.5458 77.9117C34.54 80.1983 33.7817 82.1292 32.405 83.4417ZM54.6125 91.3458C52.1625 93.3817 48.435 94.35 43.8792 94.35C41.1492 94.35 39.2183 94.175 37.9058 94V71.1508C40.2602 70.8072 42.6375 70.6453 45.0167 70.6667C49.4325 70.6667 52.3025 71.46 54.5425 73.1517C56.9633 74.9483 58.48 77.8125 58.48 81.925C58.48 86.3758 56.8525 89.45 54.6125 91.3458ZM76.1667 75.1583H67.23V80.4725H75.5833V84.7542H67.23V94.1108H61.945V70.8417H76.1667V75.1583ZM58.6667 41.5H52.8333V12.3333L82 41.5H58.6667Z"
              fill="#000012"
            />
          </svg>
          <span className="text-gray-400 text-sm mt-4">Asamblea Junio</span>
        </div>
      ) : (
        <img
          className="block object-cover w-full h-full"
          src={image}
          width={128}
          height={128}
          alt="Cover"
          onClick={() => window.open(image, "_blank")}
        ></img>
      )}

      {isActionable && (
        <XIcon
          onClick={() => {
            onRemove(sourceId);
          }}
          className="grid w-8 h-8 absolute text-center cursor-pointer hover:bg-purple-700 text-white bg-purple-900 "
        ></XIcon>
      )}
    </div>
  );
}

export default Thumbnail;
