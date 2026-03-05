// import CreatorFilters from "@/src/components/search/CreatorFilters/CreatorFilters"
// import CreatorsGrid from "@/src/components/search/CreatorsGrid/CreatorsGrid"
import CreatorFilters from '@/components/search/CreatorFilters/CreatorFilters'
import styles from '../page.module.css'
import CreatorsGrid from '@/components/search/CreatorsGrid/CreatorsGrid'

 

 

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