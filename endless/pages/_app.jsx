import "../app/globals.css";
import Layout from "../components/layout/layout";
import StoreProvider from "../components/store/storeProvider";
import PlayerAudio from "../components/player/player.jsx"

export default function MyApp({Component , pageProps}) {

return (
    <StoreProvider>
        <Layout>
            <Component {...pageProps} />
        
        </Layout>
        <PlayerAudio/>
    </StoreProvider>
)

}