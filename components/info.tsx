"use client";

import { ShoppingCart } from "lucide-react";
import { BiLogoMessenger, BiLogoWhatsapp } from "react-icons/bi";
import Currency  from "@/components/ui/currency";
import Button from "@/components/ui/Button";
import { Product, ProductColors, ProductSizes } from "@/types";
import useCart from "@/hooks/use-cart";
import IconButton  from "@/components/ui/icon-button";
import useMessage from "@/components/ui/open-Messenger";
import useMessageW from "@/components/ui/open-wapp";
import { MouseEventHandler, useState } from "react";
import Image from "next/image";



interface InfoProps {
  data: Product
};

const Info: React.FC<InfoProps> = ({ data }) => {
  const cart = useCart();
  const message = useMessage()
  const messageW= useMessageW()
  
  const onAddToCart = () => {
    cart.addItem(data);
  }
  const onOpenMessnger: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    message.addItemToMessenger(data);
  };
  const onOpenWhatsapp: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    messageW.addItemToWapp(data);
  };
  const [selectedSize, setSelectedSize] = useState<string>(data.sizes[0].size.name);
  const [selectedColor, setSelectedColor] = useState<string>(data.colors[0].color.name);
  
  const setColor = (color: string): void => {
    setSelectedColor(color);
    cart.setColor(data.id, color)
  };
  const setSize = (size: string): void => {
    cart.setBoughtSize(data.id, size)
    setSelectedSize(size);
  };

  cart.setColor(data.id, data.colors[0].color.name)
  cart.setBoughtSize(data.id, data.sizes[0].size.name)


  return (
    <div className="bg-white shadow-md p-4 sm:p-6 md:p-8 lg:p-10 rounded-lg">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">{data?.name}</h1>
      <div className="mt-2 sm:mt-4 flex items-center justify-between">
        <p className="text-lg md:text-2xl lg:text-3xl text-gray-900">
          <Currency value={data?.price} />
        </p>
      </div>
  
      <hr className="my-4" />
  
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
     
  
        <div className="flex items-center gap-2">
  <h3 className="font-semibold text-black">Colors:</h3>
  <select
    value={selectedColor || ''}
    onChange={(e) => setColor(e.currentTarget.value)}
    className="rounded-full border-spacing-1 border bg-white"
  >
    <option value="" disabled>
      Select Color
    </option>
    {data.colors.map((color: ProductColors) => (
      <option key={color.colorId} value={color.color?.name}>
        {color.color?.name}
      </option>
    ))}
  </select>
</div>

        <div className="flex items-center gap-2">
      <h3 className="font-semibold text-black">Sizes:</h3>
      <select
        value={selectedSize || ''}

          onChange={(e) => setSize(e.currentTarget.value)}
        
        className="rounded-full border-spacing-1 border bg-white"
      >
        <option value="" disabled>
          Select Size
        </option>
        {data.sizes.map((size: ProductSizes) => (
          <option key={size.sizeId} value={size.size?.value}>
            {size.size?.value}
          </option>
        ))}
      </select>
    </div>

        <div className="flex items-center gap-2">
        <h3 className="font-semibold text-black">Sasia ne gjendje:</h3>
          <div>{data?.quantity}</div>
        </div>
      </div>
  
      <div className="mt-6">
        <h3 className="font-semibold text-black">Pershkrimi:</h3>
        <div>{data?.description}</div>
        
      </div>
      
      <hr className="my-4" />
      <div className="mt-6">
        <h3 className="font-semibold text-gray-700 italic">Posta:</h3>
        <div className="text-sm italic text-gray-400">Nese shuma kalon 4000 Leke posta eshte falas, ne rast te kundert kushton 300Leke</div>
      </div>
      <div className="mt-6">
        <h3 className="font-semibold text-gray-700 italic">Dergesa:</h3>
        <div className="text-sm italic text-gray-400">Dergesa kryhet brenda 72-96 oreve! Brenda 3 diteve te punes , 
          ose ne rast festash mund te vonohet pak me shume! </div>
      </div>
      <div className="mt-6">
        <h3 className="font-semibold text-gray-700 italic">Kthime:</h3>
        <div className="text-sm italic text-gray-400">Zevendesimi i produktit mund te behet brenda 5 diteve,sipas marrveshjes. 
          Klienti eshte pergjegjes per kostot e kthimit dhe ridergeses!</div>
      </div>
      <div className="mt-6">
        <h3 className="font-semibold text-gray-700 italic">Pagesa:</h3>
        
          <Image
          alt="payments"
          src="/images/pm2.png"
          height={120}
          width={200}
          /> 
    
      </div>

      <div className="mt-8 flex gap-3 flex-col sm:flex-row items-center justify-between">
      <button onClick={onAddToCart} className="bg-blue-500 text-white hover:bg-blue-600 px-4 md:px-6 py-2 md:py-3 rounded-md transition mb-2 sm:mb-0">
        <span className="flex items-center gap-2">
          Add To Cart
          <ShoppingCart size={20} className="text-white" />
        </span>
      </button>
      <div className="flex gap-3 ">
        <button onClick={onOpenMessnger} className="bg-blue-500 text-white hover:bg-blue-600 px-4 md:px-6 py-2 md:py-3 rounded-md transition">
          <span className="flex items-center gap-2">
            Porosit Messenger
            <BiLogoMessenger size={25} className="text-white" />
          </span>
        </button>
        <button onClick={onOpenWhatsapp} className="bg-green-500 text-white hover:bg-green-600 px-4 md:px-6 py-2 md:py-3 rounded-md transition">
          <span className="flex items-center gap-2">
          Porosit WhatsApp
            <BiLogoWhatsapp size={25} className="text-white" />
          </span>
        </button>
      </div>
    </div>
  </div>
  );
  }
export default Info;