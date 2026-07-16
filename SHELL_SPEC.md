# 教學網站外殼規格（組裝代理必讀）

## 產出
單一檔案 `/mnt/agents/output/busway/index.html`（繁體中文、UTF-8、RWD），內嵌全部 CSS 與 JS；依序內聯 fragments/ 下 16 個片段。圖片相對路徑 assets/。

## 組裝順序與側邊欄知識樹（捲動連動 scroll-spy）
```
首頁總覽          → 00_overview.html          #overview
模組一｜標準導讀基礎
  標準定位·適用範圍·引用標準 → 01_intro.html   #ch-intro
  用語及定義        → 02_terms.html            #ch-terms
  符號及縮寫        → 03_symbols.html          #ch-symbols
模組二｜規格介面與使用條件
  介面特性          → 04_interface.html        #ch-interface
  資訊與標示        → 05_information.html      #ch-info
  使用條件          → 06_conditions.html       #ch-conditions
模組三｜構造與性能要求
  構造要求          → 07_construction.html     #ch-construction
  性能要求          → 08_performance.html      #ch-performance
模組四｜查證與檢驗（試運轉核心）
  設計查證          → 09_design_verification.html #ch-design-verification
  例行檢驗          → 10_routine.html          #ch-routine
模組五｜附錄工程計算
  附錄C~EE         → 11_annexes.html          #ch-annexes
模組六｜AI算力中心實戰與評量
  實戰案例          → 12_case_datacenter.html  #case-dc
  痛點·成本·效益    → 13_pain_cost_benefit.html #pain-cost
  復盤測驗          → 14_quiz.html             #quiz
```
若某片段缺失，組裝時略過並在回報中註明。

## 頁首 Hero（組裝代理自建，非片段）
- 主標：匯流排線槽系統(Busway) 試運轉實務
- 副標：CNS 61439-6:2021 知識樹導讀 × AI 算力中心工程應用
- 標籤列：CNS 61439-6｜對應 IEC 61439-6:2012｜低壓 ≤AC1,000V/DC1,500V｜試運轉顧問教案
- 右側或下方放簡短導讀 2~3 句。

## 設計系統（全部寫在 <style>）
- 字體：font-family: "Noto Sans TC","Microsoft JhengHei","PingFang TC",system-ui,sans-serif;
- 色票（低飽和暖色，禁藍紫漸層）：
  --bg:#faf7f2; --surface:#fffdf9; --ink:#2b2620; --muted:#6b6255; --line:#e7ded2;
  --accent:#a65d2e(銅橙); --accent-2:#8a6d3b(暖橄欖); --pain:#b3402a; --benefit:#3f7a4e; --warn:#b07d1e; --tip:#7a6a4f;
  側邊欄背景 #f3ede4。
- 版面：左固定側邊欄 280px（模組分組+章節連結，捲動連動高亮）；主欄 max-width 960px 置中；頂部 3px 閱讀進度條；手機 <1024px 側邊欄改漢堡抽屜。
- 片段 class 樣式需求：
  .chapter{padding:48px 0;border-bottom:1px solid var(--line)}
  .chapter-header：左邊 4px accent 豎條；.chapter-no=accent 膠囊小標；h2 28px；.chapter-sub muted。
  .lead 引言底色 #f5efe6 左豎條。.block{margin:28px 0} .block>h3 20px 含 accent 小方塊。
  .grid-2/.grid-3 CSS grid gap16，卡片 .card 白底圓角12 陰影淡 1px 邊框，h4 17px accent。
  .callout 系列：圓角10 左4px色條+淺底色（pain:#fbeee9/邊var(--pain)；benefit:#eef5ee/var(--benefit)；warn:#faf3e2/var(--warn)；tip:#f4efe6/var(--tip)），內文 15.5px。
  .kp-box：深米底 #f7f1e7、標題「知識點複習」前加 ✦；ol 編號 accent。
  .case-box：白底虛線邊；.case-box.dc 改淺銅底 #faf3ec、標題前加 🏢（若emoji不妥改用 ◆）。
  .flow-steps：垂直步驟，.step 左側編號圓(accent)+連線，hover 微浮起。
  table.std-table：三線表風——白底、thead 底 #f0e8db、列 hover #fbf7ef、caption 置中粗體 muted；th/td padding 10px 12px；border:1px solid var(--line)；圓角外框 overflow hidden；小螢幕橫向捲動（外包 .tbl-wrap）。
  .fig-box：置中、白底卡片、img max-width:100% 圓角8 邊框；figcaption 13.5px muted 置中；可點圖放大（簡易 lightbox：點擊開 overlay 顯示原圖，再點關閉）。
  .def-list .def：左欄 .term 粗體 accent(等寬感) 右欄 .desc；列間細線。
  .tag：行內小膠囊 muted 邊框。.badge-lv：小圓角標籤，b-basic 綠系、b-adv 銅系。
  .tree：巢狀清單，CSS 繪製樹枝線（::before 直線橫線），根節點 accent 粗體卡片，子節點 hover 底色；樹節點文字若對應章節，包 <a href="#id"> 連結可跳轉（組裝代理於組裝時把 00_overview 片段內知識樹各章節文字補上對應錨點連結）。
  .quiz-q：白底卡片；.opts li 可點、hover 底色；點擊後正確→綠底✓、錯誤→紅底✗並同時標出正解；.explain 預設隱藏，作答後展開；答過鎖定。章末「計分」：JS 維護答對數/已答數，顯示於測驗章頂部計分條（#quiz-score，組裝代理於 14_quiz 片段前插入計分條 div）。
- 頁尾：教案版本、日期(2026-07)、免責聲明（教學用途，以 CNS 61439-6 正式標準原文為準）。

## JS（<script> 置 body 末）
1. scroll-spy：IntersectionObserver(rootMargin -30% 0px -60%) 高亮側欄現讀章節；點側欄平滑捲動；側欄項目 active 時左色條+粗體。
2. 頂部閱讀進度條寬度隨捲動。
3. 測驗引擎：委派監聽 .opts li click → 對照父層 .quiz-q[data-answer]；更新 #quiz-score（答對/已答/正確率）；explain 展開；li 加 .correct/.wrong；該題鎖定(pointer-events:none)。另加「重置作答」按鈕。
4. 行動版側欄抽屜開關按鈕（fixed 左上，僅 <1024px 顯示）。
5. 圖片 lightbox（點 .fig-box img）。
6. 回到頂端按鈕（捲過 600px 顯示）。
7. <details> 不需 JS。所有 JS 純 vanilla，無外部 CDN。

## 品質自查（組裝代理完成後必做）
- grep 確認 16 個 id 錨點皆存在（缺失片段除外）；所有 img src 的檔案存在於 assets/（缺圖列清單回報，勿改路徑）。
- 用瀏覽器工具開啟 index.html 截圖：首屏、中段、測驗章、手機寬度 390px 各 1 張，檢查跑版（側欄連動、表格溢出、圖片破圖）。
- 發現片段內容明顯錯誤（亂碼、未閉合標籤）可小幅修正 HTML 結構，但不得改寫技術內容；修正處回報。
