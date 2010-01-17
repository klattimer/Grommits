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
    this._init(identifier, wmlayers);
}

GrommitWidget.prototype._init = function (identifier, wmlayers) {
    // Properties and elements
    this.identifier = identifier;
    this._wmlayers = wmlayers;
    this._close = null;
    this._pin = null;
    this._ontop = null;
    
    // Callbacks
    this.ondragstart = null;
    this.ondragend = null;
    this.onhide = null;
    this.onremove = null;
    this.onshow = null;
    
    document.body.onMouseOver = this.showControls;
    document.body.onMouseOut = this.hideControls;
    document.body.onKeyPress = this.showControls;
    document.body.onKeyRelease = this.hideControls;
}

GrommitWidget.prototype.showControls = function() {
    // Check to see if the alt key is down
    // Make sure the mouse is over
    // Show controls
    if (!this._ontop) { return; }
    this._ontop.style.display = "block";
}

GrommitWidget.prototype.hideControls: function() {
    this._ontop.style.display = "none";
}

GrommitWidget.prototype.openApplication: function(bundleId) {
    prompt("GROMMIT:openApplication", bundleId);
}

GrommitWidget.prototype.openURL = function(url) {
    prompt("GROMMIT:openURL", url);
}

GrommitWidget.prototype.preferenceForKey = function(key) {
    // gpointer bug affects this!
    return prompt("GROMMIT:preferenceForKey", key);
}

GrommitWidget.prototype.prepareForTransition = function() {
    prompt("GROMMIT:prepareForTransition");
}

GrommitWidget.prototype.performTransition = function() {
    prompt("GROMMIT:performTransition");
}

GrommitWidget.prototype.setCloseBoxOffset = function(x,y) {
        if (!this._close) {
            this._close = document.createElement('img');
            this._close.src = Grommits.DashboardResources + "/active-close-button.png";
            this._close.id = "GrommitsClose";
            this._close.onClick = this.closeWidget;
            this._close.style.display = "none";
            document.body.appendChild(this._close);
        }
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

