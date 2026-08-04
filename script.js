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
  "医者"
];

const incomes = [
  "250万円",
  "420万円",
  "680万円",
  "1200万円",
  "1億円"
];

const loves = [
  "独身",
  "25歳で結婚",
  "30歳で結婚",
  "運命の人と出会う",
  "恋愛大成功"
];

const lucks = [
  "R",
  "R",
  "SR",
  "SSR",
  "GOD"
];

const button = document.getElementById("gachaBtn");

button.addEventListener("click", () => {

  document.getElementById("result").innerHTML = `
    <p>👶 出身：${random(birthplace)}</p>
    <p>💼 職業：${random(jobs)}</p>
    <p>💰 年収：${random(incomes)}</p>
    <p>💕 恋愛：${random(loves)}</p>
    <p>🍀 運勢：${random(lucks)}</p>
  `;

});

function random(list){
  return list[Math.floor(Math.random() * list.length)];
}
