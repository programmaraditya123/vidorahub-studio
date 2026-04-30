"use client";

import { useEffect, useState } from "react";
import ProfileHeader from "@/components/Profile/ProfileHeader/ProfileHeader";
import Sidebar from "@/components/Profile/Sidebar/Sidebar";
import styles from "./profile.module.scss";
import LoginCard from "@/components/Login/LoginCard/LoginCard";

const Page = () => {
  const [active, setActive] = useState("profile");
  const [token,setToken] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("token")
    if(token){
      setToken(token);
    }


  },[token])

  return (
    <div className={styles.mainHeight}>
     {token && <>
    
      <Sidebar active={active} onChange={setActive} />

      <div className={styles.content}>
        {active === "profile" && <ProfileHeader />}
        {active === "analytics" && <div>Analytics Section</div>}
        {active === "settings" && <div>Settings Section</div>}
      </div>
        </>}

        {!token && <LoginCard/>}
    </div>
  );
};

export default Page;