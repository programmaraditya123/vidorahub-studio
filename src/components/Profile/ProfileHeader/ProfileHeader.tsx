import Image from "next/image";
import styles from "./ProfileHeader.module.scss";
import { useRouter } from "next/navigation";
import { useAuth } from "@/Context/AuthContext";
import { useEffect, useState } from "react";
import { getUserProfileData } from "@/lib/UserData";

interface UserProfile {
  _id: string;
  name: string;
  subscriber: number;
  creator: boolean;
  totalvideos: number;
  bio: string;
  location: string;
  profilePicUrl: string;
  isVerified: boolean;
  provider: string;
  products?:number;
}

const ProfileHeader = () => {
  const router = useRouter();
  const { username } = useAuth();

  const [profile, setProfile] = useState<UserProfile | null>(null);

 useEffect(() => {
  const fetchProfile = async () => {
    const response = await getUserProfileData();

    console.log(response.data); // axios response body
    setProfile(response.data.userData);
  };

  fetchProfile();
}, []);

  const routetoDashboard = () => {
    router.push(username ? `/dashboard/${username}` : "/dashboard");
  };

  if (!profile) return null;

  return (
    <div className={styles.mainHeight}>
      <div className={styles.card}>
        {/* Top Section */}
        <div className={styles.header}>
          {/* Avatar */}
          <div className={styles.avatarWrapper}>
            <div className={styles.avatar}>
              <Image
                src={profile.profilePicUrl || "/avatar.jpg"}
                alt={profile.name}
                width={100}
                height={100}
              />
            </div>

            {profile.creator && (
              <span className={styles.proBadge}>PRO</span>
            )}
          </div>

          {/* Info */}
          <div className={styles.info}>
            <h2>@{profile.name}</h2>
            <p>{profile.bio}</p>
          </div>

          {/* Button */}
          <button
            className={styles.editBtn}
            onClick={routetoDashboard}
          >
            Edit Profile
          </button>
        </div>

        {/* Stats */}
        <div className={styles.stats}>
          <div>
            <h3>{profile.totalvideos}</h3>
            <span>VIDEOS</span>
          </div>

          <div>
            <h3>{profile.subscriber}</h3>
            <span>SUBSCRIBERS</span>
          </div>

          <div>
            <h3>{profile?.products ? profile?.products : '-'}</h3>
            <span>PRODUCTS</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;