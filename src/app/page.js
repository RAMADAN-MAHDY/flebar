'use client'
import Image from 'next/image';
import { useState , useEffect } from 'react';
import DataDisplayTable from './compnent/taple';
import LoginForm from '@/app/compnent/login';
export default function Home() {

  

  const [login , setlogin] = useState(false)
  
    const getkey = (key)=>{
        setlogin(key)
    }

    useEffect(() => {
        // فحص وجود بيانات تسجيل الدخول في التخزين المحلي
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (isLoggedIn) {
         
          setlogin(true); 
        }
      }, []);


  return (
    <main className="flex min-h-screen flex-col items-center">
       <div className="flex items-center justify-center w-full p-4 relative">
        <Image 
          src="/_b7fd5155-f3a6-45ca-a6cf-fb02bffefcb3.jpeg" 
          alt="flebar logo" 
          width={50} 
          height={50} 
          className="absolute sm:left-6 left-1 rounded-xl"
        />
        <h2 className='text-[#fff] text-[24px] bg-[rgb(111,111,207)] p-4 rounded-lg'>
          بسم الله الرحمن الرحيم
        </h2>
      </div>
      

    
 {
 login ?  
  <DataDisplayTable  /> 
  :
<LoginForm getkey={getkey}/>
 }
  
   
    </main>
  );
}
