import Image from 'next/image'
import styles from './ProfileHeader.module.scss'
import { useRouter } from 'next/navigation'


const ProfileHeader = () => {

  const router = useRouter();

  const routetoDashboard = () => {
    router.push('/dashboard')

  }
  return (
    <div className={styles.mainHeight}>
      <div className={styles.card}>
        
        {/* Top Section */}
        <div className={styles.header}>
          
          {/* Avatar */}
          <div className={styles.avatarWrapper}>
            <div className={styles.avatar}>
              <Image
                src="/avatar.jpg"
                alt="profile"
                width={100}
                height={100}
              />
            </div>
            <span className={styles.proBadge}>PRO</span>
          </div>

          {/* Info */}
          <div className={styles.info}>
            <h2>@alexdesign</h2>
            <p>
              Collector of aesthetics & supporting the next wave of creators
            </p>
          </div>

          {/* Button */}
          <button className={styles.editBtn} onClick={() => routetoDashboard()}>Edit Profile</button>
        </div>

        {/* Stats */}
        <div className={styles.stats}>
          <div>
            <h3>24</h3>
            <span>CREATORS</span>
          </div>
          <div>
            <h3>12</h3>
            <span>COLLECTIONS</span>
          </div>
          <div>
            <h3>3</h3>
            <span>SUBS</span>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ProfileHeader