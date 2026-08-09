import { useEffect } from "react";
import { fetchAllVideos } from "../features/videos/videosSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import VideoCard from "../features/videos/components/VideoCard";

function HomePage() {
  const dispatch = useAppDispatch();

  const { videos, isLoading, error } = useAppSelector((state) => state.videos);

  useEffect(() => {
    dispatch(fetchAllVideos());
  }, [dispatch]);

  return (
    <main>
      <h1>Home / Video Feed</h1>

      {isLoading && <p>Loading videos...</p>}
      {error && <p>{error}</p>}

      {!isLoading && !error && videos.length === 0 && <p>No videos found.</p>}

      <section>
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </section>
    </main>
  );
}

export default HomePage;