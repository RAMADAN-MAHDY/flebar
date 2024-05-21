"use client"

import { useEffect, useState } from "react";

const DataDisplayTable = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchData = async () => {
    try {
      const response = await fetch('https://flebarapi-1.onrender.com/condition');
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const updateCondition = async (id, newCondition) => {
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
<div className="w-[100%] mr-16">
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
            <th>أمر</th>
            <th>الموديل</th>
            <th>الاسم</th>
            <th>العدد</th>
            <th className="bg-[#5c5ee2]">حالة القصه (مكان القصه الحالي)</th>
          </tr>
        </thead>
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
      </table>
      </div>
  );
};

export default DataDisplayTable;
