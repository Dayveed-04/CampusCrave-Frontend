'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Menu, ShoppingBag, User } from 'lucide-react';

const StudentNavigation = () => {
  const pathname = usePathname();

  const navItems = [
    {
      name: 'Home',
      href: '/student/dashboard',
      icon: Home,
    },
    {
      name: 'Menu',
      href: '/student/menus',
      icon: Menu,
    },
    {
      name: 'Orders',
      href: '/student/orders',
      icon: ShoppingBag,
    },
    {
      name: 'Profile',
      href: '/student/profile',
      icon: User,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0  border-t border-black pb-safe z-50">
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
              <Icon size={15} className={isActive ? 'stroke-2' : ''} />
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