import React from 'react';
import { FaHeart, FaArrowLeft } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const EmptyWishPage = () => {

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <FaHeart className="mx-auto h-12 w-12 text-gray-400" aria-hidden="true" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Your cart is empty</h2>
          <p className="mt-2 text-sm text-gray-600">
            Looks like you haven't added any items to your cart yet.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Link to={'/home'}
            href="/shop"
            className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <FaArrowLeft className="mr-2" />
            Continue Shopping
          </Link>
        </motion.div>

      </div>
    </div>
  );
};

export default EmptyWishPage;