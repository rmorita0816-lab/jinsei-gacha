const birthplace = [
  "北海道",
  "東京",
  "大阪",
  "福岡",
  "沖縄"
];

const jobs = [
  "会社員",
  "ゲームクリエイター",
  "YouTuber",
  "漁師",
  "医者",
  "宇宙飛行士",
  "魔王",
  "ニート王"
];

const incomes = [
  "3万円",
  "250万円",
  "420万円",
  "680万円",
  "1200万円",
  "1億円",
  "100億円"
];

const loves = [
  "独身",
  "25歳で結婚",
  "30歳で結婚",
  "運命の人と出会う",
  "AIと結婚",
  "世界一モテる"
];

const lucks = [
  "R",
  "R",
  "R",
  "SR",
  "SSR",
  "GOD"
];

const button = document.getElementById("gachaBtn");
const result = document.getElementById("result");

button.addEventListener("click", async () => {

  button.disabled = true;

  result.innerHTML = `
    <h2>🎰 ガチャを回しています...</h2>
    <h1 id="count">3</h1>
  `;

  for (let i = 3; i >= 1; i--) {
    document.getElementById("count").textContent = i;
    await wait(1000);
  }

  const luck = random(lucks);

  let className = "";

  if (luck === "SSR") {
    className = "ssr";
  }

  if (luck === "GOD") {
    className = "god";

    if (navigator.vibrate) {
      navigator.vibrate([300, 150, 300]);
    }
  }

  result.innerHTML = `
    <p>👶 出身：<span id="birth"></span></p>
    <p>💼 職業：<span id="job"></span></p>
    <p>💰 年収：<span id="income"></span></p>
    <p>💕 恋愛：<span id="love"></span></p>

    <h2 class="${className}">
      🍀 <span id="luckText"></span>
    </h2>

    <h2 id="title"></h2>

    <div id="lifeRank"></div>
  `;

  const birth = document.getElementById("birth");
  const job = document.getElementById("job");
  const income = document.getElementById("income");
  const love = document.getElementById("love");
  const luckText = document.getElementById("luckText");
  const title = document.getElementById("title");
  const lifeRank = document.getElementById("lifeRank");

  birth.textContent = await slotEffect(birth, birthplace, 12);
  job.textContent = await slotEffect(job, jobs, 12);
  income.textContent = await slotEffect(income, incomes, 12);
  love.textContent = await slotEffect(love, loves, 12);

  luckText.textContent = luck;

  // --------------------
  // 人生スコア
  // --------------------

  let score = 0;

  // 年収ポイント
  if (income.textContent === "3万円") score += 5;
  if (income.textContent === "250万円") score += 20;
  if (income.textContent === "420万円") score += 35;
  if (income.textContent === "680万円") score += 50;
  if (income.textContent === "1200万円") score += 65;
  if (income.textContent === "1億円") score += 85;
  if (income.textContent === "100億円") score += 100;

  // 職業ポイント
  if (job.textContent === "会社員") score += 5;
  if (job.textContent === "ゲームクリエイター") score += 15;
  if (job.textContent === "YouTuber") score += 20;
  if (job.textContent === "漁師") score += 15;
  if (job.textContent === "医者") score += 25;
  if (job.textContent === "宇宙飛行士") score += 30;
  if (job.textContent === "魔王") score += 30;
  if (job.textContent === "ニート王") score += 10;

  // 恋愛ポイント
  if (love.textContent === "独身") score += 5;
  if (love.textContent === "25歳で結婚") score += 15;
  if (love.textContent === "30歳で結婚") score += 15;
  if (love.textContent === "運命の人と出会う") score += 25;
  if (love.textContent === "AIと結婚") score += 20;
  if (love.textContent === "世界一モテる") score += 30;

  // レア度ポイント
  if (luck === "R") score += 5;
  if (luck === "SR") score += 15;
  if (luck === "SSR") score += 30;
  if (luck === "GOD") score += 50;

  // 最大100点に調整
  score = Math.min(score, 100);

  // --------------------
  // ランク決定
  // --------------------

  let rank = "";
  let rankEmoji = "";
  let nickname = "";

  if (score >= 95) {
    rank = "SSS";
    rankEmoji = "🌈";
    nickname = "✨ 神に選ばれし者";
  } else if (score >= 85) {
    rank = "SS";
    rankEmoji = "👑";
    nickname = "⚡ 人生の勝者";
  } else if (score >= 70) {
    rank = "S";
    rankEmoji = "🔥";
    nickname = "🚀 運命を掴みし者";
  } else if (score >= 55) {
    rank = "A";
    rankEmoji = "⭐";
    nickname = "😎 かなり順調な人生";
  } else if (score >= 40) {
    rank = "B";
    rankEmoji = "😊";
    nickname = "🌱 これから伸びる人生";
  } else {
    rank = "C";
    rankEmoji = "🍀";
    nickname = "🎲 波乱万丈の人生";
  }

  // --------------------
  // レアタイトル
  // --------------------

  title.className = "";

  switch (luck) {

    case "R":
      title.textContent = "🌱 普通の人生";
      title.classList.add("title-r");
      break;

    case "SR":
      title.textContent = "😊 勝ち組";
      title.classList.add("title-sr");
      break;

    case "SSR":
      title.textContent = "👑 超勝ち組";
      title.classList.add("title-ssr");
      document.body.classList.add("ssr-mode");
      break;

    case "GOD":
      title.textContent = "🌈 神の人生";
      title.classList.add("title-god");
      document.body.classList.add("god-mode");
      break;
  }

  // --------------------
  // 人生ランク表示
  // --------------------

  lifeRank.innerHTML = `
    <div class="life-rank">
      <h2>🏆 人生ランク</h2>

      <div class="rank-big">
        ${rankEmoji} ${rank}
      </div>

      <div class="score">
        ⭐ 人生スコア：${score} / 100
      </div>

      <div class="nickname">
        🎭 ${nickname}
      </div>
    </div>
  `;

  button.disabled = false;
});


// ====================
// ランダム
// ====================

function random(list) {
  return list[Math.floor(Math.random() * list.length)];
}


// ====================
// 待機
// ====================

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


// ====================
// スロット演出
// ====================

async function slotEffect(element, list, times) {

  for (let i = 0; i < times; i++) {

    element.textContent = random(list);

    await wait(70);
  }

  return random(list);
}
