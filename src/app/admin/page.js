'use client'
import DataDisplay from '../compnent/admen/home';
import AddDataForm from '@/app/compnent/admen/postdata';
import LoginForm from '@/app/compnent/login';
import { useState , useEffect } from 'react';

const  AdmenHome=()=>{

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
        <>
 {login ?  
 <div>
  <DataDisplay/>
  <h3 className='text-center text-[22px] text-[#fff] p-1 mt-6 md:mr-[100px] bg-[#ac51d0a6] rounded-lg md:w-[400px]'> اضف قصه جديده من هنا </h3>
  <AddDataForm/>
  </div>
  :
<LoginForm getkey={getkey}/>
 }
       
        </>
    )


}
export default AdmenHome 