"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { format } from 'date-fns';
import { arDZ } from 'date-fns/locale';
const Page = ({ params }) => {
    const [dataItems, setDataItems] = useState({});
    const [details, setDetails] = useState({ conditions: [] });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`https://flebarapi.vercel.app/condition/${params.slug}`);
                if (!res.ok) throw new Error('Failed to fetch data items');
                const data = await res.json();
                setDataItems(data);

                const response = await fetch(`https://flebarapi.vercel.app/condition/details/${params.slug}`);
                if (!response.ok) throw new Error('Failed to fetch details');
                const detailsData = await response.json();
                console.log(detailsData)
                setDetails(detailsData);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [params.slug]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const condition = details.conditions || [];

    return (
        <div>
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

            <div className='flex justify-between '>
                <h2 className="text-[#ff1c1c] rounded-xl pr-4 p-1 text-[24px] bg-[#b9dfb9eb] w-[200px]">أمر الشغل : {dataItems.order}</h2>
                <h2 className="text-[#ff1c1c] rounded-xl pr-4 p-1 text-[24px] bg-[#b9dfb9eb] w-[200px]">الموديل : {dataItems.modelnumber}</h2>
                <h2 className="text-[#ff1c1c] rounded-xl pr-4 p-1 text-[24px] bg-[#b9dfb9eb] w-[200px]">العدد : {dataItems.quantity}</h2>
                <h2 className="text-[#ff1c1c] rounded-xl pr-4 p-1 text-[24px] bg-[#b9dfb9eb] w-[200px]">الاسم : {dataItems.name}</h2>
            </div>

            <table className="bg-[#333333] p-6 w-full sm:w-[97%] md:w-[80%]">
                <thead className="bg-[#4444]">
                    <tr className="border-2 border-[#f6202044]">
                        <th className="text-[#41ff6d] border-2 border-[#f6202044]">الحاله</th>
                        {condition.map((con, index) => (
                            <th key={index} className="text-[#d0ff36] border-2 border-[#f6202044]">{con.condition}</th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-[#fdfdfd] border-3 border-[#f6202044]">
                    <tr className="border-2 border-[#f6202044]">
                        <td className="text-[#41ff6d] border-2 border-[#f6202044] bg-[#111711fe]">الاعداد المستلمه</td>
                        {condition.map((con, index) => (
                            <td key={index} className="text-[#333333] border-2 border-[#f6202044]">{con.number}</td>
                        ))}
                    </tr>
                    <tr className="border-2 border-[#f6202044]">
                        <td className="text-[#41ff6d] border-2 border-[#f6202044] bg-[#111711fe]">الملاحظات</td>
                        {condition.map((con, index) => (
                            <td key={index} className="text-[#333333] border-2 border-[#f6202044]">{con.note}</td>
                        ))}
                    </tr>
                    <tr className="border-2 border-[#f6202044]">
                        <td className="text-[#41ff6d] border-2 border-[#f6202044] bg-[#111711fe]">قام بالتغيير</td>
                        {condition.map((con, index) => (
                            <td key={index} className="text-[#333333] border-2 border-[#f6202044]">{con.email}</td>
                        ))}
                    </tr>
                  
<tr className="border-2 border-[#f6202044]">
    <td className="text-[#41ff6d] border-2 border-[#f6202044] bg-[#111711fe]">وقت اخر تحديث</td>
    {condition.map((con, index) => (
        <td key={index} className="text-[#333333] border-2 border-[#f6202044]">
            {format(new Date(con.timestamp), 'dd/ M ( hh:mm aaa)', { locale: arDZ })}
        </td>
    ))}
</tr>
                </tbody>
            </table>
        </div>
    );
};

export default Page;
