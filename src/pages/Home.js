import React, { useEffect, useState } from 'react';

export default function Home() {
  const [html, setHtml] = useState('');

  useEffect(() => {
    fetch('/home.html')
      .then(res => res.text())
      .then(setHtml);
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
