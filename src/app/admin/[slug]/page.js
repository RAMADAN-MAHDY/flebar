import Image from 'next/image';

export default async function Page({ params }) {
    const res = await fetch(`https://flebarapi-1.onrender.com/condition/${params.slug}`);
    if (!res.ok) {
        console.error('Failed to fetch data items');
        return <div>Failed to load data items</div>;
    }
    const dataitems = await res.json();

    const response = await fetch(`https://flebarapi-1.onrender.com/condition/details/${params.slug}`);
    if (!response.ok) {
        console.error('Failed to fetch details');
        return <div>Failed to load details</div>;
    }
    const details = await response.json();
    const condition = details.conditions || [];

    const renderTableRow = (label, key) => (
        <tr className="border-[2px] border-[#f6202044]">
            <td>{label}</td>
            {condition.map((con, index) => (
                <td key={index} className="text-[#000000] border-[2px] text-center border-[#f6202044]">{con[key]}</td>
            ))}
        </tr>
    );

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

           <div className='flex justify-between'>

           <h2 className="text-[#ff1c1c] rounded-xl pr-4 p-1 text-[24px] bg-[#1cf11ceb] w-[200px]">أمر الشغل : {dataitems.order}</h2>
           <h2 className="text-[rgb(255,28,28)] rounded-xl pr-4 p-1 text-[24px] bg-[#1cf11ceb] w-[200px]">الموديل  : {dataitems.modelnumber}</h2>
            <h2 className="text-[#ff1c1c] rounded-xl pr-4 p-1 text-[24px] bg-[#1cf11ceb] w-[200px]" >العدد : {dataitems.quantity}</h2>
            <h2 className="text-[#ff1c1c] rounded-xl pr-4 p-1 text-[24px] bg-[#1cf11ceb] w-[200px]" >الاسم : {dataitems.name}</h2>

           </div>
          
            <table className="bg-[#333333] p-6 w-[100%] sm:w-[97%] md:w-[80%]">
                <thead className="bg-[#4444]">
                    <tr className="border-[2px] border-[#f6202044]">
                        <th className="text-[#41ff6d] border-[2px] border-[#f6202044]">الحاله</th>
                        {condition.map((con, index) => (
                            <th key={index} className="text-[#ff36e1] border-[2px] border-[#f6202044]">{con.condition}</th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-[#fdfdfd] border-[3px] border-[#f6202044]">
                    {renderTableRow('الاعداد المستلمه', 'number')}
                    {renderTableRow('الملاحظات', 'note')}
                </tbody>
            </table>
        </div>
    );
}
