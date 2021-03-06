/* Grommits Dashboard widget class, injected into dashboard widgets
 * so it can talk up and down with the DashboarWidget python class
 * and do some system side stuff easily.
 *
 * Author: Karl Lattimer <karl@qdh.org.uk>
 * License: GPLv2
 * 
 * The license file should be included in the source distribution or
 * at least near by.
 */

function GrommitWidget(identifier, junk)
{
    this.identifier = null;
    this._close = null;
    this._over = false;
    this._alt_key = false;
    this.sharepath = "NOT SET"
    this.return_values = new Array();

    this._init(identifier, junk);

    var _this = this;

    this._show_close = function (e) {
        if (e && (e.relatedTarget != document.body)) {
            return;
        }
        if (_this._close.style.display == "block") { return; }
        _this._close.style.display = "block";
    }

    this._hide_close = function (e) {
        if (e && (e.relatedTarget != document.body)) {
            return;
        }
        if (_this._close.style.display == "none") { return; }
        _this._close.style.display = "none";
    }


/*  UPSTREAM: Webkit bug, click events won't be sent when a key is held down :/
    maybe this only applies to the key I'm using, but either way it fails

    this._show_close = function (e) {
        if (e && (e.relatedTarget != document.body)) {
            return;
        }
        _this._over = true;
        if (!_this._alt_key) { return; }
        if (_this._close.style.display == "block") { return; }
        _this._close.style.display = "block";
    }
    
    this._hide_close = function (e) {
        if (e && (e.relatedTarget != document.body)) {
            return;
        }
        _this._over = false;
        _this.alt_key = false;
        if (_this._close.style.display == "none") { return; }
        _this._close.style.display = "none";
    }
    
    this._key_down = function(e) {
        if (e.keyCode == 0) {
            _this.alt_key = true;
            if (!_this._over) { return; }
            if (_this._close.style.display == "block") { return; }
            _this._close.style.display = "block";
        }
    }
    window.addEventListener("keydown", this._key_down, false);
    
    this._key_up = function(e) {
        if (e.keyCode == 0) {
            _this.alt_key = false;
            if (!_this._close) {
                _this._close = document.getElementById("GrommitsClose");
            }
            if (_this._close.style.display == "none") { return; }
            _this._close.style.display = "none";
        }
    }
    window.addEventListener("keyup", this._key_up, false);
    */

}

GrommitWidget.prototype._init = function (identifier, junk) {
    // Properties and elements
    this.identifier = identifier;

    // Callbacks
    this.ondragstart = null;
    this.ondragend = null;
    this.onhide = null;
    this.onremove = null;
    this.onshow = null;
    this.sharepath = "";
}

GrommitWidget.prototype.showControls = function() {
    this._show_close();
}

GrommitWidget.prototype.hideControls = function() {
    this._hide_close();
}

GrommitWidget.prototype.openApplication = function(bundle_id) {
    prompt("GROMMIT:openApplication", bundle_id);
}

GrommitWidget.prototype.openURL = function(url) {
    prompt("GROMMIT:openURL", url);
}

// FIXME gpointer bug affects this! We work around it with an array
GrommitWidget.prototype.preferenceForKey = function(key) {
    this.return_values['preferenceForKey'] = '';
    prompt("GROMMIT:preferenceForKey", key);
    return this.return_values['preferenceForKey'];
}

GrommitWidget.prototype.prepareForTransition = function() {
    prompt("GROMMIT:prepareForTransition");
}

GrommitWidget.prototype.performTransition = function() {
    prompt("GROMMIT:performTransition");
}

GrommitWidget.prototype.setCloseBoxOffset = function(x,y) {
    if ((!x) && (!y)) {
        prompt("GROMMIT:setCloseBoxOffset");
        return;
    } else if (!y) {
        return;
    }
    var size = 22;
    var _this = this;

    x = (x - (size/2));
    y = (y - (size/2));

    if (!this._close) {
        close = document.createElement('div');
        close.id = "GrommitsClose";
        close.onclick = _this.closeWidget;
        close.style.background = "url(" + this.sharepath + "/images/active-close-button.png)";
        close.style.display = "none";
        close.style.width = size + "px";
        close.style.height = size + "px";
        close.style.left = x + 'px';
        close.style.position = "absolute";
        close.style.top = y + 'px';
        close.style.zIndex = 32767;
        document.body.appendChild(close);
        this._close = close;
    } else {
        this._close.style.zIndex = 32767;
        this._close.style.left = x + 'px';
        this._close.style.top = y + 'px';
    }
    
    window.addEventListener("mouseout", this._hide_close, true);
    document.addEventListener("mouseover", this._show_close, false);
}
    
GrommitWidget.prototype.closeWidget = function() {
    prompt("GROMMIT:closeWidget");
}
    
GrommitWidget.prototype.setOnTop = function() {
    prompt("GROMMIT:setOnTop");
}

GrommitWidget.prototype.setPinned = function() {
    prompt("GROMMIT:setPinned");
}

GrommitWidget.prototype.setPreferenceForKey = function(preference,key) {
    prompt("GROMMIT:setPinned", "(\""+preference+"\", \""+key+"\")");
}

GrommitWidget.prototype.system = function(command,endHandler) {
    prompt("GROMMIT:system", "(\""+command+"\", \""+endHandler+"\")");
}

GrommitWidget.prototype.setSharePath = function(path) {
    if (path) {
        this.sharepath = path;
    } else {
        prompt("GROMMIT:setSharePath");
    }
}