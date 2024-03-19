import { useState } from "react";

const SearchPatients = ({ patients, setQuery }) => {
  return (
    <div className="grid lg:grid-cols-5 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-2">
      <input
        type="text"
        placeholder='Search "Patients"'
        className="h-14 text-sm text-main rounded-md bg-dry border border-border px-4"
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="text-sm relative w-full ">
        <div className="w-full">
          <button
            className="w-full"
            id="headlessui-listbox-button-:r4:"
            type="button"
            aria-haspopup="listbox"
            aria-expanded="false"
            data-headlessui-state="">
            <div className="h-14 w-full text-xs text-main rounded-md bg-dry border border-border px-4 flex items-center justify-between">
              <p>Sort by...</p>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                className="text-xl"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path>
              </svg>
            </div>
          </button>
        </div>
      </div>
      <div className="text-sm relative w-full ">
        <div className="w-full">
          <button
            className="w-full"
            id="headlessui-listbox-button-:r6:"
            type="button"
            aria-haspopup="listbox"
            aria-expanded="false"
            data-headlessui-state="">
            <div className="h-14 w-full text-xs text-main rounded-md bg-dry border border-border px-4 flex items-center justify-between">
              <p>Gender...</p>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                className="text-xl"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path>
              </svg>
            </div>
          </button>
        </div>
      </div>
      <div className="text-sm w-full flex flex-col gap-2">
        <div className="react-datepicker-wrapper">
          <div className="react-datepicker__input-container">
            <input
              type="text"
              className="w-full bg-dry  text-xs px-4 h-14 border border-border text-main font-normal rounded-lg focus:border focus:border-subMain"
              value="03/19/2024 - 03/19/2024"
            />
          </div>
        </div>
      </div>
      <button className="w-full flex-rows gap-4 hover:opacity-80 transitions bg-subMain text-white text-sm font-medium px-2 py-4 rounded">
        Filter
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 24 24"
          className="text-white text-xl"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg">
          <path fill="none" d="M0 0h24v24H0z"></path>
          <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"></path>
        </svg>
      </button>
    </div>
  );
};
export default SearchPatients;
