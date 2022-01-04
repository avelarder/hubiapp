import React from 'react'
import ImageUploading from "react-images-uploading";
import { Image } from 'next/image'
import { TrashIcon } from '@heroicons/react/outline';

function ImageUploader() {
    const [images, setImages] = React.useState([]);
    const maxNumber = 69;
    const onChange = (imageList, addUpdateIndex) => {

        setImages(imageList);
    };

    return (
        <div >
            <ImageUploading
                multiple
                value={images}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="data_url"
            >
                {({
                    imageList,
                    onImageUpload,
                    onImageRemoveAll,
                    onImageUpdate,
                    onImageRemove,
                    isDragging,
                    dragProps
                }) => (
                    // write your building UI
                    <div className="upload__image-wrapper">
                        <div className='flex flex-col border-2 border-dashed border-purple-300 justify-center items-center'>
                            <button className=' w-full h-10'
                                style={isDragging ? { color: "red" } : null}
                                onClick={onImageUpload}
                                {...dragProps}
                            >
                                Click o arrastra imágenes aquí.
                            </button>
                            &nbsp;

                            {imageList.map((image, index) => (
                                <div key={index} className="image-item">
                                    <Image src={image.data_url} alt="" width="100" />
                                    <div className="image-item__btn-wrapper">
                                        <button onClick={() => onImageUpdate(index)}>Update</button>
                                        <button onClick={() => onImageRemove(index)}>Remove</button>
                                    </div>
                                </div>
                            ))}

                            <button onClick={onImageRemoveAll}><TrashIcon className='text-purple-600 h-7 w-7 mb-2'></TrashIcon></button>
                        </div>
                    </div>
                )}
            </ImageUploading>
        </div>
    );
}

export default ImageUploader
