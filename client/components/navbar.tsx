'use client'
import React, { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { FaInstagram, FaPaperPlane, FaHouse, FaMagnifyingGlass, FaPlay, FaPlus, FaHeart } from 'react-icons/fa6'
import { Menu, User } from 'lucide-react'

interface NavItem {
    label: string
    icon: React.ReactNode
    path: string
}

const mainLinks: NavItem[] = [
    { label: 'Home', icon: <FaHouse size={24} />, path: '/' },
    { label: 'Search', icon: <FaMagnifyingGlass size={24} />, path: '/search' },
    { label: 'Reels', icon: <FaPlay size={22} />, path: '/reel' },
    { label: 'Messages', icon: <FaPaperPlane size={22} />, path: '/messages' },
    { label: 'Create', icon: <FaPlus size={24} />, path: '/create' },
    { label: 'Notifications', icon: <FaHeart size={24} />, path: '/notifications' },
]

// Mobile bottom bar shows a trimmed set (no "Create" text needed, no "More")
const mobileLinks: NavItem[] = mainLinks

function Navbar() {
    const [expanded, setExpanded] = useState(false)
    const pathname = usePathname()
    const router = useRouter()

    return (
        <>
            {/* Desktop / tablet sidebar */}
            <nav
                onMouseEnter={() => setExpanded(true)}
                onMouseLeave={() => setExpanded(false)}
                className={`hidden md:flex fixed left-0 top-0 h-screen z-50 flex-col bg-black border-r border-neutral-800 py-6 transition-[width,padding] duration-300 ease-out ${expanded ? 'w-64 px-4' : 'w-20 px-0 items-center'
                    }`}
            >
                {/* Logo */}
                <div className={`flex items-center mb-10 ${expanded ? 'gap-3 px-2' : 'justify-center'}`}>
                    <FaInstagram
                        size={28}
                        className="text-white shrink-0 transition-transform duration-300 ease-out hover:scale-110 hover:text-pink-500 cursor-pointer"
                    />
                    {expanded && (
                        <span className="text-white text-xl font-semibold tracking-tight whitespace-nowrap animate-in fade-in duration-200">
                            Instagram
                        </span>
                    )}
                </div>

                {/* Main nav links */}
                <div className="flex flex-col gap-1 flex-1 w-full">
                    {mainLinks.map((item) => {
                        const isActive = pathname === item.path
                        return (
                            <button
                                key={item.label}
                                onClick={() => router.push(item.path)}
                                className={`group flex items-center gap-4 rounded-xl py-3 transition-colors duration-200 ease-out active:scale-95 ${expanded ? 'px-3 w-full' : 'w-12 h-12 justify-center mx-auto'
                                    } ${isActive
                                        ? 'bg-neutral-900 text-white'
                                        : 'text-neutral-300 hover:bg-neutral-900 hover:text-white'
                                    }`}
                            >
                                <span className="shrink-0 transition-transform duration-200 ease-out group-hover:scale-110">
                                    {item.icon}
                                </span>
                                {expanded && (
                                    <span className={`text-sm whitespace-nowrap ${isActive ? 'font-bold' : 'font-medium'}`}>
                                        {item.label}
                                    </span>
                                )}
                            </button>
                        )
                    })}
                </div>

                {/* More menu */}

                <button onClick={()=>router.push('/profile')}
                    className={`group flex items-center gap-4 rounded-xl py-3 transition-colors duration-200 ease-out text-neutral-300 hover:bg-neutral-900 hover:text-white active:scale-95 ${expanded ? 'px-3 w-full' : 'w-12 h-12 justify-center mx-auto'
                        }`}
                >
                    <User size={24} className="shrink-0 transition-transform duration-200 ease-out group-hover:scale-110" />
                    {expanded && <span className="text-sm font-medium whitespace-nowrap">Profile</span>}
                </button>
                <button
                    className={`group flex items-center gap-4 rounded-xl py-3 transition-colors duration-200 ease-out text-neutral-300 hover:bg-neutral-900 hover:text-white active:scale-95 ${expanded ? 'px-3 w-full' : 'w-12 h-12 justify-center mx-auto'
                        }`}
                >
                    <Menu size={24} className="shrink-0 transition-transform duration-200 ease-out group-hover:scale-110" />
                    {expanded && <span className="text-sm font-medium whitespace-nowrap">More</span>}
                </button>
            </nav>

            {/* Mobile bottom bar */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around bg-black border-t border-neutral-800 py-2 px-1 safe-area-bottom">
                {mobileLinks.map((item) => {
                    const isActive = pathname === item.path
                    return (
                        <button
                            key={item.label}
                            onClick={() => router.push(item.path)}
                            aria-label={item.label}
                            className={`flex items-center justify-center w-11 h-11 rounded-xl transition-colors duration-200 ease-out active:scale-90 ${isActive ? 'text-white' : 'text-neutral-400 hover:text-white'
                                }`}
                        >
                            <span className="shrink-0 transition-transform duration-200 ease-out active:scale-95">
                                {item.icon}
                            </span>
                        </button>
                    )
                })}
            </nav>
        </>
    )
}

export default Navbar