export interface ReelUser {
  username: string;
  avatar_url: string;
  is_verified: boolean;
}

export interface ReelItem {
  id: string;
  video_url: string;
  thumbnail_url: string;
  caption: string;
  audio_name: string;
  user: ReelUser;
  likes_count: number;
  comments_count: number;
  shares_count: number;
  duration_seconds: number;
}