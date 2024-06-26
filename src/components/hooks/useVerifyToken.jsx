import { useVerifyTokenQuery } from "../../redux/features/api/apiSlice";

export const useVerifyToken = (token) => {
  return useVerifyTokenQuery(undefined, {
    skip: !token,
  });
};
