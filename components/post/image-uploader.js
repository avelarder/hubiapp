import React from 'react'
import ImageUploading from "react-images-uploading";
import { Image } from 'next/image'
import { TrashIcon } from '@heroicons/react/outline';

function ImageUploader() {

    const uploadPhoto = async (e) => {
        const file = e.target.files[0];
        const filename = encodeURIComponent(file.name);
        const res = await fetch(`/api/upload-url?file=${filename}`);
        const { url, fields } = await res.json();
        const formData = new FormData();

        Object.entries({ ...fields, file }).forEach(([key, value]) => {
            formData.append(key, value);
        });

        const upload = await fetch(url, {
            method: 'POST',
            body: formData,
        });

        if (upload.ok) {
            console.log('Uploaded successfully!');
        } else {
            console.error('Upload failed.');
        }
    };

    return (
        <div >
            <input className='flex flex-col border-2 border-dashed border-purple-300 justify-center items-center'
                onChange={uploadPhoto}
                type="file"
                accept="image/png, image/jpeg"
            />
        </div>
    );
}

export default ImageUploader
