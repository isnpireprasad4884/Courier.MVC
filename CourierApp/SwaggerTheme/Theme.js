var bootstrapPath = "/SwaggerTheme/bootstrap.min.css";
var bootstrapThemePath = "/SwaggerTheme/bootstrap-theme.min.css";
var swaggerThemePath = "/SwaggerTheme/OrangeTheme.css";
function showcontent(tabcotent)
{
            
    if (tabcotent == "apis")
    {
        if ($("#apis").is(":visible")) {
            return;
        }
        else {

            $("#modelstab").toggleClass("active");
            $("#apistab").toggleClass("active");
            $("#postfix").fadeOut();
            $("#apis").fadeIn();
        }
    }
    if (tabcotent == "postfix") {
        if ($("#postfix").is(":visible")) {
            return;
        }
        else {

            $("#modelstab").toggleClass("active");
            $("#apistab").toggleClass("active");
            $("#apis").fadeOut();
            $("#postfix").fadeIn();
            if(!$("section.models").hasClass("is-open") )
                $("section.models h4").click();
        }
    }
}
function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}
function switchtoold() {
    if (getCookie("swaggertheme") == "original") {
        switchtonew();
        return;
    }

    setCookie("swaggertheme", "original");
    window.location.reload();
}
function removeNewThemeElements() {
    $("#newthemecss").remove();
    $("#newthemejs").remove();
    $("#bootstraptheme").remove();
    $("#bootstrap").remove();
}
function switchtonew() {
    document.cookie = "swaggertheme=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.reload();
}
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

var prevselectedapi = null;
var prevContentIndex = 0;
var intervalHandle;
$(document).ready(function () {
    
    if (getCookie("swaggertheme") == "original") {
        return;
    }
    setTimeout(function () {
        $("body").append(
             ' <ul id="primarytabs" class="nav nav-tabs">         <li id="apistab" class="tabitem active"><a href="#" onclick="showcontent(\'apis\')">API</a></li>         <li id="modelstab" class="tabitem"><a href="#" onclick="showcontent(\'postfix\')">Models</a></li>     </ul>' +
            
            '<div class="row" id="apis">' +
       '<div id="sidebargroup" style="height:auto; border-right:5px solid orange; padding-left: 50px;" class="col-md-4">' +

       '</div>' +
       '<div class="col-md-8" id="maincontent">' +
       '</div>' +
   '</div>' +
   '<div class="row" id="postfix" style="display:none;">' +
       '<div class="col-md-12" id="modelscontainer">' +

       '</div>' +
   '</div>');
        if (typeof bootstrapPath=='undefined' || bootstrapPath == "")
            alert("Please set the 'bootstrapPath' variable before the call to AvaTheme.js .");
        if (typeof bootstrapThemePath == 'undefined' || bootstrapThemePath == "")
            alert("Please set the 'bootstrapThemePath' variable before the call to AvaTheme.js .");
        if (typeof swaggerThemePath == 'undefined' || swaggerThemePath == "")
            alert("Please set the 'swaggerThemePath' variable before the call to AvaTheme.js .");

        $("body").append('<link href=' + bootstrapPath + ' rel="stylesheet" id="bootstrap" />');
        $("body").append('<link href=' + bootstrapThemePath + ' rel="stylesheet" id="bootstraptheme" />');
        $("body").append('<link href=' + swaggerThemePath + ' rel="stylesheet" id="newthemecss" />');

    }, 500);
   
    var selectedAPI;
    var stopPropogation = false;
    $(document).on("click", "h4.opblock-tag", function () {
        if (!stopPropogation) {
            stopPropogation = true;
            selectedAPI = $(this);
        }
      
        $(this).toggleClass("selectedapi");
            $.each($(".selectedapi"), function (i, o) {
                if (!$(o).is(selectedAPI))
                    $(o).click();
            });
      
        
            if (selectedAPI.is($(this)))
        {
                stopPropogation = false;
                setResponseNavTabs();
                $('html, body').animate({
                    scrollTop: $("#themeswitcher").offset().top
                }, 500);
        }

    });
   
    setTimeout(function () {
       

        $("h2.title").html($("h2.title").html() + "<span style='color:gray;font-size:12px' class='baseurl'>" + $("pre.base-url").html() + "</span>");
        
    }, 1000);
    $(document).on("click", ".tablinks[data-name='model']", function () {

        $(this).parents(".response-col_description").find(".model-title__text").click();
    });
    $(document).on("click", ".opblock-summary", function () {
        setTimeout(function () {
            setResponseNavTabs();
          
            $(".try-out__btn").addClass("btn-info");
        }, 1000);
    });

    intervalHandle = setInterval(function () {
        if ($(".opblock-tag") != null && ($(".opblock-tag").length > 1)) {
            clearInterval(intervalHandle);
            redotemplate();

        }
    }, 1000);
    
});
function setResponseNavTabs(){
    $(".tab").addClass("nav");
    $(".tab").addClass("nav-tabs");
    $(".nav-tabs").removeClass("tab");
    $(".tablinks[data-name='example']").html("Example");
}
function redotemplate() {
    
    var sidebar = $("#sidebargroup");
    $.each($(".opblock-tag"), function (i, o) {
        sidebar.append($(o));
    });
    var maincontent = $("#maincontent");
    maincontent.append($(".opblock-tag-section").parent().parent().parent().parent());
    $("#modelscontainer").append($(".models").parent().parent());

    $($(".opblock-tag")[0]).click();
    
}

$(document).ready(function () {
    
    $(".topbar.wrapper").append($("#themeswitcher"));
    if (getCookie("swaggertheme") == "original") {

        removeNewThemeElements();
    }
    
});