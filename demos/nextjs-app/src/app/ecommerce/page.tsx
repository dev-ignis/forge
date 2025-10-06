'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ForgeCard,
  ForgeButton,
  ForgeBadge,
  ForgeIcon,
  ForgeInput,
  ForgeSelect,
  ForgeModal,
  ForgeAlert,
} from '@nexcraft/forge/integrations/react';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  stock: number;
  description: string;
}

interface CartItem extends Product {
  quantity: number;
}

export default function EcommercePage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [category, setCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const products: Product[] = [
    {
      id: 1,
      name: 'Premium Headphones',
      price: 299.99,
      image: '🎧',
      category: 'electronics',
      rating: 4.5,
      stock: 15,
      description: 'High-quality wireless headphones with noise cancellation',
    },
    {
      id: 2,
      name: 'Smart Watch',
      price: 399.99,
      image: '⌚',
      category: 'electronics',
      rating: 4.8,
      stock: 8,
      description: 'Advanced fitness and health tracking smartwatch',
    },
    {
      id: 3,
      name: 'Laptop Bag',
      price: 79.99,
      image: '💼',
      category: 'accessories',
      rating: 4.3,
      stock: 25,
      description: 'Durable and stylish laptop backpack',
    },
    {
      id: 4,
      name: 'Wireless Mouse',
      price: 49.99,
      image: '🖱️',
      category: 'accessories',
      rating: 4.6,
      stock: 50,
      description: 'Ergonomic wireless mouse with precision tracking',
    },
    {
      id: 5,
      name: 'Mechanical Keyboard',
      price: 149.99,
      image: '⌨️',
      category: 'accessories',
      rating: 4.9,
      stock: 12,
      description: 'RGB mechanical keyboard with custom switches',
    },
    {
      id: 6,
      name: 'USB-C Hub',
      price: 89.99,
      image: '🔌',
      category: 'electronics',
      rating: 4.4,
      stock: 30,
      description: 'Multi-port USB-C hub with power delivery',
    },
  ];

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory = category === 'all' || product.category === category;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Shop</h1>
            <p className="text-gray-600 mt-1">Discover amazing products</p>
          </div>

          <div className="flex items-center gap-3">
            <ForgeButton
              variant="secondary"
              onClick={() => setShowCart(true)}
              className="relative"
            >
              <ForgeIcon name="shopping-cart" className="w-5 h-5 mr-2" />
              Cart
              {cartItemCount > 0 && (
                <ForgeBadge
                  variant="error"
                  className="absolute -top-2 -right-2 min-w-[20px] h-5 flex items-center justify-center"
                >
                  {cartItemCount}
                </ForgeBadge>
              )}
            </ForgeButton>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <ForgeInput
            placeholder="Search products..."
            value={searchQuery}
            onChange={(value) => setSearchQuery(value as string)}
            className="flex-1"
          />
          <ForgeSelect
            value={category}
            onChange={(value) => setCategory(value as string)}
            className="sm:w-48"
          >
            <option value="all">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="accessories">Accessories</option>
          </ForgeSelect>
        </div>

        {/* Products Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <ForgeCard className="p-6 h-full flex flex-col">
                {/* Product Image */}
                <div className="text-6xl mb-4 text-center">{product.image}</div>

                {/* Product Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                    <ForgeBadge variant="success">{product.category}</ForgeBadge>
                  </div>

                  <p className="text-sm text-gray-600 mb-3">{product.description}</p>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-yellow-500">★</span>
                    <span className="text-sm font-medium">{product.rating}</span>
                    <span className="text-sm text-gray-500">• {product.stock} in stock</span>
                  </div>
                </div>

                {/* Price and CTA */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <span className="text-2xl font-bold text-gray-900">
                    ${product.price}
                  </span>
                  <ForgeButton
                    variant="primary"
                    size="sm"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </ForgeButton>
                </div>
              </ForgeCard>
            </motion.div>
          ))}
        </motion.div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No products found</p>
          </div>
        )}
      </div>

      {/* Cart Modal */}
      <ForgeModal open={showCart} onClose={() => setShowCart(false)} size="lg" title="Shopping Cart">
        <div className="p-6">
          {cart.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">Your cart is empty</p>
              <ForgeButton variant="secondary" onClick={() => setShowCart(false)}>
                Continue Shopping
              </ForgeButton>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="text-3xl">{item.image}</div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{item.name}</h4>
                      <p className="text-sm text-gray-600">${item.price}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <ForgeButton
                        variant="ghost"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        -
                      </ForgeButton>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <ForgeButton
                        variant="ghost"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </ForgeButton>
                    </div>
                    <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                    <ForgeButton
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <ForgeIcon name="trash" className="w-4 h-4" />
                    </ForgeButton>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-2xl font-bold text-gray-900">
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>
                <ForgeButton variant="primary" className="w-full">
                  Proceed to Checkout
                </ForgeButton>
              </div>
            </>
          )}
        </div>
      </ForgeModal>
    </div>
  );
}
