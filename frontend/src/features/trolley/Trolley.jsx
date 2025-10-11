import React, { useEffect, useState } from "react";
import { FaShoppingCart, FaTrashAlt } from "react-icons/fa";
import { GiReturnArrow } from "react-icons/gi";
import { NavLink } from "react-router-dom";
import AddressForm from "../../forms/AddressForm";
// import { set } from "mongoose";
// import { set } from "mongoose";

// Dummy trolley data
// const trolley = [
//   {
//     id: 1,
//     image:
//       "https://images.unsplash.com/photo-1513708927688-890fe8c7b8c3?auto=format&fit=crop&w=200&q=80",
//     title: "Wireless Headphones",
//     price: 2499,
//     quantity: 1,
//   },
//   {
//     id: 2,
//     image:
//       "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=200&q=80",
//     title: "Smart Watch",
//     price: 3999,
//     quantity: 2,
//   },

  
// ];
const Trolley = () => {
  // Demo values for price summary

  const [products, setProducts] = useState([]);
  const [trolley, setTrolley] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        // Store products globally for access in payment
        if (typeof window !== 'undefined') {
          window.productsState = data;
        }
      })
      .catch(err => console.error('Error fetching products:', err));
  }, []);


  useEffect(() => {
    const trolleyIds = JSON.parse(localStorage.getItem('trolley')) || [];
    const selectedProducts = products.filter(product => trolleyIds.includes(product.id));
    // console.log('Trolley IDs from localStorage:', trolleyIds);
    setTrolley(selectedProducts);

  }, [products]);

  const handleRemoveItem = (itemId) => {
    const trolleyIds = JSON.parse(localStorage.getItem('trolley')) || [];
    const updatedTrolleyIds = trolleyIds.filter(tid => tid !== itemId);
    localStorage.setItem('trolley', JSON.stringify(updatedTrolleyIds));
    
    // Also remove from trolley details
    const trolleyDetails = JSON.parse(localStorage.getItem('trolleyDetails')) || {};
    delete trolleyDetails[itemId];
    localStorage.setItem('trolleyDetails', JSON.stringify(trolleyDetails));
    
    setTrolley(prev => prev.filter(item => item.id !== itemId));
  };

  const [activePage, setActivePage] = React.useState('trolley');
  let step = 0;
  if(activePage === 'address') step = 1;
  if(activePage === 'payment') step = 2;

  return (
    <div className=" bg-[#18181b] flex flex-col items-center py-10 px-2">
      <div className="status flex items-center gap-2 text-sm mb-6">
        <span className={` ${step === 0 ? "font-semibold text-gray-200" : "text-gray-400"}`}>TROLLEY</span>
        <span className="text-gray-500 select-none">-------------------</span>
        <span className={` ${step === 1 ? "font-semibold  text-gray-200" : "text-gray-400"}`}>ADDRESS</span>
        <span className="text-gray-500 select-none">-------------------</span>
        <span className={` ${step === 2 ? "font-semibold  text-gray-200" : "text-gray-400"}`}>PAYMENT</span>
      </div>
    {/* <TrolleyPage /> */}
  {activePage === 'trolley' && <TrolleyPage trolley={trolley} handleRemoveItem={handleRemoveItem} goToAddress={() => setActivePage('address')} />}
  {activePage === 'address' && <AddressChecking goToPayment={() => setActivePage('payment')} goToTrolley={() => setActivePage('trolley')} />}
  {activePage === 'payment' && <PaymentPage goToAddress={() => setActivePage('address')}/>}
    </div>
  );
};

export default Trolley;

