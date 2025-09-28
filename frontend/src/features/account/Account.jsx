import React, { useState } from "react";
import { FaUserEdit, FaUser, FaEnvelope, FaMapMarkerAlt, FaCalendarAlt, FaClipboardList, FaCreditCard, FaGift, FaSignOutAlt, FaPaypal } from "react-icons/fa";
import { MdEdit ,MdOutlinePassword ,MdManageAccounts } from "react-icons/md";
import { NavLink } from "react-router-dom";

const user = {
	name: "John deo",
	email: "johndeo@gmail.com",
	address: "144529, saila khurd, garshankar",
	country: "india",
	dob: "12-10-2025",
	avatar: "https://cutedp.org/wp-content/uploads/2024/10/dp-pic_4.jpg",
	phoneNumber: "123-456-7890"
};

export const Account = () => {
	const [activeSection, setActiveSection] = useState('personal');

	// Check if we should navigate to orders section (from payment success)
	React.useEffect(() => {
		const targetSection = localStorage.getItem('accountSection');
		if (targetSection) {
			setActiveSection(targetSection);
			localStorage.removeItem('accountSection'); // Clean up
		}
	}, []);

	return (
		<div className=" bg-[#18181b] flex flex-col items-center py-10 px-4">
			<div className="w-full max-w-6xl flex flex-col md:flex-row gap-8">
				{/* Sidebar */}
				<div className="bg-[#18181b]  border-gray-700 rounded-2xl p-8 flex flex-col items-center min-w-[300px] max-w-xs">
					<div className="mb-4">
						<img src={user.avatar} alt="avatar" className="w-28 h-28 rounded-full object-cover border-1 border-blue-400" />
					</div>
					<div className="text-white text-lg font-semibold mb-1">{user.name}</div>
					<div className="text-gray-300 text-sm flex items-center gap-2 mb-6">{user.email} <FaClipboardList className="text-xs cursor-pointer" title="Copy email" /></div>
					<nav className="flex flex-col gap-4 w-full">
						<span onClick={() => setActiveSection('personal')} className={`text-left text-white font-semibold text-[20px] hover:text-blue-400 transition cursor-pointer ${activeSection === 'personal' ? 'text-blue-400 underline' : ''}`}>personal information</span>
						<span onClick={() => setActiveSection('billing')} className={`text-left text-white font-semibold text-[20px] hover:text-blue-400 transition cursor-pointer ${activeSection === 'billing' ? 'text-blue-400 underline' : ''}`}>billing & payment</span>
						<span onClick={() => setActiveSection('orders')} className={`text-left text-white font-semibold text-[20px] hover:text-blue-400 transition cursor-pointer ${activeSection === 'orders' ? 'text-blue-400 underline' : ''}`}>order history</span>
						<span onClick={() => setActiveSection('gifts')} className={`text-left text-white font-semibold text-[20px] hover:text-blue-400 transition cursor-pointer ${activeSection === 'gifts' ? 'text-blue-400 underline' : ''}`}>gift cards</span>
					</nav>
				</div>
				<div className="line w-0.5 h-105 bg-white"></div>
				{/* Main Content */}
				<div className="flex-1 flex flex-col gap-8">
					{activeSection === 'personal' && <PersonalInfo />}
					{activeSection === 'billing' && <PaymentMethods />}
					{activeSection === 'orders' && <OrdersHistory />}
					{activeSection === 'gifts' && <GiftCards />}
				</div>
			</div>
		</div>
	);
};

