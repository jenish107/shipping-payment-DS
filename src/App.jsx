import "./App.css";
import enTranslations from "@shopify/polaris/locales/en.json";
import { AppProvider, Button } from "@shopify/polaris";

import "@shopify/polaris/build/esm/styles.css";
import DeshBord from "./componet/DashBord";

import { BrowserRouter, Routes, Route } from "react-router";
import CunditionPage from "./componet/CunditionPage.jsx";
import Test from "./test/Test.jsx";

function App() {
  return (
    <>
      <AppProvider i18n={enTranslations}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<DeshBord />} />
            <Route path="/test" element={<Test />} />
            <Route path="/rules-page/:title" element={<CunditionPage />} />
            {/* <Route path="/payment-method/:id" element={<CunditionPage />} /> */}
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </>
  );
}

export default App;
