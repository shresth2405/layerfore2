'use client';

import axios from "axios";
import { useState } from "react";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function ConsultancyPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);

    try {
      const res = await axios.post(`${BACKEND_URL}/mail/send`, {
        name,
        email,
        message
      },{withCredentials: true  });

      console.log("Email sent successfully:", res.data);
      setSuccess("Email sent successfully!");

      // Clear form
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      console.error("Error sending email:", error);
      setSuccess("Failed to send email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 text-white">
      <h1 className="text-4xl font-bold mb-8">Consultancy Services</h1>

      <div className="grid bg-black grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="p-6 border rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Technical Consulting</h3>
          <p className="text-gray-300">
            Expert guidance on technical implementation, architecture design, and best practices.
          </p>
        </div>
        <div className="p-6 border rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Product Development</h3>
          <p className="text-gray-300">
            End-to-end support for product development, from ideation to launch.
          </p>
        </div>
        <div className="p-6 border rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Process Optimization</h3>
          <p className="text-gray-300">
            Streamline your manufacturing and development processes for maximum efficiency.
          </p>
        </div>
      </div>

      <div className="bg-black p-8 rounded-lg border border-white/10">
        <h2 className="text-2xl font-semibold mb-6">Schedule a Consultation</h2>

        {success && (
          <p className={`mb-4 ${success.includes('successfully') ? 'text-green-400' : 'text-red-400'}`}>
            {success}
          </p>
        )}

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 bg-white/10 text-white border rounded-md"
              placeholder="Your name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 bg-white/10 text-white border rounded-md"
              placeholder="Your email"
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Project Details</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-2 bg-white/10 text-white border rounded-md"
              rows="4"
              placeholder="Tell us about your project..."
              required
            />
          </div>
          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className={`bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Sending...' : 'Request Consultation'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
