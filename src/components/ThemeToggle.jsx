// ライト/ダークモード切替トグルコンポーネント
import React, { useEffect, useState } from 'react';

const ThemeToggle = () => {
  // ダークモード状態
  const [dark, setDark] = useState(false);

  // 状態変化時にクラスを切り替え
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  // UI描画
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
