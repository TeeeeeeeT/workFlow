export default {

}

export function getUrlVars(strUrl) {
    var vars = {}, hash;
    var url = strUrl || window.location.href;

    var hashes = [];
    if (url.indexOf('?') > -1) {
        hashes = url.slice(url.indexOf('?') + 1).split('&');
    }

    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars[hash[0]] = hash[1];
    }
    return vars;
}