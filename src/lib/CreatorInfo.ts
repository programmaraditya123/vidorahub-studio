import { http } from "./http";

export async function getCreator(){
    const {data} = await http.get("/api/v1/getcreator")
    return data
} 

export async function addCreatorBasicInfo(form: {name: string, bio: string, tags: string[], location: string}){
    const {data} = await http.post("/api/v1/addCreatorBasicInfo", form)
     
    return data
}

export async function uploadProfileImage(file: File){
    const formData = new FormData();
    formData.append("image", file);          
    const {data} = await http.post("/api/v1/addProfilePicture", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    return data;
}

export async function addCreatorPlatform(form: {
  platform: string;
  audience: string;
  link: string;
}) {
  const { data } = await http.post("/api/v1/addCreatorPlatform", {
    platform: form.platform,
    url: form.link,   
    audience: form.audience
  });

  return data;
}
