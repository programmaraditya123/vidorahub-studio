 
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