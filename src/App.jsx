import "./App.css";
import enTranslations from "@shopify/polaris/locales/en.json";
import { AppProvider, Button } from "@shopify/polaris";

import "@shopify/polaris/build/esm/styles.css";
import DeshBord from "./componet/DashBord";

import { BrowserRouter, Routes, Route } from "react-router";
import CunditionPage from "./componet/CunditionPage.jsx";
import RuleList from "./componet/RuleList.jsx";

function App() {
  return (
    <AppProvider i18n={enTranslations}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RuleList />} />
          <Route path="/deshbord/:ruleIndex" element={<DeshBord />} />
          <Route path="/rules-page/:title" element={<CunditionPage />} />
          <Route
            path="/rules-page/:title/:ruleIndex"
            element={<CunditionPage />}
          />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
