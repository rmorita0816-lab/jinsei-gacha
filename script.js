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
const titleResult = document.getElementById("titleResult");
const shareBtn = document.getElementById("shareBtn");


/* =========================
   追加デザイン
========================= */

const style = document.createElement("style");

style.textContent = `
.life-rank-box {
  margin-top: 22px;
  padding: 18px;
  border-radius: 18px;
  background: rgba(255,255,255,0.06);
  text-align: center;
  font-size: 24px;
}

.life-rank-value {
  display: block;
  font-size: 42px;
  font-weight: bold;
  margin-top: 6px;
}

.life-score-box {
  margin-top: 14px;
  font-size: 22px;
  text-align: center;
}

.life-message {
  margin-top: 18px;
  text-align: center;
  font-size: 22px;
  font-weight: bold;
}

.rarity-box {
  margin: 14px 0;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
}

.gacha-r {
  text-shadow: 0 0 12px rgba(255,255,255,0.4);
}

.gacha-sr {
  color: #ffd54f;
  text-shadow: 0 0 15px rgba(255,213,79,0.8);
}

.gacha-ssr {
  color: #ff75ff;
  text-shadow: 0 0 20px rgba(255,117,255,0.9);
}

.gacha-god {
  color: #fff;
  text-shadow:
    0 0 10px #fff,
    0 0 25px #ffd700,
    0 0 45px #ff00ff;
  animation: godPulse 1s infinite alternate;
}

@keyframes godPulse {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.08);
  }
}

.god-result {
  animation: godResult 1.2s infinite alternate;
}

@keyframes godResult {
  from {
    box-shadow: 0 0 20px rgba(255,215,0,0.2);
  }
  to {
    box-shadow:
      0 0 35px rgba(255,215,0,0.8),
      0 0 70px rgba(255,0,255,0.5);
  }
}

.reroll-button {
  width: 100%;
  margin-top: 14px;
  padding: 18px;
  border: none;
  border-radius: 18px;
  font-size: 20px;
  font-weight: bold;
  color: white;
  background: linear-gradient(90deg,#00c6ff,#7b2cff);
  box-shadow: 0 0 20px rgba(0,200,255,0.45);
}

.reroll-button:active {
  transform: scale(0.97);
}

.result-line {
  margin: 12px 0;
}
`;

document.head.appendChild(style);


/* =========================
   ガチャ本体
========================= */

button.addEventListener("click", playGacha);


/* =========================
   ガチャを回す
========================= */

async function playGacha() {

  button.disabled = true;

  result.classList.remove("god-result");

  titleResult.textContent = "🎰 ガチャを回しています...";

  result.innerHTML = `
    <div id="count" style="
      text-align:center;
      font-size:50px;
      font-weight:bold;
      margin:20px 0;
    ">3</div>
  `;

  for (let i = 3; i >= 1; i--) {

    document.getElementById("count").textContent = i;

    await wait(1000);
  }

  const luck = random(lucks);

  let birth = random(birthplace);
  let job = random(jobs);
  let income = random(incomes);
  let love = random(loves);

  birth = await slotEffect(birthplace, 15);
  job = await slotEffect(jobs, 15);
  income = await slotEffect(incomes, 15);
  love = await slotEffect(loves, 15);

  const score = getScore(luck);
  const rank = getRank(score);
  const message = getMessage(rank);

  const rarity = getRarity(luck);

  let luckClass = "gacha-r";

  if (luck === "SR") {
    luckClass = "gacha-sr";
  }

  if (luck === "SSR") {
    luckClass = "gacha-ssr";
  }

  if (luck === "GOD") {
    luckClass = "gacha-god";
    result.classList.add("god-result");

    if (navigator.vibrate) {
      navigator.vibrate([300,150,300,150,500]);
    }
  }

  titleResult.textContent = getTitle(luck);

  result.innerHTML = `

    <div class="rarity-box ${luckClass}">
      🍀 ${luck} 
      <div style="font-size:16px;margin-top:5px;">
        ${rarity}
      </div>
    </div>

    <p class="result-line">👶 出身：${birth}</p>

    <p class="result-line">💼 職業：${job}</p>

    <p class="result-line">💰 年収：${income}</p>

    <p class="result-line">💕 恋愛：${love}</p>

    <div class="life-rank-box">
      🏆 人生ランク
      <span class="life-rank-value">${rank}</span>
    </div>

    <div class="life-score-box">
      ⭐ 人生スコア：
      <strong>${score}</strong> / 100
    </div>

    <div class="life-message">
      ${message}
    </div>
  `;


  /* シェア */

  setupShare(
    birth,
    job,
    income,
    love,
    luck,
    rank,
    score,
    rarity
  );


  /* もう一回ボタン */

  createRerollButton();

  button.disabled = false;
}