const PersonalInfo = () => {
	return (
		<div>
			<h2 className="text-2xl font-semibold text-white mb-4">Personal information</h2>
			<p className="text-gray-400 mb-8">Manage your personal information, including phone numbers and email address where you can be connected</p>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{/* Name */}
				<div className="relative min-h-[130px] bg-[#232326] rounded-xl p-6 flex flex-col gap-2 shadow border border-gray-700">
					<div className="absolute top-2 right-2  text-white rounded-full p-2 transition hover:border border-gray-600 hover:cursor-pointer" title="Edit">
						<MdEdit />
					</div>
					<div className="flex items-center gap-2 text-gray-400 text-sm mb-1"><FaUser />Personal info</div>
					<div className="text-white text-lg font-semibold">{user.name}</div>
				</div>
				{/* Address */}
				<div className="relative min-h-[130px] bg-[#232326] rounded-xl p-6 flex flex-col gap-2 shadow border border-gray-700">
					<div className="absolute top-2 right-2 text-white rounded-full p-2  transition hover:border border-gray-600  hover:cursor-pointer" title="Edit">
						<MdEdit />
					</div>
					<div className="flex items-center gap-2 text-gray-400 text-sm mb-1"><FaMapMarkerAlt /> Address</div>
					<div className="text-white text-lg font-semibold">{user.address}</div>
				</div>
				{/* Email */}
				<div className="relative min-h-[130px] bg-[#232326] rounded-xl p-6 flex flex-col gap-2 shadow border border-gray-700">
					<div className="absolute top-2 right-2 text-white rounded-full p-2  transition hover:border border-gray-600  hover:cursor-pointer" title="Edit">
						<MdEdit />
					</div>
					<div className="flex items-center gap-2 text-gray-400 text-sm mb-1"><MdOutlinePassword />Password</div>
					<div className="text-white text-lg font-semibold">*****</div>
				</div>
				{/* DOB */}
				<div className="relative min-h-[130px] bg-[#232326] rounded-xl p-6 flex flex-col gap-2 shadow border border-gray-700">
					<div className="absolute top-2 right-2  text-white rounded-full p-2 shadow transition hover:border border-gray-600  hover:cursor-pointer" title="Edit">
						<MdEdit />
					</div>
					<div className="flex items-center gap-2 text-gray-400 text-sm mb-1"><MdManageAccounts />Manage Account</div>
					<div className="text-white text-lg font-semibold">manage account settings</div>
				</div>
			</div>
		</div>
	);
}

const PaymentMethods = ()=>{
	return (
		<div>
			<h2 className="text-2xl font-semibold text-white mb-4">Payment Methods</h2>
			<p className="text-gray-400 mb-8">Manage your payment methods</p>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{/* Payment Method 1 */}
				<div className="relative min-h-[130px] bg-[#232326] rounded-xl p-6 flex flex-col gap-2 shadow border border-gray-700">
					<div className="absolute top-2 right-2  text-white rounded-full p-2 shadow transition hover:border border-gray-600  hover:cursor-pointer" title="Edit">
						<MdEdit />
					</div>
					<div className="flex items-center gap-2 text-gray-400 text-sm mb-1"><FaCreditCard /> Credit Card</div>
					<div className="text-white text-lg font-semibold">**** **** **** 1234</div>
				</div>
				{/* Payment Method 2 */}
				<div className="relative min-h-[130px] bg-[#232326] rounded-xl p-6 flex flex-col gap-2 shadow border border-gray-700">
					<div className="absolute top-2 right-2  text-white rounded-full p-2 shadow transition hover:border border-gray-600  hover:cursor-pointer" title="Edit">
						<MdEdit />
					</div>
					<div className="flex items-center gap-2 text-gray-400 text-sm mb-1"><FaPaypal /> UPI</div>
					<div className="text-white text-lg font-semibold">user@upi</div>
				</div>
			</div>
		</div>
	);
}


