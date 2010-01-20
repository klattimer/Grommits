
function GrommitInfoButton(container, front, foreground, background, callback)
{
    this._container = container;
    this._front = front;
    // On init grommits won't have yet set the share path to the resource files
    // this means that these paths would be wrong, so instead we wait until show
    // is called on the info button, which is a result of the mouse entering the
    // widget... I think... 
    this._f = foreground;
    this._b = background;
    this._callback = callback;
    this._info_div = document.createElement("div");
    this._info_div.style.display = "none";
    this._info_div.style.width = "14px";
    this._info_div.style.height = "14px";
    
    this._info_bg = document.createElement("img");
    this._info_bg.style.position = "absolute";
    this._info_bg.style.width = "14px";
    this._info_bg.style.height = "14px";
    this._info_bg.style.border = "0px";
    this._info_bg.top = "0px";
    this._info_bg.left = "0px";
    this.setCircleOpacity(0.2);
    
    this._info_img = document.createElement("img");
    this._info_img.style.position = "absolute";
    this._info_img.style.width = "14px";
    this._info_img.style.height = "14px";
    this._info_img.style.border = "0px";
    this._info_img.top = "0px";
    this._info_img.left = "0px";
    
    this._info_div.onclick = this._callback;
    
    var _this = this;
    
    this._show = function (e) {
        if (_this._info_div.style.display == "block") { return; }
        _this._info_div.style.display = "block";
        _this.setStyle(_this._f,_this._b);
        // Start a fade-in timer
        // Add event listeners mouseover/mouseout
        e.preventDefault();
    }
    front.addEventListener("mouseover", this._show, false);
    //front.onmouseover = this._show;
    
    this._hide = function (e) {
        if (_this._info_div.style.display == "none") { return; }
        _this._info_div.style.display = "none";
        e.preventDefault();
    }
    //window.onmouseout = this._hide;
    window.addEventListener("mouseout", this._hide, false);

    //this._container.addEventListener("mouseover", this._show, true);
    this._info_div.appendChild(this._info_bg);
    this._info_div.appendChild(this._info_img);
    this._container.appendChild(this._info_div);
}

GrommitInfoButton.prototype.setStyle = function(f, b)
{
    this._info_img.src = window.widget.sharepath + "/images/" + f + "_i.png";
	this._info_bg.src =  window.widget.sharepath + "/images/" + b + "_rollie.png";
}

GrommitInfoButton.prototype.setCircleOpacity = function(opacity)
{
    this._info_bg.style.opacity = opacity;
}

GrommitInfoButton.prototype.remove = function()
{
    this._hide();
}

