import React, { Children, createContext, useState } from 'react'
import { useEffect } from 'react'
import { getAllCars, getAllOther, getModel } from '../service/CarService'

export const CarsContext = createContext()

const DataContext = ({children}) => {
    
   const [data, setData] = useState([])
   const [otherData, setOtherData] = useState([])
   const [model, setModel] = useState([])
   const [loader, setLoader] = useState(true)
   const [error, setError] = useState(null)

    useEffect(()=>{
         getAllCars()
        .then(item=> {
          setData(item)
        })
        .catch(err=> setError(err))
        .finally(()=> setLoader(false))

        getAllOther()
        .then(item=>{
          setOtherData(item)
        })

        getModel()
        .then(item=>{
          setModel(item)
        })
    },[])

    // console.log(otherData);

    const obj = {data, setData, error, loader, model, otherData}

  return (
    <>
    <CarsContext.Provider value={obj}>
      {children}
    </CarsContext.Provider>
    
    </>
  )
}

export default DataContext