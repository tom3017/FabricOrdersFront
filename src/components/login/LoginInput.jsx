// 로그인 입력 컴포넌트
function LoginInput({

  // input 타입
  type,

  // placeholder 문구
  placeholder,

  // 현재 입력값
  value,

  // 입력값 변경 함수
  onChange,

  // 키보드 이벤트 함수
  onKeyDown

}) {

  return (

    <input

      // text / password 등 타입
      type={type}

      // 입력창 안내 문구
      placeholder={placeholder}

      // 현재 값
      value={value}

      // 값 변경 이벤트
      onChange={onChange}

      // 키보드 입력 이벤트
      onKeyDown={onKeyDown}

      // css 클래스
      className="login-input"
    />
  );
}

// 외부 사용 가능
export default LoginInput;