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
    <h2 class="${className}">
      🍀 <span id="luckText">${luck}</span>
    </h2>

    <p>👶 出身：<span id="birth"></span></p>
    <p>💼 職業：<span id="job"></span></p>
    <p>💰 年収：<span id="income"></span></p>
    <p>💕 恋愛：<span id="love"></span></p>

    <div class="lifeRank">
      🏆 人生ランク
      <strong id="rank"></strong>
    </div>

    <div class="lifeScore">
      ⭐ 人生スコア：
      <strong id="score"></strong> / 100
    </div>

    <div id="message"></div>

   
  `;

  const birth = document.getElementById("birth");
  const job = document.getElementById("job");
  const income = document.getElementById("income");
  const love = document.getElementById("love");
  const rank = document.getElementById("rank");
  const scoreText = document.getElementById("score");
  const message = document.getElementById("message");
  const newShareBtn = document.getElementById("shareBtn");

  const birthResult = await slotEffect(
    birth,
    birthplace,
    15
  );

  const jobResult = await slotEffect(
    job,
    jobs,
    15
  );

  const incomeResult = await slotEffect(
    income,
    incomes,
    15
  );

  const loveResult = await slotEffect(
    love,
    loves,
    15
  );

  birth.textContent = birthResult;
  job.textContent = jobResult;
  income.textContent = incomeResult;
  love.textContent = loveResult;

  const score = getScore(luck);
  const lifeRank = getRank(score);

  rank.textContent = lifeRank;
  scoreText.textContent = score;

  message.textContent = getMessage(lifeRank);

  setupShare(
    newShareBtn,
    birthResult,
    jobResult,
    incomeResult,
    loveResult,
    luck,
    lifeRank,
    score
  );

  button.disabled = false;
});


function random(list) {
  return list[Math.floor(Math.random() * list.length)];
}


function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


async function slotEffect(element, list, times) {

  for (let i = 0; i < times; i++) {

    element.textContent = random(list);

    await wait(70);
  }

  return random(list);
}


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


function getRank(score) {

  if (score >= 98) return "SSS";
  if (score >= 90) return "SS";
  if (score >= 80) return "S";
  if (score >= 70) return "A";
  if (score >= 60) return "B";
  if (score >= 45) return "C";

  return "D";
}


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


function setupShare(
  shareButton,
  birth,
  job,
  income,
  love,
  luck,
  rank,
  score
) {

  shareButton.addEventListener("click", async () => {

    const text = `
🎰 人生ガチャの結果！

👶 出身：${birth}
💼 職業：${job}
💰 年収：${income}
💕 恋愛：${love}

🍀 運勢：${luck}

🏆 人生ランク：${rank}
⭐ 人生スコア：${score} / 100

✨ あなたも人生ガチャを回してみて！
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
  });
}
