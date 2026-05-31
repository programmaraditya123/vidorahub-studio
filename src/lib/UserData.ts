import { http } from "./http";

export async function getUserProfileData(){
    const data = http.get("api/v1/getUserProfileData")
    return data
}