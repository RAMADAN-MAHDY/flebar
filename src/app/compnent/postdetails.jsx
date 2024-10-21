
import { useState } from "react";

// DetailsForm Component
const DetailsForm = ({orderId, condition ,showFormdetails}) => {
  const [number, setNumber] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = localStorage.getItem('email');
    try {
        // https://flebarapi-1.onrender.com
      const response = await fetch(`https://flebarapi.vercel.app/condition/details/${orderId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
           
            "stateDetail": {
              "condition":condition ,
              "number": number,
              "note": note,
              "email" : email
            }
          }
          ),
      });

      if (response.ok) {
        // Reset fields on successful submission
    
        setNumber("");
        setNote("");
        alert("تم اضافة الامر بنجاح");
      } else {

        alert("حدث خطا ")
      }
    } catch (error) {
      console.error("Error adding data: ", error);
      alert("An error occurred while adding data");
    }
  }; 

  return (
    <div className={`bg-[#b7f73966] fixed top-0 left-0 right-0 bottom-0`}>
    <form  onSubmit={handleSubmit} className={` p-4 mt-[200px] border-[3px] bg-[#42c742eb] border-[#7e3a3a] rounded`}>
    <button className="text-red-900 text-[24px] w-16  bg-[#7b44448e]  rounded-xl hover:text-[#ff5921] " onClick={()=>{showFormdetails(false);
}}>x</button>
      <h3> {condition}</h3>
      <div className="mt-2">
        <label className="block mb-2">استلام :</label>
        <input
          type="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mt-2">
        <label className="block mb-2">الملاحظات:</label>
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded">حفظ</button>
    </form>
    </div>
  );
};
export default DetailsForm;