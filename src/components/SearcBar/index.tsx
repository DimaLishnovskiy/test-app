'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

export const SearchBar = () => {
    const pathname = usePathname();
    const { replace } = useRouter();
    const searchParams = useSearchParams();
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        const params = new URLSearchParams(searchParams);
        if (searchTerm) {
            params.delete('page')
            params.set('search', searchTerm);
        } else {
            params.delete('search');
        }
        replace(`${pathname}?${params.toString()}`);
    };

    const params = new URLSearchParams(searchParams);
    const currentPage = Number(params.get('page')) || 1;

    return (
        <form onSubmit={handleSearch} className="flex items-center justify-center mb-4">
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 mr-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700">
                Search
            </button>
        </form>
    );
};
