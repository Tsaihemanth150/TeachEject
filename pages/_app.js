import Layout from '../app/layout'
import '../app/globals.css'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '@/components/Navbar';
import LoadingBar from 'react-top-loading-bar'


 
export default function MyApp({ Component, pageProps }) {


  const [user, setUser] = useState({ value: null }); // Initialize user state
  const [key, setKey] = useState(Math.random()); // Initialize key state
  const router = useRouter();
  const [progress, setProgress] = useState(0)

  useEffect(()=>{
          
    router.events.on('routeChangeComplete', ()=>{
      setProgress(100)
    })

    router.events.on('routeChangeStart', ()=>{
      setProgress(40)
    })
     

      const token=localStorage.getItem('token')
              if(token){
                setUser({value:token})
                setKey(Math.random())
              }
     
    },[router.query])
    // Trigger effect when router.query changes

    const logout = () =>{
      localStorage.removeItem("token")
      setUser({value:null})
      setKey(Math.random())
      router.push('/')
    }
 
  return <>
  <LoadingBar
        color='#f70034'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
    <Navbar  logout={logout} user={user} key={key}>

    </Navbar>

    <Layout>
      <Component {...pageProps} />
    </Layout>
  </>
}