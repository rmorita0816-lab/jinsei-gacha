/* ========================================
   🎰 人生ガチャ 超進化版
======================================== */

const gachaBtn = document.getElementById("gachaBtn");
const result = document.getElementById("result");
const titleResult = document.getElementById("titleResult");
const shareBtn = document.getElementById("shareBtn");


/* ========================================
   🎲 結果パターン
======================================== */

const results = [

  {
    type: "GOD",
    weight: 1,
    title: "🌈 神の人生",
    birth: "北海道",
    job: "世界を救う勇者",
    income: "10億円",
    love: "運命の人と結婚",
    rank: "S+",
    score: 100,
    message: "👑 人生完全勝利。"
  },

  {
    type: "GOD",
    weight: 1,
    title: "👑 神に選ばれし人生",
    birth: "東京都",
    job: "世界的企業のCEO",
    income: "50億円",
    love: "世界一愛される",
    rank: "S+",
    score: 100,
    message: "🌈 こんな人生、誰が勝てる？"
  },

  {
    type: "WIN",
    weight: 7,
    title: "👑 勝ち組人生",
    birth: "北海道",
    job: "社長",
    income: "3000万円",
    love: "幸せな結婚",
    rank: "S",
    score: 94,
    message: "😎 かなり強い人生！"
  },

  {
    type: "WIN",
    weight: 7,
    title: "💎 超成功人生",
    birth: "東京都",
    job: "人気YouTuber",
    income: "5000万円",
    love: "運命の人と出会う",
    rank: "S",
    score: 91,
    message: "🔥 人生勝ち組！"
  },

  {
    type: "WIN",
    weight: 8,
    title: "✨ 幸せ人生",
    birth: "沖縄県",
    job: "ゲームクリエイター",
    income: "1200万円",
    love: "大恋愛",
    rank: "A",
    score: 86,
    message: "😊 かなり良い人生！"
  },

  {
    type: "FUNNY",
    weight: 8,
    title: "🤣 謎すぎる人生",
    birth: "北海道",
    job: "石油王のペット",
    income: "−9999万円",
    love: "スマホと両思い",
    rank: "D",
    score: 7,
    message: "📱 でもスマホは裏切らない。"
  },

  {
    type: "FUNNY",
    weight: 8,
    title: "😂 とんでも人生",
    birth: "大阪府",
    job: "伝説のニート",
    income: "0円",
    love: "昨日の自分",
    rank: "D",
    score: 3,
    message: "💪 ここから人生逆転！"
  },

  {
    type: "FUNNY",
    weight: 7,
    title: "🐟 漁師人生",
    birth: "北海道",
    job: "最強の釣り人",
    income: "魚次第",
    love: "魚にモテる",
    rank: "B",
    score: 64,
    message: "🎣 とりあえず海へ行こう。"
  },

  {
    type: "FUNNY",
    weight: 7,
    title: "🍜 食べ歩き人生",
    birth: "福岡県",
    job: "ラーメン評論家",
    income: "800万円",
    love: "ラーメンと両思い",
    rank: "A",
    score: 78,
    message: "🍜 幸せの答えは替え玉。"
  },

  {
    type: "SURPRISE",
    weight: 7,
    title: "😱 まさかの人生",
    birth: "京都府",
    job: "宇宙飛行士",
    income: "8000万円",
    love: "宇宙で運命の人と出会う",
    rank: "S",
    score: 89,
    message: "🚀 誰にも予想できない人生！"
  },

  {
    type: "SURPRISE",
    weight: 7,
    title: "😳 波乱万丈人生",
    birth: "青森県",
    job: "魔王",
    income: "国家予算級",
    love: "勇者と恋に落ちる",
    rank: "A",
    score: 83,
    message: "⚔️ 普通の人生では終わらない！"
  },

  {
    type: "NORMAL",
    weight: 15,
    title: "🍀 普通の人生",
    birth: "神奈川県",
    job: "会社員",
    income: "520万円",
    love: "普通の恋愛",
    rank: "B",
    score: 63,
    message: "🍀 まだまだこれから！"
  },

  {
    type: "NORMAL",
    weight: 15,
    title: "😊 いい感じの人生",
    birth: "愛知県",
    job: "エンジニア",
    income: "680万円",
    love: "30歳で結婚",
    rank: "A",
    score: 76,
    message: "✨ 地味に強い人生！"
  },

  {
    type: "NORMAL",
    weight: 12,
    title: "🌱 これから人生",
    birth: "宮城県",
    job: "会社員",
    income: "420万円",
    love: "これから",
    rank: "C",
    score: 48,
    message: "🔥 ここからが本番！"
  }

];


/* ========================================
   🎲 重み付き抽選
======================================== */

function chooseResult() {

  const total = results.reduce(
    (sum, item) => sum + item.weight,
    0
  );

  let random = Math.random() * total;

  for (const item of results) {

    random -= item.weight;

    if (random <= 0) {
      return item;
    }
  }

  return results[results.length - 1];
}


/* ========================================
   ⏳ 待機
======================================== */

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


/* ========================================
   🎰 ガチャ
======================================== */

