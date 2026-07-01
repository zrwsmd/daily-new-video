import React from 'react';
import {Composition} from 'remotion';
import {StoryCard} from './StoryCard';

export const NewsDemo: React.FC = () => {
  return (
    <>
      <Composition
        id="NewsDemo"
        component={StoryCard}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
