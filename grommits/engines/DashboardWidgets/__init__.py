import gobject
gobject.threads_init()
import gtk
import webkit
import jswebkit
from grommits.config import *
from grommits.utils import *
from grommits.engines import Widget
from grommits.engines import Engine
from grommits.engines.DashboardWidgets.install import Install
from grommits.engines.DashboardWidgets.utils import *

_engine_ = "Dashboard"
_widget_ = "DashboardWidget"

class DashboardWebView(webkit.WebView):
    def __init__(self, widget, uri):
        webkit.WebView.__init__(self)
        self._widget_window = widget
        settings = self.get_settings()
        settings.set_property("enable-developer-extras", True)
        #self.load_uri(uri)
        self.set_transparent(True)
        self.connect("script-prompt", self._script_callback)
        self.open(uri)
        self._ctx = jswebkit.JSContext(self.get_main_frame().get_global_context())
        #self._widget_window.set_jscontext(self._ctx)

    # pygobject/pywebkit bug, the text_ptr is a gpointer and user_data doesn't seem to work at all
    def _script_callback(self,webview,frame,message,default,text_ptr,user_data=None):
        if message.startswith("GROMMIT:"):
            callback = message[8:]
            default = default.replace("(", "")
            default = default.replace(")", "")
            sa = default.split(",")
            a = []
            for arg in sa:
                a.append(parse_value(arg))
            if len(a) == 0: a = None
            if callback in DashboardWidget.__dict__:
                DashboardWidget.__dict__[callback]( self._widget_window, a )
            else:
                print "No such callback"
            return True

    def call_javascript(self, script):
        try:
            return self._ctx.EvaluateScript(script)
        except:
            print "fail!"
            return self.execute_script(script)

class DashboardWidget(Widget):
    def __init__( self, engine, widget_path ):
        Widget.__init__( self, engine, widget_path )

        try: self._preferences = Preferences()
        except Singleton as e: self._preferences = e.get_singleton()
        
        self._plist = ParsePlist(widget_path)
        url = "file://" + widget_path + "/" + self._plist['MainHTML']
        self._widget = DashboardWebView(self, url)
        # Here we probably need to do the javascript hookups
        self.add(self._widget)

    def setSharePath( self, args=None ):
        self._widget.call_javascript("window.widget.setSharePath('%s');" % (self._preferences['share_path']))

    def setCloseBoxOffset( self, x=None, y=None ):
        if x == ['']: x = None
        if not x: x = self._plist['CloseBoxInsetX']
        if not y: y = self._plist['CloseBoxInsetY']
        self._widget.call_javascript("window.widget.setCloseBoxOffset(%d, %d);" % (x, y))
        return True

    def prepareForTransition( self, args=None ):
        pass
    
    def performTransition( self, args=None ):
        pass

    def setPreferenceForKey( self, args=None ):
        if not args: return
        preference = args[0]
        key = args[1]
        
    def preferenceForKey( self, args=None):
        if not args: return
        key = args[0]
        preference = ""
        self._widget.call_javascript("window.widget.return_values['preferenceForKey'] = '%s';" % preference)

    def closeWidget( self, args=None ):
        try:
            self.removeWidget()
        except:
            gtk.main_quit();
    
    def setOnTop( self, args=None ):
        if not args: return
        ontop = args[0]
    
    def setPinned( self, args=None ):
        if not args: return
        pinned = args[0]
    
    def showWidget( self, args=None ):
        self.show_all()
        #self._widget.call_javascript("window.widget.onshow()")
        
    def removeWidget( self, args=None ):
        if not args: self._engine.remove_widget(self)
        #self._widget.call_javascript("window.widget.onremove()")

    def hideWidget( self, args=None ):
        #self._widget.call_javascript("window.widget.onhide()")
        pass

    def openApplication( self, args=None ):
        # Try and sensibly match apple bundleId's to similar applications or
        # preferred applications on this desktop
        if not args: return
        bundleid = args[0]

    def openURL( self, args=None ):
        if not args: return
        url = args[0]

    def system( self, args=None ):
        if not args: return
        command = args[0]
        endHandler = args[1]

class Dashboard(Engine):
    _single = None
    def __init__( self ):
        Engine.__init__( self )

        # Only one dashboard per process
        if Dashboard._single:
            raise Singleton(self)
        Dashboard._single = self
        try: self._conf_widgets = Widgets()
        except Singleton as e: self._conf_widgets = e.get_singleton()
    
    def start( self ):
        # Iterate through our configuration and load the respective widgets
        for widget in self._conf_widgets.get_visible():
            (engine, widget_path) = widget
            if engine == _engine_:
                try:
                    w = DashboardWidget(self, widget_path)
                    self.add_widget(w)
                except:
                    print "ERROR: Widget load failed: %s" % widget_path
                
        # Show each widget we've constructed
        for widget in self._widgets:
            widget.showWidget()

    def remove_widget( self, widget ):
        widget.removeWidget(True)
        Engine.remove_widget(self, widget)

    def hide( self ):
        for widget in self._widgets:
            widget.hideWidget()

    def show( self ):
        for widget in self._widgets:
            widget.showWidget()

