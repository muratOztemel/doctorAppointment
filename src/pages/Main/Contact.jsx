const Contact = () => {
  return (
    <div className="relative w-full max-w-[1280px] h-[500px] mx-auto overflow-hidden p-5">
      <div className="text-2xl font-medium mb-4">Contact</div>
      <form className="space-y-4">
        <div>
          <label className="block text-xl font-medium mb-1" htmlFor="name">
            Name
          </label>
          <input
            className="w-full p-2 border border-gray-300 rounded"
            type="text"
            id="name"
            name="name"
            required
          />
        </div>
        <div>
          <label className="block text-xl font-medium mb-1" htmlFor="email">
            Email
          </label>
          <input
            className="w-full p-2 border border-gray-300 rounded"
            type="email"
            id="email"
            name="email"
            required
          />
        </div>
        <div>
          <label className="block text-xl font-medium mb-1" htmlFor="message">
            Message
          </label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded"
            id="message"
            name="message"
            rows="4"
            required></textarea>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
          Send
        </button>
      </form>
    </div>
  );
};

export default Contact;
