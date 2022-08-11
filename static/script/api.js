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
  if (data.username == "" || data.password == "") {
    swal("로그인 오류", "모든 항목을 입력해주세요.", "error");
    return;
  }
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
      swal("로그인 오류", "아이디 비밀번호를 확인해 주세요.", "error");
    }
  });
};

async function Article_Data() {
  const url = `${BackEndUrl}/post/`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: TOKEN,
    },
  });
  if (res.status == 401) {
    alert("로그인이 필요합니다.");
  }
  const response = await res.json();
  Articles(response);
}

async function Article_Upload() {
  const formData = new FormData();
  const data = {};
  const url = `${BackEndUrl}/post/`;

  formData.append("image", document.getElementById("upload_file").files[0]);
  formData.append("title", document.getElementById("upload_title").value);
  formData.append("content", document.getElementById("upload_content").value);

  if (formData.get("title") == "" || formData.get("content") == "") {
    alert("모든 항목을 입력해주세요.");
    return;
  } else if (formData.get("image") == "undefined") {
    alert("이미지를 선택해주세요.");
    return;
  }

  const res = await fetch(url, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: TOKEN,
    },
  });
  if (res.status == 401) {
    alert("로그인이 필요합니다.");
  } else {
    window.location.reload();
  }
}

Article_Data();
