const correctPassword = "12122010";
let wrongAttempts = 0;
let hintShown = false;
let isLocked = false;
let lockTimeout = null;
let currentVideo = 1;
const warningSound = new Audio('https://www.myinstants.com/media/sounds/vineboom.mp3');

function createHearts() {
  const heartsContainer = document.getElementById('hearts');
  const heartSymbols = ['❤️', '💕', '💗', '💓', '💖'];
  
  for (let i = 0; i < 20; i++) {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = 5 + Math.random() * 10 + 's';
    heart.style.animationDelay = Math.random() * 5 + 's';
    heartsContainer.appendChild(heart);
  }
}

function checkEnter(e) {
  if (e.key === "Enter") checkPassword();
}

function showHint() {
  if (!hintShown) {
    document.getElementById("error").innerHTML += "<br><i>(hint: sinh nhật người đó - ví dụ 10102010 gồm ngày-tháng-năm sinh)</i>";
    hintShown = true;
  }
}

function lockInput(duration) {
  isLocked = true;
  document.getElementById("passwordInput").disabled = true;
  document.getElementById("error").textContent = `Trừng phạt ${duration / 1000}s vì nhập sai mật khẩu quá nhiều`;
  
  let timeLeft = duration / 1000;
  const countdownEl = document.getElementById("countdownTimer");
  countdownEl.textContent = `⏱️ Còn ${timeLeft}s`;
  
  const countInterval = setInterval(() => {
    timeLeft--;
    countdownEl.textContent = `⏱️ Còn ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(countInterval);
      countdownEl.textContent = "";
    }
  }, 1000);

  lockTimeout = setTimeout(() => {
    isLocked = false;
    document.getElementById("passwordInput").disabled = false;
    document.getElementById("error").textContent = "Thử lại đi nhé :3";
    clearInterval(countInterval);
    countdownEl.textContent = "";
  }, duration);
}

function checkPassword() {
  if (isLocked) return;
  const userInput = document.getElementById("passwordInput").value;
  if (userInput === correctPassword) {
    document.getElementById("passwordPrompt").style.display = "none";
    document.getElementById("mainContent").style.display = "block";
    setTimeout(() => {
      document.getElementById("secretContent").style.opacity = 1;
      const video = document.getElementById(`video${currentVideo}`);
      video.play();
      updatePlayPauseButton(video.paused);
      showDaysTogether();
      startRandomMessage();
      startCountdown();
      startOnlineTimer();
      loadMessages();
    }, 500);
  } else {
    wrongAttempts++;
    if (userInput === "123456" || userInput === "password") {
      document.getElementById("error").textContent = "Nghĩ tao dễ tới mức để mật khẩu này hả? 😒";
    } else if (userInput === "") {
      document.getElementById("error").textContent = "Nhập gì đi chứ, đừng trống như đầu mày =))";
    } else {
      document.getElementById("error").textContent = "Sai mật khẩu rùi 😤";
    }
    if (wrongAttempts >= 3) showHint();
    if (wrongAttempts >= 5) lockInput((wrongAttempts - 4) * 10000);
  }
}

function showDaysTogether() {
  const anniversaryDate = new Date('2024-11-11');
  const today = new Date();
  const diffTime = Math.abs(today - anniversaryDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  document.getElementById("dayCount").innerHTML = `Tao yêu K được <span class="glow">${diffDays} ngày</span> rồi đó 💕`;
}

function switchTab(tabNumber) {
  const video1 = document.getElementById("video1");
  const video2 = document.getElementById("video2");
  const btn1 = document.getElementsByClassName("tab-btn")[0];
  const btn2 = document.getElementsByClassName("tab-btn")[1];
  video1.pause();
  video2.pause();
  if (tabNumber === 1) {
    video1.style.display = "block";
    video2.style.display = "none";
    btn1.classList.add("active");
    btn2.classList.remove("active");
    video1.play();
    currentVideo = 1;
  } else {
    video1.style.display = "none";
    video2.style.display = "block";
    btn1.classList.remove("active");
    btn2.classList.add("active");
    video2.play();
    currentVideo = 2;
  }
  updatePlayPauseButton(document.getElementById(`video${currentVideo}`).paused);
}

function startRandomMessage() {
  const messages = [
    "K là người đặc biệt nhất của tao đó nha 💕",
    "Yêu K mãi mãi luôn á 😘",
    "Nhớ K mỗi ngày luôn ý 🥰",
    "K làm tao vui lắm luôn á ❤️"
  ];
  const specialMessage = document.getElementById("specialMessage");
  setInterval(() => {
    specialMessage.textContent = messages[Math.floor(Math.random() * messages.length)];
    specialMessage.style.opacity = 0;
    setTimeout(() => specialMessage.style.opacity = 1, 100);
  }, 5000);
}
function changeBackground() {
  const loveColors = [
    ["#ff6b6b", "#ffb6c1"],
    ["#ff8787", "#ffe4e1"],
    ["#dda0dd", "#ffddf4"],
    ["#ff9999", "#fff0f5"],
    ["#ff69b4", "#ffb6c1"]
  ];
  
  const randomPair = loveColors[Math.floor(Math.random() * loveColors.length)];
  const bgLayer = document.getElementById("backgroundTransition");
  bgLayer.style.background = `linear-gradient(to right, ${randomPair[0]}, ${randomPair[1]})`;
}

setInterval(changeBackground, 10000);

document.addEventListener('click', (e) => {
  const heart = document.createElement('div');
  heart.classList.add('click-heart');
  heart.innerHTML = '💖';
  heart.style.left = `${e.pageX - 15}px`;
  heart.style.top = `${e.pageY - 15}px`;
  document.body.appendChild(heart);
  
  setTimeout(() => heart.remove(), 1500);
});

const title = document.querySelector('#mainContent h1');
title.addEventListener('mouseover', () => {
  title.style.animation = 'heartBeat 0.5s infinite';
});
title.addEventListener('mouseout', () => {
  title.style.animation = 'none';
});

const videos = document.querySelectorAll('.video-player');
videos.forEach(video => {
  video.addEventListener('mouseover', () => {
    video.style.transform = 'scale(1.02)';
    video.style.transition = 'transform 0.2s';
  });
  video.addEventListener('mouseout', () => {
    video.style.transform = 'scale(1)';
  });
  video.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    alert("Không cho tải video nha!");
  });
});

videos.forEach(video => {
  video.addEventListener('seeking', (e) => {
    const heart = document.createElement('div');
    heart.classList.add('click-heart');
    heart.innerHTML = '💕';
    const videoRect = video.getBoundingClientRect();
    heart.style.left = `${videoRect.left + (video.currentTime / video.duration) * videoRect.width}px`;
    heart.style.top = `${videoRect.top + videoRect.height / 2}px`;
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1500);
  });
});

document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  triggerWarning("Ai cho bấm chuột phải? Tính làm gì?");
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'F12' || 
      (e.ctrlKey && e.key === 'u') || 
      (e.ctrlKey && e.shiftKey && e.key === 'I') || 
      (e.ctrlKey && (e.key === 's' || e.key === 'S'))) {
    e.preventDefault();
    triggerWarning("Cấm nghịch code nha, tao làm mờ hết bây giờ! 😤");
    extremeTroll();
  }
});

function triggerWarning(message) {
  warningSound.currentTime = 0;
  warningSound.play().then(() => {
    alert(message);
  }).catch(() => {
    alert(message);
  });
}

function extremeTroll() {
  if (!window.isTrolled) window.isTrolled = 0;
  window.isTrolled++;

  document.body.style.filter = 'blur(10px)';
  document.body.style.pointerEvents = 'none';

  let alertCount = 0;
  const annoyInterval = setInterval(() => {
    alert("Đã bảo đừng nghịch mà?");
    alertCount++;
    if (alertCount > 5) {
      clearInterval(annoyInterval);
      document.body.style.filter = 'none';
      document.body.style.pointerEvents = 'auto';
    }
  }, 100);

  document.body.style.animation = 'shake 0.5s infinite';
  setTimeout(() => document.body.style.animation = 'none', 3000);

  for (let i = 0; i < 20; i++) {
    const heart = document.createElement('div');
    heart.classList.add('click-heart');
    heart.innerHTML = '💖';
    heart.style.left = `${Math.random() * window.innerWidth}px`;
    heart.style.top = `${Math.random() * window.innerHeight}px`;
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 2000);
  }
}
const tabButtons = document.querySelectorAll('.tab-btn');
tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    btn.style.transform = 'translateY(5px)';
    setTimeout(() => {
      btn.style.transform = 'translateY(0)';
    }, 200);
  });
});

function addSparkleEffect() {
  const video = document.getElementById(`video${currentVideo}`);
  const sparkle = document.createElement('div');
  sparkle.classList.add('sparkle');
  sparkle.style.position = 'absolute';
  sparkle.style.width = '10px';
  sparkle.style.height = '10px';
  sparkle.style.background = 'rgba(255, 107, 107, 0.8)';
  sparkle.style.borderRadius = '50%';
  sparkle.style.pointerEvents = 'none';
  sparkle.style.zIndex = '10';
  
  const videoRect = video.getBoundingClientRect();
  sparkle.style.left = `${videoRect.left + Math.random() * videoRect.width}px`;
  sparkle.style.top = `${videoRect.top + Math.random() * videoRect.height}px`;
  
  document.body.appendChild(sparkle);
  setTimeout(() => sparkle.remove(), 1000);
}
setInterval(addSparkleEffect, 1500);

setTimeout(() => {
  const mainVisible = document.getElementById("mainContent").style.display === "block";
  if (!mainVisible) showHint();
}, 30000);

window.onload = function() {
  createHearts();
  changeBackground();
  
  const videos = document.querySelectorAll('.video-player');
  videos.forEach(video => {
    const overlay = document.createElement('div');
    overlay.classList.add('video-overlay');
    overlay.style.position = 'absolute';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.zIndex = '5';
    overlay.style.background = 'rgba(0, 0, 0, 0)';
    video.parentElement.style.position = 'relative';
    video.parentElement.appendChild(overlay);
    
    overlay.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      alert("Không tải được đâu nha!");
    });
  });
};


title.addEventListener('click', () => {
  for (let i = 0; i < 10; i++) {
    const k = document.createElement('div');
    k.classList.add('heart');
    k.innerHTML = 'K';
    k.style.fontSize = '24px';
    k.style.color = '#ff6b6b';
    k.style.left = Math.random() * 100 + 'vw';
    k.style.animationDuration = 3 + Math.random() * 2 + 's';
    document.getElementById('hearts').appendChild(k);
    setTimeout(() => k.remove(), 5000);
  }
});

document.getElementById("sendMessageBtn").addEventListener("click", () => {
  document.getElementById("messageBox").style.display = "block";
});

function saveMessage() {
  const message = document.getElementById("messageInput").value;
  if (message.trim()) {
    const messages = JSON.parse(localStorage.getItem("loveMessages") || "[]");
    messages.push({ text: message, date: new Date().toLocaleString() });
    localStorage.setItem("loveMessages", JSON.stringify(messages));
    document.getElementById("messageInput").value = "";
    closeMessageBox();
    loadMessages();
  }
}

function closeMessageBox() {
  document.getElementById("messageBox").style.display = "none";
}

function loadMessages() {
  const messages = JSON.parse(localStorage.getItem("loveMessages") || "[]");
  const messageList = document.getElementById("messageList");
  messageList.innerHTML = messages.map(m => `<p>${m.date}: ${m.text}</p>`).join("");
}

function startCountdown() {
  const targetDate = new Date("2025-12-12T00:00:00");
  const countdownEl = document.getElementById("countdown");
  setInterval(() => {
    const now = new Date();
    const diff = targetDate - now;
    if (diff <= 0) {
      countdownEl.textContent = "Ngày đặc biệt đã đến rồi! 🎉";
    } else {
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      countdownEl.textContent = `Còn ${days} ngày, ${hours} giờ, ${minutes} phút đến ngày đặc biệt!`;
    }
  }, 1000);
}

document.getElementById("muteBtn").addEventListener("click", () => {
  const video = document.getElementById(`video${currentVideo}`);
  video.muted = !video.muted;
  document.getElementById("muteBtn").textContent = video.muted ? "🔇" : "🔊";
});

function togglePlayPause() {
  const video = document.getElementById(`video${currentVideo}`);
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  updatePlayPauseButton(video.paused);
}

function updatePlayPauseButton(isPaused) {
  const btn = document.getElementById("playPauseBtn");
  btn.textContent = isPaused ? "▶️" : "⏸️";
}

function startOnlineTimer() {
  let seconds = 0;
  setInterval(() => {
    seconds++;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    document.getElementById("onlineTime").textContent = `Tao đã yêu K được ${minutes} phút ${remainingSeconds} giây trên web này`;
  }, 1000);
}

let touchStartX = 0;
let touchEndX = 0;

document.querySelector(".tab-content").addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

document.querySelector(".tab-content").addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX;
  if (touchStartX - touchEndX > 50) {
    if (currentVideo === 1) switchTab(2);
  } else if (touchEndX - touchStartX > 50) {
    if (currentVideo === 2) switchTab(1);
  }
});