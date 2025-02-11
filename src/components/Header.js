
import React from "react";

function Header() {
    
    return (
        <nav class="header fixed bg-[#ed1b24] border-gray-200 px-1 rounded-b-2xl pb-3 w-[101%] h-[20rem]" >
            <div class="flex flex-wrap items-center justify-between max-w-screen-xl mx-auto px-3 pb-3">
                    <img src="/logo.png" class="h-16 mx-auto mt-4" alt="Flowbite Logo" />
             
               
            </div>


            {/* <form class="flex items-center max-w-sm mx-3 my-2">
            <label for="simple-search" class="sr-only">Search</label>
            <div class="relative w-full">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2" />
                    </svg>
                </div>
                <input type="text" id="simple-search" class="search bg-white border-none text-gray-900 text-sm rounded-lg block w-full ps-10 p-2.5  dark:bg-white dark:placeholder-gray-400 dark:text-black dark:focus:ring-[#c2a152] dark:focus:border-[#c2a152]" placeholder="Search service..." required />
            </div>
           
        </form> */}
        </nav>
    );
}

export default Header;
