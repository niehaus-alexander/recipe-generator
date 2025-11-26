import Navbar from "./Navbar";
import { useRouter } from "next/router";
import Footer from "./Footer";
import { useEffect } from "react";

const Layout = ({ children }) => {
  const router = useRouter();
  const showNavbar = router.pathname !== "/";
  const showFooter = router.pathname !== "/";

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "recipeWarm");
  }, []);

  return (
    <div className="min-h-screen bg-base-100 text-neutral flex flex-col">
      {showNavbar && <Navbar />}
      <main className="flex-1">{children}</main>
      {showFooter && <Footer />}
    </div>
  );
};

export default Layout;
