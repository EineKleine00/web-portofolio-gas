// Ganti ID ini jika kamu buat sheet baru, tapi kalau masih sama pakai yang ini:
const SHEET_ID = '1CJeysBfjdqJvAqcXGLbNBnuzLSbfP3Mv6BVSRQej-qc';

function doGet() {
  return HtmlService.createTemplateFromFile('index')
      .evaluate()
      .setTitle('Contact Form')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function processForm(data) {
  // Kunci script sebentar agar data tidak tumpang tindih jika banyak orang submit bersamaan
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sheet = ss.getSheetByName('Sheet1'); // WAJIB: Nama tab di sheet harus "Sheet1"

    if (!sheet) {
      throw new Error("Tab 'Sheet1' tidak ditemukan! Mohon rename tab sheet Anda.");
    }

    // Masukkan data ke baris baru
    sheet.appendRow([
      new Date(),     // Timestamp
      "'"+data.name,  // Tanda kutip agar format text terjaga
      data.email,
      data.message
    ]);

    return "Sukses"; // Balasan ke frontend jika berhasil

  } catch (e) {
    // Jika error, kirim pesan errornya ke frontend
    return "Error: " + e.toString();
  } finally {
    lock.releaseLock();
  }
}
