function basename (path, suffix) {
    // Returns the filename component of the path  
    // 
    // version: 909.322
    // discuss at: http://phpjs.org/functions/basename
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Ash Searle (http://hexmen.com/blog/)
    // +   improved by: Lincoln Ramsay
    // +   improved by: djmix
    // *     example 1: basename('/www/site/home.htm', '.htm');
    // *     returns 1: 'home'
    var b = path.replace(/^.*[\/\\]/g, '');
    
    if (typeof(suffix) == 'string' && b.substr(b.length-suffix.length) == suffix) {
        b = b.substr(0, b.length-suffix.length);
    }
    
    return b;
}
 
function getscriptpath(scriptname) {
		// Check document for our script
		scriptobjects = document.getElementsByTagName('script');
		for (i=0; i< scriptobjects.length; i++) {
			if(basename(scriptobjects[i].src)==scriptname){
				// we found our script.. lets get the path
				return scriptobjects[i].src.substring(0, scriptobjects[i].src.lastIndexOf('/'));
			}
		}
		return "";
}

function include(filename)
{
	var head = document.getElementsByTagName('head')[0];
	
	script = document.createElement('script');
	script.src = getscriptpath("grommitinit.js") + "/" + filename;
	script.type = 'text/javascript';
	head.appendChild(script);
}

include('timezone.js');
include('widget.js');

function GrommitInit(bundle_id) {
    window.widget = new GrommitWidget(bundle_id, false);
    window.TimeZoneInfo = new TZ();
    window.widget.setSharePath();
    window.widget.setCloseBoxOffset();
}
