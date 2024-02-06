import { create } from 'zustand';
import { toast } from 'react-hot-toast';
import { persist, createJSONStorage } from "zustand/middleware"; 

import { Product } from '@/types';

interface ProductCart extends Product {
  boughtColor: string; // Property for the individual product's bought color
  boughtSize: string;  // Property for the individual product's bought size
}

interface CartStore {
  items: ProductCart[];
  addItem: (data: Product) => void;
  removeItem: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  getQuantity: (id: string) => number;
  setColor: (id: string, color: string) => void;
  getColor: (id: string) => string;
  setBoughtSize: (id: string, size: string) => void;
  getSize: (id: string) => string;
  removeAll: () => void;
}

const useCart = create(
  persist<CartStore>((set, get) => ({
    items: [],
    addItem: (data: Product) => {
      const currentItems = get().items;
      const existingItemIndex = currentItems.findIndex((item) => item.id === data.id);

      if (existingItemIndex !== -1) {
        // If the item already exists, increment its quantity
        const updatedItems = [...currentItems];
        updatedItems[existingItemIndex].quantity += 1;
        set({ items: updatedItems });
        toast.success('Item quantity updated in cart.');
      } else {
        // If the item doesn't exist, add it with a quantity of 1
        const newProduct: ProductCart = {
          ...data,
          quantity: 1,
          boughtColor: '',  // You might want to initialize these properties
          boughtSize: '',   // with appropriate default values
        };
        set({ items: [...currentItems, newProduct] });
        toast.success('Item added to cart.');
      }
    },
    removeItem: (id: string) => {
      set({ items: [...get().items.filter((item) => item.id !== id)] });
      toast.success('Item removed from cart.');
    },
    removeAll: () => set({ items: [] }),
    increaseQuantity: (id: string) => {
      const updatedItems = get().items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      );
      set({ items: updatedItems });
    },
    decreaseQuantity: (id: string) => {
      const updatedItems = get().items.map((item) =>
        item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      );
      set({ items: updatedItems });
    },
    getQuantity: (id: string) => {
      const item = get().items.find((item) => item.id === id);
      return item ? item.quantity : 0;
    },
    setColor: (id: string, color: string) => {
      const updatedItems = get().items.map((item) =>
        item.id === id ? { ...item, boughtColor: color } : item
      );
      console.log(id, color)
      set({ items: updatedItems });
    },
    getColor: (id: string) => {
      const item = get().items.find((item) =>
        item.id === id
      );
      return item!.boughtColor
    },
    getSize: (id: string) => {
      const item = get().items.find((item) =>
        item.id === id
      );
      console.log(item)
      return item!.boughtSize
    },
    setBoughtSize: (id: string, size: string) => {
      const updatedItems = get().items.map((item) =>
        item.id === id ? { ...item, boughtSize: size } : item
      );
      set({ items: updatedItems });
    },
  }), {
    name: 'cart-storage',
    storage: createJSONStorage(() => localStorage),
  })
);
export default useCart;
