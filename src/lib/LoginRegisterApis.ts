import { http } from "./http"

export type RegisterPayload = {
    email:string,
    name:string,
    password:string,
    role:number
}

export type RegisterResponse = {
    success:boolean,
    user?:{id:string,email:string,name:string},
    message?:string,
    role?:number,
}

export type LoginPayload = {
    email:string,
    password:string
}

export type LoginResponse = {
    success:boolean,
    token:string,
    message?:string,
    user?:{email:string,name:string,userSerialNumber:string},
    role?:number,
}

export type Sessionresponse = {
    ok?:boolean,
    user?:{
        _id?:string,
       email?: string
       name?:string
       role?:number
       profilePicUrl?: string
    }
}


export async function userRegister(payload:RegisterPayload){
    const {data} = await http.post<RegisterResponse>("api/v1/register",payload)
    return data

}

export async function userLogin(payload:LoginPayload){
    const {data} = await http.post<LoginResponse>("/api/v1/userlogin",payload)
    return data
}

export async function CheckSession(){
    try {
        const {data} = await http.get<Sessionresponse>("/api/v1/check-session")
        return data
    } catch (error) {
        return {ok : false}
        
    }
}