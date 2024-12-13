'use client';
import { useEffect, useState } from 'react';

const Main = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFile(file);
    };

    return (
        <div className="bg-white">
            <input type="file" onChange={handleFileChange} />

            {file && (
                <img
                    src={URL.createObjectURL(file)}
                    alt="Preview"
                    style={{ width: '500px', height: '500px' }}
                />
            )}
        </div>
    );
};

export default Main;
