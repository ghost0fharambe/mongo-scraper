var $li = $("li");
var $nextPage = $("#next-page");

let pageNum;
let size;

var fnObj = {
    articlePage: function (id) {
        return window.location.href = "/article/" + id;
    },
    nextPage: function(pageNum, size) {
        return window.location.href = `/articles?pageNum=${pageNum}&size=${size}`;
    }
};

var handleClick = function(){
    let id = $(this).attr("id");
    fnObj.articlePage(id);
};

var handleNextPage = function() {
    pageNum = 2;
    size = 10;
    fnObj.nextPage(pageNum, size);
    pageNum++;
}

$li.on("click", handleClick);
$nextPage.on("click", handleNextPage);