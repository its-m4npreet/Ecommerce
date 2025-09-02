import React from "react";
import { Form } from "react-router-dom";
import "./AddressForm.css";

const AddressForm = ({ form, onChange, onSubmit, onCancel }) => (
  <Form className=" form bg-[#353535] rounded-lg p-4 mb-4 flex flex-col gap-4" onSubmit={onSubmit}>
    <div className="name relative">
      <input name="name" value={form.name} onChange={onChange} placeholder="" className="flex-1 px-2 py-1 rounded bg-[#232323] text-gray-200 border border-gray-600" required />
      <label htmlFor="name">Name</label>
      
    </div>
    <div className="mobile relative">
      <input name="mobile" value={form.mobile} onChange={onChange} placeholder=" "  className="flex-1 px-2 py-1 rounded bg-[#232323] text-gray-200 border border-gray-600" required />
      <label htmlFor="mobile">Mobile</label>
    </div>
    <div className="address flex flex-col gap-4">
   <div className="flex justify-between gap-4">
       <div className="hNo relative w-full ">
        <input name="H.no" value={form["H.no"]} onChange={onChange} placeholder=" "  className="px-2 py-1 rounded bg-[#232323] text-gray-200 border border-gray-600" required />
        <label htmlFor="H.no">H.no</label>
      </div>
     
      <div className="city relative w-full">
        <input name="city" value={form.city} onChange={onChange} placeholder=" " className="px-2 py-1 rounded bg-[#232323] text-gray-200 border border-gray-600" required />
        <label htmlFor="city">City</label>
      </div>
   </div>
   
      <div className="state relative ">
        <input name="state" value={form.state} onChange={onChange} placeholder=" " className="px-2 py-1 rounded bg-[#232323] text-gray-200 border border-gray-600" required />
        <label htmlFor="state">State</label>
      </div>
      <div className="flex justify-between gap-4">
      <div className="zipCode relative w-full">
        <input name="zipCode" value={form.zipCode} onChange={onChange} placeholder=" " className="px-2 py-1 rounded bg-[#232323] text-gray-200 border border-gray-600" required />
        <label htmlFor="zipCode">Zip Code</label>
      </div>
       <div className="tag relative w-full">
      <input name="tag" value={form.tag} onChange={onChange} placeholder=" " className="px-2 py-1 rounded bg-[#232323] text-gray-200 border border-gray-600" required />
      <label htmlFor="tag">Tag (e.g. HOME, WORK)</label>
    </div>
    </div>
      
       <div className="appartment relative">
        <input name="apartment" value={form.apartment} onChange={onChange} placeholder=" " className="px-2 py-1 rounded bg-[#232323] text-gray-200 border border-gray-600" required />
        <label htmlFor="apartment">Apartment/Near By</label>
      </div>
    </div>
   
    <div className="flex gap-2 justify-end">
      <button type="button" className="px-4 py-1 rounded bg-gray-600 text-white" onClick={onCancel}>Cancel</button>
      <button type="submit" className="px-4 py-1 rounded  text-white">Save</button>
    </div>
  </Form>
);

export default AddressForm;
