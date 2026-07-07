import React from 'react';
import { Composition, registerRoot } from 'remotion';
import { Video } from './Video';
import videoData from './videoData.json';

// 计算总时长
const totalDuration = videoData.segments[0].shots.reduce(
  (sum, shot) => sum + shot.durationSeconds,
  0
);

const fps = 30;
const durationInFrames = Math.round(totalDuration * fps);

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Video"
        component={Video}
        durationInFrames={durationInFrames}
        fps={fps}
        width={1920}
        height={1080}
      />
    </>
  );
};

registerRoot(RemotionRoot);
