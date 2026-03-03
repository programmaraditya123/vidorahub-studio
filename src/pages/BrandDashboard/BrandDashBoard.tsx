'use client'
import SideBar from "@/src/components/BrandDashBoard/SideBar/Sidebar"
import { useState } from "react"
import CreatorOverview from "../CreatorOverview/CreatorOverview"
import Creatorsaved from "../CreatorSaved/Creatorsaved"
import CreatorRequests from "../CreatorRequests/CreatorRequests"
import styles from './BrandDashBoard.module.scss'

 

const BrandDashBoard = () => {
    const [activeSection,setActiveSection] = useState("overview")

    const renderSection = () => {
    switch (activeSection) {
      case "overview":
        return  <CreatorOverview/>;

      case "saved":
        return <Creatorsaved/>;

      case "requests":
        return <CreatorRequests/>;

      default:
        return <CreatorOverview/>;
    }
  };
  return (
    <>
    <div style={{ display: "flex" }} className={styles.main}>
      <SideBar onSelect={setActiveSection} activeSection={activeSection}/>

      <div style={{ flex: 1, padding: "10px"}} className={styles.Container}>
        {renderSection()}
      </div>
    </div>
    </>
  )
}

export default BrandDashBoard