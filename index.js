const output = document.querySelector('#output');

const btn = document.querySelector('#addCode');
btn.addEventListener('click', showOutput);

const VVC = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '-', '_', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

const LEGAL_SYMBOL = ['.', ',', '+', '-', '/', '*', '%', '&', '|', '!', '^'];

let dblQuotesFlag = false;
let sngQuotesFlag = false;
let markers = [];

function buildMarkers(str) {
  let start = 0;
  let tmp = "";
  for (let i = 0; i < str.length; i++) {
    if (VVC.indexOf(str[i]) != -1) {
      start = i;
      place = start;
      while (VVC.indexOf(str[i]) != -1) {
        tmp += str[i];
        i++;
      }
      i -= 1;
      let marker = new Marker(start, "VVC", tmp.length, tmp);
      markers.push(marker);
      tmp = "";
    } else if (VVC.indexOf(str[i]) == -1) {
      start = i;
      if (str[i] == "'") {
        tmp += str[i];
        let marker = new Marker(start, "SQT", 1, "&#8217;");
        markers.push(marker);
      } else if (str[i] == '"') {
        tmp += str[i];
        let marker = new Marker(start, "DQT", 1, "&#8220;");
        markers.push(marker);
      } else if (str[i] == " ") {
        tmp += str[i];
        let marker = new Marker(start, "SPC", 1, tmp);
        markers.push(marker);
      } else if (str[i] == "\n") {
        tmp += str[i];
        let marker = new Marker(start, "NWL", 1, tmp);
        markers.push(marker);
      } else if (str[i] == "{") {
        tmp += str[i];
        let marker = new Marker(start, "OBR", 1, tmp);
        markers.push(marker);
      } else if (str[i] == "}") {
        tmp += str[i];
        let marker = new Marker(start, "CBR", 1, tmp);
        markers.push(marker);
      } else if (str[i] == "(") {
        tmp += str[i];
        let marker = new Marker(start, "OPR", 1, tmp);
        markers.push(marker);
      } else if (str[i] == ")") {
        tmp += str[i];
        let marker = new Marker(start, "CPR", 1, tmp);
        markers.push(marker);
      } else if (str[i] == "<") {
        let marker = new Marker(start, "LST", 1, "&lt;");
        markers.push(marker);
      } else if (str[i] == ">") {
        let marker = new Marker(start, "GRT", 1, "&gt;");
        markers.push(marker);
      } else {
        let marker = new Marker(start, str[i], str[i].length, str[i]);
        markers.push(marker);
      }
    }
    tmp = "";
  }
}

function getInput(id) {
  console.log("CLICK!");

  let inputData = document.querySelector(`#${id}`).value;
  return inputData;
}

function processMarkers(markers) {
  let tmp = "";
  let inSingleQuotes = false;
  let inDoubleQuotes = false;
  markers.forEach(element => {
    if (element.type == "SQT") {
      inSingleQuotes = !inSingleQuotes;
      if (inSingleQuotes && !inDoubleQuotes) {
        tmp += "<span class = 'inQuotes'>&#39;";
      } else {
        tmp += "&#39;</span>";
      }
    } else if (element.type == "DQT") {
      inDoubleQuotes = !inDoubleQuotes;
      if (inDoubleQuotes && !inSingleQuotes) {
        tmp += "<span class='inQuotes'>&quot;";
      } else {
        tmp += "&quot;</span>";
      }
    } else if (element.type == 'NWL') {
      tmp += "<br>";
    } else if (element.type == 'SPC') {
      tmp += "&nbsp;";
    } else if (isKeyword(element.word)) {
      tmp += `<span class='keyword'>${element.word}</span>`;
    } else if (element.word == '`') {
      tmp += `&#96;`;
    } else {
      if(element.word == "'" || element.word == "`") tmp += "&#34;"; else tmp += `${element.word}`;
    }
  });
  return tmp;
}

function showOutput(ev) {
  let op = "";
  output.innerHTML = "";
  buildMarkers(getInput('input'));
  op = processMarkers(markers);
  output.innerHTML = op;
}

function isKeyword(str) {
  let firstLetter = str.toLowerCase().charAt(0);
  switch (firstLetter) {
    case 'a':
      if (keyWordsA.indexOf(str) != -1) return true;
      return false;
      break;
    case 'b':
      if (keyWordsB.indexOf(str) != -1) return true;
      return false;
      break;
    case 'c':
      if (keyWordsC.indexOf(str) != -1) return true;
      return false;
      break;
    case 'd':
      if (keyWordsD.indexOf(str) != -1) return true;
      return false;
      break;
    case 'e':
      if (keyWordsE.indexOf(str) != -1) return true;
      return false;
      break;
    case 'f':
      if (keyWordsF.indexOf(str) != -1) return true;
      return false;
      break;
    case 'g':
      if (keyWordsG.indexOf(str) != -1) return true;
      return false;
      break;
    case 'i':
      if (keyWordsI.indexOf(str) != -1) return true;
      return false;
      break;
    case 'l':
      if (keyWordsL.indexOf(str) != -1) return true;
      return false;
      break;
    case 'n':
      if (keyWordsN.indexOf(str) != -1) return true;
      return false;
      break;
    case 'p':
      if (keyWordsP.indexOf(str) != -1) return true;
      return false;
      break;
    case 'r':
      if (keyWordsR.indexOf(str) != -1) return true;
      return false;
      break;
    case 's':
      if (keyWordsS.indexOf(str) != -1) return true;
      return false;
      break;
    case 't':
      if (keyWordsT.indexOf(str) != -1) return true;
      return false;
      break;
    case 'v':
      if (keyWordsV.indexOf(str) != -1) return true;
      return false;
      break;
    case 'w':
      if (keyWordsW.indexOf(str) != -1) return true;
      return false;
      break;
    case 'y':
      if (keyWordsY.indexOf(str) != -1) return true;
      return false;
      break;
  }
}

const keyWordsA = ['abstract', 'arguments', 'await'];
const keyWordsB = ['boolean', 'break', 'byte'];
const keyWordsC = ['case', 'catch', 'char', 'class', 'const', 'continue'];
const keyWordsD = ['debugger', 'default', 'delete', 'do', 'double'];
const keyWordsE = ['else', 'enum', 'evalexport', 'extends'];
const keyWordsF = ['false', 'final', 'finally', 'float', 'for', 'function'];
const keyWordsG = ['goto'];
const keyWordsI = ['if', 'implements', 'import', 'in', 'instanceof', 'int', 'interface'];
const keyWordsL = ['let', 'long'];
const keyWordsN = ['native', 'new', 'null'];
const keyWordsP = ['package', 'private', 'protected', 'public'];
const keyWordsR = ['return'];
const keyWordsS = ['short', 'static', 'super', 'switch', 'synchronized'];
const keyWordsT = ['this', 'throw', 'throws', 'transient', 'true', 'try', 'typeof'];
const keyWordsV = ['var', 'void', 'volatile'];
const keyWordsW = ['while', 'with'];
const keyWordsY = ['yield'];

class Marker {
  constructor(start, type, len, word) {
    this.start = start;
    this.type = type;
    this.len = len;
    this.word = word;
  }
}