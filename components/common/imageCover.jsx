/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import Firebase from "../../firebase";
import { XIcon } from "@heroicons/react/solid";

function ImageCover({ imagePath }) {
  let defaultPathImage = "/hubi-logo.jpg";
  const [image, setImage] = useState(defaultPathImage);

  const storage = Firebase.default.storage();

  useEffect(() => {
    if (image == defaultPathImage) {
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
    <div className="flex bg-green-400 w-full">
      <img
        className="bg-cover w-full h-full"
        src={image}
        width="100%"
        height="100%"
        alt="Cover"
        onClick={() => window.open(image, "_blank")}
      ></img>
    </div>
  );
}

export default ImageCover;
