
//------------------- GrommitButton constructor

function GrommitButton(button_div, label, height,
					    img_left, img_left_clicked, img_left_width,
					    img_middle, img_middle_clicked, 
					    img_right, img_right_clicked, img_right_width,
					    callback) 
{
    if (button_div == null)
		return;
    this._widget = null;
    this._label = null;
    this._init(button_div, label, height,
			   img_left, img_left_clicked, img_left_width,
			   img_middle, img_middle_clicked, 
			   img_right, img_right_clicked, img_right_width, callback);
}

//------------------- GrommitButton class methods
GrommitButton.prototype._init = function (button_div, label, height,
					                       img_left_normal, img_left_clicked, img_left_width,
					                       img_middle_normal, img_middle_clicked, 
					                       img_right_normal, img_right_clicked, img_right_width, callback)
{
    this._minwidth = img_left_width + img_right_width;
    this._widget = document.createElement("div");
    this._widget.style.border = "0px";
    this._widget.style.display = "block";
    this._widget.style.float = "left";
    this._widget.style.width = "100%";
    //this._widget.style.position = "absolute";
    this._widget.style.height = height + "px";
    // Create our image files and apply styles, append to widget
    
    var img = document.createElement("img");
    img.src = img_left_normal;
    //img.style.position = "absolute";
    img.style.width = img_left_width +"px";
    img.style.height = height +"px";
    img.style.border = "0px";
    img.style.float = "left";
    //img.style.left = "0px";
    this._widget.appendChild(img);
    this._img_left = img;

    var img = document.createElement("img");
    img.src = img_middle_normal;
    img.style.position = "absolute";
    img.style.height = height +"px";
    img.style.border = "0px";
    img.style.float = "left";
    img.style.left = img_left_width + "px";
    //img.style.width = "25px"; // FIXME Magic size :/
    // Styles for repeat-x, set the width and position to slightly underlay
    // below the left/right images
    this._widget.appendChild(img);
    this._img_middle = img;
    

    var img = document.createElement("img");
    img.src = img_right_normal;
    img.style.position = "absolute";
    img.style.float = "left";
    img.style.width = img_right_width +"px";
    img.style.height = height +"px";
    img.style.border = "0px";
    //img.style.left = "0px";
    this._widget.appendChild(img);
    this._img_right = img;
    
    this._img_left_normal = img_left_normal;
    this._img_left_clicked = img_left_clicked;
    this._img_middle_normal = img_middle_normal;
    this._img_middle_clicked = img_middle_clicked;
    this._img_right_normal = img_right_normal;
    this._img_right_clicked = img_right_clicked;
    
    this._label = document.createElement("div");
    this._label.innerHTML = label;
    this._label.style.border = "0px";
    this._label.style.margin = "3px 8px 3px 8px";
    //this._label.style.fontWeight = "bold";
    //this._label.style.top = "-23px";
    this._label.style.left = "0px";
    this._label.style.position = "absolute";
    this._label.style.display = "block";
    this._label.style.float = "left";
    this._label.style.opacity = "0";
    this._label.style.color = "#ffffff";
    this._label.style.textShadow = "#202020 0.5px 0.5px 1px";
    this._widget.appendChild(this._label);
    document.body.appendChild(this._widget);
    var w = this._label.offsetWidth - img_left_width - img_right_width + 16;
    this._img_middle.style.width = w + "px";
    var rw = img_left_width + w;
    this._img_right.style.left = rw;
    document.body.removeChild(this._widget);
    
    button_div.appendChild(this._widget);
    this._label.style.opacity = "1";
    //alert(this._label.offsetWidth);
    var fw = (w + img_left_width + img_right_width);
    var fl = fw * -1;
    //alert(button_div.offsetWidth);
    this._widget.style.width = fw + "px";
    this._widget.style.left = fl + "px";
    // Probably broken, javascript is weird about such things
    // need to find some object examples :/
    var _this = this;
    this.onMouseDown = function() 
    {
        _this._img_middle.src = _this._img_middle_clicked;
        _this._img_left.src = _this._img_left_clicked;
        _this._img_right.src = _this._img_right_clicked;
    }
    this.onMouseUp = function() 
    {
        _this._img_middle.src = _this._img_middle_normal;
        _this._img_left.src = _this._img_left_normal;
        _this._img_right.src = _this._img_right_normal;
    }
    this._widget.onmousedown = this.onMouseDown;
    this._widget.onmouseup = this.onMouseUp;
	this._widget.onclick = callback;
	// Some things seem to hack private members - NASA Image of the day 
    this._container = this._widget;
    this.textElement = this._label;
}


GrommitButton.prototype.setEnabled = function(enabled) 
{
    // Swap out our images to siabled ones if we have them, otherwise
    // set the opacity or something...
    
}

GrommitButton.prototype.setDisabledImages = function(img_left_disabled, 
                                                      img_middle_disabled, 
                                                      img_right_disabled)
{
    this._img_left_disabled = img_left_disabled;
    this._img_middle_disabled = img_left_disabled;
    this._img_right_disabled = img_right_disabled;
}

GrommitButton.prototype.remove = function()
{	
    var parent = this._widget.parentNode;
    parent.removeChild(this._widget);
}

GrommitButton.prototype.setMinWidth = function(minwidth) {
    this._minwidth = minwidth;
}

//------------------- GrommitButton constructor

function GrommitGlassButton(button_div, label, callback) {
    // Chain up constructor
    this._widget = null;
    //alert(window.widget.sharepath);
    
    this._init(button_div, label, 23,
               window.widget.sharepath + "/images/glassbuttonleft.png", 
               window.widget.sharepath + "/images/glassbuttonleftclicked.png", 10,
               window.widget.sharepath + "/images/glassbuttonmiddle.png", 
               window.widget.sharepath + "/images/glassbuttonmiddleclicked.png",
               window.widget.sharepath + "/images/glassbuttonright.png", 
               window.widget.sharepath + "/images/glassbuttonrightclicked.png", 10, 
               callback)
}


GrommitGlassButton.prototype = new GrommitButton(null);

