"use client";

import Notifications from "@/components/video/Notifications";
import Options from "@/components/video/Options";
import { ContextProvider } from "@/components/video/VideoContext";
import VideoPlayer from "@/components/video/VideoPlayer";

const VideoPage = () => {
  return (
    <ContextProvider>
      <VideoPlayer />
      <Options />
      <Notifications />
    </ContextProvider>
  );
};

export default VideoPage;
