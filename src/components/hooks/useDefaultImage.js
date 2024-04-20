// src/hooks/useDefaultImage.js
import { useMemo } from "react";

const useDefaultImage = (patient) =>
  useMemo(() => {
    if (patient?.photo && patient.photo !== "null") {
      return patient.photo;
    }
    switch (patient?.gender) {
      case 1:
        return "/images/male.png";
      case 2:
        return "/images/female.png";
      default:
        return "/images/agender.png";
    }
  }, [patient]);

export default useDefaultImage;
