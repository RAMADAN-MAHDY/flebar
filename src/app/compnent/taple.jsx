"use client";
import DetailsForm from '@/app/compnent/postdetails';
import { useEffect, useState } from "react";

const DataDisplayTable = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedCondition, setSelectedCondition] = useState(null);
  const [shows , setshow] = useState(false);
  const [loading , setloading] = useState(true)


  const showFormdetails = (show)=>{
    setshow(show);

  }
  const fetchData = async () => {
    try {
      const response = await fetch('https://flebarapi-1.onrender.com/condition');
      const result = await response.json();
      setData(result);
      setloading(false)
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const updateCondition = async (id, newCondition) => {
   setshow(true)
    
    try {
      // تحديث الحالة محلياً
      const updatedData = data.map(item => 
        item._id === id ? { ...item, condition: newCondition } : item
      );
      setData(updatedData);

      // إرسال طلب لتحديث البيانات في قاعدة البيانات
      await fetch(`https://flebarapi-1.onrender.com/condition/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ condition: newCondition }),
      });

      // تعيين الحالة والمعرف المحدد
      setSelectedOrder(id);
      setSelectedCondition(newCondition);
    } catch (error) {
      console.error("Error updating condition: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = data.filter((item) => 
    item.order.toString().includes(searchQuery) ||
    item.modelnumber.toString().includes(searchQuery) ||
    item.name.includes(searchQuery) ||
    item.quantity.toString().includes(searchQuery)
  );

  return (
    <div className="w-[100%] sm:mr-16">
      <input
        type="text"
        placeholder="ابحث عن طريق الاسم، العدد، الأمر، أو الموديل"
        value={searchQuery}
        onChange={handleSearch}
        className="mb-4 p-2 border  border-gray-400 rounded-lg mr-24"
      />
      <table className="bg-[#3333] p-6 w-[100%] sm:w-[97%] md:w-[80%]">
        <thead className="bg-[#4444]">
          <tr className="border-[2px] border-[#f6202044]">
            <th className="text-[#41ff6d]">أمر</th>
            <th className="text-[#41ff6d]">الموديل</th>
            <th className="text-[#41ff6d]">الاسم</th>
            <th className="text-[#41ff6d]">العدد</th>
            <th className="bg-[#5c5ee2] text-[#ffffff]">حالة القصه (مكان القصه الحالي)</th>
          </tr>
        </thead>
        {loading ? (
             <div className="flex items-center justify-center">
             <div className="flex items-center">
               <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
               <div className="ml-4 text-blue-500 text-lg">جارٍ التحميل...</div>
             </div>
           </div>
         ) : (
        <tbody className="bg-[#fdfdfd] border-[3px] border-[#f6202044]">
          {filteredData.map((item, index) => (
            <tr key={index} className="">
              <td className="bg-[#9aa31e] text-center text-[#fff] border-[1px] border-[#d1252579]">{item.order}</td>
              <td className="text-center border-[2px] border-[#d24e4e80]">{item.modelnumber}</td>
              <td className="text-center border-[2px] border-[#d118185f]">{item.name}</td>
              <td className="text-center border-[2px] border-[#f6202044]">{item.quantity}</td>
              <td className="text-center border-[2px] border-[#fc2f2f98]">
                {["القص", "الظهر", "الصدر", "التجميع", "المخزن", "المغسله", "التعبئه", "المخزن النهائي"].map(condition => (
                  <button
                    key={condition}
                    className={`p-2 rounded-xl mr-3 ${item.condition === condition ? 'bg-red-500' : 'bg-[#38d418]'}`}
                    onClick={() => updateCondition(item._id, condition)}
                  >
                    {condition}
                  </button>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
        )}
      </table>
      {shows && (
        <DetailsForm orderId={selectedOrder} condition={selectedCondition} showFormdetails={showFormdetails} />
      )}
    </div>
  );
};

export default DataDisplayTable;
