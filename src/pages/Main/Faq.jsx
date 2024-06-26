const Faq = () => {
  return (
    <div className="relative w-full max-w-[1280px] mx-auto overflow-hidden p-5">
      <div className="text-2xl font-medium mb-4">
        Frequently Asked Questions
      </div>
      <div className="mb-6">
        <h3 className="text-xl font-semibold">
          Q: How do I make an appointment?
        </h3>
        <p className="text-lg">
          A: You can make an appointment by calling our office at (123) 456-7890
          or by using our online appointment form.
        </p>
      </div>
      <div className="mb-6">
        <h3 className="text-xl font-semibold">
          Q: What are your office hours?
        </h3>
        <p className="text-lg">
          A: Our office hours are Monday to Friday, 9 AM to 5 PM. We are closed
          on weekends and public holidays.
        </p>
      </div>
      <div className="mb-6">
        <h3 className="text-xl font-semibold">Q: Do you accept insurance?</h3>
        <p className="text-lg">
          A: Yes, we accept most major insurance plans. Please contact our
          office for more details.
        </p>
      </div>
      <div className="mb-6">
        <h3 className="text-xl font-semibold">
          Q: What should I bring to my first appointment?
        </h3>
        <p className="text-lg">
          A: Please bring your insurance card, a valid ID, and any relevant
          medical records. If you are taking any medications, please bring a
          list of them.
        </p>
      </div>
      <div className="mb-6">
        <h3 className="text-xl font-semibold">
          Q: Can I reschedule my appointment?
        </h3>
        <p className="text-lg">
          A: Yes, you can reschedule your appointment by calling our office at
          least 24 hours in advance.
        </p>
      </div>
    </div>
  );
};

export default Faq;
