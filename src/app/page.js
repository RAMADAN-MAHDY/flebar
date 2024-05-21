'use client'

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
        <h2 className='mt-7 text-[#fff] text-[24px] bg-[rgb(111,111,207)] p-4 rounded-lg'>بسم الله الرحمن الرحيم</h2>

    
 {
 login ?  
  <DataDisplayTable  /> 
  :
<LoginForm getkey={getkey}/>
 }
  
   
    </main>
  );
}
