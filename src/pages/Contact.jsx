import React, { useState } from 'react';
import Title from '../components/Title';

const faqs = [
  {
    question: "Where is my order?",
    answer:
      "Track your order by logging in and checking 'My Orders'. You’ll also receive tracking details by email when it's shipped.",
  },
  {
    question: "How do I return an item?",
    answer:
      "Visit our Returns Center, enter your order details, and follow the instructions to print a return label.",
  },
  {
    question: "Payment not going through?",
    answer:
      "Please verify your payment details and try another method. Contact your bank if the issue persists.",
  },
  {
    question: "Store locations nearby",
    answer:
      "Use our Store Locator to find the nearest location, see hours, and get directions.",
  },
];

const Contact = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [query, setQuery] = useState('');
  const [feedback, setFeedback] = useState('');

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for your feedback!");
    setFeedback('');
    // TODO: Send feedback to backend or third-party service
  };

  return (
    <div className="bg-white px-4 sm:px-8 lg:px-24 py-12 text-gray-700">
      {/* Header */}
      <div className="text-center border-t pt-8">
        <Title text1="Contact" text2="Us" />
        <p className="mt-2 text-sm text-gray-500">
          Search FAQs or reach out to our support team
        </p>
      </div>

      {/* FAQ Search */}
      <div className="my-8 max-w-xl mx-auto">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value.toLowerCase())}
          placeholder="Search help topics"
          className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring focus:border-black"
        />
      </div>

      {/* FAQ Accordion */}
      <div className="max-w-2xl mx-auto mb-12">
        {faqs
          .filter((item) =>
            item.question.toLowerCase().includes(query)
          )
          .map((item, index) => (
            <div key={index} className="mb-4 border-b pb-2">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left text-gray-800 font-medium text-base hover:text-black flex justify-between items-center"
              >
                <span>• {item.question}</span>
                <span className="text-xl">
                  {activeIndex === index ? '−' : '+'}
                </span>
              </button>
              {activeIndex === index && (
                <p className="mt-2 text-sm text-gray-600">{item.answer}</p>
              )}
            </div>
          ))}
      </div>

      <hr />

      {/* Contact Form */}
      <div className="mt-12 max-w-xl mx-auto">
        <h2 className="text-lg font-medium text-gray-800 mb-4">Still need help?</h2>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="First & Last Name*"
            required
            className="w-full p-3 border border-gray-300 rounded"
          />
          <input
            type="email"
            placeholder="Email Address*"
            required
            className="w-full p-3 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Order Number (if applicable)"
            className="w-full p-3 border border-gray-300 rounded"
          />
          <textarea
            placeholder="Describe your issue*"
            required
            rows={5}
            className="w-full p-3 border border-gray-300 rounded resize-none"
          />
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition"
          >
            Submit
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-500">
          Our support team typically responds within 24 hours.
        </p>
      </div>

      {/* Feedback Form */}
      <div className="mt-16 max-w-xl mx-auto bg-gray-50 p-6 rounded shadow-sm text-center">
        <p className="mb-2 text-gray-600">Your feedback matters to us.</p>
        <form onSubmit={handleFeedbackSubmit}>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows="3"
            placeholder="Let us know how we can improve..."
            className="w-full p-2 border border-gray-300 rounded mb-2"
            required
          />
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
