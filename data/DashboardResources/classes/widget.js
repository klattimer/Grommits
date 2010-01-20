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
    this.sharepath = "NOT SET"
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

GrommitWidget.prototype.hideControls = function() {
    this._ontop.style.display = "none";
}

GrommitWidget.prototype.openApplication = function(bundle_id) {
    prompt("GROMMIT:openApplication", bundle_id);
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

GrommitWidget.prototype.setSharePath = function(path) {
    if (path) {
        this.sharepath = path;
    } else {
        prompt("GROMMIT:setSharePath");
    }
}

var tz_lookup = new Array();
tz_lookup['Pacific/Pago_Pago'] = -720;
tz_lookup['Pacific/Honolulu'] = -660;
tz_lookup['America/Adak'] = -600;
tz_lookup['America/Anchorage'] = -540;
tz_lookup['America/Los_Angeles'] = -480;
tz_lookup['America/Phoenix'] = -480;
tz_lookup['US/Pacific'] = -480;
tz_lookup['America/Costa_Rica'] = -420;
tz_lookup['America/Denver'] = -420;
tz_lookup['America/El_Salvador'] = -420;
tz_lookup['America/Guatemala'] = -420;
tz_lookup['America/Managua'] = -420;
tz_lookup['Canada/Mountain'] = -420;
tz_lookup['Canada/Saskatchewan'] = -420;
tz_lookup['US/Mountain'] = -420;
tz_lookup['America/Bogota'] = -360;
tz_lookup['America/Chicago'] = -360;
tz_lookup['America/Guayaquil'] = -360;
tz_lookup['America/Indianapolis'] = -360;
tz_lookup['America/Lima'] = -360;
tz_lookup['America/Mexico_City'] = -360;
tz_lookup['America/Panama'] = -360;
tz_lookup['America/Port-au-Prince'] = -360;
tz_lookup['US/Central'] = -360;
tz_lookup['America/Asuncion'] = -300;
tz_lookup['America/Caracas'] = -300;
tz_lookup['America/Detroit'] = -300;
tz_lookup['America/Guyana'] = -300;
tz_lookup['America/Havana'] = -300;
tz_lookup['America/La_Paz'] = -300;
tz_lookup['America/Montreal'] = -300;
tz_lookup['America/New_York'] = -300;
tz_lookup['America/Puerto_Rico'] = -300;
tz_lookup['America/Santiago'] = -300;
tz_lookup['America/Santo_Domingo'] = -300;
tz_lookup['Canada/Eastern'] = -300;
tz_lookup['US/Eastern'] = -300;
tz_lookup['America/Buenos_Aires'] = -240;
tz_lookup['America/Cayenne'] = -240;
tz_lookup['America/Montevideo'] = -240;
tz_lookup['America/Paramaribo'] = -240;
tz_lookup['America/Recife'] = -240;
tz_lookup['America/Sao_Paulo'] = -240;
tz_lookup['Brazil/East'] = -240;
tz_lookup['Brazil/East'] = -240;
tz_lookup['Canada/Atlantic'] = -240;
tz_lookup['America/Godthab'] = -180;
tz_lookup['Atlantic/South_Georgia'] = -180;
tz_lookup['Africa/Accra'] = -60;
tz_lookup['Africa/Bamako'] = -60;
tz_lookup['Africa/Casablanca'] = -60;
tz_lookup['Africa/Conakry'] = -60;
tz_lookup['Africa/Dakar'] = -60;
tz_lookup['Africa/Freetown'] = -60;
tz_lookup['Africa/Monrovia'] = -60;
tz_lookup['Africa/Nouakchott'] = -60;
tz_lookup['Africa/Ouagadougou'] = -60;
tz_lookup['Atlantic/Azores'] = -60;
tz_lookup['Atlantic/Reykjavik'] = -60;
tz_lookup['Africa/Algiers'] = 0;
tz_lookup['Africa/Bangui'] = 0;
tz_lookup['Africa/Douala'] = 0;
tz_lookup['Africa/Kinshasa'] = 0;
tz_lookup['Africa/Lagos'] = 0;
tz_lookup['Africa/Luanda'] = 0;
tz_lookup['Africa/Ndjamena'] = 0;
tz_lookup['Africa/Tunis'] = 0;
tz_lookup['Europe/Dublin'] = 0;
tz_lookup['Europe/Lisbon'] = 0;
tz_lookup['Europe/London'] = 0;
tz_lookup['Africa/Harare'] = 60;
tz_lookup['Africa/Johannesburg'] = 60;
tz_lookup['Africa/Lusaka'] = 60;
tz_lookup['Africa/Maputo'] = 60;
tz_lookup['Africa/Tripoli'] = 60;
tz_lookup['Europe/Amsterdam'] = 60;
tz_lookup['Europe/Berlin'] = 60;
tz_lookup['Europe/Brussels'] = 60;
tz_lookup['Europe/Budapest'] = 60;
tz_lookup['Europe/Copenhagen'] = 60;
tz_lookup['Europe/Ljubljana'] = 60;
tz_lookup['Europe/Madrid'] = 60;
tz_lookup['Europe/Oslo'] = 60;
tz_lookup['Europe/Paris'] = 60;
tz_lookup['Europe/Prague'] = 60;
tz_lookup['Europe/Rome'] = 60;
tz_lookup['Europe/Stockholm'] = 60;
tz_lookup['Europe/Vienna'] = 60;
tz_lookup['Europe/Warsaw'] = 60;
tz_lookup['Europe/Zagreb'] = 60;
tz_lookup['Europe/Zurich'] = 60;
tz_lookup['Africa/Addis_Ababa'] = 120;
tz_lookup['Africa/Asmera'] = 120;
tz_lookup['Africa/Cairo'] = 120;
tz_lookup['Africa/Dar_es_Salaam'] = 120;
tz_lookup['Africa/Djibouti'] = 120;
tz_lookup['Africa/Kampala'] = 120;
tz_lookup['Africa/Khartoum'] = 120;
tz_lookup['Africa/Mogadishu'] = 120;
tz_lookup['Africa/Nairobi'] = 120;
tz_lookup['Asia/Istanbul'] = 120;
tz_lookup['Europe/Athens'] = 120;
tz_lookup['Europe/Belgrade'] = 120;
tz_lookup['Europe/Bucharest'] = 120;
tz_lookup['Europe/Helsinki'] = 120;
tz_lookup['Europe/Kiev'] = 120;
tz_lookup['Europe/Sofia'] = 120;
tz_lookup['Europe/Moscow'] = 180;
tz_lookup['Pacific/Guam'] = 540;
tz_lookup['Pacific/Noumea'] = 600;
tz_lookup['Pacific/Auckland'] = 660;

function TZ() {
    this._default_continent = "North America";
    this._default_city = "Cupertino";
}

TZ.prototype.getTimezoneOffsetForTimezoneName = function(timezone) {
    return tz_lookup[timezone]+60;
}

TZ.prototype.currentTimeForTimeZone = function(timezone) {
    var d = new Date();
    var time = d.getTime();
    var offset = tz_lookup[timezone];
    offset = offset * 60 * 1000;
    var dc = new Date(time+offset);
    enc_time = (dc.getHours() * 10000) + (dc.getMinutes() * 100) + dc.getSeconds();
    return enc_time;
}

TZ.prototype.getDefaultCityName = function() {
    return this._default_city;
}

TZ.prototype.getDefaultContinentName = function() {
    return this._default_continent;
}
