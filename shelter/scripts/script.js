function include(url) {
    var script = document.createElement('script');
    script.src = url;
    script.setAttribute('type', 'module');
    document.getElementsByTagName('body')[0].appendChild(script);
}

include("scripts/drawer.js");
include("scripts/popup.js");