import React from 'react';

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <h1 className="text-2xl font-bold mb-4">Shopify</h1>
          <p className="mb-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">Company</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>About</li>
            <li>Blog</li>
            <li>Careers</li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Contact Us</li>
            <li>+1 (123) 456-7890</li>
            <li>example@gmail.com</li>
          </ul>
        </div>
      </div>
<hr/>
      <p className="py-5 text-sm text-center">© 2023 Shopify. All rights reserved.</p>
    </div>
  );
};

export default Footer;
