"use client"

import { useState } from "react";

const AddDataForm = () => {
  const [order, setOrder] = useState("");
  const [modelnumber, setModelNumber] = useState("");
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [condition, setCondition] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('https://flebarapi-1.onrender.com/condition', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ order, modelnumber, name, quantity, condition }),
      });

      if (response.ok) {
        // Reset fields on successful submission
        setOrder("");
        setModelNumber("");
        setName("");
        setQuantity("");
        setCondition("");
        alert("Data added successfully");
      } else {
        alert("Failed to add data");
      }
    } catch (error) {
      console.error("Error adding data: ", error);
      alert("An error occurred while adding data");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-[100%] sm:w-[97%] md:w-[80%]">
      <table className="bg-[#3333] p-6 w-full">
        <thead className="bg-[#4444]">
          <tr className="border-[2px] border-[#f6202044]">
            <th className="text-[#41ff6d] border-[2px] border-[#f6202044]">أمر</th>
            <th className="text-[#41ff6d] border-[2px] border-[#f6202044]">الموديل</th>
            <th className="text-[#41ff6d] border-[2px] border-[#f6202044]">الاسم</th>
            <th className="text-[#41ff6d] border-[2px] border-[#f6202044]">العدد</th>
            <th className="bg-[#5c5ee2]">حالة القصه (مكان القصه الحالي)</th>
          </tr>
        </thead>
        <tbody className="bg-[#fdfdfd] border-[3px] border-[#f6202044]">
          <tr>
            <td className="bg-[#9aa31e] text-center text-[#fff] border-[1px] border-[#d1252579]">
              <input
                type="number"
                value={order}
                onChange={(e) => setOrder(e.target.value)}
                required
                className="w-full bg-transparent text-center "
              />
            </td>
            <td className="text-center border-[2px] border-[#d24e4e80]">
              <input
                type="number"
                value={modelnumber}
                onChange={(e) => setModelNumber(e.target.value)}
                required
                className="w-full bg-transparent text-center"
              />
            </td>
            <td className="text-center border-[2px] border-[#d118185f]">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-transparent text-center"
              />
            </td>
            <td className="text-center border-[2px] border-[#f6202044]">
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
                className="w-full bg-transparent text-center"
              />
            </td>
            <td className="text-center border-[2px] border-[#fc2f2f98]">
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                required
                className="w-full bg-transparent text-center"
              >
                <option value="القص" disabled>اختر الحالة</option>
                <option value="القص">القص</option>
                <option value="الظهر">الظهر</option>
                <option value="الصدر">الصدر</option>
                <option value="التجميع">التجميع</option>
                <option value="المخزن">المخزن</option>
                <option value="المغسله">المغسله</option>
                <option value="التعبئه">التعبئه</option>
                <option value="المخزن النهائي">المخزن النهائي</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="mt-2 mr-[50%]">
        <button type="submit" className="bg-[#38d418] p-2 rounded-xl ">إضافة</button>
      </div>
    </form>
  );
};

export default AddDataForm;
