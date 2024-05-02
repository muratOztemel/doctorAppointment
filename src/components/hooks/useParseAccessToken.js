export const useParseAccessToken = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      try {
        const decodedToken = jwtDecode(token);

        // Rol bazlı yönlendirme
        switch (decodedToken.role) {
          case "Admin":
            dispatch(
              setUserLogin({
                token: token,
                userRole: decodedToken.role,
                userId: decodedToken.sid,
              })
            );
            navigate("/dashboardAdmin");
            break;
          case "Patient":
            dispatch(
              setUserLogin({
                token: token,
                userRole: decodedToken.role,
                userId: decodedToken.groupsid,
              })
            );
            navigate("/dashboardPatient");
            break;
          default:
            navigate("/auth/login");
        }
      } catch (error) {
        console.error("Token decoding failed", error);
        navigate("/auth/login");
      }
    }
  }, [dispatch, navigate]); // Bağımlılıkları useEffect'e dahil etmek
};
