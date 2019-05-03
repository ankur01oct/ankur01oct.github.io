//$.getJSON("mydata.json", function(data) {
//    var html = '';
//    $.each(data, function(key, value){
//        html += '<div class="dcell">';
//        html += '<img src="images/'+value.product+'.png"/>';
//        html += '<label for="'+value.product+'">'+value.name+':</label>';
//        html += '<input type="text" id="'+value.product+'" name="'+value.product+'" value="0" stock="'+value.stock+'" price="'+value.price+'" required>';
//        html += '</div>';
//    });
//$('#yourContainerId').html(html);
//});
var selectedLang = getUrlVars()["selectedlang"];
$( document ).ready(function() {
    var jsonUrl;
    if(selectedLang){
        jsonUrl = "./resources/res/faq-" + selectedLang.trim() + ".json"
    }else{
        jsonUrl="./resources/res/faq-en.json"
    }

    console.log(jsonUrl);
    $.getJSON(jsonUrl, function(data) {
        var html ='';
        html += '<div class="help-header">'
            +'<h4>'+data.constants.help+'</h4>'
            +'<p>'+data.constants.faqMsg+'</p>'
            +'</div>'
            +'<div class="help-header-send-email" hidden="true">'
            +'<h4>'+data.constants.reportIssue+'</h4>'
            +'<p>'+data.constants.explainMsg+'</p>'
            +'</div>'
            +'<div class="info-msg">'
            +'<p>'+data.constants.resolveMsg+'</p>'
            +'</div>'
            +'<div class="info-msg-send-email" hidden="true">'
            + '<p>'+data.constants.tellMoreMsg+'</p>'
            + '</div>'
        $('#header').replaceWith(html);
        html='';
        $.each(data.faqs, function(key, value){
            console.log('value  : ', value, 'key  ', key)
            html += '<div class="panel panel-default">'
                +'<a data-toggle="collapse" data-parent="#accordion" href="#collapse'+key+'">'
                +'<div class="panel-heading" >'
                +'<div class="panel-title">'
                +value.topic+'<img src="./resources/images/Arrow.png" class="btn-arrow">'
                +'</div>'
                +'</div>'
                +'</a>'
                +'<div id="collapse'+key+'" class="panel-collapse collapse">'
                +'<div class="panel-body">'
                +'<p>'+value.description+'</p>'
                +'</div>'
                +'<div class="panel-interact">'
                +'<p>'+data.constants.helpMsg+'</p>'
                +'<button type="button" class="btn" id = "btn-no">'+data.constants.noMsg+'</button>'
                +'<button type="button" class="btn" style="color: green" id = "btn-yes">'+data.constants.yesMsg+'</button>'
                +'<p class="yes-clicked" hidden="true">'+data.constants.thanksMsg+'</p>'
                +'</div>'
                +'<div class="panel-info" hidden="true">'
                +'<h6>'+data.constants.sorryMsg+'</h6>'
                +'<p>'+data.constants.knowMoreMsg+'</p>'
                +'<form action="#" id="know-more-form"> '
                +'<textarea type="text" name="moreInfo" placeholder="'+data.constants.typeHere+'" class="input-text"  maxlength="1000"></textarea>'
                +'<input type="submit" value="'+data.constants.submitButton+'" class="submit-button">'
                +'</form>'
                +'<p class="no-clicked" hidden="true">'+data.constants.thanksMsg+'</p>'
                +'</div>'
                +'</div>'
                +'</div>'
        });
        $('#accordion').html(html);
        html='';

        html += '<div class="send-email">'
            +'<button class="report-button"><img src="./resources/images/Report.png"></span> '+data.constants.reportIssueMsg+'</button>'
            +'</div>'
            +'<div class = "send-email-form" hidden="true">'
            +'<form action="#" id ="send-email-form"> '
            +'<textarea type="text" name="moreInfo" placeholder="'+data.constants.typeHere+'" class="input-text-form" maxlength="1000"></textarea>'
                +'<p class = "send-email-info">'+data.constants.triggerEmailMsg+'</p>'
                +'<input type="submit" value="'+data.constants.initiateEmailButton+'" class="submit-button">'
                +'</form>'
                +'</div>'
        $('#send-email').replaceWith(html);
    })
});

function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}