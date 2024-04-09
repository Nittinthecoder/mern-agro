import Header from "./Header.js";
import Footer from "./Footer.js";
import { Helmet } from "react-helmet";
import { Toaster } from "sonner";

function Layout({ children, title, description, keywords, author }) {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "84.9vh" }}>
        <Toaster />

        <div className="bg-background">{children}</div>
      </main>
      <Footer />
    </div>
  );
}

Layout.defaultProps = {
  title: `AgroXPlanet`,
  description: `Your favorite agri-product seller`,
  keywords: `mern reactjs tailwindui mongoose nodejs mongod`,
  author: `AgroXPlanet`,
};

export default Layout;
