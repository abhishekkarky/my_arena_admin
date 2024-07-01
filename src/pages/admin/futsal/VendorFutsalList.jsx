import { SearchNormal1 } from 'iconsax-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AddFutsalModal from './components/AddFutsalModal';
import VendorFutsalTable from './components/VandorFutsalTable';

const VendorFutsalList = () => {
    const [inputSearch, setInputSearch] = useState('');
    const [searchQuery, setSearchQuery] = useState(undefined);
    const [isAddFutsalModalOpen, setIsAddFutsalModalOpen] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false);

    const handleAddFutsalModal = () => {
        setIsAddFutsalModalOpen(!isAddFutsalModalOpen);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchQuery(inputSearch);
    };

    useEffect(() => {
        if (inputSearch === '') {
            setSearchQuery(undefined);
        }
    }, [inputSearch])

    return (
        <main className='flex flex-col gap-8 md:px-10 md:pb-10 pb-0 px-4 pt-6 max-w-[1440px] mx-auto'>
            <div className="w-full flex flex-col gap-4">
                <div className="w-full flex justify-between items-center gap-5 flex-wrap py-4">
                    <p className='text-2xl md:text-left text-center'>My Futsals</p>
                    <div className="md:w-auto w-full md:flex md:flex-row flex flex-col justify-end items-center gap-2 md:mb-0 mb-5">
                        <form onSubmit={handleSearch} className="w-full h-full bg-neutral-50 px-2 py-2 border rounded-lg border-neutral-300 outline-none flex items-center">
                            <input type="text" placeholder='Search...' value={inputSearch} onChange={(e) => setInputSearch(e.target.value)} className='bg-transparent outline-none flex-1' />
                            <button type='submit'>
                                <SearchNormal1 size={18} />
                            </button>
                        </form>
                        <div className="md:w-auto w-full flex justify-end">
                            <Link onClick={handleAddFutsalModal} className='bg-black text-white px-4 py-2 rounded-md hover:shadow-lg w-[180px] text-center'>Add Futsal</Link>
                        </div>
                    </div>
                </div>
                <VendorFutsalTable searchQuery={searchQuery} isUpdated={isUpdated} setIsUpdated={setIsUpdated} />
            </div>
            <AddFutsalModal open={isAddFutsalModalOpen} onClose={() => setIsAddFutsalModalOpen(false)} setIsUpdated={setIsUpdated} />
        </main>
    )
}

export default VendorFutsalList