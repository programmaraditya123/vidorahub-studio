 
import CreatorFilters from '@/components/search/CreatorFilters/CreatorFilters'
import styles from '../page.module.css'
// import CreatorsGrid from '@/components/search/CreatorsGrid/CreatorsGrid'
// import styles from '../../page.module.css'

 

 

const page = () => {
  return (
     <>
     <div className={styles.page}>
     <CreatorFilters/>
     
     </div>
     
     </>
  )
}

export default page