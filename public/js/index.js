var $li = $("li");
var $nextPage = $("#next-page");
var $prevPage = $("#prev-page");

var fnObj = {
    articlePage: function (id) {
        return window.location.href = "/article/" + id;
    },
    changePage: function (pageNum, size) {
        return window.location.href = `/articles?pageNum=${pageNum}&size=${size}`;
    }
};

//Function to get URL parameters
var getUrlParameter = function (name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

let pageNum = parseInt(getUrlParameter("pageNum"));
let size;

var handleClick = function () {
    let id = $(this).attr("id");
    fnObj.articlePage(id);
};

var handleNextPage = function () {
    nextPage = pageNum + 1;
    size = 10;
    fnObj.changePage(nextPage, size);
};

var handlePrevPage = function () {
    prevPage = pageNum - 1;
    size = 10;
    fnObj.changePage(prevPage, size);
};

$li.on("click", handleClick);
$nextPage.on("click", handleNextPage);
$prevPage.on("click", handlePrevPage);