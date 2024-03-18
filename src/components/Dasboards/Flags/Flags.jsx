import { string } from "prop-types";
import flagTurkish from "../../../assets/flags/turkey.png";
import flagEnglish from "../../../assets/flags/united-kingdom.png";

const Flags = ({ language }) => {
  const languageArray = language.split(",").map((lang) => lang.trim());

  const flagMappings = {
    Türkçe: flagTurkish,
    English: flagEnglish,
  };

  const renderFlags = () => {
    return languageArray.map((lang) => (
      <img key={lang} src={flagMappings[lang]} alt={`${lang} Flag`} />
    ));
  };

  return <div className="flex gap-2"> {renderFlags()}</div>;
};
export default Flags;

Flags.propTypes = {
  language: string,
};
