"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Column, Row } from "@/components/flex";
import { SearchBar } from "@/components/searchBar";
import { images } from "@/constants/image";
import Image from "next/image";
import { getAllMenus } from "@/utils/endpoints/Students/getAllMenus";

export default function StudentAllVendorsMenu() {
  const router = useRouter();

  // State
  const [menuItems, setMenuItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch menu items on mount
  useEffect(() => {
    const loadMenus = async () => {
      try {
        setLoading(true);
        const response = await getAllMenus();

        if (response.status === "success" && response.data.menus) {
          setMenuItems(response.data.menus);
          setFilteredItems(response.data.menus);
        }
      } catch (err) {
        console.error("Failed to fetch menus:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadMenus();
  }, []);

  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query);

    if (!query.trim()) {
      setFilteredItems(menuItems);
      return;
    }

    const filtered = menuItems.filter(
      (item) =>
        item.name?.toLowerCase().includes(query.toLowerCase()) ||
        item.vendor?.name?.toLowerCase().includes(query.toLowerCase()) ||
        item.description?.toLowerCase().includes(query.toLowerCase()) ||
        item.category?.name?.toLowerCase().includes(query.toLowerCase()),
    );

    setFilteredItems(filtered);
  };

  return (
    <div className="min-h-screen font-sans pb-20">
      {/* Header */}
      <div className="w-full flex flex-row pr-2">
        <div
          className="text-black self-start cursor-pointer"
          onClick={() => router.back()}
        >
          <Image
            src={images.icons.backArrow}
            alt="Back"
            width={25}
            height={25}
          />
        </div>
        <h2 className="text-2xl font-semibold text-center w-full mr-6">Menu</h2>
      </div>
      <div className="w-full h-px bg-gray-400 opacity-30 mb-4"></div>

      <Column
        gap="gap-3 sm:gap-4"
        className="max-w-4xl mx-auto px-2 sm:px-4 pt-4"
      >
        {/* Title */}
        <h2 className="text-lg sm:text-xl font-bold text-black">
          Choose <br />
          Your Favorite Food
        </h2>

        {/* Search Bar */}
        <div className="px-4 sm:px-6 py-2">
          <SearchBar
            className="max-w-md mx-auto"
            placeholder="Search for food, vendors..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        {/* Results Count */}
        {!loading && !error && (
          <p className="text-sm text-gray-600 px-4">
            {filteredItems.length}{" "}
            {filteredItems.length === 1 ? "item" : "items"} found
          </p>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-12">
            <p className="text-gray-500">Loading menus...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="flex justify-center py-12">
            <p className="text-red-500">Error: {error}</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredItems.length === 0 && (
          <div className="flex justify-center py-12">
            <p className="text-gray-500">
              {searchQuery ? "No items found" : "No menus available"}
            </p>
          </div>
        )}

        {/* Menu Items Grid */}
        {!loading && !error && filteredItems.length > 0 && (
          <div className="grid grid-cols-2 gap-2 sm:gap-4">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="overflow-hidden p-0 cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => router.push(`/student/menus/${item.id}`)}
              >
                <Column gap="gap-2 sm:gap-3">
                  {/* Image */}
                  <div className="w-full rounded-xl sm:rounded-2xl overflow-hidden h-28 sm:h-36 md:h-40 relative">
                    <Image
                      src={item.imageUrl || images.jollofRice}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                    {/* Category Badge */}
                    {item.category && (
                      <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-full">
                        {item.category.name}
                      </div>
                    )}
                    {/* Unavailable Overlay */}
                    {!item.available && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                          Unavailable
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <Column
                    gap="gap-0.5 sm:gap-1"
                    className="px-1 sm:px-3 pb-2 sm:pb-3"
                  >
                    {/* Name */}
                    <h3 className="text-sm sm:text-base font-bold text-black truncate">
                      {item.name}
                    </h3>

                    {/* Description */}
                    {item.description && (
                      <p className="text-xs text-gray-500 truncate">
                        {item.description}
                      </p>
                    )}

                    {/* Vendor/Restaurant */}
                    <p className="text-xs sm:text-sm text-gray-600 truncate">
                      📍 {item.vendor?.name || "Unknown Vendor"}
                    </p>

                    {/* Price */}
                    <p className="text-xs sm:text-sm font-semibold text-black">
                      ₦{item.basePrice?.toLocaleString() || "0"}
                    </p>
                  </Column>
                </Column>
              </div>
            ))}
          </div>
        )}
      </Column>
    </div>
  );
}
