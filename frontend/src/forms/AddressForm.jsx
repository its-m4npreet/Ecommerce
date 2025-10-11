import React from "react";
import { Form } from "react-router-dom";
import "./AddressForm.css";
// import badgeColors from "@material-tailwind/react/theme/components/badge/badgeColors";

const AddressForm = ({ form, onChange, onSubmit, onCancel }) => (
  <Form className=" form bg-[#18181b] rounded-lg p-3 mb-3 flex flex-col gap-2" onSubmit={onSubmit}>
    <div className="name relative">
      <input name="name" value={form.name} onChange={onChange} placeholder="" className="flex-1 px-2 py-1 rounded bg-[#18181b] text-gray-200 border border-gray-600 text-sm" required />
      <label htmlFor="name">Name</label>
      
    </div>
    <div className="mobile relative">
      <input name="mobile" value={form.mobile} onChange={onChange} placeholder=" "  className="flex-1 px-2 py-1 rounded bg-[#18181b] text-gray-200 border border-gray-600 text-sm" required />
      <label htmlFor="mobile">Mobile</label>
    </div>
    <div className="address flex flex-col gap-2">
   <div className="flex justify-between gap-2">
       <div className="hNo relative w-full ">
        <input name="H.no" value={form["H.no"]} onChange={onChange} placeholder=" "  className="px-2 py-1 rounded bg-[#18181b] text-gray-200 border border-gray-600 text-sm" required />
        <label htmlFor="H.no">H.no</label>
      </div>
     
      <div className="city relative w-full">
        <input name="city" value={form.city} onChange={onChange} placeholder=" " className="px-2 py-1 rounded bg-[#18181b] text-gray-200 border border-gray-600 text-sm" required />
        <label htmlFor="city">City</label>
      </div>
   </div>
   
      <div className="state relative ">
        <input name="state" value={form.state} onChange={onChange} placeholder=" " className="px-2 py-1 rounded bg-[#18181b] text-gray-200 border border-gray-600 text-sm" required />
        <label htmlFor="state">State</label>
      </div>
      <div className="flex justify-between gap-2">
      <div className="zipCode relative w-full">
        <input name="zipCode" value={form.zipCode} onChange={onChange} placeholder=" " className="px-2 py-1 rounded bg-[#18181b] text-gray-200 border border-gray-600 text-sm" required />
        <label htmlFor="zipCode">Zip Code</label>
      </div>
       <div className="tag relative w-full">
      <input name="tag" value={form.tag} onChange={onChange} placeholder=" " className="px-2 py-1 rounded bg-[#18181b] text-gray-200 border border-gray-600 text-sm" required />
      <label htmlFor="tag">Tag (e.g. HOME, WORK)</label>
    </div>
    </div>
      
       <div className="appartment relative">
        <input name="apartment" value={form.apartment} onChange={onChange} placeholder=" " className="px-2 py-1 rounded bg-[#18181b] text-gray-200 border border-gray-600 text-sm" required />
        <label htmlFor="apartment">Apartment/Near By</label>
      </div>
    </div>
   
    <div className="flex gap-2 justify-end mt-2">
      <button type="button" className="px-3 py-1 rounded bg-gray-600 text-white text-sm" style={{background:"#bd2d2d"}} onClick={onCancel}>Cancel</button>
      <button type="submit" className="px-3 py-1 rounded  text-white text-sm" style={{background:"#18181b"}}>Save</button>
    </div>
  </Form>
);

export default AddressForm;
