import React, { useState, useEffect } from 'react';
import { auth } from '../components/auth/firebaseConfig'; // import Firebase auth
import { onAuthStateChanged, signOut } from 'firebase/auth'; // also import signOut
import { useNavigate } from 'react-router-dom'; // for redirect after logout

const Dashboard = () => {
  const [step, setStep] = useState(1);
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // initialize navigate

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/'); // Redirect after logout
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const sidebarItems = ['My Profile', 'Logout'];

  return (
    <div className="min-h-screen bg-gradient-to-r flex font-sans mt-16">
      {/* Sidebar */}
      <div className="w-1/4 bg-[#4F46E5] shadow-md p-6 rounded-r-3xl">
        <h2 className="text-2xl font-semibold text-white mb-6">NAKres.builder</h2>
        <ul className="space-y-6">
          {sidebarItems.map((item, index) => (
            <li
              key={index}
              onClick={() => setStep(index + 1)}
              className={`cursor-pointer px-3 py-2 rounded-lg text-lg ${
                step === index + 1
                  ? 'bg-white text-[#4F46E5] font-semibold'
                  : 'text-white hover:text-black'
              }`}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Content */}
      <div className="flex-1 p-10">
        {/* My Profile Section */}
        {step === 1 && (
          <div>
            <h3 className="text-2xl font-semibold mb-6">My Profile</h3>

            {user ? (
              <form className="grid grid-cols-2 gap-6 bg-white p-8 rounded-xl shadow-md">
                <div className="col-span-2">
                  <label className="block mb-1 text-gray-600">Email</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 p-2 rounded"
                    value={user.email}
                    readOnly
                  />
                </div>

                <div className="col-span-2">
                  <label className="block mb-1 text-gray-600">Display Name</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 p-2 rounded"
                    value={user.displayName || 'N/A'}
                    readOnly
                  />
                </div>
              </form>
            ) : (
              <p className="text-gray-500">Loading user data...</p>
            )}
          </div>
        )}

        {/* Logout Section */}
        {step === 2 && (
          <div className="flex flex-col items-center justify-center h-full">
            <h3 className="text-2xl font-semibold mb-4">Logout</h3>
            <p className="text-gray-600 mb-6 text-lg">
              Do you really want to logout from your account?
            </p>
            <button
              onClick={handleLogout}
              className="bg-[#4F46E5] hover:bg-[#3b36b5] text-white font-semibold py-2 px-6 rounded-lg shadow-md"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
