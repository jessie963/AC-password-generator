// 字元集
const charCodes = new Map();
charCodes.set('lowercase', 'abcdefghijklmnopqrstuvwxyz');
charCodes.set('uppercase', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ');
charCodes.set('number', '0123456789');
charCodes.set('symbol', '!#$%&*+-<=>?@^_~');

function generateChars(charSets, excludedChar) {
  let chars = [];

  // 若使用者有勾選某字元集，則將此字元集加入字元陣列裡
  // （charSet可以改名叫charSetName，避免跟charSets搞混）
  charCodes.forEach((charCode, charSet) => {
    if (charSets && charSets.includes(charSet)) chars.push(...charCode);
  });

  return chars.filter((char) => !excludedChar.includes(char));
}

// 產生隨機密碼
export default function generatePassword(length, charSets, excludedChar) {
  // 用來產生隨機密碼的字元
  let chars = generateChars(charSets, excludedChar);

  // 若沒有可用來產生密碼的字元，回傳空字串來產生錯誤訊息
  if (chars.length === 0) return '';

  let password = '';

  for (let i = 0; i < length; i++) {
    let index = Math.floor(Math.random() * chars.length);
    let char = chars[index];
    password += char;
  }

  return password;
}
