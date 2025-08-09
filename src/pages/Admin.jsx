import React, { useContext, useState } from 'react'
import { CarsContext } from '../context/DataContext'
import { MdOutlineDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import Loader from '../components/Loader';
import PopUp from '../components/PopUp';
import { deleteCarById } from '../service/CarService';
import toast from 'react-hot-toast';
import Error from '../components/Error';


const Admin = () => {

    const{data, setData, loader, error} = useContext(CarsContext)
    const[popUp, setPopUp] = useState({
        status: false,
        method: "post"
    })
    const[newCar, setNewCar] = useState({
        id: '',
        model: '',
        modelName: '',
        imgDetail1: '',
        price:'' ,
        year:''
    })
    

    if(loader){
        return <Loader/>
    }
    if(error){
        return <Error/>
    }
    function handleInps(id){
        setPopUp({status:true, method:"edit"})
        const findCar = data.find(item=> item.id == id)
        setNewCar(findCar)

    }

    function handleDelete(id){
        deleteCarById(id)
        .then(item=>toast.success("This car is deleting"))
        setData(data.filter(item=> item.id !== id))
    }
    


    return (
        <>
            <div className="container p-2 mx-auto sm:p-4 text-gray-800">
                <h2 className="mb-4 py-10 text-4xl font-semibold  text-center">Admin Panel</h2>
                <button onClick={()=>setPopUp({status:true, method:"post"})} className='m-3 p-3 border bg-black text-white rounded-lg'>+Add new Car</button>
                <PopUp setPopUp={setPopUp} popUp={popUp} data={data} setData={setData} newCar={newCar} setNewCar={setNewCar}/>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-xs">
                        <colgroup>
                            <col />
                            <col />
                            <col />
                            <col />
                            <col />
                            <col className="w-24" />
                        </colgroup>
                        <thead className="bg-gray-300">
                            <tr className="text-left">
                                <th className="p-3">ID</th>
                                <th className="p-3">Model</th>
                                <th className="p-3">Name</th>
                                <th className="p-3">Img</th>
                                <th className="p-3">Amount</th>
                                <th className="p-3">Year</th>
                                <th className="p-3">Oprs</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map(item=><tr key={item.id} className="border-b border-opacity-20 border-gray-300 bg-gray-50">
                                <td className="p-3">
                                    <p>{item.id}</p>
                                </td>
                                <td className="p-3">
                                    <p>{item.model}</p>
                                </td>
                                <td className="p-3">
                                    <p>{item.modelName}</p>
                                    
                                </td>
                                <td className="p-3 w-[200px]">
                                    <img src={item.imgDetail1} alt={item.modelName} />
                                </td>
                                <td className="p-3 ">
                                    <p>{item.price}00</p>
                                </td>
                                <td className="p-3">
                                    <p>{item.year}</p>
                                </td>
                                <td className="p-3 flex items-center gap-2">
                                    <span onClick={()=>handleDelete(item.id)}><MdOutlineDelete size={25} /></span>
                                    <span onClick={()=> handleInps(item.id)}><FaRegEdit size={25} /></span>
                                </td>
                            </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Admin