function include(url) {
    var script = document.createElement('script');
    script.src = url;
    script.setAttribute('type', 'module');
    document.getElementsByTagName('body')[0].appendChild(script);
}
document.addEventListener("DOMContentLoaded", function() {
    include("scripts/drawer.js");
    include("scripts/pagination.js");
    setTimeout(() => include("scripts/popup.js"), 1000)
})
