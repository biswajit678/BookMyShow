import { Camera, Mail, User } from "lucide-react";
import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";

const ProfilePage = () => {
  const { authUser, updateProfile, isUpdatingProfile } = useAuthStore();
  const [selectedImage, setSelectedImage] = useState();

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImage(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800">Profile</h1>
            <p className="mt-2 text-gray-500">
              Manage your profile information and settings
            </p>
          </div>

          {/* Profile Upload */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative group">
              <img
                src={
                  selectedImage ||
                  authUser?.profilePic ||
                  "https://i.pinimg.com/originals/e3/4d/be/e34dbeca8a484c2d488db96eaaef09df.jpg"
                }
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-2 border-gray-200 shadow-md"
              />
              <label
                htmlFor="avatar-upload"
                className={`absolute bottom-2 right-2 bg-gray-200 p-2 rounded-full cursor-pointer shadow-md transition-transform duration-200 ${
                  isUpdatingProfile
                    ? "animate-pulse pointer-events-none"
                    : "hover:scale-105"
                }`}
              >
                <Camera className="w-5 h-5 text-gray-700" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-gray-500">
              {isUpdatingProfile
                ? "Uploading..."
                : "Click the camera icon to update your photo"}
            </p>
          </div>

          {/* User Info */}
          <div className="space-y-6">
            <div>
              <div className="text-sm text-gray-500 flex items-center gap-2 mb-1">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <p className="px-4 py-3 bg-gray-50 rounded-lg border text-gray-800 font-medium shadow-sm">
                {authUser?.fullName}
              </p>
            </div>

            <div>
              <div className="text-sm text-gray-500 flex items-center gap-2 mb-1">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-4 py-3 bg-gray-50 rounded-lg border text-gray-800 font-medium shadow-sm">
                {authUser?.email}
              </p>
            </div>
          </div>

          {/* Account Info */}
          <div className="bg-gray-50 rounded-xl p-6 border shadow-sm">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Account Information
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Member Since</span>
                <span className="font-medium text-gray-800">
                  {authUser?.createdAt?.split("T")[0]}
                </span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-600">Account Status</span>
                <span className="font-medium text-green-600">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
