import React from 'react';
import {useCurrentFrame, useVideoConfig, interpolate} from 'remotion';

export const StoryCard: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  
  // Ken Burns 效果：缓慢放大
  const scale = interpolate(frame, [0, durationInFrames], [1, 1.08], {
    extrapolateRight: 'clamp',
  });

  return (
    <div style={{
      width: '100%',
      height: '100%',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: '"Source Han Sans", "Noto Sans CJK SC", sans-serif',
    }}>
      {/* 背景：真实照片全屏铺满 */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        transform: `scale(${scale})`,
        backgroundImage: 'url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=1080&fit=crop)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }} />

      {/* 底部渐变遮罩 - 确保字幕清晰可读 */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '40%',
        background: 'linear-gradient(to top, rgba(10,24,48,0.95), rgba(10,24,48,0) 100%)',
      }} />

      {/* 顶部标签区 */}
      <div style={{
        position: 'absolute',
        top: 30,
        left: 40,
        padding: '8px 20px',
        background: '#C8102E',
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        letterSpacing: 1,
      }}>
        国内新闻
      </div>

      <div style={{
        position: 'absolute',
        top: 30,
        right: 40,
        color: '#fff',
        fontSize: 18,
        textShadow: '0 2px 4px rgba(0,0,0,0.8)',
      }}>
        2026/07/01 19:00
      </div>

      {/* 下三分之一字幕条 - 新闻联播风格 */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '28%',
        background: 'linear-gradient(to bottom, #152B52, #0A1830)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 60px',
        boxSizing: 'border-box',
      }}>
        {/* 顶部金色分割线 */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: 3,
          background: '#E8B84B',
        }} />

        {/* 标题 - 金色 */}
        <div style={{
          fontSize: 42,
          fontWeight: 'bold',
          color: '#E8B84B',
          marginBottom: 16,
          lineHeight: 1.3,
        }}>
          庆祝中国共产党成立105周年大会在京举行
        </div>

        {/* 正文 - 白色 */}
        <div style={{
          fontSize: 28,
          color: '#FFFFFF',
          lineHeight: 1.6,
          textShadow: '0 1px 3px rgba(0,0,0,0.5)',
        }}>
          习近平等党和国家领导人出席大会。大会强调要坚持人民至上，推进中国式现代化建设。
        </div>

        {/* 来源标注 - 右下角 */}
        <div style={{
          position: 'absolute',
          bottom: 20,
          right: 60,
          fontSize: 18,
          color: 'rgba(255,255,255,0.6)',
        }}>
          新华社
        </div>
      </div>
    </div>
  );
};
