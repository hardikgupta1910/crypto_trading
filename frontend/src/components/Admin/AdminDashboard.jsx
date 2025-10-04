import React, { useEffect, useState } from "react";
import api from "@/config/api"; // Your configured axios instance

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // This function will fetch the list of users from your secure endpoint
    const fetchAllUsers = async () => {
      try {
        const { data } = await api.get("/api/admin/users", {
          headers: {
            // We must include the JWT to prove we are an authenticated user
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        });
        setUsers(data);
      } catch (error) {
        // If the user is not an admin, the backend will return a 403 error here
        setError("You do not have permission to view this data.");
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllUsers();
  }, []); // The empty array [] means this effect runs once when the component mounts

  if (loading) {
    return <div>Loading users...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-5">Admin Dashboard: All Users</h1>
      <div className="h-[calc(100vh-15rem)] overflow-y-auto pr-4 custom-scrollbar">
        <table className="min-w-full bg-neutral-800 border-collapse table-fixed">
          <thead>
            <tr className="sticky top-0 bg-neutral-900">
              <th className="py-2 px-4 border-b text-center">ID</th>
              <th className="py-2 px-4 border-b text-left">Full Name</th>
              <th className="py-2 px-4 border-b text-left">Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="py-2 px-4 border-b text-center">{user.id}</td>
                <td className="py-2 px-4 border-b  text-left">
                  {user.fullName}
                </td>
                <td className="py-2 px-4 border-b text-left">{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
