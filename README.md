# React 產品管理系統 - 初學者完整教學

## 📋 專案簡介

這是一個使用 React + Vite 建立的產品管理系統，適合初學者學習現代前端開發技術。本專案實作了一個完整的 CRUD（新增、讀取、更新、刪除）應用程式，包含使用者登入驗證、產品列表顯示、以及產品資料的管理功能。

### ✨ 主要功能

- 🔐 使用者登入驗證（Cookie 與 Token 管理）
- 📦 產品列表展示
- ➕ 新增產品
- ✏️ 編輯產品
- 🗑️ 刪除產品
- 🖼️ 多圖片上傳與管理
- 📱 響應式設計（使用 Bootstrap）

---

## 🛠️ 技術棧說明

本專案使用以下技術，適合初學者逐步學習：

### 核心技術

| 技術 | 版本 | 用途說明 |
|------|------|----------|
| **React** | 19.2.0 | 主要的 UI 框架，用來建立使用者介面 |
| **Vite** | 7.2.4 | 快速的前端建置工具，提供極速的開發體驗 |
| **Axios** | 1.13.2 | HTTP 請求函式庫，用來與後端 API 溝通 |
| **Bootstrap** | 5.3.8 | CSS 框架，提供現成的美觀 UI 元件 |
| **ESLint** | 9.39.1 | 程式碼品質檢查工具 |

### 為什麼選擇這些技術？

- **React**：目前最受歡迎的前端框架之一，擁有豐富的生態系統和社群支援
- **Vite**：比傳統工具（如 Webpack）快很多，讓開發過程更流暢
- **Axios**：比原生 fetch API 更容易使用，語法更簡潔
- **Bootstrap**：不需要自己寫太多 CSS，就能做出漂亮的網頁

---

## 💻 環境需求

開始之前，請確保你的電腦已經安裝：

