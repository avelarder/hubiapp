/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import Firebase from "../../firebase";
import { XIcon } from "@heroicons/react/solid";

function Thumbnail({
  sourceId,
  documentName,
  icon,
  imagePath,
  isActionable,
  onRemove,
}) {
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
    <div className="grid relative w-28 h-full m-2 ">
      {!imagePath ? (
        <div className="flex flex-col items-center">
          {icon}
          <span
            className="text-gray-400 text-xs mt-4 cursor-pointer "
            onClick={() => window.open(image, "_blank")}
          >
            {documentName}
          </span>
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
