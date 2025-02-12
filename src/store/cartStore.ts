import { create } from 'zustand';
import { supabase } from '../lib/supabase';

interface CartItem {
  id: string;
  product_id: string;
  quantity: number;
  product: {
    name: string;
    price: number;
    image_url: string;
  };
}

interface CartStore {
  user: any; // Add user state to the CartStore
  items: CartItem[];
  loading: boolean;
  fetchCart: () => Promise<void>;
  addToCart: (productId: string, quantity: number) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  loading: false,

  fetchCart: async () => {
    set({ loading: true });
    const { data: cartItems, error } = await supabase
      .from('cart_items')
      .select(`
        id,
        product_id,
        quantity,
        product:products (
          name,
          price,
          image_url
        )
      `)
      .order('created_at');

    if (error) {
      console.error('Error fetching cart:', error);
      return;
    }

    // Ensure the product is correctly structured as an object
    const formattedItems = cartItems.map(item => ({
      id: item.id,
      product_id: item.product_id,
      quantity: item.quantity,
      product: item.product[0] // Assuming product is returned as an array
    }));

    set({ items: formattedItems as CartItem[], loading: false });
  },

  addToCart: async (productId: string, quantity: number) => {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) {
      console.error('User not authenticated');
      return;
    }

    const { error } = await supabase
      .from('cart_items')
      .upsert({ 
        product_id: productId,
        quantity,
        user_id: user.id
      });

    if (error) {
      console.error('Error adding to cart:', error);
      return;
    }

    get().fetchCart();
  },

  updateQuantity: async (productId: string, quantity: number) => {
    const { error } = await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('product_id', productId);

    if (error) {
      console.error('Error updating quantity:', error);
      return;
    }

    get().fetchCart();
  },

  removeFromCart: async (productId: string) => {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('product_id', productId);

    if (error) {
      console.error('Error removing from cart:', error);
      return;
    }

    get().fetchCart();
  },

  clearCart: async () => {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .neq('id', '');

    if (error) {
      console.error('Error clearing cart:', error);
      return;
    }

    set({ items: [] });
  },
}));
