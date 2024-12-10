'use client'
import { useEffect, useState } from "react";

const Main = () => {
    const [file, setFile] = useState(null);

    function convertImageToBase64(file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            console.log(event.target.result);
        };
        reader.readAsDataURL(file);
    }

    useEffect(() => {
        console.log(file);
    }, [file]);

    function handleFileChange(event) {
        const file = event.target.files[0];
        setFile(file);
        convertImageToBase64(file);
    }

    return (
        <div>
            <input type="file" onChange={handleFileChange} />

            {file && (
                <img
                    src={URL.createObjectURL(file)}
                    alt="Preview"
                    style={{ width: '100px', height: '100px' }}
                />
            )}
        </div>
    );
};

export default Main;
