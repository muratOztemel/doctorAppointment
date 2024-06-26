const useAppointmentChecker = ({ appointments, patientId, doctorId }) => {
  // Bugünün tarihini al
  const today = new Date();

  // Randevu tarihini hesapla (bugünden itibaren 15 gün içinde bir randevu varsa)
  let appointmentDate = null;
  let foundAppointmentWithinFifteenDays = false;

  // Randevu verilerini kontrol et
  appointments?.forEach((appointment) => {
    const appointmentDateObj = new Date(appointment.appointmentDate);
    const appointmentFifteenDaysAgo = new Date(today);
    appointmentFifteenDaysAgo.setDate(today.getDate() - 15);

    // Belirli bir hastanın belirli bir doktordan bugünden itibaren 15 gün içinde bir randevusu var mı kontrol et
    if (
      appointment.patientId === patientId &&
      appointment.doctorId === doctorId &&
      appointmentDateObj >= today &&
      appointmentDateObj <= appointmentFifteenDaysAgo
    ) {
      // Eğer böyle bir randevu varsa, randevu tarihini belirle
      appointmentDate = appointmentDateObj;
      foundAppointmentWithinFifteenDays = true;
    }
  });

  // Eğer hastanın bugünden itibaren 15 gün içinde bir randevusu varsa
  if (foundAppointmentWithinFifteenDays) {
    return (
      <div>
        Randevu tarihi: {appointmentDate.toLocaleDateString()} olarak
        belirlendi. Bu tarihten geriye veya ileriye bir randevu alamazsınız.
      </div>
    );
  } else {
    // Eğer hastanın bugünden itibaren 15 gün içinde bir randevusu yoksa, randevu alabilir
    return (
      <div>
        Bugünden itibaren 15 gün içinde randevunuz bulunmamaktadır. Randevu
        alabilirsiniz.
      </div>
    );
  }
};
export default useAppointmentChecker;
