import Header from '@/components/Header';
import '@/styles/globals.css';
import { AppProps } from 'next/app';
import { createContext, useContext, useEffect, useState } from 'react';
import Cookies from "js-cookie";

const userContext = createContext({
  name: '',
  setName: (name: string) => {},
});

export default function App({ Component, pageProps }: AppProps) {

  const [name, setName]=useState("");

  useEffect(() => {
    const storedName = Cookies.get('name');
    if (storedName) {
      setName(storedName);
    }
  }, []);

  return (
    <userContext.Provider value={{name,setName}}>
      {/* App 파일에 컴포넌트 넣으면 모든 페이지에 자동으로 배치됨*/}
      <Header />
      <Component {...pageProps} />
    </userContext.Provider>
  );
}

export const useUserName=()=>useContext(userContext);