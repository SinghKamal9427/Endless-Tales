import "../app/globals.css";
import Layout from "../components/layout/layout";
import StoreProvider from "../components/store/storeProvider";

export default function MyApp({Component , pageProps}) {

return (
    <StoreProvider>
        <Layout>
            <Component {...pageProps} />
        
        </Layout>
    </StoreProvider>
)

}