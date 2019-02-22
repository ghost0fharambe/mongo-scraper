var $li = $("li");

var fnObj = {
    articlePage: function (id) {
        return window.location.href = "/article/" + id;
    }
};

var handleClick = function(){
    let id = $(this).attr("id");
    fnObj.articlePage(id);
};

$li.on("click", handleClick);