const birthplace = [
  "北海道", "東京", "大阪", "福岡", "沖縄"
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
  "3円",
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

  for(let i=3;i>=1;i--){
    document.getElementById("count").textContent = i;
    await wait(1000);
  }

  const luck = random(lucks);
let className = "";

if(luck === "SSR"){
    className = "ssr";
}

if(luck === "GOD"){
    className = "god";

    if(navigator.vibrate){
        navigator.vibrate([300,150,300]);
    }
}
  result.innerHTML = `
    <p>👶 出身：${random(birthplace)}</p>
    <p>💼 職業：${random(jobs)}</p>
    <p>💰 年収：${random(incomes)}</p>
    <p>💕 恋愛：${random(loves)}</p>
    <h2 class="${className}">🍀 ${luck}</h2>
  `;

  button.disabled = false;
});

function random(list){
  return list[Math.floor(Math.random()*list.length)];
}

function wait(ms){
  return new Promise(resolve => setTimeout(resolve, ms));
}
