$(() => {
  $ajax({
    url:'https://sokoban.doonoo.fr/',
    method: 'get',
    success: function(){},
    error: function(){
      $(body).html('<h1> A ritic error was produced</h1>'+
        '<p> Thank you for contacting the support services'+
      'ana' + '.stanko' + '@'+'lilo'+(true ? '.org':0)+
        '</p>'
    )
    }
  });
});
