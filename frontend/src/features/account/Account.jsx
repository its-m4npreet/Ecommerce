import React, { useState } from "react";
import {
  FaUserEdit,
  FaUser,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClipboardList,
  FaCreditCard,
  FaGift,
  FaSignOutAlt,
  FaPaypal,
  FaCheck,
} from "react-icons/fa";
import { MdEdit, MdOutlinePassword, MdManageAccounts } from "react-icons/md";
import { NavLink } from "react-router-dom";
import "./account.css";

export const Account = () => {
  const [activeSection, setActiveSection] = useState("personal");
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  const [userError, setUserError] = useState(null);
  const [emailCopied, setEmailCopied] = useState(false);
  const [sidebarAvatarModal, setSidebarAvatarModal] = useState({
    isOpen: false,
    type: "",
    data: "",
  });

  // Avatar modal functions
  const openSidebarAvatarModal = () => {
    setSidebarAvatarModal({
      isOpen: true,
      type: "avatarUpload",
      data: user?.avatar || "",
    });
  };

  const closeSidebarAvatarModal = () => {
    setSidebarAvatarModal({ isOpen: false, type: "", data: "" });
  };

  const handleSidebarAvatarSave = async (newAvatarData) => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const userId = storedUser._id || storedUser.id;

      const response = await fetch(
        `https://ecommerce-agqj.onrender.com/api/users/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            avatar: newAvatarData,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update avatar");
      }

      const updatedUser = await response.json();

      // Update localStorage with new data
      localStorage.setItem("user", JSON.stringify(updatedUser));

      // Update user state
      setUser(updatedUser);

      closeSidebarAvatarModal();
      alert("Avatar updated successfully!");
    } catch (error) {
      console.error("Error updating avatar:", error);
      alert("Failed to update avatar. Please try again.");
    }
  };

  // Copy email to clipboard function
  const copyEmailToClipboard = async (email) => {
    if (!email || email === "Email not provided") {
      alert("No email to copy");
      return;
    }

    try {
      await navigator.clipboard.writeText(email);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000); // Reset after 2 seconds
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = email;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand("copy");
        setEmailCopied(true);
        setTimeout(() => setEmailCopied(false), 2000); // Reset after 2 seconds
      } catch {
        alert("Failed to copy email");
      }
      document.body.removeChild(textArea);
    }
  };

  // Fetch user data from backend
  React.useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const token = localStorage.getItem("token") || localStorage.getItem("authToken");
        
        if (!storedUser || (!storedUser._id && !storedUser.id) || !token) {
          // No user data or token in localStorage - clear everything and redirect to home
          localStorage.removeItem("user");
          localStorage.removeItem("authToken");
          localStorage.removeItem("token");
          localStorage.removeItem("trolley");
          localStorage.removeItem("trolleyDetails");
          localStorage.removeItem("selectedDeliveryAddress");
          window.dispatchEvent(new Event("userLoggedOut"));
          window.location.href = "/";
          return;
        }

        const userId = storedUser._id || storedUser.id;
        const response = await fetch(
          `https://ecommerce-agqj.onrender.com/api/users/${userId}`
        );

        if (!response.ok) {
          if (response.status === 404) {
            // User not found in database - clear everything and redirect to home
            localStorage.removeItem("user");
            localStorage.removeItem("authToken");
            localStorage.removeItem("token");
            localStorage.removeItem("trolley");
            localStorage.removeItem("trolleyDetails");
            localStorage.removeItem("selectedDeliveryAddress");
            window.dispatchEvent(new Event("userLoggedOut"));
            window.location.href = "/";
            return;
          }
          throw new Error("Failed to fetch user data");
        }

        const userData = await response.json();
        setUser(userData);
        setUserLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        // On any error, clear everything and redirect to home
        localStorage.removeItem("user");
        localStorage.removeItem("authToken");
        localStorage.removeItem("token");
        localStorage.removeItem("trolley");
        localStorage.removeItem("trolleyDetails");
        localStorage.removeItem("selectedDeliveryAddress");
        setUserError("Failed to load user data. Redirecting to home...");
        window.dispatchEvent(new Event("userLoggedOut"));
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
        setUserLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Check if we should navigate to orders section (from payment success)
  React.useEffect(() => {
    const targetSection = localStorage.getItem("accountSection");
    if (targetSection) {
      setActiveSection(targetSection);
      localStorage.removeItem("accountSection"); // Clean up
    }
  }, []);

  // Listen for storage changes and user logout events
  React.useEffect(() => {
    const handleStorageChange = () => {
      const storedUser = localStorage.getItem("user");
      const token = localStorage.getItem("token") || localStorage.getItem("authToken");
      
      if (!storedUser || !token) {
        // User data removed from localStorage - redirect to home
        console.log("User session ended, redirecting to home...");
        window.location.href = "/";
      }
    };

    const handleUserLoggedOut = () => {
      console.log("User logged out event received, redirecting to home...");
      window.location.href = "/";
    };

    // Listen for storage changes (from other tabs) and logout events
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('userLoggedOut', handleUserLoggedOut);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('userLoggedOut', handleUserLoggedOut);
    };
  }, []);

  return (
    <div className="bg-[#18181b] flex flex-col items-center py-4 md:py-10 px-2 md:px-4 min-h-screen">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-4 md:gap-8">
        {/* Sidebar */}
        <div className="bg-[#18181b] border-gray-700 rounded-2xl p-4 md:p-8 flex flex-col items-center w-full lg:min-w-[300px] lg:max-w-xs lg:border-r lg:border-gray-600 lg:rounded-r-none">
          {userLoading ? (
            <div className="text-gray-400 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mx-auto mb-2"></div>
              Loading user data...
            </div>
          ) : userError ? (
            <div className="text-red-400 text-center">
              <div className="mb-2">⚠️</div>
              {userError}
            </div>
          ) : user ? (
            <>
              <div className="mb-4 relative">
                <img
                  src={
                    user.avatar ||
                    "https://via.placeholder.com/112?text=No+Image"
                  }
                  alt="avatar"
                  className="w-20 h-20 md:w-28 md:h-28 rounded-full object-cover border-1 border-blue-400"
                />
                <span
                  onClick={openSidebarAvatarModal}
                  className="absolute bottom-1 right-1 bg-[#232326] hover:bg-[#2c2c2e] text-white rounded-full p-1 md:p-1.5 shadow-lg transition-colors z-10 cursor-pointer"
                  title="Change Avatar"
                >
                  <MdEdit className="w-4 h-4 md:w-5 md:h-5" />
                </span>
              </div>
              <div className="text-white text-base md:text-lg font-semibold mb-1 text-center lg:text-left">
                {user.name || "Name not provided"}
              </div>
              <div className="text-gray-300 text-xs md:text-sm flex items-center justify-center lg:justify-start gap-2 mb-4 md:mb-6">
                <span className="truncate max-w-[200px] md:max-w-none">{user.email || "Email not provided"}</span>
                {emailCopied ? (
                  <FaCheck
                    className="text-xs text-green-400 transition-colors flex-shrink-0"
                    title="Email copied!"
                  />
                ) : (
                  <FaClipboardList
                    className="text-xs cursor-pointer hover:text-blue-400 transition-colors flex-shrink-0"
                    title="Copy email"
                    onClick={() => copyEmailToClipboard(user.email)}
                  />
                )}
              </div>
            </>
          ) : (
            <div className="text-gray-400">Redirecting to login...</div>
          )}
          {/* Desktop Simple Navigation */}
          <nav className="hidden lg:flex flex-col gap-3 w-full">
            {/* Personal Info Section */}
            <button
              onClick={() => setActiveSection("personal")}
              className={`w-full flex items-center gap-3 px-5 py-4 text-left transition-all duration-200 rounded-xl ${
                activeSection === "personal" 
                  ? "bg-cyan-400/20 text-cyan-400 border border-cyan-400/50" 
                  : "bg-white/5 border border-gray-700 text-gray-300 hover:bg-gray-800/30"
              }`}
            >
              <FaUser className={`text-xl ${activeSection === "personal" ? "text-cyan-400" : "text-gray-400"}`} />
              <span className="font-semibold text-xl">Personal Info</span>
            </button>

            {/* Payment Methods Section */}
            <button
              onClick={() => setActiveSection("billing")}
              className={`w-full flex items-center gap-3 px-5 py-4 text-left transition-all duration-200 rounded-xl ${
                activeSection === "billing" 
                  ? "bg-cyan-400/20 text-cyan-400 border border-cyan-400/50" 
                  : "bg-white/5 border border-gray-700 text-gray-300 hover:bg-gray-800/30"
              }`}
            >
              <FaCreditCard className={`text-xl ${activeSection === "billing" ? "text-cyan-400" : "text-gray-400"}`} />
              <span className="font-semibold text-xl">Payment Methods</span>
            </button>

            {/* Order History Section */}
            <button
              onClick={() => setActiveSection("orders")}
              className={`w-full flex items-center gap-3 px-5 py-4 text-left transition-all duration-200 rounded-xl ${
                activeSection === "orders" 
                  ? "bg-cyan-400/20 text-cyan-400 border border-cyan-400/50" 
                  : "bg-white/5 border border-gray-700 text-gray-300 hover:bg-gray-800/30"
              }`}
            >
              <FaClipboardList className={`text-xl ${activeSection === "orders" ? "text-cyan-400" : "text-gray-400"}`} />
              <span className="font-semibold text-xl">Order History</span>
            </button>
          </nav>

          {/* Mobile FAQ-Style Navigation */}
          <div className="lg:hidden w-full space-y-2">
            {/* Personal Info Section */}
            <div className="bg-white/5 border border-gray-700 rounded-xl overflow-hidden backdrop-blur-sm">
              <button
                onClick={() => setActiveSection(activeSection === "personal" ? "" : "personal")}
                className={`w-full flex items-center justify-between px-4 py-4 text-left transition-all duration-200 ${
                  activeSection === "personal" 
                    ? "bg-cyan-400/10 text-cyan-400" 
                    : "text-gray-300 hover:bg-gray-800/30"
                }`}
              >
                <div className="flex items-center gap-3">
                  <FaUser className={`text-lg ${activeSection === "personal" ? "text-cyan-400" : "text-gray-400"}`} />
                  <span className="font-medium">Personal Info</span>
                </div>
                <svg 
                  className={`w-5 h-5 transition-transform duration-300 ${
                    activeSection === "personal" ? 'rotate-180 text-cyan-400' : 'text-gray-400'
                  }`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

            </div>

            {/* Payment Section */}
            <div className="bg-white/5 border border-gray-700 rounded-xl overflow-hidden backdrop-blur-sm">
              <button
                onClick={() => setActiveSection(activeSection === "billing" ? "" : "billing")}
                className={`w-full flex items-center justify-between px-4 py-4 text-left transition-all duration-200 ${
                  activeSection === "billing" 
                    ? "bg-cyan-400/10 text-cyan-400" 
                    : "text-gray-300 hover:bg-gray-800/30"
                }`}
              >
                <div className="flex items-center gap-3">
                  <FaCreditCard className={`text-lg ${activeSection === "billing" ? "text-cyan-400" : "text-gray-400"}`} />
                  <span className="font-medium">Payment Methods</span>
                </div>
                <svg 
                  className={`w-5 h-5 transition-transform duration-300 ${
                    activeSection === "billing" ? 'rotate-180 text-cyan-400' : 'text-gray-400'
                  }`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

            </div>

            {/* Orders Section */}
            <div className="bg-white/5 border border-gray-700 rounded-xl overflow-hidden backdrop-blur-sm">
              <button
                onClick={() => setActiveSection(activeSection === "orders" ? "" : "orders")}
                className={`w-full flex items-center justify-between px-4 py-4 text-left transition-all duration-200 ${
                  activeSection === "orders" 
                    ? "bg-cyan-400/10 text-cyan-400" 
                    : "text-gray-300 hover:bg-gray-800/30"
                }`}
              >
                <div className="flex items-center gap-3">
                  <FaClipboardList className={`text-lg ${activeSection === "orders" ? "text-cyan-400" : "text-gray-400"}`} />
                  <span className="font-medium">Order History</span>
                </div>
                <svg 
                  className={`w-5 h-5 transition-transform duration-300 ${
                    activeSection === "orders" ? 'rotate-180 text-cyan-400' : 'text-gray-400'
                  }`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

            </div>
          </div>
        </div>
        
        {/* Main Content Area - Unified for both mobile and desktop */}
        <div className="flex-1 lg:block lg:bg-[#18181b]">
          {!activeSection ? (
            // Welcome Message when no section is active
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-2">👋</div>
                <h2 className="text-2xl font-semibold text-white mb-2">Welcome to Your Account</h2>
                <p className="text-gray-400">Select a section from the sidebar to get started</p>
              </div>
            </div>
          ) : (
            // Active Section Content
            <div className="bg-[#18181b] border-gray-700 rounded-2xl p-4 md:p-8 lg:bg-transparent lg:border-0 lg:rounded-none">
              {activeSection === "personal" && (
                <PersonalInfo user={user} onUserUpdate={setUser} />
              )}
              {activeSection === "billing" && (
                <PaymentMethods user={user} />
              )}
              {activeSection === "orders" && (
                <OrdersHistory />
              )}
            </div>
          )}
        </div>
      </div>

      {/* Sidebar Avatar Edit Modal */}
      {sidebarAvatarModal.isOpen && (
        <EditModal
          type={sidebarAvatarModal.type}
          currentData={sidebarAvatarModal.data}
          onSave={handleSidebarAvatarSave}
          onClose={closeSidebarAvatarModal}
        />
      )}
    </div>
  );
};

const PersonalInfo = ({ user, onUserUpdate }) => {
  const [editModal, setEditModal] = React.useState({
    isOpen: false,
    type: "",
    data: "",
  });
  const [userData, setUserData] = React.useState(user || {});
  const [hasChanges, setHasChanges] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);

  // Update userData when user prop changes
  React.useEffect(() => {
    setUserData(user || {});
    setHasChanges(false);
  }, [user]);

  const openEditModal = (type, currentData) => {
    setEditModal({ isOpen: true, type, data: currentData });
  };

  const closeEditModal = () => {
    setEditModal({ isOpen: false, type: "", data: "" });
  };

  const handleSave = (newData) => {
    setUserData((prev) => ({ ...prev, [editModal.type]: newData }));
    setHasChanges(true);
    closeEditModal();
  };

  const saveToBackend = async () => {
    if (!hasChanges) return;

    setIsSaving(true);
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const userId = storedUser._id || storedUser.id;

      const response = await fetch(
        `https://ecommerce-agqj.onrender.com/api/users/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: userData.name,
            address: userData.address,
            phoneNumber: userData.phoneNumber,
            country: userData.country,
            dob: userData.dob,
            avatar: userData.avatar,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update user data");
      }

      const updatedUser = await response.json();

      // Update localStorage with new data
      localStorage.setItem("user", JSON.stringify(updatedUser));

      // Update local state to reflect backend changes
      setUserData(updatedUser);
      setHasChanges(false);

      // Update parent component's user state
      if (onUserUpdate) {
        onUserUpdate(updatedUser);
      }

      alert("Personal information updated successfully!");
    } catch (error) {
      console.error("Error updating user data:", error);
      alert("Failed to update personal information. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
        <h2 className="text-xl md:text-2xl font-semibold text-white">
          Personal Information
        </h2>
        {hasChanges && (
          <button
            onClick={saveToBackend}
            disabled={isSaving}
            className={`px-4 md:px-6 py-2 rounded-lg font-medium transition-colors text-sm md:text-base ${
              isSaving
                ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        )}
      </div>
      <p className="text-gray-400 mb-6 md:mb-8 text-sm md:text-base">
        Manage your personal information, including phone numbers and email
        address where you can be connected
      </p>

      {/* Avatar Section - Separate from grid */}
      {/* <div className="flex justify-center mb-8">
				<div className="relative">
					<img 
						src={userData.avatar || 'https://via.placeholder.com/120?text=No+Image'} 
						alt="profile avatar" 
						className="w-32 h-32 rounded-full object-cover border-4 border-blue-400" 
					/>
					<button
						onClick={() => openEditModal('avatarUpload', userData.avatar || '')}
						className="absolute bottom-2 right-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 shadow-lg transition-colors"
						title="Change Avatar"
					>
						<MdEdit className="w-4 h-4" />
					</button>
				</div>
			</div> */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Name */}
        <div className="relative min-h-[110px] md:min-h-[130px] bg-[#232326] rounded-xl p-4 md:p-6 flex flex-col gap-2 shadow border border-gray-700 transition-all duration-300 hover:shadow-xl hover:border-gray-600 hover:bg-[#2a2a2d] group cursor-pointer">
          <div
            className="absolute top-2 right-2 text-gray-400 rounded-full p-2 transition-all duration-200 hover:bg-blue-600/20 hover:text-blue-400 hover:scale-110 active:scale-95 group-hover:opacity-100 opacity-70"
            title="Edit Name"
            onClick={() => openEditModal("name", userData.name)}
          >
            <MdEdit />
          </div>
          <div className="flex items-center gap-2 text-gray-400 text-xs md:text-sm mb-1 transition-colors group-hover:text-gray-300">
            <FaUser />
            Name
          </div>
          <div className="text-white text-base md:text-lg font-semibold group-hover:text-blue-100 transition-colors break-words">
            {userData.name || "Name not provided"}
          </div>
        </div>

        {/* Email (Read-only) */}
        <div className="relative min-h-[110px] md:min-h-[130px] bg-[#232326] rounded-xl p-4 md:p-6 flex flex-col gap-2 shadow border border-gray-700 transition-all duration-300 hover:shadow-lg hover:border-gray-600 hover:bg-[#2a2a2d] group">
          <div className="flex items-center gap-2 text-gray-400 text-xs md:text-sm mb-1 transition-colors group-hover:text-gray-300">
            <FaEnvelope />
            Email
          </div>
          <div className="text-white text-base md:text-lg font-semibold group-hover:text-blue-100 transition-colors break-all">
            {userData.email || "Email not provided"}
          </div>
          <div className="text-xs text-gray-500 mt-auto group-hover:text-gray-400 transition-colors">
            Email cannot be changed
          </div>
        </div>

        {/* Address */}
        <div className="relative min-h-[110px] md:min-h-[130px] bg-[#232326] rounded-xl p-4 md:p-6 flex flex-col gap-2 shadow border border-gray-700 transition-all duration-300 hover:shadow-xl hover:border-gray-600 hover:bg-[#2a2a2d] group cursor-pointer">
          <div
            className="absolute top-2 right-2 text-gray-400 rounded-full p-1.5 md:p-2 transition-all duration-200 hover:bg-blue-600/20 hover:text-blue-400 hover:scale-110 active:scale-95 group-hover:opacity-100 opacity-70"
            title="Edit Address"
            onClick={() => openEditModal("address", 
              userData.addresses && userData.addresses.length > 0 
                ? userData.addresses[0].address 
                : userData.address || ""
            )}
          >
            <MdEdit className="w-4 h-4 md:w-5 md:h-5" />
          </div>
          <div className="flex items-center gap-2 text-gray-400 text-xs md:text-sm mb-1 transition-colors group-hover:text-gray-300">
            <FaMapMarkerAlt />
            Address
          </div>
          <div className="text-white text-base md:text-lg font-semibold group-hover:text-blue-100 transition-colors break-words line-clamp-2">
            {userData.addresses && userData.addresses.length > 0 
              ? userData.addresses[0].address 
              : userData.address || "Address not provided"}
          </div>
          {userData.addresses && userData.addresses.length > 1 && (
            <div className="text-xs text-blue-400 mt-1 group-hover:text-blue-300 ">
              +{userData.addresses.length - 1} more address{userData.addresses.length > 2 ? 'es' : ''}
            </div>
          )}
        </div>

        {/* Phone Number */}
        <div className="relative min-h-[110px] md:min-h-[130px] bg-[#232326] rounded-xl p-4 md:p-6 flex flex-col gap-2 shadow border border-gray-700 transition-all duration-300 hover:shadow-xl hover:border-gray-600 hover:bg-[#2a2a2d] group cursor-pointer">
          <div
            className="absolute top-2 right-2 text-gray-400 rounded-full p-1.5 md:p-2 transition-all duration-200 hover:bg-blue-600/20 hover:text-blue-400 hover:scale-110 active:scale-95 group-hover:opacity-100 opacity-70"
            title="Edit Phone"
            onClick={() =>
              openEditModal("phoneNumber", userData.phoneNumber || "")
            }
          >
            <MdEdit className="w-4 h-4 md:w-5 md:h-5" />
          </div>
          <div className="flex items-center gap-2 text-gray-400 text-xs md:text-sm mb-1 transition-colors group-hover:text-gray-300">
            📱 Phone
          </div>
          <div className="text-white text-base md:text-lg font-semibold group-hover:text-blue-100 transition-colors break-words">
            {userData.phoneNumber || "Phone not provided"}
          </div>
        </div>

        {/* Password */}
        <div className="relative min-h-[110px] md:min-h-[130px] bg-[#232326] rounded-xl p-4 md:p-6 flex flex-col gap-2 shadow border border-gray-700 transition-all duration-300 hover:shadow-xl hover:border-gray-600 hover:bg-[#2a2a2d] group cursor-pointer">
          <div
            className="absolute top-2 right-2 text-gray-400 rounded-full p-1.5 md:p-2 transition-all duration-200 hover:bg-yellow-600/20 hover:text-yellow-400 hover:scale-110 active:scale-95 group-hover:opacity-100 opacity-70"
            title="Change Password"
            onClick={() => openEditModal("password", "")}
          >
            <MdEdit className="w-4 h-4 md:w-5 md:h-5" />
          </div>
          <div className="flex items-center gap-2 text-gray-400 text-xs md:text-sm mb-1 transition-colors group-hover:text-gray-300">
            <MdOutlinePassword />
            Password
          </div>
          <div className="text-white text-base md:text-lg font-semibold group-hover:text-blue-100 transition-colors">••••••••</div>
        </div>

        {/* Sign Out */}
        <div className="relative min-h-[110px] md:min-h-[130px] bg-[#232326] rounded-xl p-4 md:p-6 flex flex-col gap-2 shadow border border-gray-700 transition-all duration-300 hover:shadow-xl hover:border-red-600/50 hover:bg-red-900/10 group cursor-pointer">
          <div
            className="absolute top-2 right-2 text-gray-400 rounded-full p-1.5 md:p-2 shadow transition-all duration-200 hover:bg-red-600/20 hover:text-red-400 hover:scale-110 active:scale-95 group-hover:opacity-100 opacity-70"
            title="Sign Out"
            onClick={() => openEditModal("signout", "")}
          >
            <FaSignOutAlt className="w-4 h-4 md:w-5 md:h-5" />
          </div>
          <div className="flex items-center gap-2 text-gray-400 text-xs md:text-sm mb-1 transition-colors group-hover:text-red-300">
            <FaSignOutAlt />
            Sign Out
          </div>
          <div className="text-white text-base md:text-lg font-semibold group-hover:text-red-200 transition-colors">
            logout from account
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editModal.isOpen && (
        <EditModal
          type={editModal.type}
          currentData={editModal.data}
          onSave={handleSave}
          onClose={closeEditModal}
        />
      )}
    </div>
  );
};

