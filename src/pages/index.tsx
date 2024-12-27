// 아래의 import문으로 next/image의 Image 컴포넌트를 사용할 수 있습니다.
// import Image from "next/image"

// 아래의 import문으로 MessageBox 컴포넌트를 사용할 수 있습니다.
//import MessageBox from "@/components/MessageBox";

import MessageBox from '@/components/MessageBox';
// import messagesData from '../components/Messages.json';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useUserName } from './_app';

const api = axios.create({
  baseURL: 'http://ec2-3-38-49-253.ap-northeast-2.compute.amazonaws.com:8080/',
});

interface HomeProps{
  message: string;
  fromName: string
}

export default function Home() {
  const [messages, setMessages] = useState<HomeProps[]>([]);
  const router = useRouter();
  const {name,setName}=useUserName();
 

  const handleClick = () => {
    router.push(`/new_message`);
  };

  const handleGetMessage = async () => {
    try {
      const response = await api.get(`/messages?name=${name}`);
      console.log('요청 URL:', `/messages?name=${name}`);
      if (response.status === 200) {
        setMessages(response.data);
        console.log('편지 가져오기 : ', response.data);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  useEffect(() => {
    if (name) {
      handleGetMessage();
    }
  }, [name]);


  return (
    // <main>
    //   {/* font 적용하는 법 예시 */}
    //   <h1 className="font-['Changwon']"></h1>
    // </main>

    <main className="bg-sky-50 w-screen h-screen">
      <div className="flex flex-col items-center">
        <h1 className="text-5xl font-extrabold font-['Changwon'] mt-9">
          연말 편지 우체통
        </h1>
        <h3 className="text-base font-bold font-['Hakyo'] mt-6 ">
          💌 {name}의 연말 편지 우체통으로 {messages.length}건의 편지가
          도착했어요!
        </h3>
        <button
          onClick={handleClick}
          className="m-6 font-['Hakyo'] text-sm font-bold text-white w-[200px] h-[30px] rounded-sm bg-blue-500"
        >
          편지 쓰러 가기
        </button>
      </div>
      <div className="flex justify-center mt-[15px]">
        <div className="w-[770px] flex flex-wrap gap-4 p-4 justify-start">
          {messages.map((content, index) => {
            console.log('메시지 데이터:', content);
            return (
              <MessageBox
                key={index}
                message={content.message}
                fromName={content.fromName}
              />
            );
          })}
          {/* 
          {messagesData.Messages && messagesData.Messages.length > 0 ? (
            messagesData.Messages.map((content, index) => {
              console.log('Messages Data:', messagesData);

              console.log(content); // 메시지 로그 출력
              return (
                <MessageBox
                  key={index}
                  name={content.name}
                  message={content.message}
                />
              );
            })
          ) : (
            <p>편지가 없습니다.</p>
          )} */}
        </div>
      </div>
    </main>
  );
}