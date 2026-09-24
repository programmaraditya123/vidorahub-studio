 
import CreatorFilters from '@/components/search/CreatorFilters/CreatorFilters'
import styles from '../page.module.css'
import type { Metadata } from 'next'
import { Suspense } from 'react'
import { searchMetadata } from '@/lib/discovery'
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
     <h1>Search Creators</h1>
     <p>Find public creator profiles by name, niche and location.</p>
     <Suspense fallback={<p>Loading search controls?</p>}><CreatorFilters/></Suspense>
     </main>
     
     </div>
     
     </>
  )
}

export default page
