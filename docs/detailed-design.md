# タスク管理ツール 詳細設計書

## 1. 概要
本ドキュメントは、タスク管理ツールのフロントエンド（FE）およびバックエンド（BE）の詳細設計を記載します。

---

## 2. フロントエンド（FE）設計

### 2.1 技術スタック
- React（関数型コンポーネント）
- Tailwind CSS
- fetch API（バックエンドとの通信）

### 2.2 ディレクトリ構成例
```
/src
  /components   // UIコンポーネント
  /pages        // 画面単位のコンポーネント
  /hooks        // カスタムフック
  /utils        // ユーティリティ関数
  App.jsx
  index.jsx
```

### 2.3 主な画面・機能
- タスク一覧画面
  - タスクのリスト表示、検索・フィルタ、完了/未完了切替
- タスク詳細画面
  - タスクの詳細表示、編集、削除
- タスク作成画面
  - 新規タスクの登録
- UI共通
  - ライト/ダークモード切替トグル
  - レスポンシブ対応

### 2.4 主なコンポーネント
- TaskList（タスク一覧）
- TaskItem（タスク1件）
- TaskDetail（詳細表示・編集）
- TaskForm（新規・編集フォーム）
- Header, Footer, ThemeToggle

### 2.5 状態管理
- useState, useEffect, useContext で実装
- タスクデータはAPI経由で取得・更新

---

## 3. バックエンド（BE）設計

### 3.1 技術スタック
- Node.js
- Express
- ファイル保存（tasks.json）

### 3.2 ディレクトリ構成例
```
/server
  /routes      // ルーティング
  /controllers // ビジネスロジック
  /models      // データモデル
  tasks.json   // タスクデータ保存
  app.js       // エントリポイント
```

### 3.3 API設計
| メソッド | パス           | 機能             |
|----------|----------------|------------------|
| GET      | /api/tasks     | タスク一覧取得   |
| GET      | /api/tasks/:id | タスク詳細取得   |
| POST     | /api/tasks     | タスク新規作成   |
| PUT      | /api/tasks/:id | タスク編集       |
| DELETE   | /api/tasks/:id | タスク削除       |

#### リクエスト/レスポンス例
- タスクオブジェクト:
```
{
  id: string,
  title: string,
  description: string,
  dueDate: string,
  priority: string,
  status: 'pending' | 'completed'
}
```

### 3.4 データ保存
- tasks.jsonに全タスクを配列で保存
- CRUD操作時にファイルを読み書き

### 3.5 バリデーション・セキュリティ
- 必須項目チェック
- 不正なリクエストの排除

---

## 4. 共通設計
- エラーハンドリング（FE/BEともにユーザーに分かりやすいメッセージ）
- コーディング規約遵守
- API通信は非同期

---

## 5. 今後の拡張案
- ユーザー認証
- タグ・カテゴリ機能
- 通知機能
