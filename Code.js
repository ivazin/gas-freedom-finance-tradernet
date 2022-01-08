function onOpen() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet()
  var entries = [{
    name : "Обновить",
    functionName : "refresh"
  }]
  sheet.addMenu("FFin", entries)
};

function refresh() {
  SpreadsheetApp.getActiveSpreadsheet().getRange('Z1').setValue(new Date().toTimeString());
}

class FFinClient {
  constructor(pk, sk) {
    this.publicKey = pk;
    this.secretKey = sk;
    this.baseUrl = 'https://tradernet.ru/api';
  }
  
  __makeSignature(tst){
    const byteSignature = Utilities.computeHmacSha256Signature(tst, this.secretKey);
    const signature = byteSignature.reduce(function(str,chr){ chr = (chr < 0 ? chr + 256 : chr).toString(16); return str + (chr.length==1?'0':'') + chr;},'');
    return signature;
  }

  _makeApiCall(cmd) {
    var now = new Date();
    const stm = parseInt(now.getTime())*10;
    const XNtApiSig = `apiKey=${this.publicKey}&cmd=${cmd}&nonce=${stm}`;
    const params = {'method': 'post', 'headers': { 
                                              'X-NtApi-Sig': this.__makeSignature(XNtApiSig), 
                                              'Content-Type': 'application/x-www-form-urlencoded',
                                              },
                                    'payload': XNtApiSig
                  }                                   
    const url = this.baseUrl + '/v2/cmd/' + cmd + '?' + XNtApiSig;
    const response = UrlFetchApp.fetch(url, params);
    if (response.getResponseCode() == 200){
      var r = JSON.parse(response.getContentText());
      try {
        return r.result.ps.pos;
      } 
      catch (e) {
          console.error(e);
      }
    }
    else {
      return("Error?!");
    }
  }
}


function displayPortfolio(pk, sk, refresh) {
  var ffinClient = new FFinClient(pk, sk)
  const tmp = ffinClient._makeApiCall("getPositionJson");
  const values = []

  const headings = ["i","t","k","s","q","fv",'curr',"currval","name","name2","open_bal","mkt_price","vm","go","profit_close","acc_pos_id","accruedint_a","acd","bal_price_a","price_a","base_currency","face_val_a","scheme_calc","instr_id","Yield","issue_nb","profit_price","market_value","close_price"];

  values.push(headings);

  try{
    tmp.forEach(function(item) {
    values.push(headings.map(function(heading) {
      return item[heading] || '';
    }));
    });
  }
  catch(e){
    console.error(e);
  }

  return values;
}

