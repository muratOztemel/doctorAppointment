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
import DoctorAppointment from "./DoctorAppointment";
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
  const [isBranchOpen, setIsBranchOpen] = useState(false);
  const [isDoctorOpen, setIsDoctorOpen] = useState(false);
  const [isBranchClick, setIsBranchClick] = useState(false);
  const [isDoctorClick, setIsDoctorClick] = useState(false);
  const [branchSearchTerm, setBranchSearchTerm] = useState("");
  const [doctorSearchTerm, setDoctorSearchTerm] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showAllBranches, setShowAllBranches] = useState(false);
  const [showAllDoctors, setShowAllDoctors] = useState(false);
  const dropdownRef = useRef(null);
  const dropdownDoctorRef = useRef(null);
  const branchInputRef = useRef(null);
  const doctorInputRef = useRef(null);

  const { data: branches, isError, isLoading } = useGetBranchesQuery();
  const {
    data: doctors,
    isErrorDoctors,
    isLoadingDoctors,
  } = useGetDoctorsQuery();

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsBranchOpen(false);
    }
    if (
      dropdownDoctorRef.current &&
      !dropdownDoctorRef.current.contains(event.target)
    ) {
      setIsDoctorOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setIsBranchClick(!!branchIdFromUrl && !!branchNameFromUrl);
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
    setIsBranchClick(false);
  };

  const clearDoctorSelection = () => {
    setDoctorSearchTerm("");
    setSelectedDoctor(null);
    setIsDoctorClick(false);
  };

  if (isLoading || isLoadingDoctors) return <p>Loading...</p>;
  if (isError || isErrorDoctors) return <p>Error loading data.</p>;
  if (!branches) return <p>No data available.</p>;

  const filteredBranches = branches.filter((branch) =>
    branch.name.toLowerCase().includes(branchSearchTerm.toLowerCase())
  );

  const filteredDoctors = doctors?.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(doctorSearchTerm.toLowerCase()) ||
      doctor.title.toLowerCase().includes(doctorSearchTerm.toLowerCase()) ||
      doctor.surname.toLowerCase().includes(doctorSearchTerm.toLowerCase())
  );

  const displayBranches = showAllBranches
    ? filteredBranches
    : filteredBranches.slice(0, 5);

  const displayDoctors = showAllDoctors
    ? filteredDoctors
    : filteredDoctors?.slice(0, 5);

  const getBranchNameById = (branchId) => {
    const branch = branches.find((branch) => branch.id === branchId);
    return branch ? branch.name : "";
  };

  return (
    <>
      <Card
        title={"Patient Dashboard"}
        icon={<FaUserInjured />}
        color={"cyan"}
        className={"mb-6"}>
        <div className="inline-flex gap-6 ml-14">
          <div className="my-6 max-w-md mx-auto h-full" ref={dropdownRef}>
            <form className="w-full" onSubmit={(e) => e.preventDefault()}>
              <label
                htmlFor="branch-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only">
                Search Branches
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
                  ref={branchInputRef}
                  type="search"
                  id="branch-search"
                  className="block w-full h-14 pl-10 pr-24 py-2 text-lg text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none"
                  placeholder="Search Branches..."
                  value={branchSearchTerm}
                  onClick={() => {
                    setIsBranchOpen(true);
                    setIsDoctorOpen(false);
                    setIsBranchClick(false);
                    setIsDoctorClick(false);
                  }}
                  onChange={(e) => {
                    setBranchSearchTerm(e.target.value);
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
            {isBranchOpen && (
              <div
                className="absolute shadow-lg bg-white mt-1 p-2 z-10 rounded-lg"
                style={{ width: branchInputRef.current?.offsetWidth }}>
                {displayBranches.map((branch) => (
                  <div
                    className="flex items-center p-2 hover:bg-cyan-100 cursor-pointer"
                    key={branch.id}
                    onClick={() => {
                      setIsBranchClick(true);
                      setIsDoctorClick(false);
                      setIsBranchOpen(false);
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
                {!showAllBranches && filteredBranches.length > 5 && (
                  <div
                    className="text-center text-blue-500 cursor-pointer p-2"
                    onClick={() => setShowAllBranches(true)}>
                    Show all branches
                  </div>
                )}
              </div>
            )}
          </div>
          <div
            className="relative my-6 max-w-md mx-auto h-full"
            ref={dropdownDoctorRef}>
            <form className="w-full" onSubmit={(e) => e.preventDefault()}>
              <label
                htmlFor="doctor-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only">
                Search Doctors
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
                  ref={doctorInputRef}
                  type="search"
                  id="doctor-search"
                  className="block w-full h-14 pl-10 pr-24 py-2 text-lg text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none"
                  placeholder="Search Doctors..."
                  value={doctorSearchTerm}
                  onClick={() => {
                    setIsDoctorOpen(true);
                    setIsBranchOpen(false);
                    setIsBranchClick(false);
                    setIsDoctorClick(false);
                    setBranchName("");
                  }}
                  onChange={(e) => {
                    setDoctorSearchTerm(e.target.value);
                  }}
                />
                <button
                  type="button"
                  onClick={clearDoctorSelection}
                  className="text-white absolute right-2.5 bottom-2.5 bg-cyan-500 hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">
                  Clear
                </button>
              </div>
            </form>
            {isDoctorOpen && (
              <div
                className="absolute shadow-lg bg-white mt-1 p-2 z-10 rounded-lg"
                style={{ width: doctorInputRef.current?.offsetWidth }}>
                {displayDoctors?.map((doctor) => (
                  <div
                    className="flex items-center p-2 hover:bg-cyan-100 cursor-pointer"
                    key={doctor.id}
                    onClick={() => {
                      setIsDoctorClick(true);
                      setIsBranchClick(false);
                      const doctorBranchName = getBranchNameById(
                        doctor.branchId
                      );
                      setBranchName(doctorBranchName);
                      setSelectedDoctor(doctor);
                      setIsDoctorOpen(false);
                    }}>
                    <div className="mr-1">
                      <div className="rounded-md bg-cyan-50 w-7 h-7 flex justify-center items-center">
                        <FaUserDoctor className="text-cyan-500" />
                      </div>
                    </div>
                    <div className="ml-2">
                      {doctor.title} {doctor.name} {doctor.surname}
                    </div>
                  </div>
                ))}
                {!showAllDoctors && filteredDoctors.length > 5 && (
                  <div
                    className="text-center text-blue-500 cursor-pointer p-2"
                    onClick={() => setShowAllDoctors(true)}>
                    Show all doctors
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </Card>
      {isBranchClick && !isDoctorClick && (
        <Card title={"Choose a Branch"} icon={<FaUserDoctor />} color={"cyan"}>
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-10 gap-4 border-b border-dashed border-gray-200">
              {doctors
                ?.filter((doctor) => doctor.branchId === branchId)
                .map((doctor) => (
                  <DoctorList
                    key={doctor.id}
                    doctor={doctor}
                    branchName={branchName}
                    setDay={setDay}
                    day={day}
                  />
                ))}
            </div>
          </div>
        </Card>
      )}
      {isDoctorClick && selectedDoctor && (
        <Card title={"Doctor Details"} icon={<FaUserDoctor />} color={"cyan"}>
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-10 gap-4 border-b border-dashed border-gray-200">
              <DoctorAppointment
                doctor={selectedDoctor}
                branchName={branchName}
                setDay={setDay}
                day={day}
              />
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

export default SearchDropdown;
