# ✨ Personal Portfolio | Google Apps Script Edition

![Google Apps Script](https://img.shields.io/badge/Google%20Apps%20Script-4285F4?style=for-the-badge&logo=google-drive&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/Dark%20Mode-1572B6?style=for-the-badge&logo=css3&logoColor=white)

Sebuah website portofolio pribadi yang dibangun di atas ekosistem **Google Apps Script (GAS)**. Proyek ini mendemonstrasikan kemampuan *Server-side Templating* sederhana untuk merender halaman web statis yang responsif, modern, dan memiliki performa tinggi tanpa biaya hosting (Serverless).

🔗 **Live Demo:** [Masukkan Link Deployment Web App Kamu Di Sini]

---

## 🎨 Fitur Utama

- **Modern Dark Mode:** Desain antarmuka "Midnight Developer" dengan nuansa *Deep Navy* dan aksen *Neon Cyan*.
- **Glassmorphism:** Efek navigasi transparan yang estetis.
- **Scroll Animations:** Elemen muncul secara halus (*Fade In*) saat digulir.
- **Modular Code Structure:** Pemisahan *concern* yang rapi antara HTML, CSS, dan JavaScript menggunakan fungsi `include()` kustom.
- **Responsive Design:** Tampilan optimal di Desktop maupun Mobile.

---

## 📂 Struktur File

Proyek ini terdiri dari 4 file utama di dalam Editor Google Apps Script:

```text
├── Code.gs        # Backend logic & Routing (doGet)
├── index.html     # Struktur utama halaman (HTML)
├── style.html     # Kustomisasi tampilan (CSS Dark Mode)
└── script.html    # Interaktivitas & Animasi (JavaScript)
