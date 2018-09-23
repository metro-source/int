var api = {
  get:'',
  post:'',
  patch:'',
  delet:''
}



//editor
var spectrumEditor = {
    // Methods
    closeEditor : function(cell, save) {
        // Get value
        var value = $(cell).find('.editor').spectrum('get').toHexString();

        // Set visual value
        $(cell).html(value);
        $(cell).css('color', value);

        // Close edition
        $(cell).removeClass('edition');

        // Save history
        return value;
    },
    openEditor : function(cell) {
        // Get current content
        var html = $(cell).html();

        // Create the editor
        var editor = document.createElement('div');
        $(cell).html(editor);
        $(editor).prop('class', 'editor');

        // Create the instance of the plugin
        $(editor).spectrum({ color:html, preferredFormat:'hex', hide: function(color) {
            // Close editor through jexcel
            $('#' + $.fn.jexcel.current).jexcel('closeEditor', $(cell), true);
        }});

        // Run
        $(editor).spectrum('show');
    },
    getValue : function(cell) {
        return $(cell).html();
    },
    setValue : function(cell, value) {
        $(cell).html(value);
        $(cell).css('color', value);

        return true;
    }
}

data = [
    ['','', '', '', '','','','','','','','','','','','',''],
    ['','', '', '', '','','','','','','','','','','','',''],
    ['','', '', '', '','','','','','','','','','','','',''],
    ['','', '', '', '','','','','','','','','','','','',''],
    ['','', '', '', '','','','','','','','','','','','',''],
    ['','', '', '', '','','','','','','','','','','','',''],
    ['','', '', '', '','','','','','','','','','','','',''],
    ['','', '', '', '','','','','','','','','','','','',''],
    ['','', '', '', '','','','','','','','','','','','','']
];


$('#crear').on('click',function (e) {
    $('#my').html('<div class="loader"></div>')
    if($("#my table").length){
      alert('')
      $('#my').jexcel('destroy');
    }

    $('#my').jexcel({
        data:data,
        columns: [
            { type:'text' },
            { type:'text' },
            { type:'text' },
            { type:'text' },
        ],
        colHeaders: ['','', '', '', '','','','','','','','','','','','',''],
        colWidths: []
    });
})
    
$('#download').on('click', function () {
    $('#my').jexcel('download');
});

function remplaceSpace (arreglo){
  var l=[];
  for (var i=0;i<arreglo.length;i++){
    if(typeof arreglo[i] === 'undefined'){
      l.push('');
    }else{
      l.push(arreglo[i])
    }
  }
  return l;
}


var rABS = true; // true: readAsBinaryString ; false: readAsArrayBuffer
function handleFile(e) {
  $('#my').html('<div class="loader"></div>')
  var files = e.target.files, f = files[0];
  var reader = new FileReader();
  reader.onload = function(e) {
    var data = e.target.result;
    if(!rABS) data = new Uint8Array(data);
    var json = XLSX.read(data, {type: rABS ? 'binary' : 'array'});
    $('#my').jexcel({
      data: to_json(json)[json.SheetNames[0]].map(function(a,b,c){
      if(b === 0){
        var values = c,
        max = 0;

        for(var i=0,len=values.length;i<len;i++){
          if(max < values[i].length) {
            max = values[i].length;
          }
        }
        var n = [];
        for(var i = 0; i < (max - a.length); i++){
          n.push('');
        }
        return remplaceSpace(a).concat(n);
      }
      
      return remplaceSpace(a)})
    });

    /* DO SOMETHING WITH workbook HERE */
  };
  if(rABS) reader.readAsBinaryString(f); else reader.readAsArrayBuffer(f);
}

function to_json(workbook) {
  var result = {};
  workbook.SheetNames.forEach(function(sheetName) {
    var roa = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {raw:false, header:1});
    if(roa.length > 0) result[sheetName] = roa;
  });
  return result;
}

$('upload').on('click',function(e){
  var data = $('#my').jexcel('getData');
  $.ajax({
      headers : {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'
      },
      url : api.post,
      type : 'POST',
      data : JSON.stringify({nombre:nombre,data:data}),
      success : function(response, textStatus, jqXhr) {
         
      },
      error : function(jqXHR, textStatus, errorThrown) {
        
      },
      complete : function() {
          //
      }
  });
})

document.getElementById('files').addEventListener('change', handleFile, false);

