import React, { useEffect, useState } from 'react';

export default function Form() {
  const [html, setHtml] = useState('');

  useEffect(() => {
    fetch('/form.html')
      .then(res => res.text())
      .then(setHtml);
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
