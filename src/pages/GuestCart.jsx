import { BsCartX } from "react-icons/bs";

function GuestCart() {
  return (
    <main className="mt-28 mb-80">
      <BsCartX className="text-9xl mx-auto" />
      <h1 className="text-center mt-12 text-3xl font-medium">
        Please Login or Signup to access Cart
      </h1>
    </main>
  );
}

export default GuestCart;
