// import type { AppProps } from "next/app"
import { QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import { UserAuthenticationProvider } from "../context/UserAuthenticationContext"
import { UserPassportContextProvider } from "../context/UserPassportContext"
import { queryClient } from "../hooks/queryClient"

import "../styles/globals.css"
import "../styles/drawingComponent.css"
import "react-toastify/dist/ReactToastify.css"
import "react-autocomplete-input/dist/bundle.css"
import "react-datepicker/dist/react-datepicker.css"

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

const MyApp = ({ Component, pageProps }) => (
    <QueryClientProvider client={queryClient}>
        <UserAuthenticationProvider>
            <UserPassportContextProvider>
                <Component {...pageProps} />
            </UserPassportContextProvider>
        </UserAuthenticationProvider>
        <ReactQueryDevtools />
    </QueryClientProvider>
)

export default MyApp
