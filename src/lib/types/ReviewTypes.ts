export enum ReviewSource {
  GOOGLE = "Google",
  YELP = "Yelp",
  FACEBOOK = "Facebook",
  INSTAGRAM = "Instagram",
  WEBSITE = "Website",
  YOUTUBE = "YouTube",
  OTHER = "Other"
}

export interface ReviewData {
  _id?: string;
  name: string;
  rating: number;
  comment: string;
  source: ReviewSource;
  createdAt?: string;
  updatedAt?: string;
}
