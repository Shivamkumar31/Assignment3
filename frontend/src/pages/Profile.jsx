// src/pages/Profile.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchUserDetails } from '../api/mockApi';
import LoadingSpinner from '../components/LoadingSpinner';

const Profile = () => {
  const { user } = useAuth(); // Get authenticated user's mock details
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // We use a fixed userId (1) for this mock setup, corresponding to the user data in jsonplaceholder
    const userId = user?.id || 1; 

    const getDetails = async () => {
      try {
        const data = await fetchUserDetails(userId);
        setUserDetails(data);
      } catch (err) {
        setError('Failed to fetch user details from API.');
      } finally {
        setLoading(false);
      }
    };
    getDetails();
  }, [user?.id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!userDetails) return <p className="text-gray-500 text-center">User details not available.</p>;

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-3">User Profile</h1>
      
      <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-8">
        {/* Avatar Section */}
        <div className="flex-shrink-0">
            <img
                className="w-24 h-24 rounded-full object-cover shadow-lg border-4 border-indigo-200"
                src={`https://ui-avatars.com/api/?name=${userDetails.name}&background=312e81&color=fff&bold=true&size=128`}
                alt="Profile Avatar"
            />
        </div>

        {/* Details Section */}
        <div className="flex-1 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <DetailItem label="Full Name" value={userDetails.name} />
            <DetailItem label="Username" value={userDetails.username} />
            <DetailItem label="Email" value={userDetails.email} />
            <DetailItem label="Phone" value={userDetails.phone || 'N/A'} />
            <DetailItem label="Website" value={userDetails.website || 'N/A'} />
            <DetailItem label="Company" value={userDetails.company?.name || 'N/A'} />
          </div>

          <div className="mt-6 border-t pt-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Address</h3>
            <p className="text-gray-600">
              {userDetails.address?.street}, {userDetails.address?.suite}
            </p>
            <p className="text-gray-600">
              {userDetails.address?.city}, {userDetails.address?.zipcode}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper component for cleaner detail display
const DetailItem = ({ label, value }) => (
    <div>
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="text-base font-semibold text-gray-900">{value}</p>
    </div>
);

export default Profile;