import React from "react";
import Header from "./Header";
import Footer from "./Footer";

type Props = {
  children: React.ReactNode;
};

export default function Layout({children}: Props) {
  return (
      <React.Fragment>
        <Header/>
        <main className='main'>
          {children}
        </main>
        <Footer/>
      </React.Fragment>
  );
}