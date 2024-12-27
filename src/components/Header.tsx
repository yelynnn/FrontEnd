// Header component
import { useContext } from 'react';
import Google from '../../public/images/image.png';
import Image from 'next/image';

const Header = () => {
  const link = `https://accounts.google.com/o/oauth2/v2/auth?client_id=526903298668-in7ec446ogrb9ji9u5vendfcb433dp5d.apps.googleusercontent.com&redirect_uri=http://localhost:3000/oauth/callback/google&response_type=code&scope=email profile`;
  const loginHandler = () => {
    window.location.href = link;
  };


  return (
    <div className="bg-blue-300 flex flex-row justify-between px-10 py-5 w-[100%] h-[60px]">
      <div className="text-white font-['Changwon']  font-semibold text-[18px]">
        💌 연말 편지 우체통
      </div>
      <button
        onClick={loginHandler}
        className="items-center text-sm font-bold flex flex-row bg-white rounded-md p-3 gap-2"
      >
        <Image src={Google} alt="Google Logo" className="w-5 h-5" />
        Google로 로그인하고 쓰기
      </button>
    </div>
  );
};

export default Header;