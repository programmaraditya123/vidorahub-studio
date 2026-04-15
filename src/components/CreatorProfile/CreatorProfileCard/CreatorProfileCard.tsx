"use client";

import styles from "./CreatorProfileCard.module.scss";
import Image from "next/image";
import {
  MapPin,
  Send,
  Instagram,
  Linkedin,
  Youtube,
  Twitter,
  MessageSquare,
  Users,
  TrendingUp,
  Eye,
  ExternalLink,
  Play,
  Link
} from "lucide-react";

/* ── Types ────────────────────────────────────────────── */

type Platform = {
  platform: string;
  url: string;
  audience: number;
  _id: string;
};

type Props = {
  name?: string;
  avatar?: string;
  role?: string;
  location?: string;
  bio?: string;
  instagram?: string;
  whatsapp?: string;
  igFollowers?: string | number;
  ytSubs?: string | number;
  engagementRate?: string | number;
  // ── new optional enrichment ──
  platforms?: Platform[];
};

/* ── Helpers ──────────────────────────────────────────── */

const formatAudience = (n: string | number) => {
  const num = typeof n === "string" ? parseFloat(n) : n;
  if (isNaN(num)) return String(n);
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return String(num);
};

type PlatformMeta = {
  icon: React.ReactNode;
  bgClass: string;
  label: string;
};

const getPlatformMeta = (name: string): PlatformMeta => {
  switch (name.toLowerCase()) {
    case "instagram":
      return { icon: <Instagram size={13} strokeWidth={2} />, bgClass: styles.iconInstagram, label: "Followers" };
    case "youtube":
      return { icon: <Youtube size={13} strokeWidth={2} />, bgClass: styles.iconYoutube, label: "Subscribers" };
    case "linkedin":
      return { icon: <Linkedin size={13} strokeWidth={2} />, bgClass: styles.iconLinkedin, label: "Connections" };
    case "twitter":
    case "x":
      return { icon: <Twitter size={13} strokeWidth={2} />, bgClass: styles.iconTwitter, label: "Followers" };
    case "whatsapp":
      return { icon: <MessageSquare size={13} strokeWidth={2} />, bgClass: styles.iconWhatsapp, label: "Contacts" };
    case "vidorahub":
      return { icon: <Play size={13} strokeWidth={2} />, bgClass: styles.iconVidora, label: "Views" };
    default:
      return { icon: <ExternalLink size={13} strokeWidth={2} />, bgClass: styles.iconDefault, label: "Audience" };
  }
};

/* ── Component ────────────────────────────────────────── */

