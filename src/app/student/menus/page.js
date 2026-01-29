import { Column, Row } from "@/components/flex";
import { SearchBar } from "@/components/searchBar";
import { images } from "@/constants/image";
import Image from "next/image";

const foodItems = [
  {
    id: 1,
    name: 'Jollof Rice',
    restaurant: 'Babcock Guest House (BGH)',
    price: 4.00,
    rating: 4.6,
    image: images.jollofRice
  },
  {
    id: 2,
    name: 'Spicy Noodles',
    restaurant: 'Big Meals',
    price: 2.00,
    rating: 3.0,
    image: images.jollofRice
  },
  {
    id: 3,
    name: 'Scotch Egg',
    restaurant: 'Quick Bites',
    price: 1.50,
    rating: 4.2,
    image: images.jollofRice
  },
  {
    id: 4,
    name: 'Rice & Stew',
    restaurant: 'Local Delights',
    price: 3.50,
    rating: 4.5,
    image: images.jollofRice
  }
];



export default function StudentAllVendorsMenu(){
    return(
        <div className="min-h-screen  font-sans">
            <div className="w-full  flex flex-row pr-2 mb-1 mt-2">
                <div className="text-black self-start cursor-pointer ">
                    <Image
                        src={images.icons.backArrow}
                        alt="Logo"
                        width={25}
                        height={25}
                    />
                </div>
                <h2 className="text-2xl font-semibold text-center w-full mr-6 text-base"> Menu</h2>
            </div>
            <div className="w-full h-px bg-gray-400 opacity-30 mb-4"></div>

            <Column gap="gap-3 sm:gap-4" className="max-w-4xl mx-auto px-2 sm:px-4 pt-4">
                <h2 className="text-lg sm:text-xl font-bold text-black">Choose <br/>Your Favorite Food </h2> 
                <div className="px-4 sm:px-6 py-4">
                    <SearchBar
                        className="max-w-md mx-auto"
                        placeholder="Search for food,vendors..." />
                </div>
                <div className="grid grid-cols-2 pt-4 gap-2 sm:gap-4">
                    {foodItems.map((item) => (
                    <div key={item.id} className=" overflow-hidden p-0">
                        <Column gap="gap-2 sm:gap-3">
                            <div  className="w-full rounded-xl sm:rounded-2xl overflow-hidden h-28 sm:h-36 md:h-40">
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    width={300}
                                    height={160}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        <Column gap="gap-0.5 sm:gap-1" className="px-1 sm:px-3 pb-2 sm:pb-3">
                            <Row alignItems="center" gap="gap-1">
                                <span className="text-xs sm:text-sm">⭐</span>
                                <span className="text-xs sm:text-sm font-medium">{item.rating}</span>
                            </Row>
                            <h3 className="text-sm sm:text-base font-bold text-black truncate">{item.name}</h3>
                            <p className="text-xs sm:text-sm text-gray-600 truncate">{item.restaurant}</p>
                            <p className="text-xs sm:text-sm font-semibold text-black">${item.price.toFixed(2)}</p>
                        </Column>
                    </Column>
              </div>
            ))}
          </div>
          </Column>
    
        </div>
    )
}