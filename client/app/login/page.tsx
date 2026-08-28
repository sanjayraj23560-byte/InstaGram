'use client';
import Image from "next/image";
import axios from 'axios';
import { useRouter } from "next/navigation";
import { FaInstagram } from 'react-icons/fa6';
import { useState } from "react";
export default function Home() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const subbmit = async () => {
        await axios.post(`http://localhost:5000/api/login/api/auth/login`, {
            username: username,
            password: password
        }).then((res) => console.log(res))
        console.log(username, password)
    }
    return (
        <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <div>
                <div className="justify-center items-center flex ml-25"> <FaInstagram size={28} /></div>
                <div className="flex flex-col gap-2 p-3">
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="border-2 p-2 text-[15px] rounded-2xl border-amber-50" />
                    <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} className="border-2 p-2 text-[15px] rounded-2xl border-amber-50" />
                    <p className="text-[13px] hover:cursor-pointer ml-2" onClick={() => router.push('/forgotten_pass_page')} >Forgitten password ?</p>
                    <div className="justify-center items-center p-2 bg-black text-center rounded-[10px] border-red-400"> <button onClick={subbmit}>Save Password</button> </div>
                    <div>
                        <h3 className="mt-50 text-center font-semibold">B<span className="text-gray-400">et</span>a</h3></div>
                </div>
            </div>
        </div>
    );
}
