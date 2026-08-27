'use client'
import React, { useState, useEffect } from 'react'
import { FaMagnifyingGlass } from 'react-icons/fa6'

function SearchBar() {
    const [searchText, setSearchText] = useState('')
    const [displayText, setDisplayText] = useState('')
    const [isTyping, setIsTyping] = useState(true)

    const suggestions = [
        'Search meme...',
        'Find people...',
        'Browse for foods...',
        'Discover many more...'
    ]

    const [currentSuggestion, setCurrentSuggestion] = useState(0)

    // Auto-typing animation effect
    useEffect(() => {
        if (!isTyping) return

        const currentPhrase = suggestions[currentSuggestion]
        let charIndex = 0

        const typingInterval = setInterval(() => {
            if (charIndex < currentPhrase.length) {
                setDisplayText(currentPhrase.substring(0, charIndex + 1))
                charIndex++
            } else {
                // Delete phase
                clearInterval(typingInterval)
                setIsTyping(false)

                // Wait 2 seconds before deleting
                const deleteTimer = setTimeout(() => {
                    let deleteIndex = currentPhrase.length
                    const deleteInterval = setInterval(() => {
                        if (deleteIndex > 0) {
                            setDisplayText(currentPhrase.substring(0, deleteIndex - 1))
                            deleteIndex--
                        } else {
                            clearInterval(deleteInterval)
                            setCurrentSuggestion((prev) => (prev + 1) % suggestions.length)
                            setIsTyping(true)
                        }
                    }, 50)
                }, 2000)

                return () => clearTimeout(deleteTimer)
            }
        }, 100)

        return () => clearInterval(typingInterval)
    }, [isTyping, currentSuggestion])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value)
        setDisplayText('')
        setIsTyping(false)
    }

    const handleInputFocus = () => {
        setIsTyping(false)
    }

    const handleInputBlur = () => {
        if (searchText === '') {
            setDisplayText('')
            setIsTyping(true)
        }
    }

    return (
        <div className='mt-10 flex justify-center px-4'>
            <div className='relative w-full max-w-2xl'>
                <input
                    type="text"
                    value={searchText}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    placeholder={searchText === '' ? displayText : ''}
                    className='w-full rounded-2xl bg-linear-to-r from-gray-800 to-gray-700 text-white p-3 pl-4 pr-12 outline-none border-2 border-transparent transition-all duration-200 shadow-lg placeholder-blue-200'
                />

                {/* Cursor animation */}
                {searchText === '' && isTyping && (
                    <span className='absolute right-14 top-1/2 transform -translate-y-1/2 text-blue-200 animate-pulse'>
                        |
                    </span>
                )}

                {/* Search Icon */}
                <div className='absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-400 hover:text-blue-300 cursor-pointer transition-colors'>
                    <FaMagnifyingGlass size={18} />
                </div>
            </div>
        </div>
    )
}

export default SearchBar