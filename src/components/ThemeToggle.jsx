import React, { useEffect, useState } from 'react';

const ThemeToggle = () => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  return (
    <button
      onClick={() => setDark(d => !d)}
      className="px-3 py-1 border rounded"
    >
      {dark ? 'ライトモード' : 'ダークモード'}
    </button>
  );
};

export default ThemeToggle;
