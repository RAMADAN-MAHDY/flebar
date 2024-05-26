import { useEffect, useState } from "react";
import Image from 'next/image';
import Link from 'next/link';

const DataDisplay = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [serverDataLoaded, setServerDataLoaded] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const localData = localStorage.getItem("data");
      if (localData) {
        setData(JSON.parse(localData));
        setLoading(false);
      }
      const response = await fetch('https://flebarapi-1.onrender.com/condition');
      const result = await response.json();
      setData(result);
      setLoading(false);
      setServerDataLoaded(true);
      localStorage.setItem("data", JSON.stringify(result));
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
      <div className="flex items-center justify-center w-full p-4 relative">
        <Image 
          src="/_b7fd5155-f3a6-45ca-a6cf-fb02bffefcb3.jpeg" 
          alt="flebar logo" 
          width={50} 
          height={50} 
          className="absolute sm:left-6 left-1  rounded-xl"
        />
        <h2 className='text-[#fff] text-[24px] bg-[rgb(111,111,207)] p-4 rounded-lg'>
          بسم الله الرحمن الرحيم
        </h2>
      </div>

      <input
        type="text"
        placeholder="ابحث عن طريق الاسم، العدد، الأمر، أو الموديل"
        value={searchQuery}
        onChange={handleSearch}
        className="mb-2 p-2 border  border-gray-400 rounded-lg md:mr-[40%]"
      />

      <table className="bg-[#3333] p-6 w-[100%] sm:w-[97%] md:w-[80%]">
        <thead className="bg-[#444444fa]">
          <tr className="border-[2px] border-[#f6202044]">
            <th className="text-[#41ff6d]">أمر</th>
            <th className="text-[#41ff6d]">الموديل</th>
            <th className="text-[#41ff6d]">الاسم</th>
            <th className="text-[#41ff6d]">العدد</th>
            <th className="bg-[#5c5ee2] text-[#ffffff]">حالة القصه (مكان القصه الحالي)</th>
            <th className="bg-[#5c5ee2] text-[#ffffff]">لعرض التفاصيل</th>
          </tr>
        </thead>

        <tbody className="bg-[#fdfdfd] border-[3px] border-[#f6202044]">
          {loading && !serverDataLoaded ? (
            <tr>
              <td colSpan="6" className="text-center">جارٍ التحميل...</td>
            </tr>
          ) : (
            filteredData.map((item, index) => (
              <tr key={index}>
                <td className="bg-[#9aa31e] text-center text-[#fff] border-[1px] border-[#d1252579]">{item.order}</td>
                <td className="text-center border-[2px] border-[#d24e4e80]">{item.modelnumber}</td>
                <td className="text-center border-[2px] border-[#d118185f]">{item.name}</td>
                <td className="text-center border-[2px] border-[#f6202044]">{item.quantity}</td>
                <td className="text-center border-[2px] border-[#fc2f2f98]">{item.condition}</td>
                <td className="h-[50px] text-center border-[2px] border-[#fc2f2f98]">
                  <Link href={`/admin/${item._id}`} className='bg-[#1cb11c] p-3 w-[30px] h-[40px] rounded-2xl hover:text-[#c09b9b] hover:bg-[#20ff20]'>تفاصيل</Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataDisplay;
