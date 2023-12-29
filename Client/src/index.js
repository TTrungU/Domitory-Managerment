import React from "react"
import ReactDOM from "react-dom"
import App from "./views/App"
import reportWebVitals from "./reportWebVitals"

import { Provider } from "react-redux"
import { ProSidebarProvider } from "react-pro-sidebar"
import { PersistGate } from "redux-persist/integration/react"
import store, { persistor } from "./redux/store"

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <ProSidebarProvider>
                    <App />
                </ProSidebarProvider>
            </PersistGate>
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
