import { addToCartAction } from '@/lib/actions/add-to-cart-action';
import { removeCartItemAction } from '@/lib/actions/remove-cart-item-action';
import { updateCartQuantityAction } from '@/lib/actions/update-cart-quantity';
import { CartItem as TCartItem } from '@/lib/types/cart';

// Increase button handler
export const increaseBtnHandler = async (
  quantity: number,
  setQuantity: (q: number) => void,
  isLoggedIn: boolean,
  item: TCartItem,
) => {
  // Increase the quantity
  const newQuantity = quantity + 1;

  // Set the new quantity
  setQuantity(newQuantity);

  // store in localStorage
  if (!isLoggedIn) {
    const storedCart = localStorage.getItem('cart');

    const cartData = JSON.parse(storedCart || '[]');

    const existingProductIndex =
      cartData.cart.cartItems.findIndex(
        (cartItem: TCartItem) =>
          cartItem.product._id === item.product._id,
      );

    // Product already exists → increase quantity only
    if (existingProductIndex !== -1) {
      cartData.cart.cartItems[
        existingProductIndex
      ].quantity += 1;
    }

    // save cart to local storage
    localStorage.setItem('cart', JSON.stringify(cartData));
    return;
  }

  // Add the item to the cart
  await addToCartAction({
    product: item.product,
    quantity: 1,
  });
};

// Decrease button handler
export const decreaseBtnHandler = async (
  quantity: number,
  setQuantity: (q: number) => void,
  isLoggedIn: boolean,
  item: TCartItem,
) => {
  // Decrease the quantity
  const newQuantity = quantity - 1;

  // If the quantity is 0, do nothing
  if (newQuantity === 0) {
    return;
  }

  // Set the new quantity
  setQuantity(newQuantity);

  // store in localStorage
  if (!isLoggedIn) {
    const storedCart = localStorage.getItem('cart');

    const cartData = JSON.parse(storedCart || '[]');

    const existingProductIndex =
      cartData.cart.cartItems.findIndex(
        (cartItem: TCartItem) =>
          cartItem.product._id === item.product._id,
      );

    // Product already exists → decrease quantity only
    if (existingProductIndex !== -1) {
      cartData.cart.cartItems[
        existingProductIndex
      ].quantity -= 1;
    }

    // save cart to local storage
    localStorage.setItem('cart', JSON.stringify(cartData));
    return;
  }

  // Update the cart quantity
  await updateCartQuantityAction({
    productId: item.product._id,
    quantity: newQuantity,
  });
};

// Remove button handler
export const removeBtnHandler = async (
  isLoggedIn: boolean,
  item: TCartItem,
) => {
  // remove from localStorage if guest
  if (!isLoggedIn) {
    const storedCart = localStorage.getItem('cart');
    const cartData = JSON.parse(storedCart || '[]');

    const existingProductIndex =
      cartData?.cart?.cartItems.findIndex(
        (cartItem: TCartItem) =>
          cartItem.product._id === item.product._id,
      );

    // Product already exists → remove it
    if (existingProductIndex !== -1) {
      cartData.cart.cartItems.splice(
        existingProductIndex,
        1,
      );
    }

    // save cart to local storage
    localStorage.setItem('cart', JSON.stringify(cartData));

    // reload page to update the cart
    window.location.reload();

    return;
  }

  // if user
  // Remove the item from the cart
  await removeCartItemAction({
    productId: item.product._id,
  });

  // Refresh the page to remove the item from the cart
  window.location.reload();
};

// Input handler
export const inputHandler = async (
  item: TCartItem,
  quantity: number,
  setQuantity: (q: number) => void,
  isLoggedIn: boolean,
) => {
  // Validate quantity: must be at least 1
  if (quantity < 1 || isNaN(quantity)) {
    setQuantity(item.quantity); // revert to previous quantity if invalid
    return;
  }

  // if guest
  if (!isLoggedIn) {
    const storedCart = localStorage.getItem('cart');
    const cartData = JSON.parse(storedCart || '[]');

    if (cartData?.cart?.cartItems) {
      const existingProductIndex =
        cartData.cart.cartItems.findIndex(
          (cartItem: TCartItem) =>
            cartItem.product._id === item.product._id,
        );

      if (existingProductIndex !== -1) {
        cartData.cart.cartItems[
          existingProductIndex
        ].quantity = quantity;
        localStorage.setItem(
          'cart',
          JSON.stringify(cartData),
        );
      }
    }
    return;
  }

  // if user
  // Update the cart quantity with input value
  await updateCartQuantityAction({
    productId: item.product._id,
    quantity,
  });
};
