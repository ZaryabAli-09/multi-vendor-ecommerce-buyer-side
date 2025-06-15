import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import { CgSearch } from "react-icons/cg";

const NavbarSearch = ({ searchInputRef }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearchChange = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length === 0) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/product/search?query=${value}&limit=10`
      );
      const data = await res.json();

      if (data.status === "success") {
        setSuggestions(data.data);
        setShowDropdown(true);
      }
    } catch (error) {
      console.error(error.message); // Or toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (productId) => {
    navigate(`/products/single/${productId}`);
    setSearchTerm("");
    setShowDropdown(false);
  };

  return (
    <form className="relative w-full max-w-md">
      <div className="flex rounded-sm">
        <input
          type="text"
          placeholder="Search for products"
          className="focus:outline-none border-2 border-black w-[460px] py-2 px-3"
          value={searchTerm}
          ref={searchInputRef}
          onChange={handleSearchChange}
          onFocus={() => searchTerm && setShowDropdown(true)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
        />

        <button type="submit" className="text-2xl bg-black text-white px-3">
          <CgSearch />
        </button>
      </div>

      {showDropdown && suggestions.length > 0 && (
        <ul className="border absolute z-50 w-full bg-white rounded mt-1 max-h-80 overflow-y-auto shadow-xl">
          {suggestions.map((product) => (
            <li
              key={product._id}
              className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer text-base"
              onClick={() => handleSelect(product._id)}
            >
              <img
                src={
                  product.variants?.[0]?.images?.[0]?.url ||
                  "https://via.placeholder.com/40"
                }
                alt={product.name}
                className="w-10 h-10 object-cover rounded"
              />
              <span className="text-gray-800">{product.name}</span>
            </li>
          ))}
        </ul>
      )}
    </form>
  );
};

export default NavbarSearch;
