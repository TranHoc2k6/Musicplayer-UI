# 🎵 Music Player UI

Giao diện trình phát nhạc (music player) hiện đại với phong cách **glassmorphism** tông tím – xanh neon, đĩa CD xoay theo nhạc, playlist cuộn mượt và hiệu ứng mưa rơi ở nền. Dự án viết bằng **HTML, CSS và JavaScript thuần**, không cần cài đặt thư viện hay build tool.

## ✨ Tính năng

- ▶️ **Phát / Tạm dừng** bài hát
- ⏮️ ⏭️ **Chuyển bài** trước / sau (lặp vòng khi hết danh sách)
- 🔀 **Phát ngẫu nhiên** (Random) – không lặp lại đúng bài đang phát
- 🔁 **Lặp lại một bài** (Repeat)
- 📊 **Thanh tiến trình** hiển thị thời gian phát, có thể kéo để tua
- 💿 **Đĩa CD xoay** theo ảnh bìa, tự dừng khi tạm dừng nhạc
- 📃 **Playlist** hiển thị ảnh bìa, tên bài, nghệ sĩ; bấm để chọn bài
- 🎯 **Tự cuộn** đến bài đang phát trong playlist
- 🌧️ **Hiệu ứng mưa rơi** trang trí ở nền
- 🌌 Giao diện tối với gradient và hiệu ứng ánh sáng mờ (glow)

## 🛠️ Công nghệ sử dụng

| Thành phần | Chi tiết |
| --- | --- |
| Giao diện | HTML5, CSS3 (CSS variables, gradient, backdrop blur) |
| Logic | JavaScript thuần (Vanilla JS) – HTML5 Audio API, Web Animations API |
| Font | [Poppins](https://fonts.google.com/specimen/Poppins) (Google Fonts) |
| Icon | [Font Awesome 6.6.0](https://fontawesome.com/) (CDN) |

## 📁 Cấu trúc thư mục

```
Musicplayer-UI/
├── index.html
├── main.js               # Logic trình phát và danh sách bài hát
└── assets/
    ├── css/
    │   └── style.css     # Giao diện và animation
    ├── img/              # Ảnh bìa: cover1.jpg … cover5.jpg
    └── music/            # File nhạc: song1.mp3 … song5.mp3
```

## 🚀 Cài đặt và chạy

### Cách 1: Mở trực tiếp

```bash
git clone https://github.com/TranHoc2k6/Musicplayer-UI.git
cd Musicplayer-UI
```

Sau đó mở file `index.html` bằng trình duyệt.

### Cách 2: Dùng Live Server (khuyến nghị)

1. Mở thư mục dự án bằng **VS Code**.
2. Cài extension **Live Server**.
3. Chuột phải vào `index.html` → **Open with Live Server**.

> 💡 Cần kết nối Internet để tải font Poppins và bộ icon Font Awesome từ CDN.

## 🎮 Cách sử dụng

| Nút | Chức năng |
| --- | --- |
| ▶️ / ⏸️ | Phát hoặc tạm dừng |
| ⏮️ / ⏭️ | Bài trước / bài tiếp theo |
| 🔀 | Bật/tắt chế độ phát ngẫu nhiên |
| 🔁 | Bật/tắt chế độ lặp lại bài hiện tại |
| Thanh trượt | Kéo để tua đến vị trí mong muốn |
| Bài trong playlist | Bấm để phát bài đó |

Khi một bài kết thúc, trình phát tự chuyển sang bài kế tiếp (hoặc phát lại nếu đang bật Repeat).

## 🎨 Tùy chỉnh

### Thêm hoặc thay đổi bài hát

1. Chép file nhạc vào `assets/music/` và ảnh bìa vào `assets/img/`.
2. Thêm một mục mới vào mảng `songs` trong `main.js`:

```js
{
  title: "Tên bài hát",
  artist: "Tên nghệ sĩ",
  cover: "assets/img/cover6.jpg",
  src: "assets/music/song6.mp3"
}
```

### Đổi màu giao diện

Chỉnh các biến CSS ở đầu file `assets/css/style.css`:

```css
:root {
  --primary-color: #7c4dff;
  --secondary-color: #00d4ff;
  --bg-dark: #070b14;
  /* ... */
}
```

### Điều chỉnh hiệu ứng mưa

Trong hàm `createRain()` ở `main.js`, giá trị `70` (ms) trong `setInterval` quyết định mật độ giọt mưa; tăng số này để mưa thưa hơn.

## 📝 Ghi chú

- Trình duyệt thường chặn tự động phát âm thanh, vì vậy bạn cần bấm nút Play ở lần đầu tiên.
- Các bài hát và ảnh bìa trong dự án chỉ nhằm mục đích học tập, minh họa giao diện. Nếu công khai dự án, hãy thay bằng nội dung bạn có quyền sử dụng.

## 👤 Tác giả

**TranHoc2k6** – [GitHub](https://github.com/TranHoc2k6)