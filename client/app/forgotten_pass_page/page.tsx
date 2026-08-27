'use client'
import { useRouter } from 'next/navigation'
function page() {
    const router = useRouter();
    return (
        <div>page
            <button onClick={()=>router.push('/login')}>Back</button>
        </div>
    )
}

export default page