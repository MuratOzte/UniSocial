'use client';
import { useEffect, useState } from 'react';

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

    const fetchData = async () => {
        const response = await fetch(
            'https://jsonplaceholder.typicode.com/users'
        );
        const data = await response.json();
        console.log(data);
    };

    const postData = async () => {
        const response = await fetch(
            'http://localhost:3000/api/register/student',
            {
                method: 'POST',
                body: JSON.stringify({
                    name: 'emre',
                    surname: 'surat',
                    univercity: 'asd',
                    department: 'asdw',
                    email: 'asd12das@gmail.com',
                    password: '123123',
                }),
            }
        );
        const data = await response.json();
        console.log(data);
    };

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

            <button className="bg-white p-3" onClick={fetchData}>
                FETCH GET
            </button>
            <button className="bg-white p-3" onClick={postData}>
                FETCH POST
            </button>
        </div>
    );
};

export default Main;
