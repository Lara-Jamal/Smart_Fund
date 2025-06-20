import React, { useEffect, useState } from 'react';

export default function Login() {
  const [html, setHtml] = useState('');

  useEffect(() => {
    fetch('/login.html')
      .then(res => res.text())
      .then(setHtml);
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
