import { Link } from "react-router-dom";
import type { Video } from "../videoTypes";

type VideoCardProps = {
  video: Video;
};

function VideoCard({ video }: VideoCardProps) {
  return (
    <article>
      <Link to={`/videos/${video.id}`}>
        <img src={video.thumbnail} alt={video.title} width="240" />
        <h2>{video.title}</h2>
      </Link>

      <p>{video.user.username}</p>
      <p>{video.created_at}</p>
    </article>
  );
}

export default VideoCard;