const PaymentMethods = ({ user }) => {
  const [editModal, setEditModal] = React.useState({
    isOpen: false,
    type: "",
    data: "",
  });
  const [paymentData, setPaymentData] = React.useState({
    creditCard: user?.creditCard || "",
    upiId: user?.upiId || "",
    cardHolderName: user?.cardHolderName || "",
    expiryDate: user?.expiryDate || "",
  });
  const [hasChanges, setHasChanges] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);

  // Update paymentData when user prop changes
  React.useEffect(() => {
    setPaymentData({
      creditCard: user?.creditCard || "",
      upiId: user?.upiId || "",
      cardHolderName: user?.cardHolderName || "",
      expiryDate: user?.expiryDate || "",
    });
    setHasChanges(false);
  }, [user]);

  const openEditModal = (type, currentData) => {
    setEditModal({ isOpen: true, type, data: currentData });
  };

  const closeEditModal = () => {
    setEditModal({ isOpen: false, type: "", data: "" });
  };

  const handleSave = (newData) => {
    if (editModal.type === "creditCardForm") {
      // Handle credit card form data
      setPaymentData((prev) => ({
        ...prev,
        creditCard: newData.creditCard,
        cardHolderName: newData.cardHolderName,
        expiryDate: newData.expiryDate,
      }));
    } else {
      // Handle single field updates
      setPaymentData((prev) => ({ ...prev, [editModal.type]: newData }));
    }
    setHasChanges(true);
    closeEditModal();
  };

  const saveToBackend = async () => {
    if (!hasChanges) return;

    setIsSaving(true);
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const userId = storedUser._id || storedUser.id;

      const response = await fetch(
        `https://ecommerce-agqj.onrender.com/api/users/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            creditCard: paymentData.creditCard,
            upiId: paymentData.upiId,
            cardHolderName: paymentData.cardHolderName,
            expiryDate: paymentData.expiryDate,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update payment information");
      }

      const updatedUser = await response.json();

      // Update localStorage with new data
      localStorage.setItem("user", JSON.stringify(updatedUser));

      // Update local state to reflect backend changes
      setPaymentData({
        creditCard: updatedUser.creditCard || "",
        upiId: updatedUser.upiId || "",
        cardHolderName: updatedUser.cardHolderName || "",
        expiryDate: updatedUser.expiryDate || "",
      });
      setHasChanges(false);
      alert("Payment information updated successfully!");
    } catch (error) {
      console.error("Error updating payment data:", error);
      alert("Failed to update payment information. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const maskCreditCard = (cardNumber) => {
    if (!cardNumber) return "Card not provided";
    const cleaned = cardNumber.replace(/\s/g, "");
    if (cleaned.length < 4) return cardNumber;
    return "**** **** **** " + cleaned.slice(-4);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
        <h2 className="text-xl md:text-2xl font-semibold text-white">Payment Methods</h2>
        {hasChanges && (
          <button
            onClick={saveToBackend}
            disabled={isSaving}
            className={`px-4 md:px-6 py-2 rounded-lg font-medium transition-colors text-sm md:text-base ${
              isSaving
                ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        )}
      </div>
      <p className="text-gray-400 mb-6 md:mb-8 text-sm md:text-base">
        Manage your payment methods for secure transactions
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Credit Card - Main Card */}
        <div className="relative min-h-[180px] md:min-h-[200px] bg-[#232326] rounded-xl p-4 md:p-6 flex flex-col justify-between shadow-lg border border-gray-600 cursor-pointer transition-all duration-300 hover:bg-gradient-to-br hover:from-[#2a2a2d] hover:to-[#232326] hover:shadow-2xl hover:border-blue-400/50 hover:scale-105 group transform">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-gray-400 text-xs md:text-sm mb-1 transition-colors group-hover:text-gray-300">
              <FaCreditCard className="text-lg md:text-xl text-blue-400 transition-all group-hover:text-blue-300 group-hover:scale-110" />
              <span className="font-medium text-white group-hover:text-blue-100 transition-colors">Credit Card</span>
            </div>
            <div className="text-gray-400 transition-all duration-200 hover:bg-blue-600/20 hover:text-blue-400 p-1.5 md:p-2 rounded-full hover:scale-110 active:scale-95">
              <MdEdit
                className="text-lg md:text-xl"
                onClick={() => openEditModal("creditCardForm", null)}
              />
            </div>
          </div>

          <div className="mb-4">
            <div className="text-white text-lg md:text-xl font-mono tracking-wider mb-3 group-hover:text-blue-100 transition-colors break-all">
              {maskCreditCard(paymentData.creditCard)}
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-2 sm:gap-0">
              <div className="flex-1">
                <div className="text-gray-400 text-xs uppercase tracking-wide mb-1 group-hover:text-gray-300 transition-colors">
                  Card Holder
                </div>
                <div className="text-white text-xs md:text-sm font-medium group-hover:text-blue-100 transition-colors break-words">
                  {paymentData.cardHolderName || "ADD CARD DETAILS"}
                </div>
              </div>
              <div className="flex-shrink-0">
                <div className="text-gray-400 text-xs uppercase tracking-wide mb-1 group-hover:text-gray-300 transition-colors">
                  Expires
                </div>
                <div className="text-white text-xs md:text-sm font-medium group-hover:text-blue-100 transition-colors">
                  {paymentData.expiryDate || "MM/YY"}
                </div>
              </div>
            </div>
          </div>

          {/* <div className="text-center">
						<div className="text-gray-400 text-sm">
							{paymentData.creditCard ? 'Click to edit card details' : 'Click to add card details'}
						</div>
					</div> */}
        </div>

        {/* UPI ID Card */}
        <div className="relative min-h-[180px] md:min-h-[200px] bg-[#232326] rounded-xl p-4 md:p-6 flex flex-col justify-between shadow-lg border border-gray-600 cursor-pointer transition-all duration-300 hover:bg-gradient-to-br hover:from-[#2a2a2d] hover:to-[#232326] hover:shadow-2xl hover:border-green-400/50 hover:scale-105 group transform">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-gray-400 text-xs md:text-sm mb-1 transition-colors group-hover:text-gray-300">
              <FaPaypal className="text-lg md:text-xl text-green-400 transition-all group-hover:text-green-300 group-hover:scale-110" />
              <span className="font-medium text-white group-hover:text-green-100 transition-colors">UPI Payment</span>
            </div>
            <div className="text-gray-400 transition-all duration-200 hover:bg-green-600/20 hover:text-green-400 p-1.5 md:p-2 rounded-full hover:scale-110 active:scale-95">
              <MdEdit
                className="text-lg md:text-xl"
                onClick={() => openEditModal("upiId", paymentData.upiId)}
              />
            </div>
          </div>

          <div className="mb-4">
            <div className="text-white text-lg md:text-xl font-mono tracking-wider mb-3 group-hover:text-green-100 transition-colors break-all">
              {paymentData.upiId || "user@upi"}
            </div>
            <div className="text-gray-400 text-xs md:text-sm group-hover:text-gray-300 transition-colors">
              {paymentData.upiId ? "UPI ID configured" : "Set up UPI payment"}
            </div>
          </div>

          {/* <div className="text-center">
						<div className="text-gray-400 text-sm">
							{paymentData.upiId ? 'Click to edit UPI ID' : 'Click to add UPI ID'}
						</div>
					</div> */}
        </div>
      </div>

      {/* Payment Edit Modal */}
      {editModal.isOpen && (
        <PaymentEditModal
          type={editModal.type}
          currentData={editModal.data}
          paymentData={paymentData}
          onSave={handleSave}
          onClose={closeEditModal}
        />
      )}
    </div>
  );
};