- **Node.js**：建議版本 18.0 以上（[下載連結](https://nodejs.org/)）
- **npm**：隨 Node.js 一起安裝，用來管理套件
- **程式碼編輯器**：推薦使用 [VS Code](https://code.visualstudio.com/)

### 如何檢查是否已安裝？

打開終端機（Terminal）或命令提示字元，輸入以下指令：

```bash
node -v    # 應該顯示 v18.0.0 或更高版本
npm -v     # 應該顯示版本號
```

---

## 📦 安裝步驟

### 步驟 1：下載專案

```bash
# 使用 git 下載專案
git clone https://github.com/BriantsaiCoder/react-training-2025-wk3.git

# 進入專案資料夾
cd react-training-2025-wk3
```

### 步驟 2：安裝相依套件

```bash
npm install
```

這個指令會讀取 `package.json` 檔案，並下載專案需要的所有套件到 `node_modules` 資料夾。

### 步驟 3：設定環境變數

在專案根目錄建立 `.env.local` 檔案，並加入以下內容：

```env
VITE_API_BASE=你的API網址
VITE_API_PATH=你的API路徑
```

**說明**：這些是 API 的連線資訊，`VITE_` 開頭的變數會在編譯時被 Vite 載入。

---

## 🚀 如何執行專案

### 開發模式（Development）

```bash
npm run dev
```

執行後，瀏覽器會自動開啟 `http://localhost:5173`（或顯示的其他埠號）。

**特色**：支援熱重載（Hot Module Replacement），當你修改程式碼並儲存後，瀏覽器會自動更新，不需要手動重新整理！

### 建置正式版本（Production）

```bash
npm run build
```

這會建立一個優化過的正式版本到 `dist` 資料夾，檔案會被壓縮和最佳化。

### 預覽建置結果

```bash
npm run preview
```

可以在本地預覽建置後的正式版本。

### 程式碼檢查（Linting）

```bash
npm run lint
```

檢查程式碼是否符合規範，幫助你寫出更乾淨的程式碼。

### 部署到 GitHub Pages

```bash
npm run deploy
```

會自動建置專案並部署到 GitHub Pages。

---

## 📁 專案架構說明

```
react-training-2025-wk3/
├── public/                  # 靜態資源（圖片、favicon 等）
├── src/                     # 原始碼資料夾
│   ├── assets/             # 資源檔案
│   │   └── style.css      # 自訂樣式
│   ├── App.jsx            # 主要元件（核心邏輯都在這裡）
│   └── main.jsx           # 應用程式進入點
├── .gitignore              # Git 忽略清單
├── eslint.config.js        # ESLint 設定
├── index.html              # HTML 模板
├── package.json            # 專案設定與相依套件清單
├── vite.config.js          # Vite 設定檔
└── README.md               # 專案說明文件（就是這個檔案）
```

### 重要檔案說明

- **`src/main.jsx`**：應用程式的起點，負責將 React 元件渲染到 HTML 頁面
- **`src/App.jsx`**：主要的應用程式邏輯，包含所有功能
- **`index.html`**：HTML 模板，React 會將元件插入到這個檔案的 `<div id="root">` 中
- **`package.json`**：記錄專案資訊和相依套件
- **`vite.config.js`**：Vite 的設定，例如專案的基礎路徑

---

## 📚 核心程式碼解說

### 1. 應用程式進入點：`main.jsx`

```jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';  // 引入 Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js';  // 引入 Bootstrap JS
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

**初學者解說**：
- `import`：引入需要的模組或檔案
- `StrictMode`：React 的嚴格模式，幫助發現潛在問題
- `createRoot`：React 18 的新 API，用來建立應用程式的根節點
- `document.getElementById('root')`：找到 HTML 中 id 為 'root' 的元素
- `.render()`：將 React 元件渲染（顯示）到網頁上

---

### 2. 狀態管理（State Management）

在 `App.jsx` 中，我們使用 React Hooks 來管理狀態：

```jsx
const [formData, setFormData] = useState({
  username: '',
  password: '',
});

const [isAuth, setIsAuth] = useState(false);
const [products, setProducts] = useState([]);
```

**初學者解說**：
- `useState`：React Hook，用來在函式元件中建立狀態
- `formData`：儲存表單資料（使用者名稱和密碼）
- `setFormData`：更新 formData 的函式
- `isAuth`：記錄使用者是否已登入（布林值：true/false）
- `products`：儲存產品列表（陣列）

**狀態是什麼**？
狀態就像是元件的「記憶體」，當狀態改變時，React 會自動重新渲染元件，更新畫面。

---

### 3. 處理表單輸入

```jsx
const handleInputChange = (e) => {
  const { name, value } = e.target;
  
  setFormData((prevData) => ({
    ...prevData,        // 保留原有的資料
    [name]: value,      // 更新特定欄位
  }));
};
```

**初學者解說**：
- `e`：事件物件，包含觸發事件的資訊
- `e.target`：觸發事件的元素（例如 input）
- `name`：input 的 name 屬性
- `value`：input 的目前值
- `...prevData`：展開運算子，複製物件的所有屬性
- `[name]: value`：動態屬性名稱，根據 name 更新對應的值

**範例**：當使用者在 email 輸入框打字時，這個函式會被呼叫，更新 `formData.username` 的值。

---

### 4. 發送 HTTP 請求（使用 Axios）

```jsx
const handleSubmit = async (e) => {
  e.preventDefault();  // 防止表單預設提交行為
  
  try {
    const response = await axios.post(`${API_BASE}/admin/signin`, formData);
    const { token, expired } = response.data;
    
    // 設定 Cookie
    document.cookie = `hexToken=${token};expires=${new Date(expired)};`;
    
    // 設定 axios 預設標頭
    axios.defaults.headers.common['Authorization'] = token;
    
    setIsAuth(true);  // 更新登入狀態
    getData();        // 取得產品資料
  } catch (error) {
    console.error('登入失敗:', error.response);
    setIsAuth(false);
  }
};
```

**初學者解說**：
- `async/await`：處理非同步操作的語法，讓非同步程式碼看起來像同步
- `e.preventDefault()`：阻止表單預設的提交行為（避免頁面重新整理）
- `axios.post()`：發送 POST 請求到伺服器
- `try...catch`：錯誤處理，try 區塊執行主要邏輯，如果發生錯誤會跳到 catch
- `response.data`：伺服器回傳的資料
- `document.cookie`：在瀏覽器儲存 Cookie

**為什麼使用 async/await**？
因為向伺服器發送請求需要時間，使用 async/await 可以等待請求完成後再繼續執行。

---

### 5. 使用 useEffect Hook

```jsx
useEffect(() => {
  // 從 Cookie 取得 Token
  const token = document.cookie
    .split('; ')
    .find((row) => row.startsWith('hexToken='))
    ?.split('=')[1];
  
  if (token) {
    axios.defaults.headers.common.Authorization = token;
  }
  
  // 初始化 Bootstrap Modal
  productModalRef.current = new bootstrap.Modal('#productModal', {
    keyboard: false,
  });
  
  checkLogin();  // 檢查登入狀態
}, []);  // 空陣列表示只在元件掛載時執行一次
```

**初學者解說**：
- `useEffect`：React Hook，用來處理副作用（side effects）
- 副作用包括：API 請求、訂閱、手動修改 DOM 等
- `[]`（依賴陣列）：空陣列表示這個 effect 只在元件第一次渲染時執行
- `?.`：可選鏈（Optional Chaining），如果前面的值是 null 或 undefined，會短路返回 undefined

**什麼時候使用 useEffect**？
- 元件載入時需要取得資料
- 需要訂閱或取消訂閱
- 需要手動操作 DOM

---

### 6. 條件渲染

```jsx
return (
  <>
    {!isAuth ? (
      // 顯示登入表單
      <div className='container login'>
        {/* 登入表單的 JSX */}
      </div>
    ) : (
      // 顯示產品管理頁面
      <div className='container'>
        {/* 產品列表的 JSX */}
      </div>
    )}
  </>
);
```

**初學者解說**：
- `{}`：在 JSX 中插入 JavaScript 表達式
- `? :`：三元運算子，if-else 的簡寫
- `!isAuth`：如果未登入（isAuth 為 false）
- `<>...</>`：Fragment，用來包裹多個元素而不新增額外的 DOM 節點

**範例**：如果使用者未登入，顯示登入表單；如果已登入，顯示產品列表。

---

### 7. 列表渲染（使用 map）

```jsx
{products && products.length > 0 ? (
  products.map((item) => (
    <tr key={item.id}>
      <td>{item.category}</td>
      <td>{item.title}</td>
      <td>{item.origin_price}</td>
      <td>{item.price}</td>
      <td className={`${item.is_enabled ? 'text-success' : ''}`}>
        {item.is_enabled ? '啟用' : '未啟用'}
      </td>
      <td>
        {/* 編輯和刪除按鈕 */}
      </td>
    </tr>
  ))
) : (
  <tr>
    <td colSpan='5'>尚無產品資料</td>
  </tr>
)}
```

**初學者解說**：
- `map()`：陣列方法，遍歷陣列並返回新陣列
- `key={item.id}`：React 需要 key 來識別列表中的每個元素，提升效能
- `&&`：邏輯 AND，當左邊為 true 時才執行右邊
- 樣板字串（Template Literals）：使用 `` ` `` 和 `${}` 來插入變數

**為什麼需要 key**？
Key 幫助 React 追蹤哪些項目被新增、修改或刪除，提升列表渲染效能。

---

### 8. 使用 useRef 控制 Modal

```jsx
const productModalRef = useRef(null);

useEffect(() => {
  productModalRef.current = new bootstrap.Modal('#productModal', {
    keyboard: false,
  });
}, []);

const openModal = (product, type) => {
  setTemplateData({ ...prevData, ...product });
  setModalType(type);
  productModalRef.current.show();  // 顯示 Modal
};

const closeModal = () => {
  productModalRef.current.hide();  // 隱藏 Modal
};
```

**初學者解說**：
- `useRef`：建立一個可變的引用物件，不會觸發重新渲染
- `.current`：存取 ref 的目前值
- 用途：保存 DOM 元素的引用，或保存不需要觸發渲染的可變值

**useRef vs useState 的差異**：
- `useState`：當值改變時會觸發重新渲染
- `useRef`：當值改變時不會觸發重新渲染

---

## 🔑 重要概念說明

### Props vs State

- **Props（屬性）**：從父元件傳遞給子元件的資料，子元件不能修改
- **State（狀態）**：元件內部的資料，可以被修改

### 受控元件（Controlled Component）

```jsx
<input
  type='email'
  name='username'
  value={formData.username}  // 值由 state 控制
  onChange={handleInputChange}  // 更新 state
/>
```

輸入框的值由 React state 控制，而不是由 DOM 自己管理。

### 展開運算子（Spread Operator）

```jsx
// 複製物件
const newData = { ...oldData, name: 'New Name' };

// 複製陣列
const newArray = [...oldArray, newItem];
```

用來快速複製物件或陣列，並進行修改。

---

## 🌐 API 設定說明

本專案使用環境變數來管理 API 設定：

1. 在專案根目錄建立 `.env.local` 檔案
2. 設定以下變數：

```env
VITE_API_BASE=https://你的API網址.com
VITE_API_PATH=你的API路徑
```

3. 在程式中使用：

```jsx
const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;
```

**注意**：
- 環境變數必須以 `VITE_` 開頭才能被 Vite 讀取
- `.env.local` 不會被 Git 追蹤（已在 .gitignore 中設定）
- 修改環境變數後需要重新啟動開發伺服器

---

## 📤 部署說明

### 部署到 GitHub Pages

1. 確保 `vite.config.js` 中的 base 路徑設定正確：

```js
base: process.env.NODE_ENV === 'production' ? '/react-training-2025-wk3/' : '/',
```

2. 執行部署指令：

```bash
npm run deploy
```

3. 等待部署完成後，可以在以下網址訪問：
   `https://你的使用者名稱.github.io/react-training-2025-wk3/`

### 部署到其他平台

- **Vercel**：[https://vercel.com](https://vercel.com)
- **Netlify**：[https://www.netlify.com](https://www.netlify.com)

這些平台都支援直接從 GitHub 部署，設定簡單！

---

## 🎓 學習資源

### 官方文件

- [React 官方文件（英文）](https://react.dev/)
- [React 官方文件（中文）](https://zh-hans.react.dev/)
- [Vite 官方文件](https://vitejs.dev/)
- [Bootstrap 5 文件](https://getbootstrap.com/)
- [Axios 文件](https://axios-http.com/)

### 推薦學習路徑

1. **JavaScript 基礎**：
   - ES6+ 語法（箭頭函式、解構賦值、展開運算子）
   - Promise 和 async/await
   - 陣列方法（map, filter, reduce）

2. **React 基礎**：
   - JSX 語法
   - 元件與 Props
   - State 與生命週期
   - React Hooks（useState, useEffect, useRef）

3. **進階主題**：
   - React Router（頁面路由）
   - 狀態管理（Redux, Zustand）
   - TypeScript

### 線上課程推薦

- [六角學院](https://www.hexschool.com/)
- [Udemy React 課程](https://www.udemy.com/topic/react/)
- [freeCodeCamp](https://www.freecodecamp.org/)

---

## 🐛 常見問題

### 1. 無法安裝套件？

```bash
# 清除快取並重新安裝
rm -rf node_modules package-lock.json
npm install
```

### 2. 開發伺服器無法啟動？

- 檢查是否有其他程式佔用 5173 埠號
- 確認 Node.js 版本是否正確

### 3. API 請求失敗？

- 檢查 `.env.local` 檔案是否設定正確
- 確認 API 伺服器是否正常運作
- 檢查瀏覽器的 Console 和 Network 面板

### 4. 部署後無法正常顯示？

- 檢查 `vite.config.js` 的 base 路徑設定
- 確認 GitHub Pages 已啟用

---

## 📝 練習建議

學習本專案後，可以嘗試以下練習：

1. **簡單練習**：
   - 修改產品列表的樣式
   - 新增產品搜尋功能
   - 加入產品分類篩選

2. **進階練習**：
   - 實作分頁功能
   - 加入圖片預覽功能
   - 實作拖曳排序

3. **挑戰練習**：
   - 改用 TypeScript
   - 加入單元測試
   - 實作購物車功能

---

## 🤝 貢獻

如果你發現任何問題或有改進建議，歡迎：

1. 提交 Issue
2. 發送 Pull Request
3. 與我聯繫討論

---

## 📄 授權

本專案採用 MIT 授權條款。

---

## 👨‍💻 作者

- 作者：BriantsaiCoder
- 專案連結：[https://github.com/BriantsaiCoder/react-training-2025-wk3](https://github.com/BriantsaiCoder/react-training-2025-wk3)

---

## 💡 學習小提示

1. **不要害怕錯誤**：錯誤訊息是最好的學習機會
2. **多動手實作**：看一百次不如自己寫一次
3. **善用開發工具**：React DevTools, Chrome DevTools
4. **閱讀官方文件**：最權威且完整的學習資源
5. **加入社群**：與其他開發者交流學習

祝你學習順利！ 🎉
