# 🎓 Sistem Pengajuan Online Mahasiswa (Serverless)

![Google Apps Script](https://img.shields.io/badge/Google%20Apps%20Script-4285F4?style=for-the-badge&logo=google-drive&logoColor=white)
![Google BigQuery](https://img.shields.io/badge/BigQuery-Data_Warehouse-669DF6?style=for-the-badge&logo=google-cloud&logoColor=white)
![Google Sheets](https://img.shields.io/badge/Google%20Sheets-Database-34A853?style=for-the-badge&logo=google-sheets&logoColor=white)

Aplikasi berbasis web (*Web App*) yang memudahkan mahasiswa untuk melakukan pengajuan (Izin, Sakit, Akademik) secara online. Sistem ini dibangun dengan arsitektur **Serverless** menggunakan ekosistem Google Cloud.

🔗 **Live Demo:** [Masukkan Link Deploy Web App Anda Di Sini]

---

## 🏗️ Arsitektur Sistem

Proyek ini menggunakan pendekatan **Hybrid Database** untuk performa dan kemudahan pengelolaan:

1.  **Frontend:** HTML5, CSS3, & JavaScript (Served via `doGet`).
2.  **Backend Logic:** Google Apps Script (`Code.gs`).
3.  **Data Mahasiswa (Read-Only):** Disimpan di **Google BigQuery** untuk validasi login yang cepat dan aman menangani ribuan data mahasiswa.
4.  **Data Pengajuan (Read/Write):** Disimpan di **Google Sheets** agar admin/dosen mudah merekap dan memverifikasi data tanpa perlu masuk ke database kompleks.

---

## ✨ Fitur Utama

-   **🔐 Login Terintegrasi:** Validasi NIM Real-time menggunakan BigQuery.
-   **📝 Form Pengajuan Responsif:** Antarmuka modern untuk input jenis pengajuan dan keterangan.
-   **clock-rotate-left Riwayat Pengajuan:** Mahasiswa dapat melihat status pengajuan mereka (Pending, Disetujui, Ditolak) secara langsung.
-   **🎨 UI Modern:** Desain bersih menggunakan *Glassmorphism*, Card Layout, dan **SweetAlert2** untuk notifikasi interaktif.
-   **📱 Mobile Friendly:** Tampilan responsif yang menyesuaikan layar HP maupun Desktop.

---

🔗 **Live Demo:** [Di Sini[]](https://script.google.com/macros/s/AKfycbxUg8GRNEDewFm8wE_picLqRUOXhkuKkc5W3bUETxEn6RlxaXdxdA0EcAb8OChxSyWE/exec)

## 📂 Struktur File

```text
├── Code.gs        # Backend: Koneksi ke BigQuery & Sheet
├── index.html     # Frontend: Struktur HTML Utama
├── style.html     # Styling: CSS Modern & Responsif
└── script.html    # Logic: Fetch API, DOM Manipulation, SweetAlert