const OrdersHistory = () => {
       const [orders, setOrders] = React.useState([]);
       const [loading, setLoading] = React.useState(true);
       const [error, setError] = React.useState(null);

       React.useEffect(() => {
	       const user = JSON.parse(localStorage.getItem('user'));
	       console.log('Current user from localStorage:', user);
	       
	       if (!user || (!user._id && !user.id)) {
		       setError('User not found. Please log in.');
		       setLoading(false);
		       return;
	       }
	       
	       const userId = user._id || user.id;
	       console.log('Fetching orders for userId:', userId);
	       
	       fetch(`http://localhost:8080/api/orders/user/${userId}`)
		       .then(res => {
			       console.log('Orders API response status:', res.status);
			       if (!res.ok) throw new Error('Failed to fetch orders');
			       return res.json();
		       })
		       .then(data => {
			       console.log('Orders fetched from backend:', data);
			       setOrders(data);
			       setLoading(false);
		       })
		       .catch(err => {
			       console.error('Error fetching orders:', err);
			       setError(err.message);
			       setLoading(false);
		       });
       }, []);

       return (
	       <div>
		       <h2 className="text-2xl font-semibold text-white mb-4">Order History</h2>
		       {loading && <div className="text-gray-400">Loading orders...</div>}
		       {error && <div className="text-red-400">{error}</div>}
		       <div className="flex flex-col gap-6">
			       {orders.length === 0 && !loading && !error && (
				       <div className="text-gray-400">No orders found.</div>
			       )}
			       {orders.map(order => (
				       <div key={order._id} className="bg-[#232326] rounded-xl p-6 shadow border border-gray-700">
					       {/* Order Header */}
					       <div className="flex justify-between items-start mb-4 pb-3 border-b border-gray-600">
						       <div>
							       <div className="text-white font-semibold text-lg mb-1">
								       Order #{order._id.slice(-8)}
							       </div>
							       <div className="text-gray-400 text-sm">
								       Order Date: {new Date(order.createdAt || order.orderDate).toLocaleDateString()}
							       </div>
							       <div className="text-gray-400 text-sm">
								       Status: <span className="font-bold text-green-400 capitalize">{order.status}</span>
							       </div>
						       </div>
						       <div className="text-right">
							       <div className="text-gray-200 text-xl font-bold">₹{order.total?.toLocaleString()}</div>
							       <div className="text-gray-500 text-sm">
								       {order.products.length} item{order.products.length > 1 ? 's' : ''}
							       </div>
						       </div>
					       </div>
					       
					       {/* All Products in Order */}
					       <div className="space-y-3">
						       {order.products.map((item, index) => (
							       <div key={index} className="flex items-center gap-4 p-3 bg-[#1a1a1d] rounded-lg">
								       <img 
									       src={item.product?.image || 'https://via.placeholder.com/60'} 
									       alt={item.product?.title || 'Product'} 
									       className="w-16 h-16 object-cover rounded-lg border border-gray-800" 
								       />
								       <div className="flex-1">
									       <div className="text-white font-medium text-base mb-1">
										       {item.product?.title || 'Product'}
									       </div>
									       <div className="text-gray-400 text-sm mb-1">
										       Category: {item.product?.category || 'N/A'}
									       </div>
									       <div className="flex items-center gap-4">
										       <span className="text-gray-400 text-sm">Qty: {item.quantity}</span>
										       <span className="text-gray-200 font-semibold">₹{item.product?.price?.toLocaleString()}</span>
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

// Gift cards data and component (moved outside Account's return)
const giftCards = [
	{
		id: 1,
		image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=200&q=80",
		code: "GIFT2025A",
		value: "91,000",
		status: "Active"
	},
	{
		id: 2,
		image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=200&q=80",
		code: "GIFT2025B",
		value: "9500",
		status: "Used"
	}
];

const GiftCards = () => (
	<div>
		<h2 className="text-2xl font-semibold text-white mb-4">Gift Cards</h2>
		<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
			{giftCards.map(card => (
				<div key={card.id} className="flex items-center bg-[#232326] rounded-xl p-4 gap-4 shadow border border-gray-700">
					<img src={card.image} alt={card.code} className="w-20 h-20 object-cover rounded-lg border border-gray-800" />
					<div className="flex-1">
						<div className="text-white font-semibold text-lg mb-1">Code: {card.code}</div>
						<div className="text-gray-400 text-sm mb-1">Value: {card.value}</div>
						<div className="text-gray-400 text-sm mb-1">Status: <span className={`font-bold ${card.status === 'Active' ? 'text-green-400' : 'text-red-400'}`}>{card.status}</span></div>
					</div>
				</div>
			))}
		</div>
	</div>
);
