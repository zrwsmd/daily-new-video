import React from "react";
import { Composition, registerRoot, Sequence } from "remotion";
import { ShotCard } from "./ShotCard";
import newsData from "./newsData.json";
import worldcupData from "./worldcupData.json";
import videoData from "./videoData.json";
import worldcupJuly2Data from "./worldcup-july2-data.json";
import worldcupJuly2DetailedData from "./worldcup-july2-detailed.json";
import franceLineupData from "./france-lineup-videoData.json";
import spainLineupData from "./spain-lineup-videoData.json";
import argentinaLineupData from "./argentina-lineup-videoData.json";
import englandLineupData from "./england-lineup-videoData.json";

// 通用类型定义
interface Shot {
  image: string;
  subtitle: string;
  durationSeconds: number;
}

interface Story {
  id: string;
  category: string;
  source: string;
  shots: Shot[];
}

interface VideoData {
  stories?: Story[];
  segments?: Story[];
}

interface GenericVideoProps {
  data: VideoData;
}

// 通用视频组件 - 处理所有数据格式
const GenericVideo: React.FC<GenericVideoProps> = ({ data }) => {
  const fps = 30;
  let currentFrame = 0;

  // 自动检测数据格式 (stories 或 segments)
  const items: Story[] = data.stories || data.segments || [];

  return (
    <div style={{ width: "100%", height: "100%", backgroundColor: "#000" }}>
      {items.map((item: Story) => {
        return item.shots.map((shot: Shot, shotIndex: number) => {
          const durationInFrames = shot.durationSeconds * fps;
          const sequence = (
            <Sequence
              key={`${item.id}-shot${shotIndex}`}
              from={currentFrame}
              durationInFrames={durationInFrames}
            >
              <ShotCard
                subtitle={shot.subtitle}
                category={item.category}
                image={shot.image}
                source={item.source}
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

// 为了保持向后兼容，保留原有的组件名称（作为包装器）
const DailyNews: React.FC = () => <GenericVideo data={newsData} />;
const WorldCupNews: React.FC = () => <GenericVideo data={worldcupData} />;
const TaiyuanNews: React.FC = () => <GenericVideo data={videoData} />;
const WorldCupJuly2: React.FC = () => <GenericVideo data={worldcupJuly2Data} />;
const WorldCupJuly2Detailed: React.FC = () => <GenericVideo data={worldcupJuly2DetailedData} />;
const FranceLineup: React.FC = () => <GenericVideo data={franceLineupData} />;
const SpainLineup: React.FC = () => <GenericVideo data={spainLineupData} />;
const ArgentinaLineup: React.FC = () => <GenericVideo data={argentinaLineupData} />;
const EnglandLineup: React.FC = () => <GenericVideo data={englandLineupData} />;

// 通用时长计算函数
const calculateDuration = (data: VideoData): number => {
  const items: Story[] = data.stories || data.segments || [];
  return items.reduce(
    (sum, item) =>
      sum + item.shots.reduce((shotSum, shot) => shotSum + shot.durationSeconds * 30, 0),
    0
  );
};

export const RemotionRoot: React.FC = () => {
  // 使用通用函数计算时长
  const totalDuration = calculateDuration(newsData);
  const worldcupDuration = calculateDuration(worldcupData);
  const taiyuanDuration = calculateDuration(videoData);
  const worldcupJuly2Duration = calculateDuration(worldcupJuly2Data);
  const worldcupJuly2DetailedDuration = calculateDuration(worldcupJuly2DetailedData);
  const franceLineupDuration = calculateDuration(franceLineupData);
  const spainLineupDuration = calculateDuration(spainLineupData);
  const argentinaLineupDuration = calculateDuration(argentinaLineupData);
  const englandLineupDuration = calculateDuration(englandLineupData);

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
      <Composition
        id="TaiyuanNews"
        component={TaiyuanNews}
        durationInFrames={taiyuanDuration}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="WorldCupJuly2"
        component={WorldCupJuly2}
        durationInFrames={worldcupJuly2Duration}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="WorldCupJuly2Detailed"
        component={WorldCupJuly2Detailed}
        durationInFrames={worldcupJuly2DetailedDuration}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="FranceLineup"
        component={FranceLineup}
        durationInFrames={franceLineupDuration}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="SpainLineup"
        component={SpainLineup}
        durationInFrames={spainLineupDuration}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="ArgentinaLineup"
        component={ArgentinaLineup}
        durationInFrames={argentinaLineupDuration}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="EnglandLineup"
        component={EnglandLineup}
        durationInFrames={englandLineupDuration}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};

registerRoot(RemotionRoot);