const TrolleyPage = ({ trolley, handleRemoveItem, goToAddress }) => {
  // User data state
  const [userData, setUserData] = React.useState({
    name: 'JOHN DEO',
    address: 'NEW DELHI'
  });

  // Get trolley details from localStorage
  const [trolleyDetails, setTrolleyDetails] = React.useState({});
  
  React.useEffect(() => {
    const details = JSON.parse(localStorage.getItem('trolleyDetails')) || {};
    setTrolleyDetails(details);
  }, [trolley]);

  // Fetch user data on component mount
  React.useEffect(() => {
    const fetchUserData = async () => {
      try {
        // First try to get user from localStorage
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
          // If user has address data, use it
          if (storedUser.name || storedUser.address) {
            setUserData({
              name: storedUser.name || 'JOHN DEO',
              address: storedUser.address || storedUser.city || 'NEW DELHI'
            });
          }
          
          // Also try to fetch fresh data from backend
          const userId = storedUser._id || storedUser.id;
          if (userId) {
            const response = await fetch(`http://localhost:8080/api/users/${userId}`);
            if (response.ok) {
              const freshUser = await response.json();
              setUserData({
                name: freshUser.name || storedUser.name || 'JOHN DEO',
                address: freshUser.address || storedUser.address || storedUser.city || 'NEW DELHI'
              });
            }
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Keep default values if error occurs
      }
    };

    fetchUserData();
  }, []);

  // Calculate totals based on trolley items
  // If price is in USD, convert to INR
  const getINRPrice = (item) => {
    if (typeof item.price === 'number') {
      return Math.round(item.price * 80);
    }
    return 0;
  };
  const totalMRP = trolley.reduce((sum, item) => sum + getINRPrice(item), 0);
  // Discount is ₹200 less per item
  const discount = -200 * trolley.length;
  const coupon = trolley.length > 0 ? "-10%" : "₹0";
  const platformFee = trolley.length > 0 ? 10 : 0;
  // Donation state
  const [donateChecked, setDonateChecked] = React.useState(false);
  const [donateAmount, setDonateAmount] = React.useState(0);
  const totalAmount = Math.floor(totalMRP + discount + platformFee + (donateChecked ? donateAmount : 0));
  return (
    <div className="flex flex-col md:flex-row gap-6 w-full max-w-5xl ">
      {/* Left: Address and Items */}
      <div className=" p-6 flex-1 w-[500px]">
        {/* Address */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <div className="text-gray-200 text-sm">
              DELIVER TO: <span className="font-semibold">{userData.name}</span>
            </div>
            <div className="text-gray-400 text-xs">{userData.address}</div>
          </div>
          <button className=" px-4 py-1 rounded" style={{background :"none",border:"1px solid gray", cursor:"pointer"}} onClick={goToAddress}>
            change
          </button>
        </div>
        {/* Items */}
        <div className="text-gray-300 text-sm mb-4">
          {trolley.length > 0
            ? ` ${
                trolley.length > 1
                  ? `${trolley.length} ITEMS SELECTED`
                  : `${trolley.length} ITEM SELECTED`
              }`
            : "NO ITEM SELECTED"}
        </div>
        <div>
          {trolley.length > 0 ? trolley.map((item) => (
            <div
              key={item.id}
              className="relative flex bg-[#23232a] rounded-lg p-4 mb-4 items-center border border-gray-700"
            >
              {/* Product Image */}
              <div className="w-20 h-20 bg-gray-700 rounded mr-4 flex items-center justify-center overflow-hidden">
                <NavLink to={`/product/${item.id}`}  className="block w-full h-full">
                <img
                  src={Array.isArray(item.images) ? item.images[0] : (item.images || item.image)}
                  alt={item.title}
                  className="w-full h-full object-cover rounded"
                />
                </NavLink>
              </div>
              {/* Product Details */}
              <div className="flex-1 min-w-0">
                <div className="relative flex justify-between items-start">
                  <div className="text-gray-100 font-semibold truncate max-w-[180px]">
                    {item.title}
                  </div>
                  <button
                    className="absolute right-[-6px] top-[-10px] text-lg ml-2" style={{background :"none",border:"none",outline:"none", cursor:"auto"}}
                  >
                    <FaTrashAlt className=" text-gray-400 hover:text-red-500 cursor-pointer"  title="Remove" onClick={() => handleRemoveItem(item.id)}/>
                  </button>
                </div>
                <div className="text-gray-400 text-xs mb-2 truncate">
                  High quality, latest model, best price 
                </div>
                <div className="flex gap-2 mb-1">
                  {trolleyDetails[item.id]?.size && (
                    <span className="bg-[#444] text-gray-200 text-xs px-2 py-0.5 rounded min-w-[48px] text-center">
                      Size: {trolleyDetails[item.id].size}
                    </span>
                  )}
                  <span className="bg-[#444] text-gray-200 text-xs px-2 py-0.5 rounded min-w-[48px] text-center">
                    Qty: {trolleyDetails[item.id]?.quantity || 1}
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-gray-300 text-sm font-semibold">
                    &#8377;{Math.round(getINRPrice(item)-200)}
                  </span>
                  <span className="text-gray-400 text-xs line-through">
                    &#8377;{getINRPrice(item).toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-green-400 mb-1">
                  <GiReturnArrow className="mr-1" />7 days return available
                </div>
                <div className="text-gray-400 text-xs">
                  Delivery{" "}
                  <span className="font-semibold text-gray-200">
                    Tue, 3 Sep
                  </span>
                </div>
              </div>
            </div>
          )) : (
            <div className="flex flex-col items-center justify-center py-16 px-6">
              <FaShoppingCart className="text-6xl mb-6 text-gray-600" />
              <h3 className="text-2xl font-semibold text-white mb-4">
                Your Trolley is Empty
              </h3>
              <p className="text-gray-400 text-center mb-8 max-w-md">
                You haven't added any items to your trolley yet. Start shopping to fill up your cart!
              </p>
              <NavLink
                to="/"
                className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Shop Now
              </NavLink>
            </div>
          )}
        </div>
      </div>
      {/* Right: Discount, Donation, Price Summary */}
      <div  >
       <div className="sticky top-4 bg-[#23232a] rounded-xl py-6 px-4 w-full max-w-xs shadow-lg flex flex-col gap-4">
         {/* Discount */}
        <div>
          <div className="text-gray-200 font-semibold mb-2">
            Apply Discount
          </div>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="coupon code"
              className=" bg-[#232323] border border-gray-600 rounded px-2 py-1 text-gray-200 flex-1 "
              style={{ height: "42px" }}
            />
            <button className="bg-green-700 text-white px-4 py-1 rounded">
              Apply
            </button>
          </div>
        </div>
        {/* Donation */}
        <div>
          <div className="text-gray-400 text-xs mb-2">
            SUPPORT TRANSFORMATIVE SOCIAL WORK IN INDIA
          </div>
          <label className="flex items-center gap-5 text-gray-300 text-sm mb-2">
            <input
              type="checkbox"
              className="accent-green-600"
              style={{ width: "15px", height: "15px" }}
              checked={donateChecked}
              onChange={e => setDonateChecked(e.target.checked)}
            />
            <span>DONATE AND MAKE A DIFFERENCE</span>
          </label>
          <div className="flex gap-1 mb-1">
            {[10, 50, 100, 500].map((amt, i) => (
              <button
                key={i}
                className={`bg-[#232323] border border-gray-600 text-gray-200 rounded px-2 py-1 text-xs ${donateAmount === amt ? 'bg-green-700 text-white' : ''}`}
                onClick={() => setDonateAmount(amt)}
                disabled={!donateChecked}
              >
                &#8377;{amt}
              </button>
            ))}
          </div>
          <div className=" cursor-pointer text-red-400">know more</div>
        </div>
        {/* Price Details */}
        <div>
          <div className="text-gray-300 text-sm mb-1">
            PRICE DETAILS ( {trolley.length} item )
          </div>
          <div className="flex justify-between text-gray-400  mb-1">
            <span>Total MRP</span>
            <span>&#8377;{totalMRP}</span>
          </div>
          <div className="flex justify-between text-gray-400  mb-1">
            <span>Discount on MRP</span>
            <span className="text-green-400">&#8377;{discount}</span>
          </div>
          <div className="flex justify-between text-gray-400  mb-1">
            <span>coupon Discount</span>
            <span>{coupon}</span>
          </div>
          <div className="flex justify-between text-gray-400  mb-1">
            <span>plateform fees</span>
            <span className="text-red-400">&#8377;{platformFee}</span>
          </div>
          {donateChecked && donateAmount > 0 && (
            <div className="flex justify-between text-gray-400 mb-1">
              <span>Donated Amount</span>
              <span className="text-green-400">&#8377;{donateAmount}</span>
            </div>
          )}
          <hr className="my-2 border-gray-700" />
          <div className="flex justify-between text-gray-200 font-semibold mb-2">
            <span>Total Amount</span>
            <span>&#8377; {totalAmount}</span>
          </div>
          <button 
            className={`w-full rounded py-2 font-semibold transition-colors ${
              trolley.length > 0 
                ? 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer' 
                : 'bg-gray-600 text-gray-400 cursor-not-allowed disabled:cursor-not-allowed'
            }`}
            onClick={trolley.length > 0 ? goToAddress : undefined}
            disabled={trolley.length === 0}
            style={trolley.length === 0 ? { cursor: 'not-allowed' } : {}}
          >
            PURCHASE
          </button>
        </div>
       </div>
      </div>
    </div>
  );
}


const AddressChecking = ({ goToPayment, goToTrolley }) => {
  const [addresses, setAddresses] = React.useState([]);
  const [selectedAddressId, setSelectedAddressId] = React.useState(null);
  const [showForm, setShowForm] = React.useState(false);
  const [form, setForm] = React.useState({
    name: '',
    mobile: '',
    'H.no': '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    tag: 'HOME'
  });
  const [loading, setLoading] = React.useState(true);
  const [editingId, setEditingId] = React.useState(null);

  // Fetch user addresses from backend on component mount
  React.useEffect(() => {
    const fetchUserAddresses = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && (user._id || user.id)) {
          // Try to fetch multiple addresses first (new API)
          try {
            const addressesResponse = await fetch(`http://localhost:8080/api/users/${user._id || user.id}/addresses`);
            if (addressesResponse.ok) {
              const userAddresses = await addressesResponse.json();
              if (userAddresses && userAddresses.length > 0) {
                setAddresses(userAddresses);
                // Select the first address by default or the one marked as default
                const defaultAddress = userAddresses.find(addr => addr.isDefault) || userAddresses[0];
                setSelectedAddressId(defaultAddress._id);
                setLoading(false);
                return;
              }
            }
          } catch {
            console.log('Multiple addresses API not available, falling back to single address');
          }

          // Fallback to single address API (existing system)
          try {
            const userResponse = await fetch(`http://localhost:8080/api/users/${user._id || user.id}`);
            if (userResponse.ok) {
              const userData = await userResponse.json();
              const singleAddress = {
                _id: 'single-address',
                name: userData.name || user.name || "User",
                mobile: userData.mobile || user.mobile || "Mobile not provided",
                address: userData.address || user.address || user.city || "Address not provided",
                tag: userData.tag || "HOME",
                isDefault: true
              };
              setAddresses([singleAddress]);
              setSelectedAddressId('single-address');
            } else {
              // Final fallback to localStorage data
              const fallbackAddress = {
                _id: 'localStorage-fallback',
                name: user.name || "User",
                mobile: user.mobile || "Mobile not provided", 
                address: user.address || user.city || "Address not provided",
                tag: "HOME",
                isDefault: true
              };
              setAddresses([fallbackAddress]);
              setSelectedAddressId('localStorage-fallback');
            }
          } catch (singleAddressError) {
            console.error('Error fetching single address:', singleAddressError);
            // Final fallback
            const fallbackAddress = {
              _id: 'error-fallback',
              name: user.name || "User",
              mobile: user.mobile || "Mobile not provided",
              address: user.address || user.city || "Address not provided", 
              tag: "HOME",
              isDefault: true
            };
            setAddresses([fallbackAddress]);
            setSelectedAddressId('error-fallback');
          }
        }
      } catch (error) {
        console.error('Error in fetchUserAddresses:', error);
        // Use fallback data if error occurs
        const user = JSON.parse(localStorage.getItem('user')) || {};
        const fallbackAddress = {
          _id: 'catch-fallback',
          name: user.name || "User",
          mobile: user.mobile || "Mobile not provided",
          address: user.address || user.city || "Address not provided", 
          tag: "HOME",
          isDefault: true
        };
        setAddresses([fallbackAddress]);
        setSelectedAddressId('catch-fallback');
      } finally {
        setLoading(false);
      }
    };

    fetchUserAddresses();
  }, []);

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDeleteAddress = async (addressId) => {
    if (addresses.length <= 1) {
      alert('Cannot delete the only address. Please add another address first.');
      return;
    }

    // Don't allow deletion of fallback addresses from single address system
    if (addressId.startsWith('single-') || addressId.startsWith('localStorage-') || addressId.startsWith('error-') || addressId.startsWith('catch-')) {
      alert('This address cannot be deleted. Please edit it instead.');
      return;
    }

    if (window.confirm('Are you sure you want to delete this address?')) {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const response = await fetch(`http://localhost:8080/api/users/${user._id || user.id}/addresses/${addressId}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          // Remove address from local state
          setAddresses(prev => prev.filter(addr => addr._id !== addressId));
          
          // If the deleted address was selected, select the first remaining address
          if (selectedAddressId === addressId) {
            const remainingAddresses = addresses.filter(addr => addr._id !== addressId);
            if (remainingAddresses.length > 0) {
              setSelectedAddressId(remainingAddresses[0]._id);
            }
          }
          
          alert('Address deleted successfully!');
        } else {
          alert('Failed to delete address. Please try again.');
        }
      } catch (error) {
        console.error('Error deleting address:', error);
        alert('Error deleting address. Please check your connection and try again.');
      }
    }
  };
  
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && (user._id || user.id)) {
        // Prepare address data for backend
        const addressData = {
          name: form.name,
          mobile: form.mobile,
          address: `${form['H.no'] || ''}, ${form.apartment || ''}, ${form.city || ''}, ${form.state || ''} - ${form.zipCode || ''}`.replace(/,\s*,/g, ',').replace(/^,\s*|,\s*$/g, ''),
          city: form.city,
          state: form.state,
          zipCode: form.zipCode,
          tag: form.tag || 'HOME',
          isDefault: addresses.length === 0 // Set as default if it's the first address
        };

        console.log('Saving address to backend:', addressData);

        let response;
        let isUsingMultipleAddresses = !editingId || !editingId.startsWith('single-') && !editingId.startsWith('localStorage-') && !editingId.startsWith('error-') && !editingId.startsWith('catch-');

        if (isUsingMultipleAddresses) {
          // Try multiple addresses API first
          try {
            if (editingId && editingId !== 'new') {
              // Update existing address
              response = await fetch(`http://localhost:8080/api/users/${user._id || user.id}/addresses/${editingId}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(addressData)
              });
            } else {
              // Create new address
              response = await fetch(`http://localhost:8080/api/users/${user._id || user.id}/addresses`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(addressData)
              });
            }
          } catch {
            isUsingMultipleAddresses = false;
          }
        }
        
        if (!isUsingMultipleAddresses || !response || !response.ok) {
          // Fallback to single address API (update user profile)
          console.log('Falling back to single address API');
          response = await fetch(`http://localhost:8080/api/users/${user._id || user.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(addressData)
          });
        }

        if (response.ok) {
          const savedData = await response.json();
          console.log('Address saved successfully:', savedData);
          
          if (isUsingMultipleAddresses && savedData._id) {
            // Multiple addresses system
            if (editingId && editingId !== 'new') {
              // Update existing address in state
              setAddresses(prev => prev.map(addr => 
                addr._id === editingId ? { ...savedData, _id: savedData._id || editingId } : addr
              ));
            } else {
              // Add new address to state
              setAddresses(prev => [...prev, savedData]);
              setSelectedAddressId(savedData._id);
            }
          } else {
            // Single address system - update the single address
            const updatedAddress = {
              _id: editingId || 'single-address',
              name: addressData.name,
              mobile: addressData.mobile,
              address: addressData.address,
              tag: addressData.tag,
              isDefault: true
            };
            setAddresses([updatedAddress]);
            setSelectedAddressId(updatedAddress._id);
            
            // Update localStorage
            const user = JSON.parse(localStorage.getItem('user'));
            localStorage.setItem('user', JSON.stringify({ ...user, ...addressData }));
          }
          
          // Reset form and close
          setForm({
            name: '',
            mobile: '',
            'H.no': '',
            apartment: '',
            city: '',
            state: '',
            zipCode: '',
            tag: 'HOME'
          });
          setEditingId(null);
          setShowForm(false);
          
          alert(editingId && editingId !== 'new' ? 'Address updated successfully!' : 'Address added successfully!');
        } else {
          let errorMessage = 'Failed to save address. Please try again.';
          try {
            const errorData = await response.json();
            console.error('Failed to save address:', errorData);
            errorMessage = errorData.message || errorMessage;
          } catch {
            console.error('Failed to save address: Server returned', response.status);
          }
          alert(errorMessage);
        }
      } else {
        alert('User not found. Please log in again.');
      }
    } catch (error) {
      console.error('Error saving address:', error);
      alert('Error saving address. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full">
      <div className="bg-[#23232a] rounded-lg shadow-lg w-full max-w-xl p-6 relative mt-8">
        <div className="flex justify-between items-center mb-4">
          <div className="text-lg font-semibold ">Select Delivery Address</div>
        </div>
        <div className="text-xs text-gray-500 font-semibold mb-2">SELECT DELIVERY ADDRESS</div>
        {/* Address Cards */}
        {loading ? (
          <div className="border rounded-lg p-4 flex flex-col gap-2 bg-[transparent] relative mb-2">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-600 rounded mb-2"></div>
              <div className="h-3 bg-gray-600 rounded mb-2"></div>
              <div className="h-3 bg-gray-600 rounded w-3/4"></div>
            </div>
          </div>
        ) : (
          addresses.map((address) => (
            <div key={address._id} className="border rounded-lg p-4 bg-[transparent] relative mb-2">
              {/* Header with radio button, name, tags and action buttons */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <input 
                    type="radio" 
                    name="selectedAddress"
                    checked={selectedAddressId === address._id}
                    onChange={() => setSelectedAddressId(address._id)}
                    style={{ accentColor: 'green', width: '1rem', height: '1rem' }} 
                  />
                  <span className="font-semibold ">{address.name}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full ml-2 bg-green-300 text-black">{address.tag}</span>
                  {address.isDefault && (
                    <span className="text-xs px-2 py-0.5 rounded-full ml-2 bg-blue-300 text-black">DEFAULT</span>
                  )}
                </div>
                
                {/* Action buttons moved to top right */}
                <div className="flex gap-2">
                  <button 
                    className="border border-gray-300 p-1.5 rounded hover:bg-gray-100 transition flex items-center justify-center" 
                    title="Edit Address"
                    onClick={() => { 
                      setShowForm(true);
                      setEditingId(address._id);
                      // Parse the existing address to populate form fields
                      const addressParts = address.address.split(',').map(part => part.trim());
                      setForm({
                        name: address.name,
                        mobile: address.mobile,
                        'H.no': addressParts[0] || '',
                        apartment: addressParts[1] || '',
                        city: addressParts[2] || '',
                        state: addressParts[3]?.split('-')[0]?.trim() || '',
                        zipCode: addressParts[3]?.split('-')[1]?.trim() || '',
                        tag: address.tag
                      });
                    }}
                  >
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  {addresses.length > 1 && !address._id.startsWith('single-') && !address._id.startsWith('localStorage-') && !address._id.startsWith('error-') && !address._id.startsWith('catch-') && (
                    <button 
                      className="border border-red-300 text-red-500 p-1.5 rounded hover:bg-red-50 transition flex items-center justify-center"
                      title="Delete Address"
                      onClick={() => handleDeleteAddress(address._id)}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
              
              {/* Address details */}
              <div className="text-sm mb-2">
                {address.address}
              </div>
              <div className="text-sm">
                Mobile: <span className="font-semibold">{address.mobile}</span>
              </div>
            </div>
          ))
        )}
        {/* Address Form */}
        {showForm && (
          <AddressForm
            form={form}
            onChange={handleFormChange}
            onSubmit={handleFormSubmit}
            onCancel={() => setShowForm(false)}
          />
        )}
        <div className="border border-dashed rounded-lg p-4 font-semibold cursor-pointer transition mb-4" onClick={() => { 
          setShowForm(true);
          setEditingId('new');
          setForm({ 
            name: '', 
            mobile: '', 
            'H.no': '', 
            city: '', 
            state: '', 
            zipCode: '', 
            apartment: '', 
            tag: 'HOME' 
          }); 
        }}>
          + Add New Address
        </div>
        <div className="flex justify-between gap-2">
          <button className=" text-white px-6 py-2 rounded font-semibold transition" onClick={goToTrolley}>Back</button>
          <button 
            className={`text-white px-6 py-2 rounded font-semibold transition ${
              selectedAddressId ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-500 cursor-not-allowed'
            }`}
            onClick={() => {
              if (selectedAddressId) {
                // Store selected address in localStorage for payment page
                const selectedAddress = addresses.find(addr => addr._id === selectedAddressId);
                if (selectedAddress) {
                  localStorage.setItem('selectedDeliveryAddress', JSON.stringify(selectedAddress));
                }
                goToPayment();
              }
            }}
            disabled={!selectedAddressId}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

const PaymentPage = ({ goToAddress }) => {
  const [showSuccessPopup, setShowSuccessPopup] = React.useState(false);
  const [isProcessing, setIsProcessing] = React.useState(false);

  // Debug: Log popup state changes
  React.useEffect(() => {
    console.log('showSuccessPopup changed to:', showSuccessPopup);
  }, [showSuccessPopup]);

  const handlePay = async () => {
    setIsProcessing(true);
    console.log('Starting payment process...');
    
    const trolleyIds = JSON.parse(localStorage.getItem('trolley')) || [];
    const user = JSON.parse(localStorage.getItem('user'));
    const trolleyDetails = JSON.parse(localStorage.getItem('trolleyDetails')) || {};
    
    console.log('Trolley IDs:', trolleyIds);
    console.log('User:', user);
    console.log('Trolley Details:', trolleyDetails);

    // Get selected delivery address
    let userAddress = null;
    try {
      // First try to get selected address from localStorage
      const selectedAddress = JSON.parse(localStorage.getItem('selectedDeliveryAddress'));
      if (selectedAddress) {
        userAddress = {
          name: selectedAddress.name || 'Customer',
          address: selectedAddress.address || 'Address not provided',
          mobile: selectedAddress.mobile || 'Mobile not provided',
          email: user?.email || 'Email not provided',
          tag: selectedAddress.tag || 'HOME'
        };
        console.log('Using selected delivery address:', userAddress);
      } else {
        // Fallback to fetching user's default address
        if (user && (user._id || user.id)) {
          const userResponse = await fetch(`http://localhost:8080/api/users/${user._id || user.id}/addresses`);
          if (userResponse.ok) {
            const addresses = await userResponse.json();
            const defaultAddress = addresses.find(addr => addr.isDefault) || addresses[0];
            if (defaultAddress) {
              userAddress = {
                name: defaultAddress.name || 'Customer',
                address: defaultAddress.address || 'Address not provided',
                mobile: defaultAddress.mobile || 'Mobile not provided',
                email: user?.email || 'Email not provided',
                tag: defaultAddress.tag || 'HOME'
              };
            }
          }
        }
      }
    } catch (error) {
      console.error('Error getting delivery address:', error);
      // Final fallback to stored user data
      userAddress = {
        name: user?.name || 'Customer',
        address: user?.address || user?.city || 'Address not provided',
        mobile: user?.mobile || 'Mobile not provided',
        email: user?.email || 'Email not provided'
      };
    }
    
    // Get all products from the current state (assuming products are available globally)
    let allProducts = [];
    if (typeof window !== 'undefined' && window.productsState) {
      allProducts = window.productsState;
    }
    
    // Get detailed product information for ordered items
    const orderedItems = trolleyIds.map(id => {
      const product = allProducts.find(p => p.id === id);
      if (product) {
        const details = trolleyDetails[id] || {};
        return {
          id: product.id,
          title: product.title,
          price: product.price,
          priceInINR: typeof product.price === 'number' ? Math.round(product.price * 80) : 0,
          image: Array.isArray(product.images) ? product.images[0] : (product.images || product.image),
          category: product.category,
          description: product.description,
          quantity: details.quantity || 1,
          size: details.size || null
        };
      }
      return null;
    }).filter(item => item !== null);
    
    console.log('=== ALL ORDERED ITEMS ===');
    console.log('Total items:', orderedItems.length);
    orderedItems.forEach((item, index) => {
      console.log(`Item ${index + 1}:`, {
        ID: item.id,
        Title: item.title,
        'Price (USD)': item.price,
        'Price (INR)': item.priceInINR,
        Category: item.category,
        Quantity: item.quantity,
        Image: item.image
      });
    });
    
    const totalAmount = orderedItems.reduce((sum, item) => sum + item.priceInINR, 0);
    console.log('Total Order Amount (INR):', totalAmount);
    console.log('========================');
    
    // Prepare order data for backend
    const orderData = {
      userId: user._id || user.id,
      deliveryAddress: userAddress, // Include the backend user address data
      products: orderedItems.map(item => ({
        product: {
          id: item.id,
          title: item.title,
          price: item.price,
          priceInINR: item.priceInINR,
          image: item.image,
          category: item.category,
          description: item.description
        },
        quantity: item.quantity,
        size: item.size,
        price: item.priceInINR
      })),
      total: totalAmount,
      status: 'confirmed',
      orderDate: new Date().toISOString()
    };
    
    try {
      console.log('Sending order to backend:', orderData);
      
      // Send order to backend
      const response = await fetch('http://localhost:8080/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      });
      
      if (response.ok) {
        const savedOrder = await response.json();
        console.log('Order saved successfully:', savedOrder);
        
        // Clear trolley and related data from localStorage
        localStorage.removeItem('trolley');
        localStorage.removeItem('trolleyDetails');
        localStorage.removeItem('selectedDeliveryAddress');
        
        setIsProcessing(false);
        setShowSuccessPopup(true);
        console.log('Order successful! Showing popup...');
        
        // Redirect to account page order history after 3 seconds
        setTimeout(() => {
          localStorage.setItem('accountSection', 'orders');
          window.location.href = '/account';
        }, 3000);
      } else {
        setIsProcessing(false);
        const errorData = await response.json();
        console.error('Failed to save order:', errorData);
        alert('Failed to place order. Please try again.');
      }
    } catch (error) {
      setIsProcessing(false);
      console.error('Error placing order:', error);
      alert('Error placing order. Please check your connection and try again.');
    }
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full ">
      <div className="bg-[#23232a] rounded-xl shadow-lg w-full max-w-xl p-8 relative mt-8 border border-[#353535]">
        <div className="text-2xl font-bold text-gray-100 mb-6 tracking-wide">Payment</div>
        <div className="mb-4 text-gray-300">Select your payment method:</div>
        <div className="flex flex-col gap-2 mb-8">
          <label className="flex items-center gap-3  rounded px-4 py-3 cursor-pointer transition text-gray-100">
            <input type="radio" name="payment" defaultChecked className="accent-green-500" style={{ width: '1rem', height: '1rem' }} />
            <span className="font-medium">UPI / Netbanking</span>
          </label>
          <label className="flex items-center gap-3  rounded px-4 py-3 cursor-pointer transition text-gray-100">
            <input type="radio" name="payment" className="accent-green-500" style={{ width: '1rem', height: '1rem' }} />
            <span className="font-medium">Credit / Debit Card</span>
          </label>
          <label className="flex items-center gap-3  rounded px-4 py-3 cursor-pointer transition text-gray-100">
            <input type="radio" name="payment" className="accent-green-500" style={{ width: '1rem', height: '1rem' }} />
            <span className="font-medium">Cash on Delivery</span>
          </label>
        </div>
        <div className="flex justify-between gap-4">
          <button className="bg-[#353535] text-gray-200 px-6 py-2 rounded font-semibold transition hover:bg-[#444] border border-gray-600" onClick={goToAddress}>Back </button>
          <button 
            className={`text-white px-6 py-2 rounded font-semibold transition relative ${
              isProcessing ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`} 
            onClick={handlePay}
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : 'Pay Now'}
          </button>
        </div>        {/* Success Popup */}
        {showSuccessPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#23232a] rounded-xl p-8 w-96 max-w-md mx-4 text-center border border-gray-600">
              {/* Green Checkmark */}
              <div className="mb-6">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              
              {/* Success Message */}
              <h3 className="text-2xl font-bold text-white mb-2">Order Placed Successfully!</h3>
              <p className="text-gray-300 mb-4">Thank you for your purchase. You will be redirected to your order history shortly.</p>
              
              {/* Loading indicator */}
              <div className="flex items-center justify-center gap-2 text-gray-400">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-500"></div>
                <span className="text-sm">Redirecting...</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
