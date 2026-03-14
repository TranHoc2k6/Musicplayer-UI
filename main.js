const $ = document.querySelector.bind(document);

const header = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const player = $(".player");
const progress = $("#progress");
const btnPlay = $(".btn-toggle-play");
const btnNext = $(".btn-next");
const btnPrev = $(".btn-prev");
const btnRepeat = $(".btn-repeat");
const btnRandom = $(".btn-random");
const playlist = $(".playlist");
const rainContainer = $("#rain-container");

const app = {
  currentIndex: 0,
  isPlaying: false,
  isRandom: false,
  isRepeat: false,

  songs: [
    {
      title: "Nghe Như Tình Yêu",
      artist: "HieuThuHai",
      cover: "assets/img/cover1.jpg",
      src: "assets/music/song1.mp3"
    },
    {
      title: "Exit Sign",
      artist: "HieuThuHai",
      cover: "assets/img/cover2.jpg",
      src: "assets/music/song2.mp3"
    },
    {
      title: "Vệ Tinh",
      artist: "HieuThuHai",
      cover: "assets/img/cover3.jpg",
      src: "assets/music/song3.mp3"
    },
    {
      title: "1800-Love",
      artist: "HieuThuHai",
      cover: "assets/img/cover4.jpg",
      src: "assets/music/song4.mp3"
    },
    {
      title: "Không Thể Say",
      artist: "HieuThuHai",
      cover: "assets/img/cover5.jpg",
      src: "assets/music/song5.mp3"
    }
  ],

  defineProperties() {
    Object.defineProperty(this, "currentSong", {
      get: () => this.songs[this.currentIndex]
    });
  },

  render() {
    const htmls = this.songs.map((song, index) => {
      return `
        <div class="song ${index === this.currentIndex ? "active" : ""}" data-index="${index}">
          <div class="thumb" style="background-image: url('${song.cover}')"></div>
          <div class="body">
            <h3 class="title">${song.title}</h3>
            <p class="author">${song.artist}</p>
          </div>
          <div class="option">
            <i class="fas fa-ellipsis-h"></i>
          </div>
        </div>
      `;
    });

    playlist.innerHTML = htmls.join("");
  },

  loadCurrentSong() {
    header.textContent = this.currentSong.title;
    cdThumb.style.backgroundImage = `url('${this.currentSong.cover}')`;
    audio.src = this.currentSong.src;
  },

  nextSong() {
    this.currentIndex++;
    if (this.currentIndex >= this.songs.length) this.currentIndex = 0;
    this.loadCurrentSong();
  },

  prevSong() {
    this.currentIndex--;
    if (this.currentIndex < 0) this.currentIndex = this.songs.length - 1;
    this.loadCurrentSong();
  },

  playRandomSong() {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length);
    } while (newIndex === this.currentIndex && this.songs.length > 1);

    this.currentIndex = newIndex;
    this.loadCurrentSong();
  },

  scrollToActiveSong() {
    setTimeout(() => {
      $(".song.active")?.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
    }, 300);
  },

  createRain() {
    if (!rainContainer) return;

    setInterval(() => {
      const drop = document.createElement("span");
      drop.classList.add("raindrop");

      const left = Math.random() * window.innerWidth;
      const duration = Math.random() * 0.8 + 0.6;
      const height = Math.random() * 16 + 12;
      const opacity = Math.random() * 0.5 + 0.3;

      drop.style.left = `${left}px`;
      drop.style.height = `${height}px`;
      drop.style.opacity = opacity;
      drop.style.animationDuration = `${duration}s`;

      rainContainer.appendChild(drop);

      setTimeout(() => {
        drop.remove();
      }, duration * 1000);
    }, 70);
  },

  handleEvents() {
    const _this = this;

    const cdThumbAnimate = cdThumb.animate(
      [
        { transform: "rotate(0deg) scale(1)" },
        { transform: "rotate(180deg) scale(1.02)" },
        { transform: "rotate(360deg) scale(1)" }
      ],
      {
        duration: 12000,
        iterations: Infinity
      }
    );
    cdThumbAnimate.pause();

    btnPlay.onclick = function () {
      if (_this.isPlaying) {
        audio.pause();
      } else {
        audio.play().catch(err => {
          console.log("Không phát được nhạc:", err);
        });
      }
    };

    audio.onplay = function () {
      _this.isPlaying = true;
      player.classList.add("playing");
      cdThumbAnimate.play();
    };

    audio.onpause = function () {
      _this.isPlaying = false;
      player.classList.remove("playing");
      cdThumbAnimate.pause();
    };

    audio.ontimeupdate = function () {
      if (audio.duration) {
        const progressPercent = Math.floor((audio.currentTime / audio.duration) * 100);
        progress.value = progressPercent;
      }
    };

    progress.oninput = function (e) {
      if (audio.duration) {
        const seekTime = (audio.duration / 100) * e.target.value;
        audio.currentTime = seekTime;
      }
    };

    btnNext.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.nextSong();
      }
      _this.render();
      _this.scrollToActiveSong();
      audio.play();
    };

    btnPrev.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.prevSong();
      }
      _this.render();
      _this.scrollToActiveSong();
      audio.play();
    };

    btnRandom.onclick = function () {
      _this.isRandom = !_this.isRandom;
      btnRandom.classList.toggle("active", _this.isRandom);
    };

    btnRepeat.onclick = function () {
      _this.isRepeat = !_this.isRepeat;
      btnRepeat.classList.toggle("active", _this.isRepeat);
    };

    audio.onended = function () {
      if (_this.isRepeat) {
        audio.play();
      } else {
        btnNext.click();
      }
    };

    playlist.onclick = function (e) {
      const songNode = e.target.closest(".song:not(.active)");
      if (songNode) {
        _this.currentIndex = Number(songNode.dataset.index);
        _this.loadCurrentSong();
        _this.render();
        audio.play();
      }
    };
  },

  start() {
    this.defineProperties();
    this.handleEvents();
    this.loadCurrentSong();
    this.render();
    this.createRain();
  }
};

app.start();