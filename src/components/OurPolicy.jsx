import React from 'react';
import { FcCustomerSupport } from "react-icons/fc";

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row items-center justify-around gap-6 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-gray-900'>
      <FcCustomerSupport  className="text-3xl mb-2 sm:mb-0" />
      <div>
        <p className='font-semibold mb-1'>OUR POLICY</p>
        <p className='text-gray-600 max-w-xs'>
        We offer 24/7 customer suppot and free shipping on all orders.
        </p>
      </div>
    </div>
  );
};

export default OurPolicy;
