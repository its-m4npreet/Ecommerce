import React from "react";
import { Form } from "react-router-dom";
import "./AddressForm.css";
// import badgeColors from "@material-tailwind/react/theme/components/badge/badgeColors";

const AddressForm = ({ form, onChange, onSubmit, onCancel }) => (
  <Form className="form bg-[#18181b] rounded-lg p-3 sm:p-4 mb-3 flex flex-col gap-3 sm:gap-4" onSubmit={onSubmit}>
    {/* Name - Full width */}
    <div className="name relative">
      <input 
        name="name" 
        value={form.name} 
        onChange={onChange} 
        placeholder="" 
        className="w-full px-3 py-2.5 sm:py-2 rounded bg-[#18181b] text-gray-200 border border-gray-600 text-sm sm:text-base" 
        required 
      />
      <label htmlFor="name">Name</label>
    </div>

    {/* Mobile - Full width */}
    <div className="mobile relative">
      <input 
        name="mobile" 
        value={form.mobile} 
        onChange={onChange} 
        placeholder=" " 
        className="w-full px-3 py-2.5 sm:py-2 rounded bg-[#18181b] text-gray-200 border border-gray-600 text-sm sm:text-base" 
        required 
      />
      <label htmlFor="mobile">Mobile</label>
    </div>

    {/* Address fields */}
    <div className="address flex flex-col gap-3 sm:gap-2">
      {/* H.no and City - Stack on mobile, side by side on desktop */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-2">
        <div className="hNo relative w-full">
          <input 
            name="H.no" 
            value={form["H.no"]} 
            onChange={onChange} 
            placeholder=" " 
            className="w-full px-3 py-2.5 sm:py-2 rounded bg-[#18181b] text-gray-200 border border-gray-600 text-sm sm:text-base" 
            required 
          />
          <label htmlFor="H.no">H.no</label>
        </div>
        
        <div className="city relative w-full">
          <input 
            name="city" 
            value={form.city} 
            onChange={onChange} 
            placeholder=" " 
            className="w-full px-3 py-2.5 sm:py-2 rounded bg-[#18181b] text-gray-200 border border-gray-600 text-sm sm:text-base" 
            required 
          />
          <label htmlFor="city">City</label>
        </div>
      </div>
      
      {/* State - Full width */}
      <div className="state relative">
        <input 
          name="state" 
          value={form.state} 
          onChange={onChange} 
          placeholder=" " 
          className="w-full px-3 py-2.5 sm:py-2 rounded bg-[#18181b] text-gray-200 border border-gray-600 text-sm sm:text-base" 
          required 
        />
        <label htmlFor="state">State</label>
      </div>

      {/* Zip Code and Tag - Stack on mobile, side by side on desktop */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-2">
        <div className="zipCode relative w-full">
          <input 
            name="zipCode" 
            value={form.zipCode} 
            onChange={onChange} 
            placeholder=" " 
            className="w-full px-3 py-2.5 sm:py-2 rounded bg-[#18181b] text-gray-200 border border-gray-600 text-sm sm:text-base" 
            required 
          />
          <label htmlFor="zipCode">Zip Code</label>
        </div>
        
        <div className="tag relative w-full">
          <input 
            name="tag" 
            value={form.tag} 
            onChange={onChange} 
            placeholder=" " 
            className="w-full px-3 py-2.5 sm:py-2 rounded bg-[#18181b] text-gray-200 border border-gray-600 text-sm sm:text-base" 
            required 
          />
          <label htmlFor="tag">Tag (e.g. HOME, WORK)</label>
        </div>
      </div>
      
      {/* Apartment - Full width */}
      <div className="appartment relative">
        <input 
          name="apartment" 
          value={form.apartment} 
          onChange={onChange} 
          placeholder=" " 
          className="w-full px-3 py-2.5 sm:py-2 rounded bg-[#18181b] text-gray-200 border border-gray-600 text-sm sm:text-base" 
          required 
        />
        <label htmlFor="apartment">Apartment/Near By</label>
      </div>
    </div>
   
    {/* Buttons - Stack on mobile, side by side on desktop */}
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-2 sm:justify-end mt-3 sm:mt-2">
      <button 
        type="button" 
        className="w-full sm:w-auto px-4 py-2.5 sm:py-2 rounded text-white text-sm sm:text-base font-medium order-2 sm:order-1" 
        style={{background:"#bd2d2d"}} 
        onClick={onCancel}
      >
        Cancel
      </button>
      <button 
        type="submit" 
        className="w-full sm:w-auto px-4 py-2.5 sm:py-2 rounded text-white text-sm sm:text-base font-medium order-1 sm:order-2" 
        style={{background:"#18181b", border: "1px solid #646cff"}}
      >
        Save
      </button>
    </div>
  </Form>
);

export default AddressForm;
