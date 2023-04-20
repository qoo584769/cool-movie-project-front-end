## 前端環境架設

2023/4/7提交:
1. 初步環境設置(react+typescript+sass+styped-components)
2. 拆分元件/分頁/路由設定
3. 建立store
4. 首頁資料定義

2023/4/8提交:
1. 加入Login Component
2. 增加NavBar，並加入登入/登出按鈕
3. 增加member路由及頁面

## 專案啟動
- 終端機輸入 npm ci 安裝。 
- 使用 npm ci 安裝保持版本一致，新套件再使用 npm i xxx

## 關閉Typescript 偵測
```
  請將下面的屬性，貼到typescript.config，即可關閉typescript偵測，然後重新啟用專案npm run start，就可以在不偵測typescript的環填下開發了
    "strict": false,
    "noImplicitAny": false,
    "noImplicitThis": false,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "skipLibCheck": true,
```

參考這個圖，關閉與開啟typescript的typescript.config檔
![圖片](https://user-images.githubusercontent.com/39715455/233432042-28ddf446-284c-42f8-aee6-4c7e7889a41e.png)

```
