import { FC, useEffect, useRef } from "react";
import videojs, { VideoJsPlayer, VideoJsPlayerOptions } from "video.js";
import "./App.css";
import video from "./video.mov?url";

const options: VideoJsPlayerOptions = {
  autoplay: true,
  controls: false,
  responsive: true,
  fluid: true,
  // loop: true,
  sources: [
    {
      src: video,
    },
  ],
};

const App: FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<VideoJsPlayer | null>();

  useEffect(() => {
    if (!playerRef.current) {
      const videoElement = videoRef.current;
      if (!videoElement) return;

      playerRef.current = videojs(videoElement, options, () => {
        console.log("player is ready");
      });
    } else {
      // you can update player here [update player through props]
      const player = playerRef.current;
      player.src();
    }
  }, [options, videoRef]);

  useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div className="full">
      <div data-vjs-player>
        <video ref={videoRef} className="video-js vjs-big-play-centered" />
      </div>
    </div>
  );
};

export default App;
