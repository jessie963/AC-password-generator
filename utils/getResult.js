import generatePassword from './generatePassword.js';

// 產生結果
export default function getResult(reqBody) {
  const length = reqBody.length; // 密碼長度
  const charSets = reqBody.charSets; // 使用者勾選的字元集
  const excludedChar = [...new Set(reqBody.excludedChar?.trim())]; // 排除字元

  let resultType = ''; // 結果的種類
  let result = ''; // 密碼or錯誤訊息

  if (!charSets) {
    resultType = 'Attention';
    result = 'You must select at least one character set';
  } else {
    resultType = 'Your Password';
    result = generatePassword(length, charSets, excludedChar);

    if (result.length === 0) {
      resultType = 'Error';
      result = 'There is no valid character in your selection';
    }
  }

  return { resultType, result };
}
