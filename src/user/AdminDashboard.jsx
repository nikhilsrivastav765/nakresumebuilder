  import React, { useEffect, useState } from "react";
  import { db, auth } from "../components/auth/firebaseConfig"; // Import auth for logout
  import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
  import { useNavigate } from "react-router-dom";
  import Swal from "sweetalert2";
  import { motion } from "framer-motion";

  import { FiLogOut } from "react-icons/fi"; // Import the logout icon
  import { signOut } from 'firebase/auth'; // Import the signOut function

  const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
      fetchUsers();
    }, []);

    const fetchUsers = async () => {
      setLoading(true);
      const usersCollection = collection(db, "users");
      const userSnapshot = await getDocs(usersCollection);
      const userList = userSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(userList);
      setLoading(false);
    };

    const handleRemoveUser = async (userId) => {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await deleteDoc(doc(db, "users", userId));
        await fetchUsers();
        Swal.fire("Deleted!", "User has been removed.", "success");
      }
    };

    const handleGivePremium = async (userId) => {
      await updateDoc(doc(db, "users", userId), { isPremium: true });
      await fetchUsers();
      Swal.fire("Updated!", "User is now Premium.", "success");
    };

    const handleTakePremium = async (userId) => {
      await updateDoc(doc(db, "users", userId), { isPremium: false });
      await fetchUsers();
      Swal.fire("Updated!", "User's premium removed.", "success");
    };

    const handleViewUserDetails = (user) => {
      Swal.fire({
        title: `${user.name}'s Details`,
        html: `
          <p><strong>Email:</strong> ${user.email}</p>
          <p><strong>Premium:</strong> ${user.isPremium ? "Yes" : "No"}</p>
        `,
        icon: "info",
      });
    };

    const handleLogout = async () => {
      try {
        await signOut(auth);
        navigate('/'); // Redirect to the landing page after logout
      } catch (error) {
        Swal.fire({
          title: 'Logout Error',
          text: 'Failed to log out. Please try again.',
          icon: 'error',
        });
        console.error("Logout Error:", error);
      }
    };

    return (
      <div className="min-h-screen p-8 bg-gradient-to-br from-gray-100 to-gray-200 relative"> {}
        <motion.h1
          className="text-4xl font-bold mb-8 text-center text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Admin Dashboard
        </motion.h1>

        {}
        <button
          variant="outline"
          onClick={handleLogout}
          className="absolute top-4 right-4 bg-red-500/20 text-red-400 hover:bg-red-500/30 hover:text-red-300 transition-colors duration-200 flex items-center gap-2 z-10" // Added z-index
        >
          <FiLogOut className="w-4 h-4" />
          Logout
        </button>

        <div className="bg-white shadow-2xl rounded-2xl p-6 overflow-x-auto">
          <motion.h2
            className="text-2xl font-semibold mb-6 text-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            All Users
          </motion.h2>

          {loading ? (
            <p className="text-center py-10 text-lg text-gray-600">Loading users...</p>
          ) : (
            <motion.table
              className="min-w-full table-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-6 py-3 border-b text-left text-gray-600 font-semibold">Email</th>
                  <th className="px-6 py-3 border-b text-left text-gray-600 font-semibold">Name</th>
                  <th className="px-6 py-3 border-b text-left text-gray-600 font-semibold">Premium</th>
                  <th className="px-6 py-3 border-b text-center text-gray-600 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <motion.tr
                    key={user.id}
                    className="hover:bg-gray-50 transition"
                    whileHover={{ scale: 1.01 }}
                  >
                    <td className="border-b px-6 py-4">{user.email}</td>
                    <td className="border-b px-6 py-4">{user.name}</td>
                    <td className="border-b px-6 py-4">{user.isPremium ? "Yes" : "No"}</td>
                    <td className="border-b px-6 py-4 flex flex-col gap-2 items-center">
                      <button
                        onClick={() => handleViewUserDetails(user)}
                        className="bg-blue-500 text-white text-xs px-4 py-2 rounded-full hover:bg-blue-600 transition"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => handleGivePremium(user.id)}
                        className="bg-green-500 text-white text-xs px-4 py-2 rounded-full hover:bg-green-600 transition"
                      >
                        Give Premium
                      </button>
                      <button
                        onClick={() => handleTakePremium(user.id)}
                        className="bg-yellow-400 text-white text-xs px-4 py-2 rounded-full hover:bg-yellow-500 transition"
                      >
                        Take Premium
                      </button>
                      <button
                        onClick={() => handleRemoveUser(user.id)}
                        className="bg-red-500 text-white text-xs px-4 py-2 rounded-full hover:bg-red-600 transition"
                      >
                        Remove User
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </motion.table>
          )}
        </div>
      </div>
    );
  };

  export default AdminDashboard;
