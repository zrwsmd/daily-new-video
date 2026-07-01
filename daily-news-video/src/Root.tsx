import React from 'react';
import { Composition } from 'remotion';
import { DailyNews } from './DailyNews';

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="DailyNews"
        component={DailyNews}
        durationInFrames={5130}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
