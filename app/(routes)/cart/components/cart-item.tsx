import Image from "next/image";
import { toast } from "react-hot-toast";
import { X } from "lucide-react";

import IconButton from "@/components/ui/icon-button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { Product } from "@/types";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/input-vatiant";
import React, { useState } from "react";

interface CartItemProps {
  data: Product;
}

const CartItem: React.FC<CartItemProps> = ({ data }) => {
  const cart = useCart();
  const [quantity, setQuantity] = useState(cart.getQuantity(data.id) || 0);
  const onRemove = () => {
    cart.removeItem(data.id);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity >= 1 && newQuantity <= 1000) {
      setQuantity(newQuantity); // Update the quantity in the component's state
    }
  };

const itemtotal = data.price* data.quantity ;
  return (
    <li className="flex py-6 border-b">
      <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
        <Image
          fill
          src={data.images[0].url}
          alt=""
          className="object-cover object-center"
        />
      </div>
      <div className="ml-4 flex flex-1 flex-col justify-between">
        <div className="flex justify-between items-center mb-2">
          <p className="text-lg font-semibold text-black">{data?.name}</p>
          <IconButton onClick={onRemove} icon={<X size={15} />} />
        </div>
        <div className="text-sm font-italic text-gray-800 mb-2 px-9">
           {data.description} 
        </div>
        <div className="text-sm font-italic text-gray-500 mb-2">
          {/* Sasia ne gjendje: {data.quantity}  */}
        </div>
        <div className="flex items-center text-sm mb-2">
           <p className="text-gray-500">Color: {cart.getColor(data.id)}</p>
          <p className="ml-4 text-gray-500">SIZE: {cart.getSize(data.id)}</p> 
        </div>
        <div className="flex items-center text-lg font-semibold text-black">
          <span className="mr-2">Cmimi:</span>
          <Currency value={data.price} />  <span className="text-red-700" > x </span>{data.quantity}cope <span className="text-red-700"> = </span> ALL {itemtotal}
        </div>
        <div className="flex items-center mt-4">
          <h2 className="text-sm font-medium text-foreground mr-2">Sasia</h2>
          <div className="flex">
            <form className="max-w-xs mx-auto">
              <label
                htmlFor="quantity-input"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Zgjidh Sasine:
              </label>
              <div className="relative flex items-center max-w-[8rem]">
                <button
                  type="button"
                  id="decrement-button"
                  data-input-counter-decrement="quantity-input"
                  onClick={() => cart.decreaseQuantity(data.id)}
                  className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                >
                  <svg
                    className="w-3 h-3 text-gray-900 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 2"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 1h16"
                    />
                  </svg>
                </button>
                <input
                  type="text"
                  id="quantity-input"
                  data-input-counter
                  aria-describedby="helper-text-explanation"
                  className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="1"
                  value={data.quantity}
                  required
                />
                <button
                  type="button"
                  id="increment-button"
                  data-input-counter-increment="quantity-input"
                  onClick={() => cart.increaseQuantity(data.id)}
                  className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                >
                  <svg
                    className="w-3 h-3 text-gray-900 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 18"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 1v16M1 9h16"
                    />
                  </svg>
                </button>
              </div>
              <p
                id="helper-text-explanation"
                className="mt-2 text-sm text-gray-500 dark:text-gray-400"
              >
                Percaktoni sasine qe doni te blini .
              </p>
            </form>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
