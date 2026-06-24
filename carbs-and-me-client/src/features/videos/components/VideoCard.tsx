import { Link } from "react-router-dom";
import type { Video } from "../videoTypes";

type VideoCardProps = {
  video: Video;
};

function VideoCard({ video }: VideoCardProps) {
const thumbnail = video.thumbnail;
const username = video.user?.username ?? "Unknown user";

  return (
    <article>
      <Link to={`/videos/${video.id}`}>
        {thumbnail ? (
          <img src={thumbnail} alt={video.title} width="240" />
        ) : (
          <div>No thumbnail</div>
        )}

        <h2>{video.title}</h2>
      </Link>

      <p>{username}</p>
    </article>
  );
}

export default VideoCard;