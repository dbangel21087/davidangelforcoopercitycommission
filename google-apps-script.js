function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);

  var interests = data['interest[]'] || [];
  if (!Array.isArray(interests)) interests = [interests];

  sheet.appendRow([
    new Date(),
    data.first_name || '',
    data.last_name  || '',
    data.email      || '',
    data.phone      || '',
    data.zip        || '',
    interests.includes('volunteer')              ? 'Yes' : '',
    interests.includes('updates')               ? 'Yes' : '',
    interests.includes('volunteer-and-updates') ? 'Yes' : ''
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ result: 'success' }))
    .setMimeType(ContentService.MimeType.JSON);
}
