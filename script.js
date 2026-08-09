const birthplaces = [
  "北海道",
  "東京都",
  "大阪府",
  "福岡県",
  "沖縄県",
  "神奈川県",
  "愛知県",
  "宮城県",
  "京都府",
  "青森県"
];

const jobs = [
  "会社員",
  "ゲームクリエイター",
  "YouTuber",
  "医者",
  "教師",
  "芸術家",
  "宇宙飛行士",
  "経営者",
  "モデル",
  "ニート"
];

const incomes = [
  "37万円",
  "250万円",
  "420万円",
  "680万円",
  "1200万円",
  "1億円",
  "100億円"
];

const loves = [
  "普通の恋愛",
  "25歳で結婚",
  "30歳で結婚",
  "運命の人と出会う",
  "大恋愛",
  "一生独身",
  "AIと結婚する"
];

const lucks = [
  "普通",
  "ちょっと幸運",
  "かなり幸運",
  "激レア",
  "超激レア",
  "SSR",
  "SR",
  "S",
  "SSS",
  "GOD"
];

const gachaBtn = document.getElementById("gachaBtn");
const result = document.getElementById("result");
const titleResult = document.getElementById("titleResult");

let button = gachaBtn;


/* =========================
   ガチャ開始
========================= */

button.addEventListener("click", playGacha);

