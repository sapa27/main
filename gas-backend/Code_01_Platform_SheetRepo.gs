var SHEET_REPO_BATCH_CONTRACT_STAMP = "sheet-repo-production-engine-github-root-safe-current";

function _sheetRepoText_(value) {
  return value == null ? "" : String(value).trim();
}

function _sheetRepoProp_(key) {
  try {
    var v = PropertiesService.getScriptProperties().getProperty(String(key || ""));
    if (v != null && String(v).trim() !== "") return String(v).trim();
  } catch (_) {}
  try {
    var dv = PropertiesService.getDocumentProperties().getProperty(String(key || ""));
    if (dv != null && String(dv).trim() !== "") return String(dv).trim();
  } catch (_) {}
  return "";
}

function _sheetRepoResolveSpreadsheetId_() {
  var keys = [
    "DATABASE_SPREADSHEET_ID",
    "SPREADSHEET_ID",
    "SHEET_ID",
    "DB_SPREADSHEET_ID",
    "DATA_SPREADSHEET_ID",
    "CONFIG_SPREADSHEET_ID",
    "COMMITTEE_SPREADSHEET_ID"
  ];
  for (var i = 0; i < keys.length; i++) {
    var v = _sheetRepoProp_(keys[i]);
    if (v) return v;
  }
  return "";
}

function _sheetRepoResolveSpreadsheetUrl_() {
  var keys = ["DATABASE_SPREADSHEET_URL", "SPREADSHEET_URL", "SHEET_URL", "DB_SPREADSHEET_URL"];
  for (var i = 0; i < keys.length; i++) {
    var v = _sheetRepoProp_(keys[i]);
    if (v) return v;
  }
  return "";
}

var AppSheetBatch = {
  __lastSpreadsheetError: "",
  __lastSpreadsheetSource: "",

  getSpreadsheet: function() {
    this.__lastSpreadsheetError = "";
    this.__lastSpreadsheetSource = "";
    var id = _sheetRepoResolveSpreadsheetId_();
    if (id) {
      try {
        this.__lastSpreadsheetSource = "script-property-id";
        return SpreadsheetApp.openById(id);
      } catch (e1) {
        this.__lastSpreadsheetError = "openById(" + id + "): " + String(e1 && e1.message || e1);
      }
    }
    var url = _sheetRepoResolveSpreadsheetUrl_();
    if (url) {
      try {
        this.__lastSpreadsheetSource = "script-property-url";
        return SpreadsheetApp.openByUrl(url);
      } catch (e2) {
        this.__lastSpreadsheetError = "openByUrl: " + String(e2 && e2.message || e2);
      }
    }
    try {
      var active = SpreadsheetApp.getActiveSpreadsheet();
      if (active) {
        this.__lastSpreadsheetSource = "active-spreadsheet";
        return active;
      }
    } catch (e3) {
      this.__lastSpreadsheetError = (this.__lastSpreadsheetError ? this.__lastSpreadsheetError + " | " : "") + "getActiveSpreadsheet: " + String(e3 && e3.message || e3);
    }
    throw new Error("ไม่พบฐานข้อมูล Google Sheet: กรุณาตั้ง Script Properties ชื่อ DATABASE_SPREADSHEET_ID ให้เป็น Spreadsheet ID ของฐานข้อมูลจริง");
  },

  getSheet: function(sheetName) {
    var ss = this.getSpreadsheet();
    if (!ss) throw new Error("ไม่พบ Spreadsheet ฐานข้อมูล");
    var sh = ss.getSheetByName(String(sheetName || ""));
    if (!sh) throw new Error("ไม่พบตารางข้อมูล (Sheet): " + sheetName);
    return sh;
  },

  readRows: function(sheetName) {
    var sheet = this.getSheet(sheetName);
    var lastRow = Math.max(Number(sheet.getLastRow && sheet.getLastRow()) || 0, 0);
    var lastCol = Math.max(Number(sheet.getLastColumn && sheet.getLastColumn()) || 0, 0);
    if (lastRow <= 1 || lastCol <= 0) return [];
    var headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
    var values = sheet.getRange(2, 1, lastRow - 1, lastCol).getValues();
    return values.map(function(row) {
      var obj = {};
      headers.forEach(function(header, index) {
        header = _sheetRepoText_(header);
        if (header) obj[header] = row[index];
      });
      return obj;
    });
  },

  upsertObjects: function(sheetName, objectsArray, keyField) {
    var sheet = this.getSheet(sheetName);
    var lastRow = Math.max(Number(sheet.getLastRow && sheet.getLastRow()) || 0, 0);
    var lastCol = Math.max(Number(sheet.getLastColumn && sheet.getLastColumn()) || 0, 0);
    if (lastRow === 0 || lastCol === 0) throw new Error("โครงสร้างตารางข้อมูลว่างเปล่า");
    var headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0].map(function(h) { return _sheetRepoText_(h); });
    var existingData = lastRow > 1 ? sheet.getRange(2, 1, lastRow - 1, lastCol).getValues() : [];
    var keyIndex = headers.indexOf(String(keyField || ""));
    if (keyIndex === -1) throw new Error("ไม่พบคีย์หลักในตาราง: " + keyField);
    var updatedCount = 0;
    var createdCount = 0;
    (Array.isArray(objectsArray) ? objectsArray : []).forEach(function(obj) {
      obj = obj || {};
      var rowValues = headers.map(function(h) { return obj[h] !== undefined ? obj[h] : ""; });
      var matchIndex = -1;
      for (var i = 0; i < existingData.length; i++) {
        if (String(existingData[i][keyIndex]) === String(obj[keyField])) {
          matchIndex = i;
          break;
        }
      }
      if (matchIndex !== -1) {
        sheet.getRange(matchIndex + 2, 1, 1, lastCol).setValues([rowValues]);
        updatedCount++;
      } else {
        sheet.appendRow(rowValues);
        createdCount++;
      }
    });
    return { ok: true, created: createdCount, updated: updatedCount, stamp: SHEET_REPO_BATCH_CONTRACT_STAMP };
  }
};