export default function CreatorProfileCard({
  name,
  avatar,
  role,
  location,
  bio,
  instagram,
  whatsapp,
  igFollowers,
  ytSubs,
  engagementRate,
  platforms = [],
}: Props) {

  // Build stats from platforms[] if provided,
  // otherwise fall back to legacy igFollowers / ytSubs props
  const statsFromPlatforms = platforms.filter((p) => p.audience > 0);

  const legacyStats: { label: string; value: string | number; meta: PlatformMeta }[] = [];
  if (!statsFromPlatforms.length) {
    if (igFollowers) legacyStats.push({ label: "IG Followers", value: igFollowers, meta: getPlatformMeta("instagram") });
    if (ytSubs)      legacyStats.push({ label: "YT Subscribers", value: ytSubs, meta: getPlatformMeta("youtube") });
    if (engagementRate) legacyStats.push({ label: "Eng. Rate", value: engagementRate, meta: getPlatformMeta("trendingup") });
  }

  const totalReach = statsFromPlatforms.reduce((sum, p) => sum + p.audience, 0);

  const hasLinks = instagram || whatsapp;

  return (
    <div className={styles.card}>

      {/* Header band */}
      <div className={styles.headerBand} />

      {/* Top section */}
      <div className={styles.topSection}>

        {/* Avatar */}
        <div className={styles.avatarWrapper}>
          {avatar ? (
            <Image
              src={avatar}
              alt={name || "creator"}
              width={84}
              height={84}
              className={styles.avatar}
            />
          ) : name ? (
            <div className={styles.avatarInitials}>
              {name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()}
            </div>
          ) : null}
          <span className={styles.online} />
        </div>

        {/* Name & role */}
        <div className={styles.identity}>
          {name && <h2 className={styles.name}>{name}</h2>}
          {role && <span className={styles.roleBadge}>{role}</span>}
        </div>

        {/* Location */}
        {location && (
          <p className={styles.location}>
            <MapPin size={13} strokeWidth={2} />
            {location}
          </p>
        )}

        {/* Bio */}
        {bio && <p className={styles.bio}>{bio}</p>}

        {/* Proposal button */}
        {/* {name && (
          <Link href={instagram} target="_blank" >
          <button className={styles.proposalBtn}>
            <Send size={14} strokeWidth={2} />
            Send Proposal
          </button>
          </Link>
        )} */}

        {/* Social links — legacy */}
        {/* {hasLinks && (
          <div className={styles.links}>
            {instagram && (
              <a href={instagram} target="_blank" rel="noopener noreferrer" className={styles.linkBtn}>
                <Instagram size={13} strokeWidth={2} />
                Instagram
              </a>
            )}
            {whatsapp && (
              <a href={whatsapp} target="_blank" rel="noopener noreferrer" className={styles.linkBtn}>
                <MessageSquare size={13} strokeWidth={2} />
                WhatsApp
              </a>
            )}
          </div>
        )} */}

        {statsFromPlatforms.length > 0 && (
          <div className={styles.links}>
            {platforms.map((p) => {
              const meta = getPlatformMeta(p.platform);
              return (
                <a key={p._id}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.linkBtn} ${meta.bgClass}`}
                >
                  {meta.icon}
                  {p.platform}
                </a>
              );
            })}
          </div>
        )}
      </div>

      
      {(statsFromPlatforms.length > 0 || legacyStats.length > 0) && (
        <>
          <div className={styles.divider} />
          <div className={styles.statsGrid}>

            {/* Rich platform stats */}
            {statsFromPlatforms.map((p) => {
              const meta = getPlatformMeta(p.platform);
              return (
                <div key={p._id} className={styles.stat}>
                  <div className={`${styles.statIcon} ${meta.bgClass}`}>
                    {meta.icon}
                  </div>
                  <strong className={styles.statValue}>{formatAudience(p.audience)}</strong>
                  <span className={styles.statPlatform}>{p.platform}</span>
                  <span className={styles.statLabel}>{meta.label}</span>
                </div>
              );
            })}

            {/* Total reach */}
            {statsFromPlatforms.length > 1 && (
              <div className={`${styles.stat} ${styles.statTotal}`}>
                <div className={`${styles.statIcon} ${styles.iconTotal}`}>
                  <TrendingUp size={13} strokeWidth={2} />
                </div>
                <strong className={styles.statValue}>{formatAudience(totalReach)}</strong>
                <span className={styles.statPlatform}>Total</span>
                <span className={styles.statLabel}>Reach</span>
              </div>
            )}

            {/* Legacy fallback stats */}
            {legacyStats.map((s, i) => (
              <div key={i} className={styles.stat}>
                <div className={`${styles.statIcon} ${s.meta.bgClass}`}>
                  {s.meta.icon}
                </div>
                <strong className={styles.statValue}>{formatAudience(s.value)}</strong>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}

          </div>
        </>
      )}
    </div>
  );
}


// "use client";

// import styles from "./CreatorProfileCard.module.scss";
// import Image from "next/image";
// import {
//   MapPin,
//   Send,
//   Instagram,
//   MessageSquare,
//   Users,
//   Youtube,
//   TrendingUp,
// } from "lucide-react";

// type Props = {
//   name?: string;
//   avatar?: string;
//   role?: string;
//   location?: string;
//   bio?: string;
//   instagram?: string;
//   whatsapp?: string;
//   igFollowers?: string | number;
//   ytSubs?: string | number;
//   engagementRate?: string | number;
// };

// export default function CreatorProfileCard({
//   name,
//   avatar,
//   role,
//   location,
//   bio,
//   instagram,
//   whatsapp,
//   igFollowers,
//   ytSubs,
//   engagementRate,
// }: Props) {
//   return (
//     <div className={styles.card}>
//       {/* Avatar */}

//       {avatar && (
//         <div className={styles.avatarWrapper}>
//           <Image
//             src={avatar}
//             alt={name || "creator"}
//             width={110}
//             height={110}
//             className={styles.avatar}
//           />

//           <span className={styles.online}></span>
//         </div>
//       )}

//       {/* Name */}

//       {name && <h2 className={styles.name}>{name}</h2>}

//       {role && <p className={styles.role}>{role}</p>}

//       {/* Location */}

//       {location && (
//         <p className={styles.location}>
//           <MapPin size={14} /> {location}
//         </p>
//       )}

//       {/* Bio */}

//       {bio && <p className={styles.bio}>{bio}</p>}

//       {/* Proposal */}

//       {name && (
//         <button className={styles.proposalBtn}>
//           <Send size={16} />
//           Send Proposal
//         </button>
//       )}

//       {/* Social Links */}

//       {(instagram || whatsapp) && (
//         <div className={styles.links}>
//           {instagram && (
//             <a
//               href={instagram}
//               target="_blank"
//               className={styles.linkBtn}
//             >
//               <Instagram size={16} />
//               Instagram Portfolio
//             </a>
//           )}

//           {whatsapp && (
//             <a
//               href={whatsapp}
//               target="_blank"
//               className={styles.linkBtn}
//             >
//               <MessageSquare size={16} />
//               WhatsApp Business
//             </a>
//           )}
//         </div>
//       )}

//       {/* Stats */}

//       {(igFollowers || ytSubs || engagementRate) && (
//         <div className={styles.stats}>
//           {igFollowers && (
//             <div className={styles.stat}>
//               <Users size={18} />
//               <div>
//                 <span>IG FOLLOWERS</span>
//                 <strong>{igFollowers}</strong>
//               </div>
//             </div>
//           )}

//           {ytSubs && (
//             <div className={styles.stat}>
//               <Youtube size={18} />
//               <div>
//                 <span>YT SUBS</span>
//                 <strong>{ytSubs}</strong>
//               </div>
//             </div>
//           )}

//           {engagementRate && (
//             <div className={styles.stat}>
//               <TrendingUp size={18} />
//               <div>
//                 <span>ENG. RATE</span>
//                 <strong>{engagementRate}</strong>
//               </div>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }