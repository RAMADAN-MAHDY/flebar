"use client"

import { useEffect, useState } from "react";

const DataDisplay = () => {
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
<div className="w-[100%]">
<h2 className="text-center p-3 bg-[#8843ff] text-[24px] text-[#fff]">بسم الله الرحمن الرحيم</h2>
<input
        type="text"
        placeholder="ابحث عن طريق الاسم، العدد، الأمر، أو الموديل"
        value={searchQuery}
        onChange={handleSearch}
        className="mb-2 p-2 border  border-gray-400 rounded-lg mr-[40%]"
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
               {item.condition}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
  );
};

export default DataDisplay;
