
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
					                       img_left, img_left_clicked, img_left_width,
					                       img_middle, img_middle_clicked, 
					                       img_right, img_right_clicked, img_right_width, callback)
{
    this._minwidth = img_left_width + img_right_width;
    this._widget = document.createElement("div");
    this._widget.style.border = "0px";
    this._widget.style.display = "block";
    this._widget.style.height = height + "px";
    // Create our image files and apply styles, append to widget
    
    var img = document.createElement("img");
    img.src = img_left;
    //img.style.position = "absolute";
    img.style.width = img_left_width +"px";
    img.style.height = height +"px";
    img.style.border = "0px";
    //img.style.left = "0px";
    this._widget.appendChild(img);

    var img = document.createElement("img");
    img.src = img_middle;
    //img.style.position = "absolute";
    img.style.height = height +"px";
    img.style.border = "0px";
    //img.style.left = img_left_width + "px";
    // Styles for repeat-x, set the width and position to slightly underlay
    // below the left/right images
    this._widget.appendChild(img);
    

    var img = document.createElement("img");
    img.src = img_right;
    //img.style.position = "absolute";
    img.style.float = "right";
    img.style.width = img_right_width +"px";
    img.style.height = height +"px";
    img.style.border = "0px";
    
    
    img.style.left = "0px";
    this._widget.appendChild(img);
    
    this._img_left = img_left;
    this._img_left_clicked = img_left_clicked;
    this._img_middle = img_middle;
    this._img_middle_clicked = img_middle_clicked;
    this._img_right = img_right;
    this._img_right_clicked = img_right_clicked;
    
    this._label = document.createElement("div");
    this._label.innerHTML = label;
    this._label.style.border = "0px";
    this._label.style.margin = "3px";
    this._label.style.fontWeight = "bold";
    this._label.style.top = "-23px";
    this._label.style.left = "0px";
    this._label.style.position = "relative";
    this._widget.appendChild(this._label);
    
    // Probably broken, javascript is weird about such things
    // need to find some object examples :/
    this._widget.onMouseDown = this.onMouseDown;
    this._widget.onMouseUp = this.onMouseUp;
    this._widget.onMouseOver = this.onMouseOver;
    this._widget.onMouseOut = this.onMouseOut;
    this._widget.onMouseMove = this.onMouseMove;
    button_div.appendChild(this._widget);
	this._widget.onclick = callback;
    //alert(this._widget.clip.width);
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

