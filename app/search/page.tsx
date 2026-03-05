import CreatorFilters from "@/src/components/search/CreatorFilters/CreatorFilters"
import CreatorsGrid from "@/src/components/search/CreatorsGrid/CreatorsGrid"
import styles from '../page.module.css'

 

 

const page = () => {
  return (
     <>
     <div className={styles.page}>
     <CreatorFilters/>
     <CreatorsGrid/>
     </div>
     
     </>
  )
}

export default page