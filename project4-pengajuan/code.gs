/*************************
* CONFIG
*************************/
const PROJECT_ID = 'project4-pengajuan'; // Ganti jika perlu
const DATASET_ID = 'app_pengajuan';
const TABLE_MAHASISWA = 'data_mahasiswa';
const SPREADSHEET_ID = '1ltJguhIi1dPXZBNIlq9htQQEl9jPHqcZ3XKAYri0vqA';
const SHEET_PENGAJUAN = 'data_pengajuan';

/*************************
* WEB APP
*************************/
function doGet() {
  return HtmlService
    .createTemplateFromFile('index')
    .evaluate()
    .setTitle('Portal Pengajuan Mahasiswa')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function include(file) {
  return HtmlService.createHtmlOutputFromFile(file).getContent();
}

/*************************
* BIGQUERY & SHEETS LOGIC
*************************/
function loginMahasiswa(nim) {
  try {
    const nimInt = Number(nim);
    if (!nimInt) return { status: 'error', message: 'Format NIM salah' };

    // Query BigQuery
    const request = {
      query: `SELECT nim, nama, prodi FROM \`${PROJECT_ID}.${DATASET_ID}.${TABLE_MAHASISWA}\` WHERE nim = ${nimInt} LIMIT 1`,
      useLegacySql: false
    };
    const res = BigQuery.Jobs.query(request, PROJECT_ID);
    const rows = res.rows || [];

    if (rows.length === 0) return { status: 'error', message: 'NIM tidak ditemukan di Database' };

    return {
      status: 'success',
      nim: rows[0].f[0].v,
      nama: rows[0].f[1].v,
      prodi: rows[0].f[2].v
    };
  } catch (e) {
    return { status: 'error', message: 'Error Server: ' + e.toString() };
  }
}

function submitPengajuan(data) {
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName(SHEET_PENGAJUAN);
    if (!sheet) return { status: 'error', message: 'Database Sheet tidak ditemukan' };

    const timestamp = new Date();
    const id = 'REQ-' + Date.now();
    
    sheet.appendRow([
      id,
      Number(data.nim),
      data.jenis,
      data.keterangan,
      'Pending',
      timestamp
    ]);

    return { status: 'success', message: 'Pengajuan berhasil dikirim!' };
  } catch (e) {
    return { status: 'error', message: e.toString() };
  }
}

function getRiwayatPengajuan(nim) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(SHEET_PENGAJUAN);
  const values = sheet.getDataRange().getValues();
  const hasil = [];

  // Loop dari baris kedua (skip header)
  for (let i = 1; i < values.length; i++) {
    // Pastikan kolom NIM dibandingkan sebagai String agar aman
    if (String(values[i][1]) !== String(nim)) continue;

    let tanggal = '-';
    if (values[i][5] instanceof Date) {
      tanggal = Utilities.formatDate(values[i][5], 'Asia/Jakarta', 'dd MMM yyyy HH:mm');
    }

    hasil.push({
      tanggal: tanggal,
      jenis: values[i][2],
      keterangan: values[i][3],
      status: values[i][4]
    });
  }
  // Balik urutan agar yang terbaru di atas
  return hasil.reverse();
}
