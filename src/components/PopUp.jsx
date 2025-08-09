import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { createNewCar, editCar } from '../service/CarService'

const PopUp = ({ data, setPopUp, popUp, setData, newCar, setNewCar }) => {


    function handleValues(e) {
        setNewCar({ ...newCar, [e.target.name]: e.target.value })
    }

    function handlePost() {
        console.log(newCar)
        if (!newCar.id || !newCar.model || !newCar.modelName || !newCar.imgDetail1 || !newCar.price || !newCar.year) {
            return toast.error("Please fill all input fields")
        }
        if (popUp.method == 'post') {
            createNewCar(newCar)
                .then(item => {
                    console.log(item)
                    toast.success("Car is add successfully")
                    setPopUp(false)
                    setNewCar({
                        id: '',
                        model: '',
                        modelName: '',
                        imgDetail1: '',
                        price: '',
                        year: ''
                    })
                    setData([...data, item])
                })
                .catch(err=>console.err(err))
        }else if(popUp.method=="edit"){
            editCar(newCar.id, newCar)
            .then(res => {
                console.log(res)
                toast.success("Car has been editteed successfully")
                setPopUp(false)
                setNewCar({
                    id: '',
                    model: '',
                    modelName: '',
                    imgDetail1: '',
                    price: '',
                    year: ''
                })
                setData(data.map(item=> item.id == res.id ? res : item))
            })
            .catch(err=>console.err(err))
    
        }
    }


    return (
        <>
            <div className={`${popUp.status ? "flex" : "hidden"} inset-0 p-4 bg-[black]/50 fixed justify-center items-center`}>
                <div className='flex flex-col gap-3 p-5 rounded-xl bg-white w-[600px] absolute'>
                    <div className='flex items-center justify-between'>
                        <h1 className='text-[2rem]'>{
                            popUp.method == 'post' ?
                                "Add new Car" :
                                "Edit Car"
                        }</h1>
                        <button onClick={() => setPopUp({ ...popUp, status: false })} className='p-3 border bg-black text-white rounded-lg'>X</button>
                    </div>
                    <input value={newCar.id} onChange={handleValues} name='id' className='p-3 rounded-lg border w-full' type="text" placeholder='ID:' />
                    <input value={newCar.model} onChange={handleValues} name='model' className='p-3 rounded-lg border w-full' type="text" placeholder='Model:' />
                    <input value={newCar.modelName} onChange={handleValues} name='modelName' className='p-3 rounded-lg border w-full' type="text" placeholder='Name:' />
                    <input value={newCar.imgDetail1} onChange={handleValues} name='imgDetail1' className='p-3 rounded-lg border w-full' type="text" placeholder='Img:' />
                    <input value={newCar.price} onChange={handleValues} name='price' className='p-3 rounded-lg border w-full' type="text" placeholder='Price:' />
                    <input value={newCar.year} onChange={handleValues} name='year' className='p-3 rounded-lg border w-full' type="text" placeholder='Year:' />
                    <button onClick={handlePost} className='p-3 w-full border bg-black text-white rounded-lg'>
                        {
                            popUp.method == 'post' ?
                                "Create Car" :
                                "Edit Car"
                        }
                    </button>
                </div>
            </div>
        </>
    )
}

export default PopUp