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

function GrommitWidget(identifier, wmlayers)
{
    this.identifier = null;
    this._wmlayers = wmlayers;
    this._close = null;
    this._pin = null;
    this._ontop = null;
    this._over = false;
    this._alt_key = false;
    this.sharepath = "NOT SET"
    this.return_values = new Array();

    var _this = this;

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
            if (_this._close.style.display == "none") { return; }
            _this._close.style.display = "none";
        }
    }
    window.addEventListener("keyup", this._key_up, false);
    
    this._init(identifier, wmlayers);
}

GrommitWidget.prototype._init = function (identifier, wmlayers) {
    // Properties and elements
    this.identifier = identifier;
    this._wmlayers = wmlayers;

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
    }
    //alert("Setting xy " + x + " " + y);
    size = 22;
    if (!this._close) {
        this._close = document.createElement('img');
        this._close.src = this.sharepath + "/images/active-close-button.png";
        this._close.id = "GrommitsClose";
        this._close.style.position = "absolute";
        this._close.style.display = "none";
        this._close.style.zIndex = 50;
        this._close.onclick = this.closeWidget;
        
        document.body.appendChild(this._close);
    }
    x = (x - (size/2))
    y = (y - (size/2)) 
    this._close.style.left = x + 'px';
    this._close.style.top = y + 'px';
    
    if (this._wmlayers) {
        if (!this._pin) {
            this._pin = document.createElement('img');
            this._pin.src = Grommits.DashboardResources + "/pin.png";
            this._pin.id = "GrommitsPin";
            this._pin.onClick = this.setPinned;
            this._pin.style.display = "none";
            document.body.appendChild(this._pin);
        }
        px = x + 24;
        this._pin.style.left = px + 'px';
        this._pin.style.top = y + 'px';
        
        if (!this._ontop) {
            this._ontop = document.createElement('img');
            this._ontop.src = Grommits.DashboardResources + "/ontop.png";
            this._ontop.id = "GrommitsOntop";
            this._ontop.onClick = this.setOnTop;
            this._ontop.style.display = "none";
            document.body.appendChild(this._ontop);
        }
        tx = x + 43;
        this._ontop.style.left = tx + 'px';
        this._ontop.style.top = y + 'px';
    }
    
    window.addEventListener("mouseout", this._hide_close, true);
    document.addEventListener("mouseover", this._show_close, false);
},
    
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

window.widget = new GrommitWidget('gov.nasa.widget.IOTD', false);
