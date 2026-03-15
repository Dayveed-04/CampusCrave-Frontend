// utils/cartHelpers.js

/**
 * Cart Management System
 * Stores cart in localStorage with vendor validation
 */

const CART_KEY = "student_cart";

/**
 * Get current cart from localStorage
 */
export const getCart = () => {
  if (typeof window === "undefined") return null;

  try {
    const cartStr = localStorage.getItem(CART_KEY);
    if (!cartStr) return null;

    const cart = JSON.parse(cartStr);
    return cart;
  } catch (error) {
    console.error("Error reading cart:", error);
    return null;
  }
};

/**
 * Save cart to localStorage
 */
const saveCart = (cart) => {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error("Error saving cart:", error);
  }
};

/**
 * Add item to cart
 * Returns: { success: boolean, message: string }
 */
export const addToCart = (item) => {
  try {
    const cart = getCart();

    // Validate item structure
    if (!item.menuId || !item.menuName || !item.vendorId || !item.vendorName) {
      return { success: false, message: "Invalid item data" };
    }

    // Check if cart is empty
    if (!cart) {
      // Create new cart
      const newCart = {
        vendorId: item.vendorId,
        vendorName: item.vendorName,
        items: [item],
        createdAt: new Date().toISOString(),
      };
      saveCart(newCart);
      return { success: true, message: "Item added to cart" };
    }

    // Check if vendor matches
    if (cart.vendorId !== item.vendorId) {
      return {
        success: false,
        message: `Your cart has items from ${cart.vendorName}. Clear cart to order from ${item.vendorName}?`,
        isVendorConflict: true,
        currentVendor: cart.vendorName,
        newVendor: item.vendorName,
      };
    }

    // Check if item already exists
    const existingItemIndex = cart.items.findIndex(
      (cartItem) =>
        cartItem.menuId === item.menuId &&
        JSON.stringify(cartItem.selectedOptions) ===
          JSON.stringify(item.selectedOptions),
    );

    if (existingItemIndex !== -1) {
      // Update quantity
      cart.items[existingItemIndex].quantity += item.quantity;
    } else {
      // Add new item
      cart.items.push(item);
    }

    saveCart(cart);
    return { success: true, message: "Item added to cart" };
  } catch (error) {
    console.error("Error adding to cart:", error);
    return { success: false, message: "Failed to add item to cart" };
  }
};

/**
 * Update item quantity in cart
 */ export const updateCartItemQuantity = (itemIndex, newQuantity) => {
  try {
    const cart = getCart();
    if (!cart || !cart.items[itemIndex]) {
      return { success: false, message: "Item not found" };
    }

    if (newQuantity < 1) {
      return { success: false, message: "Quantity must be at least 1" };
    }

    const item = cart.items[itemIndex];

    // Recalculate totalPrice based on new quantity
    const optionsTotal = item.selectedOptions.reduce(
      (sum, opt) => sum + (opt.price || 0),
      0,
    );

    item.quantity = newQuantity;
    item.totalPrice = (item.basePrice + optionsTotal) * newQuantity;

    saveCart(cart);
    return { success: true, message: "Quantity updated" };
  } catch (error) {
    console.error("Error updating quantity:", error);
    return { success: false, message: "Failed to update quantity" };
  }
};
/**
 * Remove item from cart
 */
export const removeFromCart = (itemIndex) => {
  try {
    const cart = getCart();
    if (!cart || !cart.items[itemIndex]) {
      return { success: false, message: "Item not found" };
    }

    cart.items.splice(itemIndex, 1);

    // If cart is empty, clear it entirely
    if (cart.items.length === 0) {
      clearCart();
    } else {
      saveCart(cart);
    }

    return { success: true, message: "Item removed" };
  } catch (error) {
    console.error("Error removing item:", error);
    return { success: false, message: "Failed to remove item" };
  }
};

/**
 * Clear entire cart
 */
export const clearCart = () => {
  try {
    localStorage.removeItem(CART_KEY);
    return { success: true, message: "Cart cleared" };
  } catch (error) {
    console.error("Error clearing cart:", error);
    return { success: false, message: "Failed to clear cart" };
  }
};

/**
 * Get cart summary
 */
export const getCartSummary = () => {
  const cart = getCart();
  if (!cart) {
    return {
      itemCount: 0,
      subtotal: 0,
      deliveryFee: 0,
      total: 0,
    };
  }

  const subtotal = cart.items.reduce((sum, item) => sum + item.totalPrice, 0);
  const deliveryFee = 300; // Fixed delivery fee
  const total = subtotal + deliveryFee;

  return {
    itemCount: cart.items.reduce((sum, item) => sum + item.quantity, 0),
    subtotal,
    deliveryFee,
    total,
  };
};

/**
 * Get cart item count
 */
export const getCartItemCount = () => {
  const cart = getCart();
  if (!cart) return 0;
  return cart.items.reduce((sum, item) => sum + item.quantity, 0);
};

/**
 * Format cart data for order creation API
 */
export const formatCartForOrder = (deliveryLocation, deliveryNotes = "") => {
  const cart = getCart();
  if (!cart) return null;

  return {
    vendorId: cart.vendorId,
    items: cart.items.map((item) => ({
      menuItemId: item.menuId,
      quantity: item.quantity,
      selectedOptions: item.selectedOptions.map((opt) => ({
        optionId: opt.optionId,
      })),
    })),
    deliveryLocation,
    deliveryNotes,
  };
};
