import { useDispatch, useSelector } from "react-redux";
import { useGetBranchesQuery } from "../../../redux/features/api/apiSlice";
import {
  setSelectedValue,
  setShowOptions,
} from "../../../redux/slices/branchesListSlice.js";
import Spinner from "../../UI/Spinner.jsx";

function BranchesList({ branchId }) {
  const dispatch = useDispatch();
  const {
    data: branches,
    isErrorBranches,
    isLoadingBranches,
  } = useGetBranchesQuery();
  const { selectedValue, showOptions } = useSelector(
    (state) => state.branchesList
  );

  if (isLoadingBranches) return <Spinner />;
  if (isErrorBranches) return <div>Error: {isErrorBranches.toString()}</div>;

  const toggleOptions = () => dispatch(setShowOptions(!showOptions));
  const selectOption = (branchName) => {
    dispatch(setSelectedValue(branchName));
    dispatch(setShowOptions(false)); // Optionally hide options after selection
  };

  const selectedBranchName =
    branches?.find((branch) => branch.id === branchId)?.name || "";

  console.log(showOptions);
  return (
    <div className="max-w-md mx-auto">
      <div className="relative">
        <div className="h-10 bg-white flex border border-gray-200 rounded items-center">
          <input
            value={selectedValue !== "" ? selectedBranchName : selectedValue}
            onChange={(e) => dispatch(setSelectedValue(e.target.value))}
            name="select"
            id="select"
            className="px-4 appearance-none outline-none text-gray-800 w-full"
          />

          <button
            onClick={() => dispatch(setSelectedValue(""))}
            className="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-gray-600">
            <svg
              className="w-4 h-4 mx-2 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <label
            htmlFor="show_more"
            className="flex justify-center items-center cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-gray-600">
            <button onClick={toggleOptions}>
              {showOptions ? (
                <img
                  src="/images/icons/down.png"
                  alt="down.png"
                  className="w-2 h-2 mx-2"
                />
              ) : (
                <img
                  src="/images/icons/up.png"
                  alt="down"
                  className="w-2 h-2 mx-2"
                />
              )}
            </button>
          </label>
        </div>
        <input
          type="checkbox"
          name="show_more"
          id="show_more"
          className="hidden peer"
          checked={showOptions} // Dinamik değer.
          onChange={toggleOptions} // Bu input için bir etkileşim sağlama.
        />
        {showOptions && (
          <div className="absolute rounded shadow bg-white overflow-hidden hidden peer-checked:flex flex-col w-full mt-1 border border-gray-200">
            {branches.map((branch) => (
              <div className="cursor-pointer group" key={branch.id}>
                <a
                  onClick={() => selectOption(branch.name)}
                  className="block p-2 border-transparent border-l-4 group-hover:border-blue-600 group-hover:bg-gray-100">
                  {branch.name}
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default BranchesList;
