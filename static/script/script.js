//Article 리스트 생성
const Articles = (data) => {
  const articles_doc = document.getElementById("articles");
  data.forEach((articles) => {
    const article = document.createElement("div");
    const article_img = document.createElement("img");
    article_img.src = articles.image;
    article.className = "article";
    articles_doc.appendChild(article);
    article.appendChild(article_img);
  });
};

//JWT 토큰 발급
const Token = (data) => {
  localStorage.setItem("token_access", data.access);
  localStorage.setItem("token_refresh", data.refresh);

  const base64Url = data.access.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  localStorage.setItem("user_payload", jsonPayload);
  window.location.reload();
};

function up_modal_close(e) {
  const modal = document.getElementById("upload_modal");
  modal.style.display = "none";
}

function up_modal_open(e) {
  const modal = document.getElementById("upload_modal");
  modal.style.display = "block";
}

function logout() {
  localStorage.removeItem("token_access");
  localStorage.removeItem("token_refresh");
  localStorage.removeItem("user_payload");
  window.location.reload();
}