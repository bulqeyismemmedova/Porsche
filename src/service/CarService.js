import carInstance from "../api/axiosInstance"

const getAllCars = async()=>{
    try {
        const res = await carInstance.get(`/cars`)
        return res.data
    } catch (error) {
        console.error(error.message || "There is issue while fetching process" )
    }
}

const getAllOther = async ()=>{
    try {
        const res = await carInstance.get(`/onlineShop`)
        return res.data
    } catch (error) {
        console.error(error.message || "There is issue while fetching process" )
    }
}

const getModel = async ()=>{
    try {
        const res =await carInstance.get(`/model`)
        return res.data
    } catch (error) {
        console.error(error.message || "There is issue while fetching process" )
    }
}

const createNewCar = async (newCar)=>{
    try {
        const res = await carInstance.post(`/cars`, newCar)
        return res.data
    } catch (error) {
        console.error(error.message || "There is issue while fetching process" )
    }
}

const editCar = async (id, car)=>{
    try {
        const res = await carInstance.patch(`/cars/${id}`, car)
        return res.data
    } catch (error) {
        console.error(error.message || "There is issue while fetching process" )
    }
}

const deleteCarById = async (id)=>{
    try {
        const res = await carInstance.delete(`/cars/${id}`)
        return res.data
    } catch (error) {
        console.error(error.message || "There is issue while fetching process" )
    }
}
   





export{
    getAllCars,
    getAllOther,
    getModel,
    createNewCar,
    editCar,
    deleteCarById
}