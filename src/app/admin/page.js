import DataDisplay from '../compnent/admen/home'
 import AddDataForm from '@/app/compnent/admen/postdata'


const  AdmenHome=()=>{
    return (
        <>
        <DataDisplay/>
        <h3 className='text-center text-[22px] text-[#fff] p-1 mt-6 md:mr-[100px] bg-[#ac51d0a6] rounded-lg md:w-[400px]'> اضف قصه جديده من هنا </h3>
        <AddDataForm/>
        </>
    )


}
export default AdmenHome 