const CurrentYear = () => {
  const year = new Date().getFullYear(); // Mevcut yılı al

  return <p>{year}</p>;
};
export default CurrentYear;
