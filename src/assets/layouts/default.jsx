import React from 'react';
import { NavbarSimple } from '../components/navbarSimple';
import { Footer } from '../components/footer';

const DefaultLayout = ({ children }) => {
  return (
    <div>
      <NavbarSimple />
      {children}
      <Footer />
    </div>
  );
};

export default DefaultLayout;