
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
    alert('');
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

var rABS = false; // true: readAsBinaryString ; false: readAsArrayBuffer
function handleFile(e) {
  var files = e.target.files, f = files[0];
  var reader = new FileReader();
  reader.onload = function(e) {
    var data = e.target.result;
    if(!rABS) data = new Uint8Array(data);
    var workbook = XLSX.read(data, {type: rABS ? 'binary' : 'array'});
    
    /* DO SOMETHING WITH workbook HERE */
  };
  if(rABS) reader.readAsBinaryString(f); else reader.readAsArrayBuffer(f);
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
