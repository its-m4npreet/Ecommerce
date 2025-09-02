
import React, { useState } from "react";
import { FaQuestionCircle, FaShippingFast, FaUndo, FaLock, FaUser, FaEnvelope } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { MdAddCall } from "react-icons/md";

const faqData = [
  {
    question: "How do I place an order?",
    answer: "Simply browse products, add to cart, and proceed to checkout. Follow the on-screen instructions to complete your purchase.",
  },
  {
    question: "What payment methods are accepted?",
    answer: "We accept credit/debit cards, UPI, net banking, and cash on delivery.",
  },
  {
    question: "How can I track my order?",
    answer: "After your order ships, you’ll receive a tracking link via email and in your account dashboard.",
  },
  {
    question: "How do I return an item?",
    answer: "Visit the Returns section in your account or contact support. We offer easy returns within 7 days of delivery.",
  },
  {
    question: "Is my payment information secure?",
    answer: "Yes, all payments are encrypted and processed securely.",
  },
];

export const Help = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (idx) => {
    setOpenFAQ(openFAQ === idx ? null : idx);
    console.log(openFAQ);
    console.log(openFAQ === idx);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex flex-col items-center py-8 px-4">
      <div className="max-w-3xl w-full text-center mb-10">
        <h1 className="text-4xl font-extrabold text-blue-400 mb-4 flex items-center justify-center gap-2">
          <FaQuestionCircle className="inline text-blue-300" /> Help Center
        </h1>
      <p className="text-lg text-gray-200 mb-6 font-medium">
        Need assistance? Find answers to common questions, guides, and ways to contact our support team below.
      </p>
    </div>

    {/* FAQ Section */}
    <div className="max-w-4xl w-full mb-10">
      <h2 className="text-2xl font-bold text-blue-400 mb-4">Frequently Asked Questions</h2>
      <ul className="space-y-4 text-left">
        {faqData.map((faq, idx) => (
          <li
            key={idx}
            className={`border border-blue-400 rounded-lg p-4 bg-gray-800 transition-all duration-200 ${openFAQ === idx ? 'shadow-lg' : ''}`}
          >
            <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleFAQ(idx)}>
              <span className="font-semibold text-white">{faq.question}</span>
              <span className="ml-4 text-blue-300 text-2xl">
                {openFAQ === idx ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </span>
            </div>
            {openFAQ === idx && (
              <p className="text-gray-200 mt-3 animate-fade-in">
                {faq.answer}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>

    {/* Info Cards Section */}
    <div className="max-w-5xl w-full mb-10 flex flex-wrap gap-6 justify-center">
      {/* Order & Shipping */}
      <div className="flex-1 min-w-[260px] max-w-xs border border-blue-400 rounded-2xl bg-gray-800 p-6 mb-2 shadow-lg">
        <h2 className="text-xl font-bold text-blue-400 mb-3 flex items-center gap-2"><FaShippingFast /> Order & Shipping</h2>
        <ul className="list-disc list-inside text-gray-200 space-y-2">
          <li>Fast & free delivery across India on all orders.</li>
          <li>Track your order status in your account or via email link.</li>
          <li>Estimated delivery: 2-7 business days.</li>
        </ul>
      </div>
      {/* Returns & Refunds */}
      <div className="flex-1 min-w-[260px] max-w-xs border border-blue-400 rounded-2xl bg-gray-800 p-6 mb-2 shadow-lg">
        <h2 className="text-xl font-bold text-blue-400 mb-3 flex items-center gap-2"><FaUndo /> Returns & Refunds</h2>
        <ul className="list-disc list-inside text-gray-200 space-y-2">
          <li>Easy returns within 7 days of delivery.</li>
          <li>Refunds processed within 3-5 business days after approval.</li>
          <li>Contact support for help with returns.</li>
        </ul>
      </div>
      {/* Payment & Security */}
      <div className="flex-1 min-w-[260px] max-w-xs border border-blue-400 rounded-2xl bg-gray-800 p-6 mb-2 shadow-lg">
        <h2 className="text-xl font-bold text-blue-400 mb-3 flex items-center gap-2"><FaLock /> Payment & Security</h2>
        <ul className="list-disc list-inside text-gray-200 space-y-2">
          <li>Multiple payment options: cards, UPI, net banking, COD.</li>
          <li>All transactions are encrypted and secure.</li>
        </ul>
      </div>
      {/* Account & Login Help */}
      <div className="flex-1 min-w-[260px] max-w-xs border border-blue-400 rounded-2xl bg-gray-800 p-6 mb-2 shadow-lg">
        <h2 className="text-xl font-bold text-blue-400 mb-3 flex items-center gap-2"><FaUser /> Account & Login Help</h2>
        <ul className="list-disc list-inside text-gray-200 space-y-2">
          <li>Create an account for faster checkout and order tracking.</li>
          <li>Forgot password? Use the "Forgot Password" link on the login page.</li>
          <li>Update your details anytime in your account settings.</li>
        </ul>
      </div>

    {/* Contact Support */}
    <div className="flex-1 min-w-[260px] max-w-xs border border-blue-400 rounded-2xl bg-gradient-to-br from-gray-800 via-gray-900 to-blue-950 p-7 mb-2 shadow-xl flex flex-col items-center">
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-900 mb-3 shadow-md">
        <FaEnvelope className="text-4xl text-amber-100" />
      </div>
      <h2 className="text-xl font-extrabold text-blue-400 mb-2 text-center tracking-wide">Contact Support</h2>
      <div className="flex flex-col gap-3 w-full mb-4 mt-2">
        <a href="mailto:support@eshop.com" className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition shadow">
          <FaEnvelope className="text-lg" /> Email Support
        </a>
        <a href="tel:+911234567890" className="flex items-center justify-center gap-2 bg-white/10 hover:bg-blue-600 hover:text-white text-blue-400 font-bold py-2 px-4 rounded-lg border border-blue-400 transition shadow">
          <MdAddCall className="text-lg" /> Call Us
        </a>
      </div>
      <p className="text-gray-400 text-sm text-center">Support hours: <span className="text-blue-300">9am – 9pm IST</span>, 7 days a week</p>
    </div>
        </div>


    {/* Policies & Terms */}
    <div className="max-w-4xl w-full mb-10 text-center">
      <h2 className="text-2xl font-bold text-blue-400 mb-4">Policies & Terms</h2>
      <div className="flex flex-wrap gap-4 justify-center">
        <a href="/privacy" className="underline text-amber-100 hover:text-blue-200">Privacy Policy</a>
        <a href="/terms" className="underline text-amber-100 hover:text-blue-200">Terms of Service</a>
        <a href="/returns" className="underline text-amber-100 hover:text-blue-200">Return Policy</a>
      </div>
    </div>
  </div>
);
};

export default Help;