async function playGacha() {

  if (button.disabled) return;

  button.disabled = true;

  result.classList.remove("god-result");

  titleResult.textContent = "🎰 ガチャ中…";

  const oldReroll = document.getElementById("rerollBtn");

  if (oldReroll) {
    oldReroll.remove();
  }

  const oldShare = document.getElementById("shareBtn");

  if (oldShare) {
    oldShare.style.display = "none";
  }

  /* ガチャ演出 */

  for (let i = 3; i >= 1; i--) {

    titleResult.textContent = i;

    await wait(500);

  }

  titleResult.textContent = "🎰 結果発表！";

  await wait(700);


  /* =========================
     ランダム結果
  ========================= */

  const birth = random(birthplaces);
  const job = random(jobs);
  const income = random(incomes);
  const love = random(loves);
  const luck = random(lucks);

  const rank = getRank(luck);
  const score = getScore(luck);
  const rarity = getRarity(luck);
  const message = getMessage(luck);


  /* =========================
     結果表示
  ========================= */

  let luckClass = "gacha-r";

  if (luck === "SR") {
    luckClass = "gacha-sr";
  }

  if (luck === "SSR") {
    luckClass = "gacha-ssr";
  }

  if (luck === "SSS") {
    luckClass = "gacha-sss";
  }

  if (luck === "GOD") {
    luckClass = "gacha-god";
    result.classList.add("god-result");
  }

  result.innerHTML = `

    <div class="rarity-box ${luckClass}">
      🍀 ${luck}
    </div>

    <div class="rarity-text">
      ${rarity}
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


  /* =========================
     シェアボタン表示
  ========================= */

  const shareBtn = document.getElementById("shareBtn");

  if (shareBtn) {
    shareBtn.style.display = "";
    shareBtn.textContent = "📸 この結果をシェア";
  }


  /* =========================
     もう一回ガチャ
  ========================= */

  createRerollButton();


  button.disabled = false;
}


/* =========================
   もう一回ガチャ
========================= */

function createRerollButton() {

  let rerollBtn = document.getElementById("rerollBtn");

  if (rerollBtn) {
    rerollBtn.remove();
  }

  rerollBtn = document.createElement("button");

  rerollBtn.id = "rerollBtn";
  rerollBtn.className = "reroll-button";
  rerollBtn.textContent = "🎰 もう一回ガチャ";

  const shareBtn = document.getElementById("shareBtn");

  if (shareBtn) {
    shareBtn.insertAdjacentElement("afterend", rerollBtn);
  } else {
    result.appendChild(rerollBtn);
  }

  rerollBtn.addEventListener("click", playGacha);
}


/* =========================
   シェア
========================= */

const shareBtn = document.getElementById("shareBtn");

if (shareBtn) {

  shareBtn.addEventListener("click", async () => {

    shareBtn.disabled = true;

    /*
     * ここでは
     * 「画像を作成中…」を表示しない。
     *
     * ボタンを押した瞬間に画像生成する。
     */

    const resultArea = document.getElementById("result");

    if (!resultArea) {
      shareBtn.disabled = false;
      return;
    }

    try {

      /* html2canvas が読み込まれているか確認 */

      if (typeof html2canvas === "undefined") {

        alert(
          "画像作成機能の読み込みに失敗しました💦\nページを再読み込みしてもう一度試してね！"
        );

        shareBtn.disabled = false;
        return;
      }


      /* ボタンを一時的に隠す */

      const rerollBtn = document.getElementById("rerollBtn");

      if (rerollBtn) {
        rerollBtn.style.display = "none";
      }

      shareBtn.style.display = "none";


      /* =========================
         結果画像を作成
      ========================= */

      const canvas = await html2canvas(resultArea, {

        backgroundColor: "#111111",

        scale: 2,

        useCORS: true,

        logging: false

      });


      /* ボタンを戻す */

      shareBtn.style.display = "";

      shareBtn.textContent = "📸 この結果をシェア";

      if (rerollBtn) {
        rerollBtn.style.display = "";
      }


      canvas.toBlob(async (blob) => {

        if (!blob) {

          alert("画像の作成に失敗しました💦");

          shareBtn.disabled = false;

          return;
        }


        const file = new File(
          [blob],
          "人生ガチャ_結果.png",
          {
            type: "image/png"
          }
        );


        /* =========================
           iPhoneなどで画像共有
        ========================= */

        if (
          navigator.share &&
          navigator.canShare &&
          navigator.canShare({
            files: [file]
          })
        ) {

          try {

            await navigator.share({

              title: "🎰 人生ガチャの結果！",

              text: "人生ガチャを回してみた！",

              files: [file]

            });

          } catch (error) {

            /*
             * ユーザーが共有画面を閉じただけなら
             * エラー表示しない。
             */

            console.log("シェアをキャンセルしました");

          }

        } else {

          /*
           * 画像共有に対応していない環境
           * → 画像を保存できるようにする
           */

          const link = document.createElement("a");

          link.download = "人生ガチャ_結果.png";

          link.href = canvas.toDataURL("image/png");

          link.click();

        }


        shareBtn.disabled = false;

      });

    } catch (error) {

      console.error(error);

      alert(
        "画像の作成に失敗しました💦\nもう一度試してみてね！"
      );

      shareBtn.style.display = "";

      shareBtn.disabled = false;

    }

  });

}


/* =========================
   レア度
========================= */

function getRarity(luck) {

  switch (luck) {

    case "GOD":
      return "🌈 神の人生";

    case "SSS":
      return "🔥 超激レア";

    case "SSR":
      return "🔥 激レア";

    case "SR":
      return "✨ レア";

    case "S":
      return "✨ かなり良い";

    default:
      return "✨ これからの人生";

  }

}


/* =========================
   人生ランク
========================= */

function getRank(luck) {

  switch (luck) {

    case "GOD":
      return "S";

    case "SSS":
      return "S";

    case "SSR":
      return "A";

    case "SR":
      return "A";

    case "S":
      return "B";

    default:
      return "D";

  }

}


/* =========================
   人生スコア
========================= */

function getScore(luck) {

  switch (luck) {

    case "GOD":
      return 100;

    case "SSS":
      return randomNumber(90, 99);

    case "SSR":
      return randomNumber(80, 95);

    case "SR":
      return randomNumber(70, 89);

    case "S":
      return randomNumber(60, 79);

    default:
      return randomNumber(20, 59);

  }

}


/* =========================
   メッセージ
========================= */

function getMessage(luck) {

  switch (luck) {

    case "GOD":
      return "🌈✨ 神に選ばれし者！";

    case "SSS":
      return "🔥✨ 伝説級の人生！";

    case "SSR":
      return "😎✨ かなり良い人生";

    case "SR":
      return "✨✨ かなり期待できる！";

    case "S":
      return "💪✨ ここから人生逆転！";

    default:
      return "🔥✨ まだまだこれから！";

  }

}


/* =========================
   ランダム
========================= */

function random(list) {

  return list[
    Math.floor(Math.random() * list.length)
  ];

}


function randomNumber(min, max) {

  return Math.floor(
    Math.random() * (max - min + 1)
  ) + min;

}


/* =========================
   待機
========================= */

function wait(ms) {

  return new Promise(resolve => {

    setTimeout(resolve, ms);

  });

}
