import { ReactNode } from "react";

import Footer from "@/components/Footer";
import Nav from "@/components/Nav";


const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="">
      <Nav />

      <section >
        {children}
      </section>
      <Footer />
    </main>
  );
};

export default RootLayout;