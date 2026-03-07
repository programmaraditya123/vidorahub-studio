import {
  Instagram,
  Youtube,
  Facebook,
  Linkedin,
  Twitter,
  Music2
} from "lucide-react";

import vidoraIcon from "app/favicon.ico";

export const platformConfig: any = {
  Instagram: {
    icon: Instagram,
    label: "Followers",
  },
  YouTube: {
    icon: Youtube,
    label: "Subscribers",
  },
  TikTok: {
    icon: Music2,
    label: "Followers",
  },
  Facebook: {
    icon: Facebook,
    label: "Followers",
  },
  LinkedIn: {
    icon: Linkedin,
    label: "Connections",
  },
  "Twitter/X": {
    icon: Twitter,
    label: "Followers",
  },
  VidoraHub: {
    icon: vidoraIcon,
    label: "Followers",
    isImage: true,
  },
};