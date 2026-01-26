'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { images } from '@/constants/image';

const StudentNavigation = () => {
  const pathname = usePathname();

  const navItems = [
    {
      name: 'Home',
      href: '/student/dashboard',
      icon: images.icons.HomeIcon,
    },
    {
      name: 'Menu',
      href: '/student/menus',
      icon: images.icons.MenuIcon,
    },
    {
      name: 'Orders',
      href: '/student/orders',
      icon: images.icons.OrderIcon,
    },
    {
      name: 'Profile',
      href: '/student/profile',
      icon: images.icons.ProfileIcon,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#EDE7B5]  border-t border-black pb-safe z-50">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center flex-1 h-full space-y-1 ${
                isActive 
                  ? 'text-black' 
                  : 'text-gray-600'
              }`}
            >
              <img 
                src={item.icon} 
                alt={`${item.name} icon`} 
                className={`w-6 h-6 ${isActive ? 'filter brightness-0 saturate-100' : 'opacity-60'}`} 
              />

              <span className="text-xs font-medium">{item.name}</span>
              {isActive && (
                <div className="absolute bottom-0 w-12 h-1 bg-black rounded-t-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default StudentNavigation;