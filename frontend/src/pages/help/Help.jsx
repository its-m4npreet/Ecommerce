
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
    <div className="min-h-screen bg-[#18181b] flex flex-col items-center py-10 px-4 font-sans">
      <div className="max-w-2xl w-full text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-blue-400 mb-4 flex items-center justify-center gap-2">
          <FaQuestionCircle className="inline text-blue-400" /> Help Center
        </h1>
        <p className="text-base md:text-lg text-gray-200 mb-6 font-normal">
          Need assistance? Find answers to common questions, guides, and ways to contact our support team below.
        </p>
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl w-full mb-12">
        <h2 className="text-xl font-bold text-blue-400 mb-4">Frequently Asked Questions</h2>
        <ul className="space-y-4 text-left">
          {faqData.map((faq, idx) => (
            <li
              key={idx}
              className={`border border-gray-700 rounded-lg p-4 bg-[transparent] transition-all duration-200 ${openFAQ === idx ? 'shadow-lg' : ''}`}
            >
              <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleFAQ(idx)}>
                <span className="font-semibold text-white text-base">{faq.question}</span>
                <span className="ml-4 text-blue-400 text-2xl">
                  {openFAQ === idx ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </span>
              </div>
              {openFAQ === idx && (
                <p className="text-gray-300 mt-3 animate-fade-in text-sm">
                  {faq.answer}
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
                {/* Cards Description Section */}
                <div className="max-w-3xl w-full mb-10 text-center">
                  <p className="text-gray-300 text-base md:text-lg mb-2">
                    Explore the sections below for quick help on orders, shipping, returns, payments, account management, and contacting our support team.
                  </p>
                  <p className="text-gray-400 text-sm">
                    Each card provides essential information and guidance to ensure a smooth shopping experience.
                  </p>
                </div>

      {/* Info Cards Section */}
      <div className="max-w-5xl w-full mb-12 flex flex-wrap gap-6 justify-center">
        {/* Order & Shipping */}
        <div className="flex-1 min-w-[240px] max-w-xs border border-gray-700 rounded-2xl bg-[transparent] p-6 mb-2 shadow-md">
          <h2 className="text-lg font-bold text-blue-400 mb-3 flex items-center gap-2"><FaShippingFast /> Order & Shipping</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm">
            <li>Fast & free delivery across India on all orders.</li>
            <li>Track your order status in your account or via email link.</li>
            <li>Estimated delivery: 2-7 business days.</li>
          </ul>
        </div>
        {/* Returns & Refunds */}
        <div className="flex-1 min-w-[240px] max-w-xs border border-gray-700 rounded-2xl bg-[transparent] p-6 mb-2 shadow-md">
          <h2 className="text-lg font-bold text-blue-400 mb-3 flex items-center gap-2"><FaUndo /> Returns & Refunds</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm">
            <li>Easy returns within 7 days of delivery.</li>
            <li>Refunds processed within 3-5 business days after approval.</li>
            <li>Contact support for help with returns.</li>
          </ul>
        </div>
        {/* Payment & Security */}
        <div className="flex-1 min-w-[240px] max-w-xs border border-gray-700 rounded-2xl bg-[transparent] p-6 mb-2 shadow-md">
          <h2 className="text-lg font-bold text-blue-400 mb-3 flex items-center gap-2"><FaLock /> Payment & Security</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm">
            <li>Multiple payment options: cards, UPI, net banking, COD.</li>
            <li>All transactions are encrypted and secure.</li>
          </ul>
        </div>
        {/* Account & Login Help */}
        <div className="flex-1 min-w-[240px] max-w-xs border border-gray-700 rounded-2xl bg-[transparent] p-6 mb-2 shadow-md">
          <h2 className="text-lg font-bold text-blue-400 mb-3 flex items-center gap-2"><FaUser /> Account & Login Help</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm">
            <li>Create an account for faster checkout and order tracking.</li>
            <li>Forgot password? Use the "Forgot Password" link on the login page.</li>
            <li>Update your details anytime in your account settings.</li>
          </ul>
        </div>

        {/* Contact Support */}
        <div className="flex-1 min-w-[240px] max-w-xs border border-gray-700 rounded-2xl bg-[transparent] p-7 mb-2 shadow-lg flex flex-col items-center">
          <div className="flex items-center justify-center w-14 h-14 rounded-full border border-gray-700 mb-3 shadow-md">
            <FaEnvelope className="text-3xl text-white" />
          </div>
          <h2 className="text-lg font-extrabold text-blue-400 mb-2 text-center tracking-wide">Contact Support</h2>
          <div className="flex flex-col gap-3 w-full mb-4 mt-2">
            <a href="mailto:support@eshop.com" className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition shadow">
              <FaEnvelope className="text-base" /> Email Support
            </a>
            <a href="tel:+911234567890" className="flex items-center justify-center gap-2 bg-[transparent] hover:bg-blue-600 hover:text-white text-blue-400 font-bold py-2 px-4 rounded-lg border border-blue-400 transition shadow">
              <MdAddCall className="text-base" /> Call Us
            </a>
          </div>
          <p className="text-gray-400 text-xs text-center">Support hours: <span className="text-blue-300">9am – 9pm IST</span>, 7 days a week</p>
        </div>
      </div>

      {/* Policies & Terms */}
      <div className="max-w-3xl w-full mb-6 text-center">
        <h2 className="text-lg font-bold text-blue-400 mb-3">Policies & Terms</h2>
        <div className="flex flex-wrap gap-4 justify-center">
          <a href="/privacy" className="underline text-gray-200 hover:text-blue-300">Privacy Policy</a>
          <a href="/terms" className="underline text-gray-200 hover:text-blue-300">Terms of Service</a>
          <a href="/returns" className="underline text-gray-200 hover:text-blue-300">Return Policy</a>
        </div>
      </div>
    </div>
  );
};

export default Help;
