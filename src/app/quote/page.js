'use client';

export default function QuotePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Get a Quote</h1>
      
      <div className="max-w-2xl mx-auto">
        <form className="space-y-6">
          <div className="bg-white p-6 rounded-lg border">
            <h2 className="text-xl font-semibold mb-4">Project Details</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Project Type</label>
                <select className="w-full p-2 border rounded-md">
                  <option value="">Select a project type</option>
                  <option value="3d-printing">3D Printing</option>
                  <option value="prototyping">Prototyping</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="consulting">Consulting</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Project Description</label>
                <textarea 
                  className="w-full p-2 border rounded-md"
                  rows="4"
                  placeholder="Describe your project requirements..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Timeline</label>
                <select className="w-full p-2 border rounded-md">
                  <option value="">Select timeline</option>
                  <option value="urgent">Urgent (1-3 days)</option>
                  <option value="standard">Standard (1-2 weeks)</option>
                  <option value="flexible">Flexible (2+ weeks)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border">
            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">First Name</label>
                  <input 
                    type="text"
                    className="w-full p-2 border rounded-md"
                    placeholder="Your first name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Last Name</label>
                  <input 
                    type="text"
                    className="w-full p-2 border rounded-md"
                    placeholder="Your last name"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input 
                  type="email"
                  className="w-full p-2 border rounded-md"
                  placeholder="Your email address"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input 
                  type="tel"
                  className="w-full p-2 border rounded-md"
                  placeholder="Your phone number"
                />
              </div>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors"
          >
            Request Quote
          </button>
        </form>
      </div>
    </div>
  );
}
