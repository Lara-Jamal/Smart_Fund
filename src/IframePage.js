import React from 'react';

export default function IframePage({ src }) {
  return (
    <iframe
      src={src}
      title={src}
      style={{ width: '100%', height: '100vh', border: 'none' }}
    />
  );
}
