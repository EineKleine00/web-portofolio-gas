const SHEET_ID = '1Xaq-tk4SauIOhMmsG0u0j7I36-UPdyYiiqCXY4AkTYY'; // Pastikan ID ini benar

function doGet() {
  return HtmlService.createTemplateFromFile('index')
      .evaluate()
      .setTitle('Sistem Absensi Mahasiswa')
      .addMetaTag('viewport', 'width=device-width, initial-scale=1')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function include(file) {
  return HtmlService.createHtmlOutputFromFile(file).getContent();
}

/* ================= LOGIN ================= */
function login(nim) {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName('data_mahasiswa');
  // Ambil semua data
  const data = sheet.getDataRange().getDisplayValues();
  
  // Loop data (Mulai dari baris 1 untuk skip header)
  for (let i = 1; i < data.length; i++) {
    // data[i][0] adalah kolom NIM
    if (String(data[i][0]).trim() === String(nim).trim()) {
      return { 
        status: 'success', 
        nim: data[i][0],
        nama: data[i][1], // Kirim nama juga biar sapaan lebih personal
        prodi: data[i][2]
      };
    }
  }
  return { status: 'error', message: 'NIM tidak ditemukan di database.' };
}

/* ================= ABSENSI ================= */
function submitAbsensi(data) {
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName('data_absensi');
    
    // Format Tanggal Indonesia (WIB)
    const now = new Date();
    const timestamp = Utilities.formatDate(now, "Asia/Jakarta", "dd/MM/yyyy HH:mm:ss");
    
    sheet.appendRow([
      timestamp,
      "'" + data.nim, // Pakai kutip biar ga jadi angka scientific
      data.makul,
      data.status
    ]);
    
    return { status: 'success', message: 'Absensi berhasil disimpan!' };
  } catch (e) {
    return { status: 'error', message: e.toString() };
  }
}

/* ================= LOAD DATA ================= */
function getAbsensiList() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const sheetAbsensi = ss.getSheetByName('data_absensi');
  const sheetMhs = ss.getSheetByName('data_mahasiswa');
  
  // Cek jika sheet kosong
  if (sheetAbsensi.getLastRow() <= 1) return [];

  const absensi = sheetAbsensi.getDataRange().getDisplayValues();
  const mahasiswa = sheetMhs.getDataRange().getDisplayValues();
  
  // Buat Map Mahasiswa biar pencarian cepat
  const map = {};
  for (let i = 1; i < mahasiswa.length; i++) {
    map[String(mahasiswa[i][0]).trim()] = {
      nama: mahasiswa[i][1],
      prodi: mahasiswa[i][2]
    };
  }
  
  const result = [];
  // Loop dari BAWAH ke ATAS (biar data terbaru muncul duluan)
  for (let i = absensi.length - 1; i >= 1; i--) {
    const nim = String(absensi[i][1]).trim();
    if (map[nim]) {
      result.push({
        nama: map[nim].nama,
        nim: nim,
        prodi: map[nim].prodi,
        jam: absensi[i][0],
        makul: absensi[i][2],
        status: absensi[i][3]
      });
    }
  }
  return result;
}
