import React from 'react';

interface DataChartProps {
  type: 'line' | 'bar' | 'map' | 'number-card' | 'pie';
  data: any;
  title?: string;
}

export const DataChart: React.FC<DataChartProps> = ({ type, data, title }) => {
  if (type === 'bar') {
    const { labels, values, color = '#C8102E' } = data;
    const maxValue = Math.max(...values);

    return (
      <div style={{ width: '100%', height: '100%', padding: 40 }}>
        {title && <h3 style={{ color: '#fff', fontSize: 36, marginBottom: 30 }}>{title}</h3>}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', height: '70%' }}>
          {values.map((value: number, idx: number) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 15 }}>
              <div style={{
                fontSize: 32,
                fontWeight: 'bold',
                color: color
              }}>
                {value}%
              </div>
              <div style={{
                width: 80,
                height: (value / maxValue) * 300,
                backgroundColor: color,
                borderRadius: 8
              }} />
              <div style={{ fontSize: 24, color: '#ccc' }}>{labels[idx]}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'number-card') {
    const { stats } = data;
    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 40,
        padding: 60,
        height: '100%'
      }}>
        {stats.map((stat: any, idx: number) => (
          <div key={idx} style={{
            backgroundColor: 'rgba(200, 16, 46, 0.15)',
            padding: 40,
            borderRadius: 16,
            border: '2px solid #C8102E'
          }}>
            <div style={{ fontSize: 72, fontWeight: 'bold', color: '#C8102E', marginBottom: 10 }}>
              {stat.value}
            </div>
            <div style={{ fontSize: 28, color: '#ccc' }}>{stat.label}</div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'map') {
    const { location, markers } = data;
    return (
      <div style={{ position: 'relative', width: '100%', height: '100%', padding: 40 }}>
        <div style={{
          fontSize: 48,
          fontWeight: 'bold',
          color: '#C8102E',
          marginBottom: 30,
          textAlign: 'center'
        }}>
          📍 {location}
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
          marginTop: 60
        }}>
          {markers.map((marker: any, idx: number) => (
            <div key={idx} style={{
              backgroundColor: 'rgba(200, 16, 46, 0.1)',
              padding: 30,
              borderRadius: 12,
              borderLeft: '6px solid #C8102E'
            }}>
              <div style={{ fontSize: 32, color: '#fff', fontWeight: 'bold' }}>
                {marker.label}
              </div>
              <div style={{ fontSize: 28, color: '#ccc', marginTop: 10 }}>
                {marker.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'pie') {
    const { segments } = data;
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', padding: 40 }}>
        <div style={{
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'conic-gradient(#C8102E 0% 60%, #666 60% 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column'
        }}>
          <div style={{ fontSize: 64, fontWeight: 'bold', color: '#fff' }}>6:3</div>
          <div style={{ fontSize: 28, color: '#ccc' }}>投票结果</div>
        </div>
        <div style={{ marginLeft: 80 }}>
          {segments.map((seg: any, idx: number) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
              <div style={{
                width: 40,
                height: 40,
                backgroundColor: seg.color,
                marginRight: 20,
                borderRadius: 8
              }} />
              <div style={{ fontSize: 28, color: '#fff' }}>{seg.label}: {seg.value}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};
