'use client'
import Image from "next/image";
import axios from 'axios'
import { FaInstagram } from 'react-icons/fa6'
import { useState } from "react";
export default function Home() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const subbmit = async () => {
        await axios.post(`http://localhost:5000/api/user`, {
            user: username,
            password: password
        }).then(() => console.log(username, password))
        console.log(username, password)
    }
    return (
        <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <h1>THE ONE</h1>

            <div>
                <FaInstagram />
                <div className="flex flex-row">
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="border-2 border-amber-50" />
                    <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} className="border-2 border-amber-50" />
                </div>
                <div className="justify-center items-center p-2"> <button onClick={subbmit}>Save Password</button> </div>
            </div>
        </div>
    );
}
