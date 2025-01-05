const keyBordArr = [[], [], [], []];
const leftArr = [
  {
    bg1: "./images/bg1.png",
    bg2: "./images/bg1_1.png",
    color: "#53ff41",
  },
  {
    bg1: "./images/bg2.png",
    bg2: "./images/bg2_1.png",
    color: "#5ef1fc",
  },
  {
    bg1: "./images/bg3.png",
    bg2: "./images/bg3_1.png",
    color: "#faf33b",
  },
  {
    bg1: "./images/bg4.png",
    bg2: "./images/bg4_1.png",
    color: "#b600f8",
  },
  {
    bg1: "./images/bg5.png",
    bg2: "./images/bg5_1.png",
    color: "#f671ed",
  },
  {
    bg1: "./images/bg6.png",
    bg2: "./images/bg6_1.png",
    color: "#a700f8",
  },
  {
    bg1: "./images/bg7.png",
    bg2: "./images/bg7_1.png",
    color: "#4793f9",
  },
  {
    bg1: "./images/bg8.png",
    bg2: "./images/bg8_1.png",
    color: "#d7ff7f",
  },
  {
    bg1: "./images/bg9.png",
    bg2: "./images/bg9_1.png",
    color: "#f500fa",
  },
];

const zmArr = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

// 小写
const xiaoxie = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

const shuzi = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

const biaodian = [
  "。",
  ",",
  "?",
  "!",
  "@",
  "#",
  "*",
  "&",
  "+",
  "-",
  "/",
  "\\",
  ";",
  "：",
  "'",
  "'",
  "“”",
  "“”",
  "%",
  "$",
  "[",
  "]",
  "(",
  ")",
  "_",
];
// 生成字母数组
for (let i = 0; i < 26; i++) {
  console.log(zmArr[i], "zmArr[i]");

  if (zmArr[i] == "X" || zmArr[i] == "Y" || zmArr[i] == "V") {
    keyBordArr[0].push({
      text: zmArr[i],
      index,
      img: `./images/zm/${i + 1}.png`,
      imgFile: "zm",
      html: `
            <div class="item">
                <img class="orgin zmCss" src="./images/zm/${
                  i + 1
                }.png" alt="" />
                <img class="newDraw" src="" alt="" />
                <div class="isBig">
                     <img class="newDraw2" src="" alt="" />
                </div>
              </div>
      `,
    });
  } else {
    keyBordArr[0].push({
      text: zmArr[i],
      index,
      img: `./images/zm/${i + 1}.png`,
      imgFile: "zm",
      html: `
            <div class="item">
                <img class="orgin" src="./images/zm/${i + 1}.png" alt="" />
                <img class="newDraw" src="" alt="" />
                <div class="isBig">
                     <img class="newDraw2" src="" alt="" />
                </div>
              </div>
      `,
    });
  }

  keyBordArr[1].push({
    text: xiaoxie[i],
    index,
    img: `./images/xiaoxie/${i + 1}.png`,
    imgFile: "xiaoxie",
    html: `
                    <div class="item">
              <img class="orgin" src="./images/xiaoxie/${i + 1}.png" alt="" />
              <img class="newDraw" src="" alt="" />
              <div class="isBig">
                   <img class="newDraw2" src="" alt="" />
              </div>
            </div>
    `,
  });
}

shuzi.forEach((item, index) => {
  keyBordArr[2].push({
    index,
    text: item,
    img: `./images/shuzi/${index + 1}.png`,
    imgFile: "shuzi",
    html: `
                 <div class="item">
              <img class="orgin" src="./images/shuzi/${index + 1}.png" alt="" />
              <img class="newDraw" src="" alt="" />
              <div class="isBig">
                   <img class="newDraw2" src="" alt="" />
              </div>
            </div>
            
    `,
  });
});

biaodian.forEach((item, index) => {
  keyBordArr[3].push({
    index,
    text: item,
    img: `./images/biaodian/${index + 1}.png`,
    imgFile: "biaodian",
    html: `
                     <div class="item">
              <img class="orgin" src="./images/biaodian/${
                index + 1
              }.png" alt="" />
              <img class="newDraw" src="" alt="" />
              <div class="isBig">
                   <img class="newDraw2" src="" alt="" />
              </div>
            </div>
    `,
  });
});
