import carInstance from "../api/axiosInstance"

const userSignUP = async (user)=>{
    try {
        const res = await carInstance.get(`/user?email=${user.email}`)
        if(res.data.length){
            throw new Error("This email is already registered")
        }
        const newUser = await carInstance.post("/user", user)
        return newUser.data
    } catch (error) {
        throw new Error(error|| "Error is already")
    }
}

const userLogin = async (user)=>{
    try {       
        const newUser = await carInstance.get(`/user?email=${user.email}&password=${user.password}`)
        console.log("Endpoint:", `/user?email=${user.email}&password=${user.password}`)
        if(newUser.data.length === 0){
            throw new Error("Incorrect email or password.")
        }
        return newUser.data[0]
    } catch (error) {
        throw new Error(error|| "Error is already")
    }
}






export {
    userSignUP,
    userLogin
}
