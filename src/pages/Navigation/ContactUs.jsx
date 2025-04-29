import React, { useState } from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { db } from '../../components/auth/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import emailjs from '@emailjs/browser';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');

    try {
      // Save to Firestore
      await addDoc(collection(db, 'contacts'), {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        createdAt: new Date(),
      });

      // Send email via EmailJS
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
      };

      await emailjs.send(
        'service_hvy7jlr',     // replace with your EmailJS service ID
        'template_ke74j6s',    // replace with your EmailJS template ID
        templateParams,
        'xCD3ERyK1waZdrH7A'      // replace with your EmailJS public key
      );

      setStatus('✅ Message sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus('❌ Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-b flex flex-col items-center pt-20 px-4">
      <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-6">
        Get In Touch
      </h1>
      <p className="text-center text-gray-500 max-w-2xl mb-12">
      Have questions or need support? Our team is here to help you craft the perfect AI-powered resume. Reach out to us and take the next step toward building a standout resume that boosts your career opportunities.
      </p>

      {}
      <div className="flex flex-col lg:flex-row w-full max-w-5xl bg-white shadow-lg rounded-2xl overflow-hidden h-fit break-words lg:h[60vh]">
        
        {}
        <div className="lg:w-1/3 bg-[#4F46E5] text-white p-8 flex items-center justify-center gap-6 ">
          <h2 className="text-5xl font-semibold mb-4 text-center">Contact Us</h2>
         
          
        </div>

        {}
        <div className="lg:w-2/3 p-8 flex flex-col justify-center">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row gap-6">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border-b-2 border-gray-300 outline-none py-2 focus:border-[#4F46E5]"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border-b-2 border-gray-300 outline-none py-2 focus:border-[#4F46E5]"
              />
            </div>

            <input
              type="text"
              name="subject"
              placeholder="Your Subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full border-b-2 border-gray-300 outline-none py-2 focus:border-[#4F46E5]"
            />

            <textarea
              name="message"
              placeholder="Write your message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="4"
              className="w-full border-b-2 border-gray-300 outline-none py-2 resize-none focus:border-[#4F46E5]"
            ></textarea>

            <button
              type="submit"
              className="bg-[#4F46E5] text-white text-lg font-semibold rounded-md px-6 py-3 w-fit hover:bg-[#4F46E5] transition lg:w-fit"
            >
              Send Message
            </button>

            {status && <p className="text-center text-green-600">{status}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
