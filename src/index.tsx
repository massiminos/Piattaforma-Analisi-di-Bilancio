import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DatiProvider, DatiProviderB, LoadingProvider } from "./Analisi_di_bilancio/DatiContext.tsx";
import LoginPage from "./LoginPage.tsx";
import PrivateRoute from "./PrivateRoute.tsx";
import WelcomeScreen from "./Analisi_di_bilancio/mainAnalisiBilancio.tsx";
import DashboardAB from "./Analisi_di_bilancio/dashboardAB.tsx";
import Goodbye from "./GoodByePage.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route
        path="/App"
        element={
          <PrivateRoute>
            <DatiProvider>
              <DatiProviderB>
                <LoadingProvider>
                  <WelcomeScreen/>
                </LoadingProvider>
              </DatiProviderB>
            </DatiProvider>
          </PrivateRoute>
        }
      />
      <Route
        path="/dash"
        element={
          <PrivateRoute>
            <DatiProvider>
              <DatiProviderB>
                <LoadingProvider>
                  <DashboardAB/>
                </LoadingProvider>
              </DatiProviderB>
            </DatiProvider>
          </PrivateRoute>
        }
      />
      <Route 
        path="/bye" 
        element={<Goodbye />} 
      />
    </Routes>
  </BrowserRouter>
);
