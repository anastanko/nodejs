/* 28/10/19
$(document).ready(function() {
  $('.click-me').click(function () {
    console.log("debut");
    $(this).fadeOut().fadeIn().fadeOut().fadeIn().fadeOut().fadeIn().fadeOut().fadeIn().fadeOut().fadeIn().fadeOut().fadeIn().fadeOut().fadeIn().fadeOut().fadeIn().fadeOut().fadeIn();
    console.log("fin");
  });
});
*/


/* 28/10/19

$(() => {
  $('.click-me').click(function() {
   $('<div> TEST </div>').appendTo($(this));

   $(this).append (
     $('<form> </form>'),
     $('<div> TEST </div>').after ($('<h1> BBB </h1>')),
     $('<div> FOR </div>'),
     $('<div> WEB </div>'),
   );
  });
});*/


 //---------------------------------------------------------------------------------------------------
/*
$(() => {
  $('.click-me').click(function() {
    let mon_form = $('<form> </form>').css('background-color','red');

    $(this).after (
      mon_form.append(

        $('<button />').append('Click me')
      )

    );
  });
});
*/

/*

$(() => {
  $('.click-me').click(function() {

*/

//---------------------------------------------------------------------------------------------
/*$(() => {

  function buildDamier(){
    let class_white ='white';
    let class_black ='black';
    let ma_table = $('<table />');
    let height = 8;
    let width = 8;

    for (let y = 0; y < height; y++) {
      let mon_tr = $('<div />').addClass('row');
      for (let x=0; x< width; x++) {
        let mon_td = $('<div />');
        mon_td.addClass((y+x) % 2 ? class_black : class_white);
        mon_td.append('&nbsp;');
        mon_td.hover(function () {
          //mouse in
          $(this).attr('old_class', $(this).hasClass('white'));
        }, function () {
          //mouse out
          let white = $(this).attr('old_class');
        });
        mon_tr.append(mon_td);
      }
      ma_table.append(mon_tr);
    }
    return ma_table;
  };

  $('.click-me').click(function() {
    let checkerboard = buildDamier(8,8);
    $(this).after(checkerboard);
  });
});*/

//-----------------------------------------------------------------------------------------
/*
let class_white ='white';
let class_black ='black';
let ma_table = $('<table />');
class checkerboard {
  constructor(height, width){
    if(typeof (width) != 'number'){
      throw new Error('number expected');
    }
    if(typeof (height) != 'number'){
      throw new Error('number expected');
    }
    this.height = height;
    this.width = width;

    for (let y = 0; y < height; y++) {
      let mon_tr = $('<div />').addClass('row');
      for (let x=0; x< width; x++) {
        let mon_td = $('<div />');
        mon_td.addClass((y+x) % 2 ? class_black : class_white);
        mon_td.append('&nbsp;');
        mon_td.hover(function () {
          //mouse in
          $(this).attr('old_class', $(this).hasClass('white'));
        }, function () {
          //mouse out
          let white = $(this).attr('old_class');
        });
        mon_tr.append(mon_td);
      }
      ma_table.append(mon_tr);
    }
    this.checkerbord = ma_table;
  };
};

$(() => {
  $('.click-me').click(function() {
    let chess = new checkerboard(8,8);
    $(this).after(chess.checkerboard);
  });
});*/
//-----------------------------------------------------------------------------------

//-------------------------------------------------------------------------------------------------
function criticalError(){
  $('body').html('<h1> A critical error was produced</h1>'+
    '<p> Thank you for contacting the support services'+
    'ana' + '.stanko' + '@'+'lilo'+(true ? '.org':0)+
    '</p>'
  )
};
$(() => {
  $.ajax({
    url:'https://sokoban.doonoo.fr/',
    method: 'get',
    success: function(result){
      for(let key in result){
        let level = result [key];
        $('#levels').append(
            $('<hr />'),
            $('<h1 />').html(level.title),
            $('<p />').html(
              '<b>Description &nbsp;</b>' + level.description+ '.'+
              '<b>&copy;</b>&nbsp;' + level.copyright+
              '<b>Size</b>&nbsp;'+ level.max_height + level.max_width + '<br> />' +
              '<b> Total </b>&nbsp;' +level.total,
            ),



          $('<button />').html('Click me').click(function () {
            $.ajax({
              url: 'https://sokoban.doonoo.fr/levels/' + key,
              success: function(secondresult){
                for(let secondkey in secondresult.levels){
                  let secondlevel = secondresult.levels [secondkey];

                  //console.log (secondlevel);
                  //console.log (secondkey);
                     for (let thirdkey in secondlevel.cells){
                       //console.log (secondlevel.cells[thirdkey])
                       let thirdlevel = secondlevel.cells[thirdkey];
                       $('#secondlevel').append(
                         $('<p />').html(secondlevel.cells[thirdkey]),)

                     }



                }
              }
            });
          })











        )
      }
    },
    error:criticalError
  });
});




