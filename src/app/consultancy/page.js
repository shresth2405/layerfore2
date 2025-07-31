'use client';

export default function ConsultancyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Consultancy Services</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="p-6 border rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Technical Consulting</h3>
          <p className="text-gray-600">
            Expert guidance on technical implementation, architecture design, and best practices.
          </p>
        </div>
        <div className="p-6 border rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Product Development</h3>
          <p className="text-gray-600">
            End-to-end support for product development, from ideation to launch.
          </p>
        </div>
        <div className="p-6 border rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Process Optimization</h3>
          <p className="text-gray-600">
            Streamline your manufacturing and development processes for maximum efficiency.
          </p>
        </div>
      </div>

      <div className="bg-gray-50 p-8 rounded-lg">
        <h2 className="text-2xl font-semibold mb-6">Schedule a Consultation</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input 
              type="text" 
              className="w-full p-2 border rounded-md"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input 
              type="email" 
              className="w-full p-2 border rounded-md"
              placeholder="Your email"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Project Details</label>
            <textarea 
              className="w-full p-2 border rounded-md"
              rows="4"
              placeholder="Tell us about your project..."
            />
          </div>
          <div className="md:col-span-2">
            <button 
              type="submit"
              className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors"
            >
              Request Consultation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
