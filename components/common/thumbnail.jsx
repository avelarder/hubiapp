import { useState, useEffect } from "react";
import Firebase from "../../firebase";
import { XIcon } from "@heroicons/react/solid";

function Thumbnail({ imagePath }) {
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
    <div className="grid relative w-32 h-32 bg-gray-50 m-2">
      <img
        className="block object-cover w-full h-full"
        src={image}
        width={128}
        height={128}
        alt="Cover"
        onClick={() => window.open(image, "_blank")}
      ></img>
      <XIcon className="grid w-8 h-8 absolute text-center cursor-pointer hover:bg-purple-700 text-white bg-purple-900 "></XIcon>
    </div>
  );
}

export default Thumbnail;
