import React from "react";
import Title from "../components/Title";
const About = () => {
  return (
    <div className="px-4 sm:px-8 lg:px-16 py-12 bg-white text-gray-700">
      {/* Page Header */}
      <div className="text-center border-t pt-8">
        <Title text1="About" text2="Us" />
      </div>

      {/* Main About Section */}
      <div className="my-12 flex flex-col md:flex-row gap-12 items-center">
        <img
          className="w-full md:max-w-[500px] rounded shadow-md"
          src="https://images.unsplash.com/photo-1551434678-e076c223a692"
          alt="About Us"
        />
        <div className="flex flex-col justify-center gap-6 md:w-1/2 text-gray-600 text-base leading-relaxed">
          <p>
            Welcome to our store! We're passionate about delivering high-quality products with unbeatable customer service. Our mission is to make shopping simple, enjoyable, and reliable.
          </p>
          <p>
            Our dedicated team works around the clock to bring you the latest trends, exclusive deals, and the best shopping experience possible.
          </p>
          <p className="text-gray-800 font-semibold">
            We believe in quality, trust, and satisfaction — every single time.
          </p>
          <p>
            Whether you're here to find something special or just browsing, we’re honored to be your go-to destination.
          </p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="text-center my-12">
        <Title text1="Why" text2="Choose Us" />
      </div>

      <div className="grid md:grid-cols-3 gap-8 text-center text-gray-600 text-sm sm:text-base">
        <div className="p-6 border rounded shadow-sm hover:shadow-md transition duration-300">
          <h3 className="text-xl font-semibold mb-2 text-gray-800">Quality Products</h3>
          <p>We offer only the best, carefully curated items that meet our strict quality standards.</p>
        </div>
        <div className="p-6 border rounded shadow-sm hover:shadow-md transition duration-300">
          <h3 className="text-xl font-semibold mb-2 text-gray-800">Fast & Secure Shipping</h3>
          <p>Your orders are processed quickly and shipped securely so you can shop with confidence.</p>
        </div>
        <div className="p-6 border rounded shadow-sm hover:shadow-md transition duration-300">
          <h3 className="text-xl font-semibold mb-2 text-gray-800">Customer Support</h3>
          <p>Our support team is always here to help — before, during, and after your purchase.</p>
        </div>
      </div>







    </div>
  );
};

export default About;
