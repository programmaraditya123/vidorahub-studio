 
import CreatorFilters from '@/components/search/CreatorFilters/CreatorFilters'
import styles from '../page.module.css'
import type { Metadata } from 'next'
import { searchMetadata } from '@/lib/seo/metadata'
// import CreatorsGrid from '@/components/search/CreatorsGrid/CreatorsGrid'
// import styles from '../../page.module.css'

 

 

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams
  const filters = Object.fromEntries(
    Object.entries(params).map(([key, value]) => [key, Array.isArray(value) ? value[0] : value]),
  )
  return searchMetadata(filters)
}

const page = () => {
  return (
     <>
     <div className={styles.page}>
     <main>
     <header>
      <h1>Creator Search</h1>
      <p>Search creators by category, platform, location, followers, language and brand fit.</p>
     </header>
     <CreatorFilters/>
     </main>
     
     </div>
     
     </>
  )
}

export default page
