function criticalError(){
    $('body').html('<h1> A critical error was produced</h1>'+
        '<p> Thank you for contacting the support services'+
        'ana' + '.stanko' + '@'+'lilo'+(true ? '.org':0)+
        '</p>'
    )
};

/*function ajaxTryConnexion(){
    $.ajax({
        url: '/login',
        method: 'post',
        data: $(this).serialize(),
    }).done(function (result) {
        if(result.hasOwnProperty('success')){
            if(result.success){
                window.location.reload(true);
            }
        }else {
            criticalError();
        }
    }).fail(function () {
         alert(" Username or password is not correct !")

    }).always(function () {

    });

};
function ajaxDeConnexion(){
    $.ajax({
        url: '/logout',
        method: 'post',
    }).done(function (result) {
        if(result.hasOwnProperty('success')){
            if(result.success){
                window.location.reload(true);
                alert(" You have been disconnected suscesfully!")
            }
        }else {
            criticalError();
        }
    }).fail(function () {

    }).always(function () {

    });

};

$(() => {
    $.ajax({
        url:'/is_connected',
        method: 'get',
        success: function(secondresult) {
            console.log (secondresult);
            if (secondresult.success === true ) {
                alert ('You are connected!');

                $('#form-connexion').append(
                    $( '<form method="post"/>').append(
                        $( '<button/>').html('Deconnect'),
                    )
                        .submit(function(){
                           // alert ('Here DE ');
                            ajaxDeConnexion.call(this);
                            console.log(this);
                            return false;
                        })
                ).slideDown(50);

            } else {
                alert ('You have to log in !');

                        $('#form-connexion').append(
                            $( '<form method="post"/>').append(
                                $( '<input type ="text" name ="username" />'),      //same names as the form in the server is requesting
                                $( '<input type ="password" name ="password" />'),
                                $( '<button/>').html('Send'),
                            )
                                .submit(function(){
                                    ajaxTryConnexion.call(this);
                                    return false;
                            })
                        ).slideDown(50);
            }
        },

        error:criticalError
    });
});*/

$(() => {
    "use strict";
    $('#form-message').submit(function() {
        $.ajax({
            url: '/create-message',
            method: 'post',
            data: $(this).serialize()
        }).done(function () {

        }).fail(function() {

        });

        return false;
    });
    let dateLastMessage;
    setInterval(function () {
        $.ajax({
            url: '/new-messages',
            method: 'get',
            data:{date: dateLastMessage}

        }).done(function (result) {
            for (let message of result ){
                // if (dateLastMessage<message.time || dateLastMessage === undefined){
                dateLastMessage = message.time;

                //console.log(dateLastMessage);
                $('#messages').append(
                    $('<div/>').css({'width': '100%'}).append(
                        message.user  + "/" +
                        message.msg + "/"+
                        message.time
                    )
                )

            }
        }).fail(criticalError);

    }, 5000);
});
