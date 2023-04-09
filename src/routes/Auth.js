import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import React, { useState } from "react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setnewAccount] = useState(true);
  const [error, setError] = useState("");
  const createErrorMsg = (code) => {
    switch (code) {
      case "auth/user-not-found" || "auth/wrong-password":
        return "이메일 혹은 비밀번호가 일치하지 않습니다.";
      case "auth/email-already-in-use":
        return "이미 사용 중인 이메일입니다.";
      case "auth/weak-password":
        return "비밀번호는 6글자 이상이어야 합니다.";
      case "auth/network-request-failed":
        return "네트워크 연결에 실패 하였습니다.";
      case "auth/invalid-email":
        return "잘못된 이메일 형식입니다.";
      case "auth/internal-error":
        return "잘못된 요청입니다.";
      default:
        return "로그인에 실패 하였습니다.";
    }
  };
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const auth = getAuth();
      if (newAccount) {
        const data = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log(data);
      } else {
        const data = await signInWithEmailAndPassword(auth, email, password);
        console.log(data);
      }
    } catch (error) {
      console.log(error.code);
      setError(createErrorMsg(error.code));
    }
  };
  const toggleAccount = () => setnewAccount((prev) => !prev);
  const googleLogInClick = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    const data = await signInWithPopup(auth, provider);
    console.log(data);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="text"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />
        <input
          type="submit"
          value={newAccount ? "Create Account" : "Sign In"}
        />
        {error}
      </form>

      <span onClick={toggleAccount}>
        {newAccount ? "Create Account" : "Sign In"}
      </span>
      <div>
        <button onClick={googleLogInClick}>Continue with Google</button>
      </div>
    </div>
  );
};

export default Auth;
