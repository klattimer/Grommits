import os
import sys
import zipfile
import re
import shutil
from grommits.engines.DashboardWidgets.utils import *
from grommits.config import *
from grommits.utils import *

class Install:
    def __init__( self ):
        try: self._preferences = Preferences()
        except Singleton as e: self._preferences = e.get_singleton()
        try: self._conf_widgets = Widgets()
        except Singleton as e: self._conf_widgets = e.get_singleton()
        self._dash_path = self._preferences['base_path']+"/DashboardWidgets/"

        scripts = []
        replace = []
        
        # General dashboard stuff
        scripts.append(self._preferences['share_path'] + "/classes/widget.js")
        # Replace out apple's classes with our own super duper... erm empty mostly replacements
        replace.append( ("/System/Library/WidgetResources/AppleClasses/AppleAnimator.js",
                         self._preferences['share_path'] + "/classes/animator.js") )
        replace.append( ("/System/Library/WidgetResources/AppleClasses/AppleButton.js",
                         self._preferences['share_path'] + "/classes/button.js") )
        replace.append( ("/System/Library/WidgetResources/AppleClasses/AppleInfoButton.js",
                         self._preferences['share_path'] + "/classes/info_button.js") )
        replace.append( ("/System/Library/WidgetResources/AppleClasses/AppleScrollArea.js",
                         self._preferences['share_path'] + "/classes/scroll_area.js") )
        replace.append( ("/System/Library/WidgetResources/AppleClasses/AppleScrollbar.js",
                         self._preferences['share_path'] + "/classes/scrollbar.js") )
        replace.append( ("/System/Library/WidgetResources/AppleClasses/AppleSlider.js",
                         self._preferences['share_path'] + "/classes/slider.js") )
        replace.append( ("/System/Library/WidgetResources/button/genericButton.js",
                         self._preferences['share_path'] + "/classes/generic_button.js") )
        replace.append( ("/System/Library/WidgetResources/AppleParser/AppleParser.js",
                         self._preferences['share_path'] + "/classes/parser.js") )
        # Replace image files
        replace.append( ("/System/Library/WidgetResources/button/glassbuttonleft.png",
                         self._preferences['share_path'] + "/images/glassbuttonleft.png") )
        replace.append( ("/System/Library/WidgetResources/button/glassbuttonmiddle.png",
                         self._preferences['share_path'] + "/images/glassbuttonmiddle.png") )
        replace.append( ("/System/Library/WidgetResources/button/glassbuttonright.png",
                         self._preferences['share_path'] + "/images/glassbuttonright.png") )
        replace.append( ("/System/Library/WidgetResources/button/glassbuttonleftclicked.png",
                         self._preferences['share_path'] + "/images/glassbuttonleftclicked.png") )
        replace.append( ("/System/Library/WidgetResources/button/glassbuttonmiddleclicked.png",
                         self._preferences['share_path'] + "/images/glassbuttonleftclicked.png") )
        replace.append( ("/System/Library/WidgetResources/button/glassbuttonrightclicked.png",
                         self._preferences['share_path'] + "/images/glassbuttonleftclicked.png") )
        replace.append( ("/System/Library/WidgetResources/ibutton/white_i.png",
                         self._preferences['share_path'] + "/images/white_i.png") )
        replace.append( ("/System/Library/WidgetResources/ibutton/white_rollie.png",
                         self._preferences['share_path'] + "/images/white_rollie.png") )
        replace.append( ("/System/Library/WidgetResources/ibutton/black_i.png",
                         self._preferences['share_path'] + "/images/black_i.png") )
        replace.append( ("/System/Library/WidgetResources/ibutton/black_rollie.png",
                         self._preferences['share_path'] + "/images/black_rollie.png") )
        # replace js calls to apple libraries with our own :)
        jscalls = []
        jscalls.append(("AppleButton", "GrommitButton"))
        jscalls.append(("AppleGlassButton", "GrommitGlassButton"))
        jscalls.append(("AppleScrollArea", "GrommitScrollArea"))
        jscalls.append(("AppleScrollbar", "GrommitScrollbar"))
        jscalls.append(("AppleSlider", "GrommitSlider"))
        jscalls.append(("AppleAnimator", "GrommitAnimator"))
        jscalls.append(("AppleParser", "GrommitParser"))

        # any plugin-compatibility-hacks to load their JS substitutions in here please

        self._replace = replace
        self._scripts = scripts
        self._jscalls = jscalls
        self._processed = []
        self._plist = None

    def install_widget( self, widget_archive ):
        """
        Run the entire install process
        """
        widget_path = self.extract(widget_archive)
        self.process_files( widget_path )
        self._conf_widgets.add_installed("DashboardWidget", widget_path)

    def extract( self, widget_archive ):
        """
        Extract the archive to the base path
        """
        (head, tail) = os.path.split(widget_archive)
        widget_path = self._dash_path + tail[0:-4]
        os.makedirs(widget_path)
        z = zipfile.ZipFile(widget_archive)
        for filename in z.namelist():
            if filename.endswith('/'):
                os.makedirs(os.path.join(widget_path, filename))
            else:
                f = open(os.path.join(widget_path, filename), 'wb')
                f.write(z.read(filename))
                f.close()
        
        d = os.listdir(widget_path)
        for f in d:
            if os.path.isdir(widget_path + "/" + f):
                if f.endswith(".wdgt"):
                    os.rename(widget_path+"/"+f, self._dash_path + f)
                    shutil.rmtree(widget_path)
                    widget_path = self._dash_path + f
                    break
        print widget_path
        return widget_path

    def process_files( self, widget_path ):
        """
        We initialise the process by calling process_html on each html file
        we find in the path, recursively. 
        """
        self._plist = ParsePlist(widget_path)
        allfiles = []
        self._processed = []
        for (p,d,f) in os.walk(widget_path):
            for filename in f:
                if filename.endswith(".html"):
                    self._process_html(p + "/" + filename)
                allfiles.append(p + "/" + filename)

        for filename in allfiles:
            if not filename in self._processed:
                if filename.endswith("css"):
                    print "WARNING: ",
                elif filename.endswith("htm"):
                    print "WARNING: ",
                elif filename.endswith("js"):
                    print "WARNING: ",
                elif filename.endswith("png"):
                    continue
                else:
                    print "INFO: ",
                print "Failed to process file %s" % filename

    def _process_html( self, html_file ):
        """
        When an html file discovers a link to a js or css file, we call up to
        their respective process functions
        """
        (h,t) = os.path.split(html_file)
        print "Processing html file: %s" % html_file
        # Perform the initial replacements
        f = open(html_file)
        data = f.read()

        for r in self._replace:
            (o, n) = r
            data = data.replace(o,n)
            #data = re.sub(o,r,data)
        
        for r in self._jscalls:
            (o, n) = r
            data = data.replace(o,n)
            #data = re.sub(o,r,data)
        f.close()
        
        # Sort out init scripts
        m = re.search(r'.*<body(.*?)onload=(\"|\')(?P<onload>.*?)(\"|\')(.*)>', data)
        onload = m.group("onload")
        data = data.replace(onload, "GrommitInit();")        

        # Add necessary init scripts
        script = "<script type='text/javascript'>\n"
        script += "function GrommitInit() {\n"
        script += "  window.widget = GrommitWidget(\"%s\", false);\n" % self._plist['CFBundleIdentifier']
        script += "  %s\n}\n" % onload
        script += "</script>"

        data = data.replace("</head>", script+"\n</head>")

        f = open(html_file, 'w')
        f.write(data)
        f.close()
        
        # Chain up to other scripts
        g = re.findall(r'.*(\"|\')text/css(\"|\')(.*?)(href=|@import )(\"|\')(?P<cssfile>.*?)(\"|\').*', data, re.I & re.M)
        for m in g: 
            self._process_css(h + "/" + m[5])

        g = re.findall(r'<script(.*?)(\"|\')text/javascript(\"|\')(.*?)src=(\"|\')(?P<jsfile>.*?)(\"|\')(.*)></script>', data, re.I & re.M)
        for m in g: 
            if not m[5].startswith("file") and not m[5].startswith("/"):
                self._process_js(h + "/" + m[5])
        f.close()
        
        self._processed.append(html_file)

    def _process_js( self, js_file ):
        print "Processing Javascript file: %s" % js_file
        """
        try and figure out deps, e.g. generic_button depends on button etc...
        """
        if js_file.find(self._preferences['share_path']) > -1: return # Don't process our files
        
        f = open(js_file)
        data = f.read()

        for r in self._jscalls:
            (o, n) = r
            data = data.replace(o,n)
        f.close()

        f = open(js_file, 'w')
        f.write(data)
        f.close()
        
        self._processed.append(js_file)

    def _process_css( self, css_file ):
        """
        When we discover a pdf file generate a png and replace the css, when
        we discover another css file (@import) we recurse that file too,
        we also need to convert rgba colours to hex and add an opacity: statment
        to css files where appropriate
        """
        print "Processing CSS file: %s" % css_file
        # code to detect css imports and pdf images
        f = open(css_file)
        data = f.read()
        f.close()
        
        (h,t) = os.path.split(css_file)
        g = re.findall(r'.*@import (\"|\')(?P<cssfile>.*?)(\"|\').*', data, re.I & re.M)
        for m in g: 
            self._process_css(h + "/" + m[1])

        # Scan for use of rgba() and pdf files
        # rgba gets replaced with an opacity and converted rgb
        # pdfs get converted to .png extensions and a .png is 
        # generated

        f = open(css_file, 'w')
        f.write(data)
        f.close()

        self._processed.append(css_file)

    def _process_pdf( self, pdf_file ):
        """
        Convert the pdf file to a png at appropriate resolution return png_filename
        """
        png_filename = "BROKEN"
        self._processed.append(pdf_file)
        return png_filename
