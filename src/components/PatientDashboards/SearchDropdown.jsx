import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import {
  useGetBranchesQuery,
  useGetDoctorsQuery,
} from "../../redux/features/api/apiSlice";
import { FaUserDoctor } from "react-icons/fa6";
import { FaUserInjured } from "react-icons/fa";
import Card from "../UI/Cards/Card";
import DoctorList from "./DoctorList";
import { format, isValid, parse } from "date-fns";

const SearchDropdown = () => {
  const today = format(new Date(), "yyyy-MM-dd");
  const [searchParams, setSearchParams] = useSearchParams();
  const branchIdFromUrl = parseInt(searchParams.get("branchId"), 10);
  const branchNameFromUrl = searchParams.get("branch") || "";
  const dayFromUrl = searchParams.get("day");

  let initialDate = today;
  if (dayFromUrl) {
    const parsedDate = parse(dayFromUrl, "yyyy-MM-dd", new Date());
    if (isValid(parsedDate)) {
      initialDate = parsedDate;
    }
  }
  const [branchId, setBranchId] = useState(branchIdFromUrl || 0);
  const [day, setDay] = useState(initialDate);
  const [branchName, setBranchName] = useState(branchNameFromUrl);
  const [isOpen, setIsOpen] = useState(false);
  const [isClick, setIsClick] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [doctorsToShow, setDoctorsToShow] = useState([]);
  const dropdownRef = useRef(null);

  const { data: branches, isError, isLoading } = useGetBranchesQuery();
  const {
    data: doctors,
    isErrorDoctors,
    isLoadingDoctors,
  } = useGetDoctorsQuery();

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setIsClick(!!branchIdFromUrl && !!branchNameFromUrl);
    setSearchParams({
      branch: branchName,
      branchId,
      day: format(day, "yyyy-MM-dd"),
    });
  }, [branchId, branchName, day, setSearchParams]);

  const clearBranchSelection = () => {
    setBranchId(0);
    setBranchName("");
    setSearchParams({
      branch: "",
      branchId: 0,
      day: format(day, "yyyy-MM-dd"),
    });
  };

  if (isLoading || isLoadingDoctors) return <p>Loading...</p>;
  if (isError || isErrorDoctors) return <p>Error loading data.</p>;
  if (!branches) return <p>No data available.</p>;

  const filteredBranches = branches.filter((branch) =>
    branch.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayBranches = showAll
    ? filteredBranches
    : filteredBranches.slice(0, 5);

  return (
    <>
      <Card
        title={"Patient Dashboard"}
        icon={<FaUserInjured />}
        color={"cyan"}
        className={"mb-6"}>
        <div
          className="relative my-6 max-w-md mx-auto h-full"
          ref={dropdownRef}>
          <form className="w-full" onSubmit={(e) => e.preventDefault()}>
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only">
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full h-14 pl-10 pr-24 py-2 text-lg text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none"
                placeholder="Search Branches..."
                value={branchName}
                onClick={() => setIsOpen(!isOpen)}
                onChange={(e) => {
                  setBranchName(e.target.value);
                  setSearchTerm(e.target.value);
                }}
              />
              <button
                type="button"
                onClick={clearBranchSelection}
                className="text-white absolute right-2.5 bottom-2.5 bg-cyan-500 hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">
                Clear
              </button>
            </div>
          </form>
          {isOpen && (
            <div className="absolute w-full shadow-lg bg-white mt-1 p-2 z-10 rounded-lg">
              {displayBranches.map((branch) => (
                <div
                  className="flex items-center p-2 hover:bg-cyan-100 cursor-pointer"
                  key={branch.id}
                  onClick={() => {
                    setIsClick(true);
                    setIsOpen(!isOpen);
                    setBranchId(branch.id);
                    setBranchName(branch.name);
                    setDay(today);
                  }}>
                  <div className="mr-1">
                    <div className="rounded-md bg-cyan-50 w-7 h-7 flex justify-center items-center">
                      <FaUserDoctor className="text-cyan-500" />
                    </div>
                  </div>
                  <div className="ml-2">{branch.name}</div>
                </div>
              ))}
              {!showAll && filteredBranches.length > 5 && (
                <div
                  className="text-center text-blue-500 cursor-pointer p-2"
                  onClick={() => setShowAll(true)}>
                  Show all branches
                </div>
              )}
            </div>
          )}
        </div>
      </Card>
      {isClick && (
        <Card title={"Choose a Doctor"} icon={<FaUserDoctor />} color={"cyan"}>
          {doctors?.map((doctor) => {
            if (doctor.branchId === branchId) {
              return (
                <div key={doctor.id} className="container mx-auto px-4">
                  <div className="grid grid-cols-10 gap-4 border-b border-dashed border-gray-200">
                    <DoctorList
                      doctor={doctor}
                      branchName={branchName}
                      setDay={setDay}
                      day={day}
                    />
                  </div>
                </div>
              );
            }
          })}
        </Card>
      )}
    </>
  );
};

export default SearchDropdown;
