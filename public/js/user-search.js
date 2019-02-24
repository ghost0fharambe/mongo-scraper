var $searchTerm = $("#search-term");
var $submitBtn = $("#submit");

var API = {
    scrapeSO: function (term) {
        return $.ajax({
            url: `/api/scrape/${term}`,
            method: "GET"
        });
    },
    pageReturn: function(term) {
        return window.location.href = `/search/${term}`;
    }
};

var handleSubmit = function (event) {
    event.preventDefault();

    var rawTerm = $searchTerm.val().trim();
    var term = rawTerm.toLowerCase();

    API.scrapeSO(term).then(function(){
        API.pageReturn(term);
    });
};

$submitBtn.on("click", handleSubmit);