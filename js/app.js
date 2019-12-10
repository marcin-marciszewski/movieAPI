document.getElementById('search').onkeypress = function (e) {
    if (!e) e = window.event;
    var keyCode = e.keyCode || e.which;
    if (keyCode == '13') {
        sessionStorage.setItem("search", this.value);
        window.location.href = "results.html"
        return false;
    }
}



const saveData = _ => {
    let input = document.getElementById("search");
    sessionStorage.setItem("search", input.value);
    window.location.href = "results.html"

};