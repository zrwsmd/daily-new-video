import React from 'react';
import { AbsoluteFill, Sequence, useVideoConfig } from 'remotion';
import { ShotCard } from './ShotCard';
import videoData from './videoData.json';

export const Video: React.FC = () => {
  const { fps } = useVideoConfig();

  let currentFrame = 0;
  const shots = videoData.segments[0].shots;

  return (
    <AbsoluteFill style={{ backgroundColor: '#000' }}>
      {shots.map((shot, index) => {
        const durationInFrames = Math.round(shot.durationSeconds * fps);
        const from = currentFrame;
        currentFrame += durationInFrames;

        return (
          <Sequence
            key={index}
            from={from}
            durationInFrames={durationInFrames}
          >
            <ShotCard
              image={shot.image}
              subtitle={shot.subtitle}
              focalPoint={shot.focalPoint}
              animationType={shot.animationType}
            />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
