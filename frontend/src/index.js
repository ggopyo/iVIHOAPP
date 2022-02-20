import React from "react";
import App from "./App";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
// import * as Sentry from "@sentry/react";
import { PersistGate } from "redux-persist/integration/react";
// import { BrowserTracing } from "@sentry/tracing";
// import { CaptureConsole } from "@sentry/integrations";
import "./index.css";

// Sentry.init({
//   dsn: "https://c0f01d53550e4a769da32dceaa6694ee@o1132882.ingest.sentry.io/6178828",
//   integrations: [
//     new CaptureConsole({
//       levels: ["error"],
//     }),
//   ],
//   release: "1.0.0",
//   environment: "prod",
//   maxBreadcrumbs: 50,
// });

render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App></App>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
