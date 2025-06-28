function doGet() {
  return HtmlService.createTemplateFromFile('Index').evaluate();
}

function getStudentData(studentID) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();
  var dataRange = sheet.getDataRange();
  var values = dataRange.getValues();
  
  // Encontrar el índice de la columna de ID (asume que está en la primera columna)
  var idColumnIndex = -1;
  var headers = values[0];
  for (var i = 0; i < headers.length; i++) {
    if (headers[i].trim().toLowerCase() === 'id estudiante') {
      idColumnIndex = i;
      break;
    }
  }
  
  if (idColumnIndex === -1) {
    return { error: 'No se encontró la columna de ID Estudiante.' };
  }

  // Buscar el estudiante
  for (var i = 1; i < values.length; i++) {
    var row = values[i];
    if (row[idColumnIndex].toString().trim() === studentID.toString().trim()) {
      var studentData = {};
      for (var j = 0; j < headers.length; j++) {
        studentData[headers[j]] = row[j];
      }
      return studentData;
    }
  }

  return { error: 'Identificación no encontrada. Por favor, verifica el número.' };
}
