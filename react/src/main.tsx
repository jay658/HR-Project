import "./index.css";

import App from "./App.tsx";
import { StrictMode } from "react";
import { ThemeProvider } from "@emotion/react";
import { createRoot } from "react-dom/client";
import defaultTheme from "./themes/defaultTheme.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { AuthProvider } from "./auth/AuthContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={defaultTheme}>
      <AuthProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
