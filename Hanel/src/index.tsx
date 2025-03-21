import "./index.css";
import "@fontsource/inter";

import { LocationProvider, Router, Route, useLocation } from "preact-iso";
import { Header } from "./components/Header";
import { Home } from "./pages/Home/Home";
import { Footer } from "./components/Footer";
import { Help } from "./pages/Help/Help";
import { render } from "preact";
import { Login } from "./pages/Auth/Login";
import { Register } from "./pages/Auth/Register";
import { Product } from "./pages/Product/Product";
import { CssVarsProvider, extendTheme } from "@mui/joy/styles";
import InitColorSchemeScript from "@mui/joy/InitColorSchemeScript";

export function App() {
  return (
    <CssVarsProvider
      theme={extendTheme({
        breakpoints: {
          values: {
            // follow tailwind css breakpoints
            xs: 0,
            sm: 640,
            md: 768,
            lg: 1024,
            xl: 1280,
          },
        },
      })}
    >
      <LocationProvider>
        <InitColorSchemeScript></InitColorSchemeScript>
        <>
          <Header
            entries={[
              { name: "Home", path: "/" },
              { name: "Product", path: "/product" },
              { name: "Login", path: "/login" },
            ]}
          />
          <main class="flex flex-col items-center justify-center h-full w-full p-8">
            <Router>
              <Route path="/" component={Home} />
              <Route path="/product" component={Product} />
              <Route path="/help" component={Help} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route
                default
                component={() => {
                  const location = useLocation();
                  setTimeout(() => location.route("/"), 3000);
                  return <>404 Not Found.</>;
                }}
              />
            </Router>
          </main>
          <Footer></Footer>
        </>
      </LocationProvider>
    </CssVarsProvider>
  );
}

render(<App />, document.getElementById("app")!);
