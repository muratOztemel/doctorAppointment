const BloodType = ({ bloodType }) => {
  let output;
  switch (bloodType) {
    case 1:
      output = "A+";
      break;
    case 2:
      output = "A-";
      break;
    case 3:
      output = "B+";
      break;
    case 4:
      output = "B-";
      break;
    case 5:
      output = "AB+";
      break;
    case 6:
      output = "AB-";
      break;
    case 7:
      output = "0+";
      break;
    case 8:
      output = "0-";
      break;
    default:
      output = "-";
  }
  return output;
};
export default BloodType;
