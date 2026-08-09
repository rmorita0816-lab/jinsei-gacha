/* ========================================
   🎰 人生ガチャ
   ======================================== */

const birthplace = [
  "北海道",
  "東京都",
  "大阪府",
  "福岡県",
  "沖縄県",
  "京都府",
  "愛知県",
  "神奈川県",
  "宮城県",
  "海外"
];

const jobs = [
  "会社員",
  "フリーランス",
  "YouTuber",
  "公務員",
  "医者",
  "教師",
  "エンジニア",
  "社長",
  "芸能人",
  "ニート"
];

const incomes = [
  "300万円",
  "450万円",
  "520万円",
  "680万円",
  "780万円",
  "1200万円",
  "1億円",
  "100万円",
  "250万円",
  "5000万円"
];

const loves = [
  "独身",
  "25歳で結婚",
  "30歳で結婚",
  "35歳で結婚",
  "運命の人と出会う",
  "恋愛充実",
  "大恋愛",
  "結婚しない人生"
];

const lucks = [
  "普通",
  "ちょっと幸運",
  "かなり幸運",
  "超幸運",
  "激レア",
  "神クラス"
];

const gachaBtn = document.getElementById("gachaBtn");
const result = document.getElementById("result");
const titleResult = document.getElementById("titleResult");
const shareBtn = document.getElementById("shareBtn");

let lastResult = null;


/* ========================================
   🎲 ランダム
======================================== */

function random(list) {
  return list[Math.floor(Math.random() * list.length)];
}


/* ========================================
   ⏳ 待機
======================================== */

function wait(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}


/* ========================================
   ✨ レア度
======================================== */

function getRarity() {
  const r = Math.random();

  if (r < 0.02) return "GOD";
  if (r < 0.08) return "SSR";
  if (r < 0.25) return "SR";

  return "R";
}


/* ========================================
   🏆 スコア
======================================== */

function getScore(rarity) {
  switch (rarity) {
    case "GOD":
      return 100;

    case "SSR":
      return Math.floor(Math.random() * 16) + 85;

    case "SR":
      return Math.floor(Math.random() * 21) + 65;

    default:
      return Math.floor(Math.random() * 50) + 20;
  }
}


/* ========================================
   🏆 人生ランク
======================================== */

function getRank(score) {
  if (score >= 95) return "S+";
  if (score >= 85) return "S";
  if (score >= 75) return "A";
  if (score >= 60) return "B";
  if (score >= 40) return "C";

  return "D";
}


/* ========================================
   🌈 人生メッセージ
======================================== */

function getMessage(score, rarity) {

  if (rarity === "GOD") {
    return "🌈✨ 神に選ばれし者";
  }

  if (score >= 85) {
    return "😎✨ かなり良い人生";
  }

  if (score >= 70) {
    return "😊✨ 幸せな人生";
  }

  if (score >= 50) {
    return "💪✨ ここから人生逆転！";
  }

  return "🔥✨ まだまだこれから！";
}


/* ========================================
   🎨 レア度クラス
======================================== */

function getRarityClass(rarity) {

  switch (rarity) {
    case "GOD":
      return "gacha-god";

    case "SSR":
      return "gacha-ssr";

    case "SR":
      return "gacha-sr";

    default:
      return "gacha-r";
  }
}


/* ========================================
   🎰 ガチャ本体
======================================== */

async function playGacha() {

  gachaBtn.disabled = true;

  if (shareBtn) {
    shareBtn.style.display = "none";
  }

  const oldReroll = document.getElementById("rerollBtn");

  if (oldReroll) {
    oldReroll.remove();
  }

  result.classList.remove(
    "gacha-god",
    "gacha-ssr",
    "gacha-sr",
    "gacha-r"
  );

  titleResult.textContent = "🎰 ガチャ中……";

  result.innerHTML = `
    <div style="
      text-align:center;
      font-size:32px;
      font-weight:bold;
      margin:25px 0;
    ">
      🎰
      <div id="gachaCount">3</div>
    </div>
  `;

  /* カウントダウン */

  for (let i = 3; i >= 1; i--) {

    const count = document.getElementById("gachaCount");

    if (count) {
      count.textContent = i;
    }

    await wait(700);
  }

  /* 結果生成 */

  const birth = random(birthplace);
  const job = random(jobs);
  const income = random(incomes);
  const love = random(loves);
  const luck = random(lucks);

  const rarity = getRarity();
  const score = getScore(rarity);
  const rank = getRank(score);
  const message = getMessage(score, rarity);

  lastResult = {
    birth,
    job,
    income,
    love,
    luck,
    rarity,
    score,
    rank,
    message
  };

  const rarityClass = getRarityClass(rarity);

  /* レア演出 */

  result.classList.add(rarityClass);

  if (navigator.vibrate) {
    if (rarity === "GOD") {
      navigator.vibrate([150, 80, 150, 80, 300]);
    } else {
      navigator.vibrate(100);
    }
  }

  /* 結果表示 */

  titleResult.textContent = "";

  result.innerHTML = `
    <div class="rarity-box">
      🍀 <span>${rarity}</span>
    </div>

    <div class="life-message">
      ${rarity === "GOD" ? "🔥 激レア" : ""}
    </div>

    <p class="result-line">👶 出身：${birth}</p>

    <p class="result-line">💼 職業：${job}</p>

    <p class="result-line">💰 年収：${income}</p>

    <p class="result-line">💕 恋愛：${love}</p>

    <div class="life-rank-box">
      🏆 人生ランク
      <strong>${rank}</strong>
    </div>

    <div class="life-score-box">
      ⭐ 人生スコア：
      <strong>${score}</strong> / 100
    </div>

    <div class="life-message">
      ${message}
    </div>
  `;

  /* 共有ボタン */

  if (shareBtn) {
    shareBtn.style.display = "block";
  }

  /* もう一回ボタン */

  createRerollButton();

  gachaBtn.disabled = false;
}


