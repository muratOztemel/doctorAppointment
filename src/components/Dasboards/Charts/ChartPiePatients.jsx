import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { number, array, string } from "prop-types";
import {
  useGetPatientsQuery,
  useGetAppointmentsQuery,
} from "../../../redux/features/api/apiSlice.js";
import {
  setPatientsPieTotalCounts,
  setPatientsPieMonths,
  setPatientsPieSeries,
  setPatientsPieOptions,
} from "../../../redux/slices/chartPatientsPieSlice.js";
import ReactApexChart from "react-apexcharts";

const ChartPiePatients = ({ dataName, color, widthChart }) => {
  const options = useSelector(
    (state) => state.chartPatientsPie.patientsPieOptions
  );
  const series = useSelector(
    (state) => state.chartPatientsPie.patientsPieSeries
  );
  const months = useSelector(
    (state) => state.chartPatientsPie.patientsPieMonths
  );
  const totalCounts = useSelector(
    (state) => state.chartPatientsPie.patientsPieTotalCounts
  );
  const dispatch = useDispatch();
  const {
    data: patients,
    error: patientsError,
    isLoading: patientsLoading,
  } = useGetPatientsQuery();
  const {
    data: appointments,
    error: appointmentsError,
    isLoading: appointmentsLoading,
  } = useGetAppointmentsQuery();

  let selectedData = dataName === "patients" ? patients : appointments;

  useEffect(() => {
    // Verileri aylara göre gruplamak için bir fonksiyon
    function groupDataByMonth(data) {
      let groupedData = {};
      let months = [];
      let totalDataCounts = [];

      data.forEach((item) => {
        let date;
        if (dataName === "appointments") {
          date = new Date(item.apointmentDate); // apointmentDate yazım hatası varsa düzeltilmeli: appointmentDate olarak.
        } else {
          date = new Date(item.createdAt);
        }

        let year = date.getFullYear();
        let month = date.getMonth() + 1; // JavaScript ayları 0'dan başlatır, bu yüzden 1 ekliyoruz.
        let key = `${year}-${month < 10 ? "0" + month : month}`; // Ay tek basamaklıysa başına 0 ekleyerek formatı koruyoruz.

        groupedData[key] = [...(groupedData[key] || []), item];
      });

      // Her ay için toplam veriyi hesapla
      Object.keys(groupedData)
        .sort()
        .forEach((key) => {
          // Anahtarları sıralı tutmak için sort() kullanıldı.
          months.push(key); // Ayı diziye ekle
          totalDataCounts.push(groupedData[key].length); // Toplam veri sayısını diziyi ekle
        });

      return { months, totalDataCounts };
    }

    if (
      !patientsLoading &&
      !appointmentsLoading &&
      !patientsError &&
      !appointmentsError &&
      patients &&
      appointments
    ) {
      // Gruplanmış veriyi al
      const { months, totalDataCounts } = groupDataByMonth(selectedData);

      dispatch(setPatientsPieTotalCounts(totalDataCounts));
      dispatch(setPatientsPieMonths(months));
      dispatch(setPatientsPieSeries(totalDataCounts.slice(0, 3)));
      dispatch(
        setPatientsPieOptions({
          chart: {
            width: widthChart,
            type: "pie",
          },
          labels: months.slice(0, 3),
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 200,
                },
                legend: {
                  position: "bottom",
                },
              },
            },
          ],
        })
      );
    }
  }, [
    dispatch,
    patients,
    appointments,
    patientsLoading,
    appointmentsLoading,
    patientsError,
    appointmentsError,
  ]);

  // Yükleme durumu kontrolü
  if (patientsLoading || appointmentsLoading) return <div>Loading...</div>;
  // Hata durumu kontrolü
  if (patientsError) return <div>Error: {patientsError.toString()}</div>;
  if (appointmentsError)
    return <div>Error: {appointmentsError.toString()}</div>;

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="pie"
      width={widthChart}
    />
  );
};

export default ChartPiePatients;

ChartPiePatients.propTypes = {
  /*   dataName: string,
  widthChart: number,
  color: array, */
};
