// *** This cart code can really use some refactoring ***
import { useEffect, useState } from "react";

import CartItemCard from "../components/CartItemCard.jsx";

import { useSelector, useDispatch } from "react-redux";

import { FaAngleRight } from "react-icons/fa6";

import { Link } from "react-router-dom";

import {
  removeFromCart,
  setCart,
  updateCartItemQuantity,
} from "../features/cartSlice.js";

import formatAmount from "../utils/formatAmount.js";

import { MdOutlineStorefront } from "react-icons/md";

import toast from "react-hot-toast";
import { updateCartItemsCount } from "../features/userSlice.js";

function UserCart() {
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items); // get the cart Items from redux store

  // state variables (these state variables are only used in frontend, when user clicks on checkout the data that should be send to backend will be created with the help selectedItems state variable)

  // this state variable contains the id of selected brand, if no brand is selected it is null
  const [selectedStoreId, setSelectedStoreId] = useState(null);
  // this array contains the id's of cart items (not productId or variantId but the id' of documents/objects that are nested inside the cart array in database) that are checked
  const [selectedItems, setSelectedItems] = useState([]);
  // If a brand is not selected but some items of that brand are selected then this array contains the id of that brand
  const [selectedItemsStoreId, setSelectedItemsStoreId] = useState(null);

  // Load the cart from server when the component mounts

  useEffect(() => {
    async function fetchCartItems() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/buyer/cart`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const result = await response.json();
        if (!response.ok) return alert(result.message);

        dispatch(setCart({ cartItems: result.data.cart }));
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCartItems();
  }, []);

  // functions

  async function handleRemoveFromCart(cartItemId) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/buyer/cart/remove/${cartItemId}`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (!response.ok) {
        const result = await response.json();
        toast.error(result.message);
        return;
      }

      const result = await response.json();
      dispatch(removeFromCart({ cartItemId }));
      dispatch(
        updateCartItemsCount({ cartItemsCount: result.data.cartItemsCount })
      );
      toast.success(result.message);
    } catch (error) {
      console.log(error);
    }
  }

  async function incrementCartItemCount(
    productId,
    variantId,
    cartItemId,
    quantity
  ) {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/buyer/cart/add/${productId}/${variantId}`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (!response.ok) {
        const result = await response.json();
        toast.error(result.message);
        return;
      }

      const result = await response.json();
      toast.success(result.message);
      dispatch(
        updateCartItemsCount({ cartItemsCount: result.data.cartItemsCount })
      );
      dispatch(updateCartItemQuantity({ cartItemId, quantity: quantity + 1 }));
    } catch (error) {
      console.log(error);
    }
  }

  console.log(selectedItems);

  async function decrementCartItemCount(cartItemId, quantity) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/buyer/cart/decrement`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cartId: cartItemId,
          }),
        }
      );

      if (!response.ok) {
        const result = await response.json();
        toast.error(result.message);
        return;
      }

      const result = await response.json();
      toast.success(result.message);
      dispatch(
        updateCartItemsCount({ cartItemsCount: result.data.cartItemsCount })
      );
      dispatch(updateCartItemQuantity({ cartItemId, quantity: quantity - 1 }));
    } catch (error) {
      console.log(error);
    }
  }

  const toggleStoreSelect = (storeId) => {
    // unchecking the store checkbox if it is already checked and emptying selected items array
    if (selectedStoreId === storeId) {
      setSelectedStoreId(null);
      setSelectedItems([]);
      setSelectedItemsStoreId(null);
    } else {
      // checking the store checbox if it is not checked and adding all the items of that store to selected items array
      setSelectedStoreId(storeId);
      const newSelectedItems = [];

      cartItems.forEach((cartItem) => {
        if (cartItem.product.seller._id === storeId) {
          newSelectedItems.push(cartItem._id);
        }
      });

      setSelectedItems(newSelectedItems);
    }
  };

  const toggleItemSelect = (itemId) => {
    // if the item is present in selectedItems then remove it otherwise add it

    let newSelectedItems;

    if (selectedItems.includes(itemId)) {
      selectedItems.splice(selectedItems.indexOf(itemId), 1);
      newSelectedItems = [...selectedItems];
    } else {
      selectedItems.push(itemId);
      newSelectedItems = [...selectedItems];
    }

    setSelectedItems(newSelectedItems);

    // Identify this item's store
    const toggledItem = cartItems.find((item) => item._id === itemId);
    const storeId = toggledItem.product.seller._id;

    const itemsInStore = cartItems.filter(
      (item) => item.product.seller._id === storeId
    );

    // Check if all, some or none are selected within this store
    const allChecked = itemsInStore.every((item) =>
      newSelectedItems.includes(item._id)
    );

    const allUnchecked = itemsInStore.every(
      (item) => !newSelectedItems.includes(item._id)
    );

    const someChecked =
      itemsInStore.some((item) => newSelectedItems.includes(item._id)) &&
      itemsInStore.some((item) => !newSelectedItems.includes(item._id));

    // if all checked then check the store as well
    if (allChecked) {
      setSelectedStoreId(storeId);
    } else if (someChecked || allUnchecked) {
      // if non or some checked then uncheck the store
      setSelectedStoreId(null);
    }

    if (newSelectedItems.includes(itemId)) {
      setSelectedItemsStoreId(storeId);
    } else if (newSelectedItems.length === 0) {
      setSelectedItemsStoreId(null);
    }
  };

  // variables/constans

  const brandNames = {};

  const cartItemsGroupedByStore = cartItems.reduce((acc, cartItem) => {
    const storeId = cartItem.product.seller._id;

    if (!brandNames.hasOwnProperty(storeId)) {
      brandNames[storeId] = cartItem.product.seller.brandName;
    }

    if (!acc[storeId]) acc[storeId] = [];
    acc[storeId].push(cartItem);
    return acc;
  }, {});

  // total price of all selected items
  const selectedItemsTotalAmount = cartItems.reduce((acc, item) => {
    if (selectedItems.includes(item._id)) {
      if (item.variant.discountedPrice === null) {
        return acc + item.variant.price * item.quantity;
      }
      return acc + item.variant.discountedPrice * item.quantity;
    }
    return acc;
  }, 0);

  // total money saved across all selected items
  const totalAmountSaved = cartItems.reduce((acc, item) => {
    if (!selectedItems.includes(item._id)) return acc;
    const fullPrice = item.variant.price;
    const discounted = item.variant.discountedPrice ?? fullPrice;
    return acc + (fullPrice - discounted) * item.quantity;
  }, 0);

  const selectedItemsCount = cartItems.reduce((acc, cartItem) => {
    if (selectedItems.includes(cartItem._id)) {
      return acc + cartItem.quantity;
    }
    return acc;
  }, 0);

  if (isLoading) {
    return (
      <main className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </main>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">
        My Cart
      </h1>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <p className="text-lg sm:text-xl text-gray-600 mb-6">
            You currently have nothing saved to your Cart.
          </p>
          <Link
            to="/"
            className="px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Cart Items Section */}
          <div className="flex-1">
            {Object.entries(cartItemsGroupedByStore).map(
              ([storeId, storeItems]) => (
                <div
                  key={storeId}
                  className={`bg-white rounded-lg shadow-sm p-4 mb-4 ${
                    (selectedStoreId && selectedStoreId !== storeId) ||
                    (selectedItemsStoreId && selectedItemsStoreId !== storeId)
                      ? "opacity-50 pointer-events-none"
                      : ""
                  }`}
                >
                  <div className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      checked={selectedStoreId === storeId}
                      onChange={() => toggleStoreSelect(storeId)}
                      className="h-5 w-5 mr-4"
                    />
                    <Link
                      to={`/store/${storeId}?tab=products`}
                      className="flex items-center hover:text-blue-600 transition-colors"
                    >
                      <MdOutlineStorefront className="text-xl mr-2" />
                      <span className="font-semibold">
                        {brandNames[storeId]}
                        <FaAngleRight className="ml-1 inline" />
                      </span>
                    </Link>
                  </div>

                  <div className="space-y-4">
                    {storeItems.map((item) => (
                      <CartItemCard
                        key={item._id}
                        id={item._id}
                        isChecked={selectedItems.includes(item._id)}
                        image={item.variant.images[0]?.url}
                        productId={item.product._id}
                        variantId={item.variant._id}
                        productName={item.product.name}
                        size={item.variant.size}
                        color={item.variant.color}
                        price={item.variant.price}
                        discountedPrice={item.variant.discountedPrice}
                        quantity={item.quantity}
                        toggleItemSelect={toggleItemSelect}
                        handleRemoveFromCart={handleRemoveFromCart}
                        incrementCartItemCount={incrementCartItemCount}
                        decrementCartItemCount={decrementCartItemCount}
                      />
                    ))}
                  </div>
                </div>
              )
            )}
          </div>

          {/* Order Summary - Sticky on desktop, fixed bottom on mobile */}
          <div className="lg:sticky lg:top-6 lg:h-fit fixed bottom-0 left-0 right-0  bg-white border-t lg:border-t-0 lg:border-l border-gray-200 lg:w-80 p-4 lg:p-6 shadow-lg lg:shadow-sm lg:rounded-lg z-0">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>Rs {formatAmount(selectedItemsTotalAmount)}</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>Saved</span>
                <span>Rs {formatAmount(totalAmountSaved)}</span>
              </div>
            </div>

            <button
              onClick={() => {
                if (selectedItems.length === 0) {
                  toast.error("Please select items to checkout.");
                  return;
                }

                const orderItems = {
                  orderItems: cartItems
                    .filter((item) => selectedItems.includes(item._id))
                    .map((item) => ({
                      product: item.product._id,
                      variantId: item.variant._id,
                      quantity: item.quantity,
                    })),
                };
                window.location.href = `/order/checkout?orderItems=${encodeURIComponent(
                  JSON.stringify(orderItems)
                )}`;
              }}
              className="w-full bg-black hover:bg-gray-800 text-white py-3 rounded-md text-lg font-semibold transition-colors"
            >
              Checkout ({selectedItemsCount})
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserCart;

//   if (isLoading) {
//     return <main></main>;
//   }

//   return (
//     <main
//       className={`px-6 pb-10 min-h-[87.7vh]`}
//       style={{ backgroundColor: cartItems.length > 0 ? "#f4f4f4" : "" }}
//     >
//       {/* title */}

//       <h1 className="text-center py-7 text-2xl font-bold">My Cart</h1>

//       {/* UI to show if there are no items in the cart */}

//       {cartItems.length === 0 && (
//         <p className="text-center text-2xl mt-32">
//           You currently have nothing saved to your Cart.
//         </p>
//       )}

//       {/* UI to show if cart has items */}

//       {cartItems.length > 0 && (
//         <div className="pr-[19rem]">
//           {/* The loop below will be executed once for each store */}
//           {Object.entries(cartItemsGroupedByStore).map(
//             ([storeId, storeItems]) => {
//               return (
//                 // brand and its items

//                 <div
//                   key={storeId}
//                   className={`border shadow-md rounded-xl p-4 mb-3 ${
//                     (selectedStoreId && selectedStoreId !== storeId) ||
//                     (selectedItemsStoreId && selectedItemsStoreId !== storeId)
//                       ? "opacity-40 pointer-events-none"
//                       : "bg-white"
//                   }`}
//                 >
//                   {/* brand realted info (checkbox and brand name) */}

//                   <div className="flex items-center mb-4">
//                     {/* checkbox */}

//                     <input
//                       type="checkbox"
//                       checked={selectedStoreId === storeId}
//                       onChange={() => toggleStoreSelect(storeId)}
//                       className="mr-5 scale-150"
//                     />

//                     {/* brand icon and brand name */}

//                     <Link to={`/store/${storeId}?tab=products`}>
//                       <h2 className="text-xl font-semibold">
//                         <MdOutlineStorefront className="text-2xl inline-block relative bottom-[1px] mr-3" />
//                         <span>
//                           {brandNames[storeId]}{" "}
//                           <FaAngleRight className="inline-block text-[17px]" />
//                         </span>
//                       </h2>
//                     </Link>
//                   </div>

//                   {/* brand items */}

//                   {storeItems.map((item) => {
//                     const isChecked = selectedItems.includes(item._id);
//                     const image = item.variant.images[0]?.url;

//                     return (
//                       <CartItemCard
//                         id={item._id}
//                         key={item._id}
//                         isChecked={isChecked}
//                         image={image}
//                         selectedStoreId={selectedStoreId}
//                         storeId={storeId}
//                         productId={item.product._id}
//                         variantId={item.variant._id}
//                         productName={item.product.name}
//                         size={item.variant.size}
//                         color={item.variant.color}
//                         price={item.variant.price}
//                         discountedPrice={item.variant.discountedPrice}
//                         quantity={item.quantity}
//                         toggleItemSelect={toggleItemSelect}
//                         handleRemoveFromCart={handleRemoveFromCart}
//                         incrementCartItemCount={incrementCartItemCount}
//                         decrementCartItemCount={decrementCartItemCount}
//                       />
//                     );
//                   })}
//                 </div>

//                 // cart items in a store
//               );
//             }
//           )}

//           {/* The menu on the right which shows order summary */}

//           <aside className="fixed top-[28.2%] right-7 h-max w-72 bg-white border-l px-6 py-[2.1rem] shadow-lg overflow-auto rounded-lg">
//             <h2 className="text-2xl font-bold mb-4">Order Summary</h2>

//             <div className="space-y-3 mb-6">
//               <div className="flex justify-between">
//                 <span>Subtotal</span>
//                 <span>Rs {formatAmount(selectedItemsTotalAmount)}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span>Saved</span>
//                 <span>Rs {formatAmount(totalAmountSaved)}</span>
//               </div>
//             </div>

//             <button className="w-full bg-black text-white py-3 rounded text-lg font-semibold">
//               Checkout Now ({selectedItemsCount})
//             </button>
//           </aside>
//         </div>
//       )}
//     </main>
//   );
// }

// export default UserCart;