/* ========================================
   🔄 もう一回ガチャ
======================================== */

function createRerollButton() {

  const oldButton = document.getElementById("rerollBtn");

  if (oldButton) {
    oldButton.remove();
  }

  const rerollBtn = document.createElement("button");

  rerollBtn.id = "rerollBtn";
  rerollBtn.className = "reroll-button";
  rerollBtn.textContent = "🎰 もう一回ガチャ";

  if (shareBtn) {
    shareBtn.insertAdjacentElement("afterend", rerollBtn);
  } else {
    result.insertAdjacentElement("afterend", rerollBtn);
  }

  rerollBtn.addEventListener("click", playGacha);
}


/* ========================================
   📸 html2canvas読み込み
======================================== */

function loadHtml2Canvas() {

  return new Promise((resolve, reject) => {

    if (window.html2canvas) {
      resolve();
      return;
    }

    const script = document.createElement("script");

    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";

    script.onload = () => resolve();

    script.onerror = () => reject(
      new Error("html2canvasの読み込みに失敗しました")
    );

    document.head.appendChild(script);
  });
}


/* ========================================
   📸 結果を画像化
======================================== */

async function createResultImage() {

  await loadHtml2Canvas();

  const target = document.querySelector(".container");

  if (!target) {
    throw new Error("結果画面が見つかりません");
  }

  const canvas = await html2canvas(target, {
    backgroundColor: "#111111",
    scale: 2,
    useCORS: true
  });

  return new Promise((resolve, reject) => {

    canvas.toBlob(blob => {

      if (blob) {
        resolve(blob);
      } else {
        reject(
          new Error("画像の作成に失敗しました")
        );
      }

    }, "image/png");
  });
}


/* ========================================
   📤 結果を画像でシェア
======================================== */

async function shareResult() {

  if (!lastResult) {
    alert("まずガチャを回してね🎰");
    return;
  }

  const originalText = shareBtn.textContent;

  shareBtn.disabled = true;
  shareBtn.textContent = "📸 画像を作成中…";

  try {

    const blob = await createResultImage();

    const file = new File(
      [blob],
      "人生ガチャ_結果.png",
      {
        type: "image/png"
      }
    );

    /* iPhoneなどの画像共有 */

    if (
      navigator.share &&
      navigator.canShare &&
      navigator.canShare({
        files: [file]
      })
    ) {

      await navigator.share({
        title: "🎰 人生ガチャの結果！",
        text: "人生ガチャを回してみた！",
        files: [file]
      });

    } else {

      /* 画像共有に対応していない場合 */

      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;
      link.download = "人生ガチャ_結果.png";

      document.body.appendChild(link);

      link.click();

      link.remove();

      setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 1000);

      alert(
        "📸 結果画像を作ったよ！\n\n" +
        "写真やファイルに保存してシェアしてね✨"
      );
    }

  } catch (error) {

    console.error(error);

    /* 共有キャンセルの場合は何もしない */

    if (
      error &&
      error.name === "AbortError"
    ) {
      return;
    }

    alert(
      "画像の作成に失敗しました💦\n" +
      "もう一度試してみてね！"
    );

  } finally {

    shareBtn.disabled = false;
    shareBtn.textContent = originalText;
  }
}


/* ========================================
   🎯 ボタン設定
======================================== */

gachaBtn.addEventListener(
  "click",
  playGacha
);

if (shareBtn) {

  shareBtn.addEventListener(
    "click",
    shareResult
  );

  shareBtn.style.display = "none";
}


/* ========================================
   🚀 初期状態
======================================== */

result.innerHTML = `
  <div style="
    text-align:center;
    opacity:0.7;
    padding:20px;
  ">
    🎰 ガチャを回して<br>
    あなたの人生を占おう！
  </div>
`;
