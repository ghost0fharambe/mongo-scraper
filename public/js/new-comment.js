var $userName = $("#userName").val().trim();
var $comment = $("#new-comment").val().trim();
var $id = $("h1").attr("id");
var $submitBtn = $("#comment-submit");

API = {
    submitComment: function (id, data) {
        return $.ajax({
            headers: {
                "Content-Type": "application/json"
            },
            type: "POST",
            url: "/api/comment/" + id,
            data: JSON.stringify(data)
        });
    }
};

var handleSubmit = function (event) {
    event.preventDefault();

    var data = {
        userName: $("#userName").val().trim(),
        body: $("#new-comment").val().trim()
    };
    console.log(data);

    API.submitComment($id, data).then(function () {
        console.log(data);
        //location.reload();
    });
};

$submitBtn.on("click", handleSubmit);