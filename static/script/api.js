const BackEndUrl = "http://127.0.0.1:8000";
const TOKEN = "Bearer " + localStorage.getItem("token_access");
const login_form = document.getElementById("login_form");

// form 이벤트
login_form.onsubmit = (e) => {
  // 이벤트 전파 방지
  e.preventDefault();
  const formData = new FormData(login_form);
  const data = {};
  const url = `${BackEndUrl}/user/login/`;
  formData.forEach((value, key) => {
    data[key] = value;
  });
  fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.status === 200) {
      response.json().then((data) => {
        Token(data);
      });
    } else if (response.status === 401) {
      alert("아이디 또는 비밀번호가 일치하지 않습니다.");
    }
  });
};

// Article 데이터 조회
const ArticlesGet = () => {
  fetch(BackEndUrl + "/post/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: TOKEN,
    },
  }).then((res) => {
    if (res.status == 401) {
      console.log("Not Authorized");
    } else {
      res.json().then((data) => {
        Articles(data);
      });
    }
  });
};

ArticlesGet();