const OrdersHistory = () => {
  const [orders, setOrders] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [cancellingOrder, setCancellingOrder] = React.useState(null);

  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("Current user from localStorage:", user);

    if (!user || (!user._id && !user.id)) {
      setError("User not found. Please log in.");
      setLoading(false);
      return;
    }

    const userId = user._id || user.id;
    console.log("Fetching orders for userId:", userId);

    fetch(`https://ecommerce-agqj.onrender.com/api/orders/user/${userId}`)
      .then((res) => {
        console.log("Orders API response status:", res.status);
        if (!res.ok) throw new Error("Failed to fetch orders");
        return res.json();
      })
      .then((data) => {
        console.log("Orders fetched from backend:", data);
        // Debug: Log product data structure to understand image paths
        if (data.length > 0 && data[0].products?.length > 0) {
          console.log("Sample product data:", data[0].products[0]);
          console.log("Product image path:", data[0].products[0].product?.image);
        }
        setOrders(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) {
      return;
    }

    setCancellingOrder(orderId);

    try {
      const response = await fetch(
        `https://ecommerce-agqj.onrender.com/api/orders/${orderId}/cancel`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to cancel order");
      }

      // Update the local state
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: "cancelled" } : order
        )
      );

      alert("Order cancelled successfully!");
    } catch (error) {
      console.error("Error cancelling order:", error);
      alert("Failed to cancel order. Please try again.");
    } finally {
      setCancellingOrder(null);
    }
  };

  const canCancelOrder = (status) => {
    return ["confirmed", "processing"].includes(status.toLowerCase());
  };

  const getStatusColor = (status) => {
    const statusColors = {
      confirmed: "text-blue-400",
      processing: "text-yellow-400",
      shipped: "text-purple-400",
      delivered: "text-green-400",
      cancelled: "text-red-400",
    };
    return statusColors[status.toLowerCase()] || "text-gray-400";
  };

  return (
    <div>
      <h2 className="text-xl md:text-2xl font-semibold text-white mb-4">Order History</h2>
      {loading && <div className="text-gray-400 text-sm md:text-base">Loading orders...</div>}
      {error && <div className="text-red-400 text-sm md:text-base">{error}</div>}
      <div className="flex flex-col gap-4 md:gap-6">
        {orders.length === 0 && !loading && !error && (
          <div className="flex flex-col items-center justify-center py-16 px-6">
            <div className="text-6xl mb-6">🛒</div>
            <h3 className="text-2xl font-semibold text-white mb-4">
              No Orders Yet
            </h3>
            <p className="text-gray-400 text-center mb-8 max-w-md">
              You haven't placed any orders yet. Start shopping to see your
              order history here!
            </p>
            <NavLink
              to="/"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium transition-all duration-300 hover:bg-blue-700 hover:scale-105 hover:shadow-xl transform active:scale-95 focus:ring-4 focus:ring-blue-500/50"
            >
              Start Shopping
            </NavLink>
          </div>
        )}
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-[#232326] rounded-xl p-4 md:p-6 shadow border border-gray-700 transition-all duration-300 hover:shadow-2xl hover:border-gray-600 hover:bg-[#2a2a2d] hover:scale-[1.02] transform group"
          >
            {/* Order Header */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4 pb-3 border-b border-gray-600 group-hover:border-gray-500 transition-colors">
              <div className="flex-1">
                <div className="text-white font-semibold text-base md:text-lg mb-1 group-hover:text-blue-100 transition-colors">
                  Order #{order._id.slice(-8)}
                </div>
                <div className="text-gray-400 text-xs md:text-sm group-hover:text-gray-300 transition-colors">
                  Order Date:{" "}
                  {new Date(
                    order.createdAt || order.orderDate
                  ).toLocaleDateString()}
                </div>
                <div className="text-gray-400 text-xs md:text-sm group-hover:text-gray-300 transition-colors">
                  Status:{" "}
                  <span
                    className={`font-bold capitalize ${getStatusColor(
                      order.status
                    )} transition-all group-hover:scale-105`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
              <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2">
                <div>
                  <div className="text-gray-200 text-lg md:text-xl font-bold group-hover:text-green-300 transition-colors">
                    ₹{order.total?.toLocaleString()}
                  </div>
                  <div className="text-gray-500 text-xs md:text-sm group-hover:text-gray-400 transition-colors text-center sm:text-right">
                    {order.products.length} item
                    {order.products.length > 1 ? "s" : ""}
                  </div>
                </div>

                {/* Cancel Button */}
                <div className="flex flex-col gap-2">
                  {canCancelOrder(order.status) && (
                    <button
                      onClick={() => handleCancelOrder(order._id)}
                      disabled={cancellingOrder === order._id}
                      className={`px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-medium rounded-lg transition-all duration-200 transform whitespace-nowrap ${
                        cancellingOrder === order._id
                          ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                          : "bg-red-600 text-white hover:bg-red-700 hover:scale-105 hover:shadow-lg active:scale-95"
                      }`}
                    >
                      {cancellingOrder === order._id
                        ? "Cancelling..."
                        : "Cancel"}
                    </button>
                  )}

                  {order.status.toLowerCase() === "cancelled" && (
                    <span className="px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-medium text-red-400 bg-red-900/20 rounded-lg text-center">
                      Cancelled
                    </span>
                  )}

                  {["shipped", "delivered"].includes(
                    order.status.toLowerCase()
                  ) && (
                    <span className="px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-medium text-gray-400 bg-gray-700 rounded-lg text-center">
                      Cannot Cancel
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* All Products in Order */}
            <div className="space-y-2 md:space-y-3">
              {order.products.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 md:gap-4 p-2 md:p-3 bg-[#1a1a1d] rounded-lg transition-all duration-200 hover:bg-[#222225] hover:scale-[1.01] transform hover:shadow-md"
                >
                  <div className="w-14 h-14 md:w-16 md:h-16 flex-shrink-0 bg-gray-700 rounded-lg border border-gray-600 overflow-hidden shadow-sm">
                    <img
                      src={
                        // Try multiple image source formats
                        item.product?.image || 
                        item.product?.images?.[0] || 
                        item.image ||
                        (item.product?.image && !item.product.image.startsWith('http') 
                          ? `https://ecommerce-agqj.onrender.com${item.product.image.startsWith('/') ? item.product.image : '/' + item.product.image}` 
                          : item.product?.image
                        ) ||
                        "https://via.placeholder.com/60?text=No+Image"
                      }
                      alt={item.product?.title || "Product"}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.log("Image load failed for:", item.product?.title, "- URL:", e.target.src);
                        // Try different fallbacks
                        if (e.target.src.includes('localhost:8080')) {
                          e.target.src = item.product?.image || "https://via.placeholder.com/60?text=No+Image";
                        } else if (!e.target.src.includes('placeholder')) {
                          e.target.src = "https://via.placeholder.com/60?text=No+Image";
                        }
                      }}
                      onLoad={() => {
                        console.log("Image loaded successfully for:", item.product?.title);
                      }}
                      loading="lazy"
                      crossOrigin="anonymous"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-white font-medium text-sm md:text-base mb-1 truncate">
                      {item.product?.title || "Product"}
                    </div>
                    <div className="text-gray-400 text-xs md:text-sm mb-1">
                      Category: {item.product?.category || "N/A"}
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                      <span className="text-gray-400 text-xs md:text-sm">
                        Qty: {item.quantity}
                      </span>
                      <span className="text-gray-200 font-semibold text-sm md:text-base">
                        ₹{item.price?.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Edit Modal Component
const EditModal = ({ type, currentData, onSave, onClose }) => {
  const [formData, setFormData] = React.useState({
    value: currentData || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [previewUrl, setPreviewUrl] = React.useState(currentData || "");

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }

      setSelectedFile(file);

      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePasswordChange = async () => {
    try {
      setIsSubmitting(true);

      const storedUser = JSON.parse(localStorage.getItem("user"));
      const userId = storedUser._id || storedUser.id;

      const response = await fetch(
        `https://ecommerce-agqj.onrender.com/api/users/${userId}/password`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            currentPassword: formData.currentPassword,
            newPassword: formData.newPassword,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to change password");
      }

      alert("Password changed successfully!");
      onClose();
    } catch (error) {
      console.error("Error changing password:", error);
      alert(error.message || "Failed to change password. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (type === "password") {
      if (!formData.currentPassword || !formData.newPassword) {
        alert("Please fill in all password fields");
        return;
      }
      if (formData.newPassword !== formData.confirmPassword) {
        alert("New passwords do not match");
        return;
      }
      if (formData.newPassword.length < 8) {
        alert("New password must be at least 8 characters long");
        return;
      }
      handlePasswordChange();
    } else if (type === "avatarUpload") {
      if (!selectedFile) {
        alert("Please select an image file");
        return;
      }

      setIsSubmitting(true);
      try {
        // Convert file to base64 for simple storage
        const reader = new FileReader();
        reader.onload = (e) => {
          const base64String = e.target.result;
          onSave(base64String);
          setIsSubmitting(false);
        };
        reader.onerror = () => {
          alert("Failed to process image");
          setIsSubmitting(false);
        };
        reader.readAsDataURL(selectedFile);
      } catch (error) {
        console.error("Error processing file:", error);
        alert("Failed to process image");
        setIsSubmitting(false);
      }
    } else if (type === "signout") {
      // Handle sign out
      if (window.confirm("Are you sure you want to sign out?")) {
        // Clear user data from localStorage
        localStorage.removeItem("user");
        localStorage.removeItem("authToken");
        localStorage.removeItem("token");
        localStorage.removeItem("trolley");
        localStorage.removeItem("trolleyDetails");
        localStorage.removeItem("selectedDeliveryAddress");

        // Dispatch custom event to update navbar
        window.dispatchEvent(new Event("userLoggedOut"));

        alert("You have been signed out successfully!");
        
        // Redirect to home page after sign out
        window.location.href = "/";
      }
      onClose();
    } else {
      if (!formData.value.trim()) {
        alert("Please enter a valid value");
        return;
      }

      // Validate avatar URL
      if (type === "avatar") {
        const urlPattern = /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i;
        if (!urlPattern.test(formData.value)) {
          alert("Please enter a valid image URL (jpg, jpeg, png, gif, webp)");
          return;
        }
      }

      onSave(formData.value);
    }
  };

  const getModalTitle = () => {
    switch (type) {
      case "name":
        return "Edit Name";
      case "address":
        return "Edit Address";
      case "phoneNumber":
        return "Edit Phone Number";
      case "avatar":
        return "Change Avatar";
      case "avatarUpload":
        return "Upload Avatar";
      case "password":
        return "Change Password";
      case "signout":
        return "Sign Out";
      default:
        return "Edit Information";
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#232326] rounded-xl p-4 md:p-6 w-full max-w-md border border-gray-700 max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg md:text-xl font-semibold text-white mb-4">
          {getModalTitle()}
        </h3>

        <form onSubmit={handleSubmit}>
          {type === "password" ? (
            <div className="space-y-4">
              <div>
                <label className="block text-gray-400 text-sm mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  value={formData.currentPassword}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      currentPassword: e.target.value,
                    }))
                  }
                  className="w-full p-3 bg-[#1a1a1d] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-400"
                  placeholder="Enter current password"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  value={formData.newPassword}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      newPassword: e.target.value,
                    }))
                  }
                  className="w-full p-3 bg-[#1a1a1d] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-400"
                  placeholder="Enter new password"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      confirmPassword: e.target.value,
                    }))
                  }
                  className="w-full p-3 bg-[#1a1a1d] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-400"
                  placeholder="Confirm new password"
                />
              </div>
            </div>
          ) : type === "signout" ? (
            <div className="space-y-4">
              <div className="text-gray-400 text-sm">
                <p className="mb-4">Are you sure you want to sign out?</p>
                <div className="bg-[#1a1a1d] p-4 rounded-lg">
                  <p className="text-yellow-400 text-sm mb-2">⚠️ Warning:</p>
                  <ul className="space-y-1 text-xs">
                    <li>• You will be logged out of your account</li>
                    <li>• Your cart items will be saved for next login</li>
                    <li>• You'll need to login again to access your account</li>
                  </ul>
                </div>
              </div>
            </div>
          ) : type === "avatarUpload" ? (
            <div>
              <label className="block text-gray-400 text-sm mb-2">
                Upload Avatar Image
              </label>
              <div className="space-y-4">
                {/* File Upload Area */}
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    id="avatar-upload"
                  />
                  <label
                    htmlFor="avatar-upload"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-blue-400 transition-colors bg-[#1a1a1d]"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 5MB
                      </p>
                    </div>
                  </label>
                </div>

                {/* Preview */}
                {previewUrl && (
                  <div className="mt-4">
                    <div className="text-sm text-gray-400 mb-2">Preview:</div>
                    <div className="flex justify-center">
                      <img
                        src={previewUrl}
                        alt="avatar preview"
                        className="w-24 h-24 rounded-full object-cover border-2 border-gray-600"
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/96?text=Invalid+Image";
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* File Info */}
                {selectedFile && (
                  <div className="bg-[#1a1a1d] p-3 rounded-lg">
                    <div className="text-sm text-gray-400">Selected file:</div>
                    <div className="text-white text-sm font-medium">
                      {selectedFile.name}
                    </div>
                    <div className="text-gray-500 text-xs">
                      Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </div>
                  </div>
                )}
              </div>

              <div className="text-xs text-gray-500 mt-2">
                💡 Supported formats: JPG, PNG, GIF, WebP (Max size: 5MB)
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-gray-400 text-sm mb-2">
                {type === "name"
                  ? "Full Name"
                  : type === "address"
                  ? "Address"
                  : type === "phoneNumber"
                  ? "Phone Number"
                  : type === "avatar"
                  ? "Avatar URL"
                  : "Value"}
              </label>
              <input
                type={type === "phoneNumber" ? "tel" : "url"}
                value={formData.value}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, value: e.target.value }))
                }
                className="w-full p-3 bg-[#1a1a1d] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-400"
                placeholder={
                  type === "name"
                    ? "Enter your full name"
                    : type === "address"
                    ? "Enter your address"
                    : type === "phoneNumber"
                    ? "Enter your phone number"
                    : type === "avatar"
                    ? "https://example.com/avatar.jpg"
                    : "Enter value"
                }
              />
              {type === "avatar" && (
                <>
                  <div className="text-xs text-gray-500 mt-2">
                    💡 Enter a direct image URL (jpg, png, gif, webp)
                  </div>
                  {formData.value && (
                    <div className="mt-4">
                      <div className="text-sm text-gray-400 mb-2">Preview:</div>
                      <div className="flex justify-center">
                        <img
                          src={formData.value}
                          alt="avatar preview"
                          className="w-20 h-20 rounded-full object-cover border-2 border-gray-600"
                          onError={(e) => {
                            e.target.src =
                              "https://via.placeholder.com/80?text=Invalid+Image";
                          }}
                        />
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                isSubmitting
                  ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                  : "bg-gray-600 text-white hover:bg-gray-700"
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                isSubmitting
                  ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                  : type === "signout"
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {isSubmitting && type === "password"
                ? "Changing..."
                : isSubmitting && type === "avatarUpload"
                ? "Uploading..."
                : type === "signout"
                ? "Sign Out"
                : type === "avatarUpload"
                ? "Upload Avatar"
                : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Payment Edit Modal Component
const PaymentEditModal = ({
  type,
  currentData,
  onSave,
  onClose,
  paymentData,
}) => {
  const [formData, setFormData] = React.useState({
    value: currentData || "",
    // Credit card form fields - use paymentData for creditCardForm
    creditCard:
      type === "creditCardForm"
        ? paymentData?.creditCard || ""
        : currentData?.creditCard || "",
    cardHolderName:
      type === "creditCardForm"
        ? paymentData?.cardHolderName || ""
        : currentData?.cardHolderName || "",
    expiryDate:
      type === "creditCardForm"
        ? paymentData?.expiryDate || ""
        : currentData?.expiryDate || "",
    cvv: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (type === "creditCardForm") {
      // Validate all credit card fields
      if (!formData.creditCard.trim()) {
        alert("Please enter credit card number");
        return;
      }
      if (!formData.cardHolderName.trim()) {
        alert("Please enter card holder name");
        return;
      }
      if (!formData.expiryDate.trim()) {
        alert("Please enter expiry date");
        return;
      }
      if (!formData.cvv.trim()) {
        alert("Please enter CVV");
        return;
      }

      // Validate credit card number
      const cleaned = formData.creditCard.replace(/\s/g, "");
      if (!/^\d{16}$/.test(cleaned)) {
        alert("Please enter a valid 16-digit credit card number");
        return;
      }

      // Validate expiry date
      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)) {
        alert("Please enter expiry date in MM/YY format");
        return;
      }

      // Validate CVV
      if (!/^\d{3,4}$/.test(formData.cvv)) {
        alert("Please enter a valid 3 or 4 digit CVV");
        return;
      }

      // Return all card data (excluding CVV for security)
      onSave({
        creditCard: cleaned,
        cardHolderName: formData.cardHolderName.trim(),
        expiryDate: formData.expiryDate.trim(),
      });
    } else {
      // Handle single field updates
      if (!formData.value.trim()) {
        alert("Please enter a valid value");
        return;
      }

      // Validate specific payment fields
      if (type === "upiId") {
        if (!/^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/.test(formData.value)) {
          alert("Please enter a valid UPI ID (e.g., user@paytm)");
          return;
        }
      }

      onSave(formData.value);
    }
  };

  const getModalTitle = () => {
    switch (type) {
      case "creditCardForm":
        return "Credit Card Details";
      case "upiId":
        return "Edit UPI ID";
      default:
        return "Edit Payment Information";
    }
  };

  const formatCardNumber = (value) => {
    // Remove all non-digit characters
    const cleaned = value.replace(/\D/g, "");
    // Add spaces every 4 digits
    const formatted = cleaned.replace(/(.{4})/g, "$1 ").trim();
    return formatted.substring(0, 19); // Limit to 16 digits + 3 spaces
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setFormData((prev) => ({ ...prev, creditCard: formatted }));
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length >= 2) {
      value = value.substring(0, 2) + "/" + value.substring(2, 4);
    }
    setFormData((prev) => ({ ...prev, expiryDate: value }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className={`bg-[#232326] rounded-xl p-6 mx-4 border border-gray-700 ${
          type === "creditCardForm" ? "w-full max-w-lg" : "w-full max-w-md"
        }`}
      >
        <h3 className="text-xl font-semibold text-white mb-4">
          {getModalTitle()}
        </h3>

        <form onSubmit={handleSubmit}>
          {type === "creditCardForm" ? (
            <div className="space-y-3 md:space-y-4">
              {/* Card Number */}
              <div>
                <label className="block text-gray-400 text-xs md:text-sm mb-1 md:mb-2">
                  Card Number
                </label>
                <input
                  type="text"
                  value={formData.creditCard}
                  onChange={handleCardNumberChange}
                  className="w-full p-2 md:p-3 bg-[#1a1a1d] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-400 font-mono text-sm md:text-lg tracking-wider"
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                />
                <div className="text-xs text-gray-500 mt-1">
                  💳 Enter your 16-digit card number
                </div>
              </div>

              {/* Card Holder Name */}
              <div>
                <label className="block text-gray-400 text-xs md:text-sm mb-1 md:mb-2">
                  Card Holder Name
                </label>
                <input
                  type="text"
                  value={formData.cardHolderName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      cardHolderName: e.target.value.toUpperCase(),
                    }))
                  }
                  className="w-full p-2 md:p-3 bg-[#1a1a1d] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-400 text-sm md:text-base"
                  placeholder="JOHN DOE"
                />
              </div>

              {/* Expiry Date and CVV */}
              <div className="grid grid-cols-2 gap-2 md:gap-4">
                <div>
                  <label className="block text-gray-400 text-xs md:text-sm mb-1 md:mb-2">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    value={formData.expiryDate}
                    onChange={handleExpiryChange}
                    className="w-full p-2 md:p-3 bg-[#1a1a1d] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-400 font-mono text-sm md:text-base"
                    placeholder="MM/YY"
                    maxLength={5}
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-xs md:text-sm mb-1 md:mb-2">
                    CVV
                  </label>
                  <input
                    type="password"
                    value={formData.cvv}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        cvv: e.target.value.replace(/\D/g, ""),
                      }))
                    }
                    className="w-full p-2 md:p-3 bg-[#1a1a1d] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-400 font-mono text-sm md:text-base"
                    placeholder="123"
                    maxLength={4}
                  />
                </div>
              </div>

              <div className="bg-[#1a1a1d] p-3 md:p-4 rounded-lg">
                <div className="flex items-center gap-2 text-yellow-400 text-xs md:text-sm mb-2">
                  🔒 Security Notice
                </div>
                <div className="text-xs text-gray-400 space-y-1">
                  <div>• Your card details are encrypted and secure</div>
                  <div>• CVV is not stored for security purposes</div>
                  <div>• We use industry-standard security measures</div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-gray-400 text-sm mb-2">
                {type === "upiId" ? "UPI ID" : "Value"}
              </label>
              <input
                type="text"
                value={formData.value}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, value: e.target.value }))
                }
                className="w-full p-3 bg-[#1a1a1d] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-400"
                placeholder={type === "upiId" ? "user@paytm" : "Enter value"}
              />
              {type === "upiId" && (
                <div className="text-xs text-gray-500 mt-2">
                  💡 Enter your UPI ID (e.g., user@paytm, user@gpay)
                </div>
              )}
            </div>
          )}

          <div className="flex gap-2 md:gap-3 mt-4 md:mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-3 md:px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm md:text-base"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-3 md:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm md:text-base"
            >
              {type === "creditCardForm" ? "Save Card" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Gift cards data and component (moved outside Account's return)
// const giftCards = [
// 	{
// 		id: 1,
// 		image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=200&q=80",
// 		code: "GIFT2025A",
// 		value: "91,000",
// 		status: "Active"
// 	},
// 	{
// 		id: 2,
// 		image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=200&q=80",
// 		code: "GIFT2025B",
// 		value: "9500",
// 		status: "Used"
// 	}
// ];

// const GiftCards = () => (
// 	<div>
// 		<h2 className="text-2xl font-semibold text-white mb-4">Gift Cards</h2>
// 		<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// 			{giftCards.map(card => (
// 				<div key={card.id} className="flex items-center bg-[#232326] rounded-xl p-4 gap-4 shadow border border-gray-700">
// 					<img src={card.image} alt={card.code} className="w-20 h-20 object-cover rounded-lg border border-gray-800" />
// 					<div className="flex-1">
// 						<div className="text-white font-semibold text-lg mb-1">Code: {card.code}</div>
// 						<div className="text-gray-400 text-sm mb-1">Value: {card.value}</div>
// 						<div className="text-gray-400 text-sm mb-1">Status: <span className={`font-bold ${card.status === 'Active' ? 'text-green-400' : 'text-red-400'}`}>{card.status}</span></div>
// 					</div>
// 				</div>
// 			))}
// 		</div>
// 	</div>
// );
