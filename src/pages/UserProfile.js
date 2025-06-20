import React, { useEffect, useState } from 'react';

export default function UserProfile() {
  const [html, setHtml] = useState('');

  useEffect(() => {
    fetch('/user-profile.html')
      .then(res => res.text())
      .then(setHtml);
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
