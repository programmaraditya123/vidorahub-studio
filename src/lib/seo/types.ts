export type SocialPlatform = {
  platform?: string;
  url?: string;
  audience?: string | number;
};

export type ShowcaseContent = {
  title?: string;
  platform?: string;
  thumbnailUrl?: string;
  link?: string;
  views?: string | number;
  duration?: string;
  uploadDate?: string;
  transcript?: string;
};

export type BrandExperience = {
  name?: string;
  campaign?: string;
  deliverables?: string;
  status?: string;
};

export type CreatorEntity = {
  _id: string;
  name?: string;
  username?: string;
  bio?: string;
  profilePicUrl?: string;
  coverImageUrl?: string;
  location?: string;
  city?: string;
  state?: string;
  country?: string;
  tags?: string[];
  languages?: string[];
  platforms?: SocialPlatform[];
  showCaseContent?: ShowcaseContent[];
  experience?: BrandExperience[];
  updatedAt?: string;
  createdAt?: string;
};

export type BrandEntity = {
  _id: string;
  name?: string;
  bio?: string;
  category?: string;
  location?: string;
  profilePicUrl?: string;
  logoUrl?: string;
  website?: string;
  updatedAt?: string;
  createdAt?: string;
};

export type PaginatedCreators = {
  creators: CreatorEntity[];
  pagination?: {
    total?: number;
    page?: number;
    limit?: number;
    totalPages?: number;
  };
};
