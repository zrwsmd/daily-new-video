import React from "react";
import { Composition, registerRoot, Sequence } from "remotion";
import { ShotCard } from "./ShotCard";
import newsData from "./newsData.json";
import worldcupData from "./worldcupData.json";

const DailyNews: React.FC = () => {
  const fps = 30;
  let currentFrame = 0;

  return (
    <div style={{ width: "100%", height: "100%", backgroundColor: "#000" }}>
      {newsData.stories.map((story) => {
        return story.shots.map((shot, shotIndex) => {
          const durationInFrames = shot.durationSeconds * fps;
          const sequence = (
            <Sequence
              key={`${story.id}-shot${shotIndex}`}
              from={currentFrame}
              durationInFrames={durationInFrames}
            >
              <ShotCard
                subtitle={shot.subtitle}
                category={story.category}
                image={shot.image}
                source={story.source}
              />
            </Sequence>
          );
          currentFrame += durationInFrames;
          return sequence;
        });
      })}
    </div>
  );
};

const WorldCupNews: React.FC = () => {
  const fps = 30;
  let currentFrame = 0;

  return (
    <div style={{ width: "100%", height: "100%", backgroundColor: "#000" }}>
      {worldcupData.stories.map((story) => {
        return story.shots.map((shot, shotIndex) => {
          const durationInFrames = shot.durationSeconds * fps;
          const sequence = (
            <Sequence
              key={`${story.id}-shot${shotIndex}`}
              from={currentFrame}
              durationInFrames={durationInFrames}
            >
              <ShotCard
                subtitle={shot.subtitle}
                category={story.category}
                image={shot.image}
                source={story.source}
              />
            </Sequence>
          );
          currentFrame += durationInFrames;
          return sequence;
        });
      })}
    </div>
  );
};

export const RemotionRoot: React.FC = () => {
  // 计算总时长
  const totalDuration = newsData.stories.reduce(
    (sum, story) =>
      sum + story.shots.reduce((shotSum, shot) => shotSum + shot.durationSeconds * 30, 0),
    0
  );

  const worldcupDuration = worldcupData.stories.reduce(
    (sum, story) =>
      sum + story.shots.reduce((shotSum, shot) => shotSum + shot.durationSeconds * 30, 0),
    0
  );

  return (
    <>
      <Composition
        id="DailyNews"
        component={DailyNews}
        durationInFrames={totalDuration}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="WorldCupNews"
        component={WorldCupNews}
        durationInFrames={worldcupDuration}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};

registerRoot(RemotionRoot);