/* =========================
   レア度
========================= */

function getRarity(luck) {

  switch (luck) {

    case "GOD":
      return "🌈 神クラス";

    case "SSR":
      return "👑 超激レア";

    case "SR":
      return "🔥 激レア";

    default:
      return "✨ レア";
  }
}


/* =========================
   タイトル
========================= */

function getTitle(luck) {

  switch (luck) {

    case "GOD":
      return "🌈 神の人生";

    case "SSR":
      return "👑 超勝ち組人生";

    case "SR":
      return "😊 勝ち組人生";

    default:
      return "🌱 普通の人生";
  }
}


/* =========================
   スコア
========================= */

function getScore(luck) {

  switch (luck) {

    case "GOD":
      return 100;

    case "SSR":
      return Math.floor(Math.random() * 10) + 90;

    case "SR":
      return Math.floor(Math.random() * 15) + 70;

    default:
      return Math.floor(Math.random() * 40) + 30;
  }
}


/* =========================
   人生ランク
========================= */

function getRank(score) {

  if (score >= 98) return "SSS";
  if (score >= 90) return "SS";
  if (score >= 80) return "S";
  if (score >= 70) return "A";
  if (score >= 60) return "B";
  if (score >= 45) return "C";

  return "D";
}


/* =========================
   メッセージ
========================= */

function getMessage(rank) {

  switch (rank) {

    case "SSS":
      return "🌈✨ 神に選ばれし者";

    case "SS":
      return "👑✨ 超勝ち組人生";

    case "S":
      return "🔥✨ 勝ち組人生";

    case "A":
      return "😎✨ かなり良い人生";

    case "B":
      return "😊✨ 平均以上の人生";

    case "C":
      return "🍀✨ これからが本番";

    default:
      return "💪✨ ここから人生逆転！";
  }
}


/* =========================
   スロット演出
========================= */

async function slotEffect(list, times) {

  let value;

  for (let i = 0; i < times; i++) {

    value = random(list);

    await wait(70);
  }

  return value;
}


/* =========================
   ランダム
========================= */

function random(list) {

  return list[
    Math.floor(Math.random() * list.length)
  ];
}


/* =========================
   待機
========================= */

function wait(ms) {

  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}


/* =========================
   シェア
========================= */

function setupShare(
  birth,
  job,
  income,
  love,
  luck,
  rank,
  score,
  rarity
) {

  shareBtn.onclick = async () => {

    const text = `
🎰 人生ガチャの結果！

👶 出身：${birth}
💼 職業：${job}
💰 年収：${income}
💕 恋愛：${love}

🍀 運勢：${luck}
✨ レア度：${rarity}

🏆 人生ランク：${rank}
⭐ 人生スコア：${score} / 100

🎰 あなたも人生ガチャを回してみて！
`;

    if (navigator.share) {

      try {

        await navigator.share({
          title: "🎰 人生ガチャの結果！",
          text: text
        });

      } catch (error) {

        console.log("シェアをキャンセルしました");

      }

    } else {

      try {

        await navigator.clipboard.writeText(text);

        alert("結果をコピーしました！📋");

      } catch (error) {

        alert(text);
      }
    }
  };
}


/* =========================
   もう一回ガチャる
========================= */

function createRerollButton() {

  let rerollBtn = document.getElementById("rerollBtn");

  if (!rerollBtn) {

    rerollBtn = document.createElement("button");

    rerollBtn.id = "rerollBtn";

    rerollBtn.className = "reroll-button";

    rerollBtn.textContent = "🔄 もう一回ガチャる";

    shareBtn.insertAdjacentElement(
      "afterend",
      rerollBtn
    );

    rerollBtn.addEventListener(
      "click",
      playGacha
    );
  }
}
