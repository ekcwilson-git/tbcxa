(function () {
  const PASSWORD_HASH = "e566b51a4ac51cfae0364d2184a3a9b469ce9e26cda5f50cc46d757ee5f9575e";
  const SESSION_KEY = "ekc_private_access";

  function toHex(buffer) {
    return Array.from(new Uint8Array(buffer))
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
  }

  async function hashText(value) {
    const data = new TextEncoder().encode(value);
    const digest = await crypto.subtle.digest("SHA-256", data);
    return toHex(digest);
  }

  function unlock() {
    document.documentElement.classList.add("ekc-auth-ok");
    const gate = document.getElementById("ekc-auth-gate");
    if (gate) gate.remove();
  }

  function showGate() {
    const style = document.createElement("style");
    style.textContent = `
      html:not(.ekc-auth-ok) body { overflow: hidden; }
      #ekc-auth-gate {
        position: fixed; inset: 0; z-index: 2147483647;
        display: grid; place-items: center; padding: 24px;
        background: radial-gradient(circle at 20% 10%, rgba(15,107,94,.25), transparent 32%),
                    linear-gradient(135deg, #13241f, #07110f 62%, #18221e);
        color: #eef7f2; font-family: "Noto Sans TC", "Microsoft JhengHei", Arial, sans-serif;
      }
      .ekc-auth-card {
        width: min(440px, 100%); background: rgba(255,255,255,.08);
        border: 1px solid rgba(255,255,255,.2); border-radius: 10px;
        box-shadow: 0 24px 70px rgba(0,0,0,.28); padding: 28px;
        backdrop-filter: blur(14px);
      }
      .ekc-auth-card h1 { margin: 0 0 8px; font-size: 24px; line-height: 1.35; color: #fff; }
      .ekc-auth-card p { margin: 0 0 18px; color: #cfe1d9; line-height: 1.7; font-size: 14px; }
      .ekc-auth-card label { display: block; margin-bottom: 8px; font-weight: 700; font-size: 13px; }
      .ekc-auth-card input {
        width: 100%; border: 1px solid rgba(255,255,255,.28); border-radius: 8px;
        padding: 12px 13px; font-size: 16px; color: #fff; background: rgba(0,0,0,.24);
        outline: none;
      }
      .ekc-auth-card input:focus { border-color: #7bd8c1; box-shadow: 0 0 0 3px rgba(123,216,193,.16); }
      .ekc-auth-card button {
        width: 100%; margin-top: 14px; border: 0; border-radius: 8px; padding: 12px 14px;
        background: #2bb596; color: #06110e; font-weight: 800; font-size: 15px; cursor: pointer;
      }
      .ekc-auth-card button:hover { background: #7bd8c1; }
      .ekc-auth-error { min-height: 22px; margin-top: 10px; color: #ffb9b0; font-size: 13px; }
    `;
    document.head.appendChild(style);

    const gate = document.createElement("div");
    gate.id = "ekc-auth-gate";
    gate.innerHTML = `
      <form class="ekc-auth-card" autocomplete="off">
        <h1>EKC 私人教學空間</h1>
        <p>此網站僅供 EKC 專案內部教學與試運轉知識庫使用。請輸入授權密碼。</p>
        <label for="ekc-auth-password">存取密碼</label>
        <input id="ekc-auth-password" type="password" inputmode="numeric" autofocus />
        <button type="submit">進入網站</button>
        <div class="ekc-auth-error" role="alert"></div>
      </form>
    `;
    document.body.appendChild(gate);

    const form = gate.querySelector("form");
    const input = gate.querySelector("input");
    const error = gate.querySelector(".ekc-auth-error");
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      error.textContent = "";
      try {
        if (await hashText(input.value) === PASSWORD_HASH) {
          sessionStorage.setItem(SESSION_KEY, "1");
          unlock();
        } else {
          error.textContent = "密碼不正確，請重新輸入。";
          input.select();
        }
      } catch (err) {
        error.textContent = "此瀏覽器不支援安全驗證，請改用最新版瀏覽器。";
      }
    });
  }

  if (sessionStorage.getItem(SESSION_KEY) === "1") {
    unlock();
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", showGate, { once: true });
  } else {
    showGate();
  }
})();
