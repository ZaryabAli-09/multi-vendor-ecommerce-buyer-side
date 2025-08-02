// FAQs.js
import React, { useState } from "react";
import { Link } from "react-router-dom";

function FAQs() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How do I place an order?",
      answer:
        "Browse our products, add items to your cart, and proceed to checkout. You'll need to create an account. Follow the steps to enter your shipping and payment information to complete your purchase.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept stripe payments and cash on delivery system for now.",
    },
    {
      question: "How can I become a seller on SmartStyler?",
      answer:
        "Click on 'Become a Seller' in the footer or navigation menu. You'll need to complete an application form with your business details. Once approved, you can set up your store, upload products, and start selling.",
    },
    {
      question: "What is your return policy?",
      answer:
        "Each seller sets their own return policy, which you can chat with seller or find on the product page. Most sellers accept returns within 14-30 days of delivery, provided items are unused and in original condition. Contact the seller directly to initiate a return.",
    },
    {
      question: "How do I track my order?",
      answer:
        "Once your order ships, you'll receive a confirmation email with tracking information. You can also view your order status and tracking information by logging into your account and visiting the 'My Orders' section.",
    },
    {
      question: "How does SmartStyler protect my personal information?",
      answer:
        "We use industry-standard encryption for all data transmission and storage. Your payment information is processed through secure payment gateways and we never store full credit card details on our servers. Please see our Privacy Policy for more details.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Frequently Asked Questions
      </h1>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-200"
          >
            <button
              className={`w-full px-5 py-4 text-left flex justify-between items-center ${
                activeIndex === index ? "bg-gray-50" : "hover:bg-gray-50"
              }`}
              onClick={() => toggleFAQ(index)}
            >
              <span className="font-medium text-gray-900">{faq.question}</span>
              <svg
                className={`w-5 h-5 text-gray-500 transform transition-transform ${
                  activeIndex === index ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div
              className={`px-5 pb-4 pt-0 transition-all duration-300 ${
                activeIndex === index ? "block" : "hidden"
              }`}
            >
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-blue-50 border border-blue-100 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-3 text-blue-800">
          Still have questions?
        </h2>
        <p className="text-blue-700 mb-4">
          We're here to help! Contact our support team for assistance.
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition">
          <Link to="/support" className="text-white">
            Contact Support
          </Link>
        </button>
      </div>
    </div>
  );
}

export default FAQs;
