export type VideoUser = {
  id: number;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  profile_pic: string;
};

export type VideoComment = {
  id: number;
  content: string;
  created_at: string;
  user_id: number;
  video_id: number;
  likes: unknown[];
  dislikes: unknown[];
  user: VideoUser;
};

export type Video = {
  id: number;
  user_id: number;
  title: string;
  description: string;
  url: string;
  thumbnail: string;
  created_at: string;
  likes: unknown[];
  dislikes: unknown[];
  comments: Record<string, VideoComment>;
  user: VideoUser;
};

export type VideosState = {
  videos: Video[];
  currentVideo: Video | null;
  isLoading: boolean;
  error: string | null;
};