import { useState, useEffect } from "react";
import { FiMenu, FiX, FiChevronRight } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

const CategoryNavigation = () => {
  const [categories, setCategories] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [hoverTimeout, setHoverTimeout] = useState(null);
  const [mobileActiveSubcategory, setMobileActiveSubcategory] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/product/categories`
        );
        const data = await response.json();
        if (data.status === "success") {
          setCategories(data.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    // Reset active states when closing menu
    if (mobileMenuOpen) {
      setActiveCategory(null);
      setMobileActiveSubcategory(null);
    }
  };

  const handleCategoryHover = (categoryId) => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }
    const timeout = setTimeout(() => {
      setActiveCategory(categoryId);
    }, 100);
    setHoverTimeout(timeout);
  };

  const handleCategoryLeave = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }
    setHoverTimeout(
      setTimeout(() => {
        setActiveCategory(null);
      }, 200)
    );
  };

  const handleMobileCategoryClick = (categoryId) => {
    if (activeCategory === categoryId) {
      setActiveCategory(null);
      setMobileActiveSubcategory(null);
    } else {
      setActiveCategory(categoryId);
      setMobileActiveSubcategory(null);
    }
  };

  const handleMobileSubcategoryClick = (subcategoryId, e) => {
    e.stopPropagation(); // Prevent parent category click
    if (mobileActiveSubcategory === subcategoryId) {
      setMobileActiveSubcategory(null);
    } else {
      setMobileActiveSubcategory(subcategoryId);
    }
  };

  // border-2 border-red-500

  return (
    <nav className="shadow-sm relative">
      <div className="max-w-7xl h-full">
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center">
          <div className="flex space-x-8 relative">
            {categories.map((category) => (
              <div
                key={category._id}
                className="relative"
                onMouseEnter={() => handleCategoryHover(category._id)}
                onMouseLeave={handleCategoryLeave}
              >
                <Link
                  to={`/products/${category.name}`}
                  className="py-4 text-lg font-semibold text-gray-700 hover:text-red-500 flex items-center justify-between"
                >
                  {category.name}
                </Link>

                {/* Mega Dropdown - Shows only for the hovered category */}
                {activeCategory === category._id && (
                  <div
                    className="absolute left-[-90px] top-[3.7rem] w-60 bg-white shadow-lg border border-gray-200 z-50"
                    onMouseEnter={() => clearTimeout(hoverTimeout)}
                    onMouseLeave={handleCategoryLeave}
                  >
                    <div className="px-4 py-2 rounded-sm">
                      <ul className="space-y-2">
                        {category.subCategories.map((subCat) => (
                          <li key={subCat._id}>
                            <Link
                              to={`/products/${category.name}/${subCat.name}`}
                              className="text-gray-700 hover:text-red-500 flex items-center justify-between py-1 text-lg"
                            >
                              <span>{subCat.name}</span>
                            </Link>

                            {/* Show sub-subcategories by default without hover */}
                            {subCat.subCategories.length > 0 && (
                              <ul className="ml-2 mt-1 space-y-1">
                                {subCat.subCategories.map((subSubCat) => (
                                  <li key={subSubCat._id}>
                                    <Link
                                      to={`/products/${category.name}/${subCat.name}/${subSubCat.name}`}
                                      className="text-gray-500 hover:text-red-500 text-sm block py-1"
                                    >
                                      {subSubCat.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Navigation Button */}
        <div className="lg:hidden flex items-center h-16">
          <button
            onClick={toggleMobileMenu}
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
          >
            {mobileMenuOpen ? (
              <FiX className="h-6 w-6" />
            ) : (
              <FiMenu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <>
          {/* Overlay with shadow */}
          <div
            className="lg:hidden fixed inset-0  bg-black bg-opacity-50 z-40"
            onClick={() => setMobileMenuOpen(false)}
          ></div>

          {/* Sidebar */}
          <div className="lg:hidden bg-white fixed top-0 left-0 h-full w-3/4 max-w-sm shadow-xl z-50 overflow-y-auto">
            {/* Close button */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-2 right-2 p-2  text-gray-500 hover:text-red-500"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="px-4 py-6 space-y-1 mt-5">
              {categories.map((category) => (
                <div key={category._id} className="border-b border-gray-100">
                  <div className="flex justify-between items-center">
                    <Link
                      to={`/products/${category?.name}`}
                      className="text-gray-800 hover:text-red-500 px-3 py-3 text-sm font-medium flex-grow"
                    >
                      {category.name}
                    </Link>

                    {category.subCategories.length > 0 && (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleMobileCategoryClick(category._id);
                        }}
                        className="p-2 text-gray-500 hover:text-red-500"
                      >
                        <svg
                          className={`h-4 w-4 transform transition-transform ${
                            activeCategory === category._id ? "rotate-90" : ""
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    )}
                  </div>

                  {activeCategory === category._id &&
                    category.subCategories.length > 0 && (
                      <div className="pl-4 pb-2">
                        {category.subCategories.map((subCategory) => (
                          <div
                            key={subCategory._id}
                            className="border-b border-gray-100"
                          >
                            <div className="flex justify-between items-center">
                              <Link
                                to={`/products/${category?.name}/${subCategory?.name}`}
                                className="text-gray-700 hover:text-red-500 px-3 py-2 text-sm flex-grow"
                              >
                                {subCategory.name}
                              </Link>

                              {subCategory.subCategories.length > 0 && (
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleMobileSubcategoryClick(
                                      subCategory._id,
                                      e
                                    );
                                  }}
                                  className="p-2 text-gray-500 hover:text-red-500"
                                >
                                  <svg
                                    className={`h-4 w-4 transform transition-transform ${
                                      mobileActiveSubcategory ===
                                      subCategory._id
                                        ? "rotate-90"
                                        : ""
                                    }`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M9 5l7 7-7 7"
                                    />
                                  </svg>
                                </button>
                              )}
                            </div>

                            {mobileActiveSubcategory === subCategory._id &&
                              subCategory.subCategories.length > 0 && (
                                <div className="pl-4">
                                  {subCategory.subCategories.map(
                                    (subSubCategory) => (
                                      <Link
                                        key={subSubCategory._id}
                                        to={`/products/${category?.name}/${subCategory?.name}/${subSubCategory?.name}`}
                                        className="block text-gray-600 hover:text-red-500 px-3 py-2 text-sm"
                                      >
                                        {subSubCategory.name}
                                      </Link>
                                    )
                                  )}
                                </div>
                              )}
                          </div>
                        ))}
                      </div>
                    )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default CategoryNavigation;