async function playGacha() {

  if (gachaBtn.disabled) return;

  gachaBtn.disabled = true;

  const oldReroll =
    document.getElementById("rerollBtn");

  if (oldReroll) {
    oldReroll.remove();
  }

  if (shareBtn) {
    shareBtn.style.display = "none";
  }

  result.classList.remove("god-result");

  titleResult.textContent = "🎰 ガチャ中…";

  result.innerHTML = `
    <div style="
      text-align:center;
      font-size:55px;
      font-weight:bold;
      padding:30px 0;
    ">
      <div id="count">3</div>
    </div>
  `;

  for (let i = 3; i >= 1; i--) {

    const count =
      document.getElementById("count");

    if (count) {
      count.textContent = i;
    }

    await wait(500);
  }

  titleResult.textContent =
    "✨ 結果発表！";

  await wait(500);


  const data = chooseResult();

  showResult(data);

  gachaBtn.disabled = false;
}


/* ========================================
   ✨ 結果表示
======================================== */

function showResult(data) {

  let rarityClass = "gacha-r";

  if (data.type === "GOD") {
    rarityClass = "gacha-god";
    result.classList.add("god-result");

    if (navigator.vibrate) {
      navigator.vibrate([
        200,
        100,
        200,
        100,
        400
      ]);
    }
  }

  if (data.type === "WIN") {
    rarityClass = "gacha-ssr";
  }

  if (data.type === "SURPRISE") {
    rarityClass = "gacha-sr";
  }

  result.innerHTML = `

    <div class="rarity-box ${rarityClass}">
      ${data.title}
    </div>

    <p class="result-line">
      👶 出身：${data.birth}
    </p>

    <p class="result-line">
      💼 職業：${data.job}
    </p>

    <p class="result-line">
      💰 年収：${data.income}
    </p>

    <p class="result-line">
      💕 恋愛：${data.love}
    </p>

    <div class="life-rank-box">
      🏆 人生ランク
      <strong>${data.rank}</strong>
    </div>

    <div class="life-score-box">
      ⭐ 人生スコア：
      <strong>${data.score}</strong> / 100
    </div>

    <div class="life-message">
      ${data.message}
    </div>

  `;

  if (shareBtn) {

    shareBtn.style.display = "";
    shareBtn.disabled = false;
    shareBtn.textContent =
      "📸 この結果をシェア";
  }

  createRerollButton();
}


/* ========================================
   🔄 もう一回
======================================== */

function createRerollButton() {

  const old =
    document.getElementById("rerollBtn");

  if (old) {
    old.remove();
  }

  const btn =
    document.createElement("button");

  btn.id = "rerollBtn";
  btn.className = "reroll-button";
  btn.textContent =
    "🎰 もう一回ガチャ";

  if (shareBtn) {
    shareBtn.insertAdjacentElement(
      "afterend",
      btn
    );
  } else {
    result.appendChild(btn);
  }

  btn.addEventListener(
    "click",
    playGacha
  );
}


/* ========================================
   📸 画像シェア
======================================== */

if (shareBtn) {

  shareBtn.addEventListener(
    "click",
    shareResult
  );

  shareBtn.style.display = "none";
}


async function shareResult() {

  if (shareBtn.disabled) return;

  shareBtn.disabled = true;

  const original =
    shareBtn.textContent;

  const rerollBtn =
    document.getElementById("rerollBtn");

  try {

    if (
      typeof html2canvas ===
      "undefined"
    ) {

      alert(
        "画像機能の読み込みに失敗しました💦"
      );

      return;
    }


    /* ボタンを画像から隠す */

    shareBtn.style.display = "none";

    if (rerollBtn) {
      rerollBtn.style.display = "none";
    }


    const canvas =
      await html2canvas(result, {

        backgroundColor: "#111111",

        scale: 2,

        useCORS: true,

        logging: false

      });


    /* 戻す */

    shareBtn.style.display = "";

    if (rerollBtn) {
      rerollBtn.style.display = "";
    }


    const blob =
      await new Promise(resolve => {

        canvas.toBlob(
          resolve,
          "image/png"
        );

      });


    if (!blob) {
      throw new Error(
        "画像作成失敗"
      );
    }


    const file =
      new File(
        [blob],
        "人生ガチャ_結果.png",
        {
          type: "image/png"
        }
      );


    /* iPhone共有 */

    if (
      navigator.share &&
      navigator.canShare &&
      navigator.canShare({
        files: [file]
      })
    ) {

      await navigator.share({

        title:
          "🎰 人生ガチャの結果！",

        text:
          "人生ガチャを回してみた！",

        files: [file]

      });

    } else {

      /* 保存 */

      const url =
        URL.createObjectURL(blob);

      const link =
        document.createElement("a");

      link.href = url;

      link.download =
        "人生ガチャ_結果.png";

      document.body.appendChild(link);

      link.click();

      link.remove();

      setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 1000);

    }

  } catch (error) {

    console.log(error);

    if (
      error.name !==
      "AbortError"
    ) {

      alert(
        "画像の作成に失敗しました💦"
      );
    }

  } finally {

    shareBtn.disabled = false;

    shareBtn.textContent =
      original ||
      "📸 この結果をシェア";

    shareBtn.style.display = "";

    if (rerollBtn) {
      rerollBtn.style.display = "";
    }

  }
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
