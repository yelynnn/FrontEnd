import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Cookies from 'js-cookie'; 

function SignUpPage() {
  const router = useRouter();
  const { code } = router.query;

  const handleLogin = async () => {
    try {
      const response = await axios.get(
        `http://ec2-3-38-49-253.ap-northeast-2.compute.amazonaws.com:8080/oauth/callback?code=${code}&provider=google`
      );
      const data = response.data;

      if(response.status===200){
        console.log(data);
        Cookies.set("accessToken",data.access_token,{expires:1});
        Cookies.set('name', data.name, { expires: 1 });
        router.push('/');
      }else{
        throw Error('AccessToken Error');
      }

    } catch (error) {
      console.log('소셜 로그인 에러');
      throw error;
    }
  };

  useEffect(()=>{
    if(!code){
      return;
    };
    handleLogin();
  },[code])

  return <div>google</div>;
}

export default SignUpPage;
