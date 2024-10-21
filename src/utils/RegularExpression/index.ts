// 이메일 정규 표현식
export const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// 인증번호 정규 표현식
export const isValidCode = (code: string) => {
  const codeDigitRegex = /^\d{6}$/;
  return codeDigitRegex.test(code);
};

// 닉네임 정규 표현식
export const isValidNickName = (nickname: string) => {
  const nicknameRegex = /^[a-zA-Z0-9가-힣]{6,8}$/;
  return nicknameRegex.test(nickname);
};

// 비밀번호 정규 표현식
export const isValidPassword = (password: string) => {
  const passwordRegex =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>\/?~`-]).{8,12}$/;
  return passwordRegex.test(password);
};
