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
      .then(data => setProducts(data))
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
  const coupon = "-10%";
  const platformFee = 10;
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
              DELIVER TO: <span className="font-semibold">JOHN DEO</span>
            </div>
            <div className="text-gray-400 text-xs">{`NEW DELHI`}</div>
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
          {trolley.map((item) => (
            <div
              key={item.id}
              className="relative flex bg-[#23232a] rounded-lg p-4 mb-4 items-center border border-gray-700"
            >
              {/* Product Image */}
              <div className="w-20 h-20 bg-gray-700 rounded mr-4 flex items-center justify-center overflow-hidden">
                <img
                  src={Array.isArray(item.images) ? item.images[0] : (item.images || item.image)}
                  alt={item.title}
                  className="w-full h-full object-cover rounded"
                />
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
                  <span className="bg-[#444] text-gray-200 text-xs px-2 py-0.5 rounded min-w-[48px] text-center">
                    Size: M
                  </span>
                  <span className="bg-[#444] text-gray-200 text-xs px-2 py-0.5 rounded min-w-[48px] text-center">
                    Qty: {item.quantity || 1}
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
          ))}
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
          <button className="w-full text-white rounded py-2 font-semibold transition-colors " onClick={goToAddress}>
            PURCHASE
          </button>
        </div>
       </div>
      </div>
    </div>
  );
}


const AddressChecking = ({ goToPayment, goToTrolley }) => {
  const [address, setAddress] = React.useState({
    name: "Manpreet",
    mobile: "9876036134",
    address: "House no. 446 near jog raj aata chaki saila khurd Garhshanker hoshiarpur , Garhshanker Hoshiarpur, Punjab - 144529",
    tag: "HOME"
  });
  const [showForm, setShowForm] = React.useState(false);
  const [form, setForm] = React.useState(address);

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setAddress(form);
    setShowForm(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full">
      <div className="bg-[#23232a] rounded-lg shadow-lg w-full max-w-xl p-6 relative mt-8">
        <div className="flex justify-between items-center mb-4">
          <div className="text-lg font-semibold ">Select Delivery Address</div>
        </div>
        <div className="text-xs text-gray-500 font-semibold mb-2">DEFAULT ADDRESS</div>
        {/* Address Card */}
        <div className="border rounded-lg p-4 flex flex-col gap-2 bg-[transparent] relative mb-2">
          <div className="flex items-center gap-2">
            <input type="radio" checked readOnly style={{ accentColor: 'green', width: '1rem', height: '1rem' }} />
            <span className="font-semibold ">{address.name}</span>
            <span className="  text-xs px-2 py-0.5 rounded-full ml-2 bg-green-300 text-black">{address.tag}</span>
          </div>
          <div className=" text-sm">
            {address.address}
          </div>
          <div className=" text-sm">
            Mobile: <span className="font-semibold">{address.mobile}</span>
          </div>
          <div className="flex gap-2 mt-2">
            <button className="border border-gray-300  px-4 py-1 rounded hover:bg-gray-100 transition" onClick={() => { setShowForm(true); setForm(address); }}>EDIT</button>
          </div>
        </div>
        {/* Address Form */}
        {showForm && (
          <AddressForm
            form={form}
            onChange={handleFormChange}
            onSubmit={handleFormSubmit}
            onCancel={() => setShowForm(false)}
          />
        )}
        <div className="border border-dashed  rounded-lg p-4 font-semibold cursor-pointer transition mb-4" onClick={() => { setShowForm(true); setForm({ name: '', mobile: '', address: '', tag: '' }); }}>
          + Add New Address
        </div>
        <div className="flex justify-between gap-2">
          <button className=" text-white px-6 py-2 rounded font-semibold transition" onClick={goToTrolley}>Back</button>
          <button className=" text-white px-6 py-2 rounded font-semibold transition" onClick={goToPayment}>Next</button>
        </div>
      </div>
    </div>
  );
}

const PaymentPage = ({ goToAddress }) => {
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
          <button className=" text-white px-6 py-2 rounded font-semibold transition relative">
            Pay Now</button>
        </div>
      </div>
    </div>
  );
}
