"use client";
import Button from "@/components/button";
import { Column, Row } from "@/components/flex";
import { images } from "@/constants/image";
import Image from "next/image";
import { useState } from "react";


const categories = ['All', 'Rice', 'Meshai', 'Noodles'];

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

export default function StudentDashboard(){
    const [activeCategory, setActiveCategory] = useState('All');
    return(
        <div className="min-h-screen  font-sans">
            <div className="w-full  flex flex-row pr-2">
                <div className="text-black self-start cursor-pointer">
                    <Image
                          src={images.icons.Logo}
                          alt="Logo"
                          width={70}
                          height={70}
                          className="w-12 h-12 sm:w-[70px] sm:h-[70px]"
                    />
                 </div>
                 <div className="mt-6 text-black cursor-pointer">
                    <Image
                          src={images.icons.LocationIcon}
                          alt="Location"
                          width={120}
                          height={120}
                          className="w-20 h-auto sm:w-[120px]"
                    />
                 </div>
                 <div className="ml-auto mb-3  text-black self-end cursor-pointer">
                    <Image
                          src={images.icons.NotificationIcon}
                          alt="Notification"
                          width={20}
                          height={20}
                          className="w-4 h-4 sm:w-5 sm:h-5"
                    />
                 </div>
            </div>
            <div className="w-full h-px bg-gray-400 opacity-30 mb-4"></div>


    <div >
      <Column gap="gap-5" className="max-w-4xl mx-auto px-2 sm:px-4">
        <div className="w-full rounded-2xl sm:rounded-3xl overflow-hidden h-35 sm:h-40 md:h-[170px]"  >
          <Image
            src={images.jollofRice}
            alt="Featured Jollof Rice"
            width={400}
            height={180}
            className="w-full h-full object-cover"
          />
        </div>

        <Row gap="gap-3 sm:gap-4" className="overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category}
              backgroundColor={activeCategory === category ? 'bg-black' : 'bg-white'}
              color={activeCategory === category ? 'text-[#EDE7B5]' : 'text-black'}
              width="auto"
              className="whitespace-nowrap px-4 sm:px-5 !py-1 text-xs sm:text-sm !rounded-3xl flex-shrink-0"
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </Button>
          ))}
        </Row>

        <Column gap="gap-3 sm:gap-4">
          <h2 className="text-xl sm:text-2xl font-semibold text-black">Recommended</h2>
          
          <div className="grid grid-cols-2 gap-2 sm:gap-4">
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
      </Column>
    </div>
        </div>
    )
}