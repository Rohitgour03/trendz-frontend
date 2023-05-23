import '@/styles/globals.css'
import store from '@/store/store'
import { Provider } from 'react-redux'
import { SessionProvider } from "next-auth/react"
import NextNProgress from 'nextjs-progressbar';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      {/* ******** store provider for redux state ***********/}
      <Provider store={store}>
        {/* Adding the progresss bar when any page loads */}
        <NextNProgress color="#FF4141" startPosition={0.3} stopDelayMs={200} height={4} showOnShallow={true}  />
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  )
}
