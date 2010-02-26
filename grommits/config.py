from timer import Timer
import os
from utils import Singleton

class Preferences:
    _single = None
    
    def __init__( self ):
        if Preferences._single:
            raise Singleton(Preferences._single)
        Preferences._single = self
        self._preferences = {}
        self._loaded = False
        self._timer = Timer(3000, self._write_config)
        self._config_path = os.path.expanduser("~/.config/grommits")
        self._config_file = self._config_path + "/preferences.conf"
        self._load()

    def _load ( self ):
        if self._loaded: return
        if not os.path.isdir(self._config_path):
            os.makedirs(self._config_path)
            self._default()
            return
        
        if not os.path.exists(self._config_file):
            self._default()
            return

        self._loaded = True

    def _default( self ):
        self['base_path'] = os.path.expanduser("~/.local/share/grommits")
        self['share_path'] = os.path.expanduser("/usr/share/grommits")
        self._loaded = True

    def __setitem__( self, key, value ):
        self._preferences[key] = value
        self._timer.restart()
    
    def __getitem__( self, key ):
        if key in self._preferences:
            return self._preferences[key]
        return None
    
    def __contains__( self, key ):
        return key in self._preferences

    def _write_config( self, arg=None ):
        pass

class Widgets:
    _single = None
    
    def __init__( self ):
        """
        We don't want repeated activity to cause too much disk access so we use
        a clever timer to delay writing our config file in the widget configuration
        """
        if Widgets._single:
            raise Singleton(Widgets._single)
        Widgets._single = self
        
        self._installed = [] # Tuple ( engine_name, widget_path )
        self._visible = [] # Tuple ( widget_path, x, y )
        self._visible.append( ("Dashboard", "/home/karl/.local/share/grommits/DashboardWidgets/World Clock.wdgt") )#, 100, 100)
        self._timer = Timer(3000, self._write_config)
        self._loaded = False
        self._config_path = os.path.expanduser("~/.config/grommits")
        self._config_file = self._config_path + "/widgets.conf"
        self._load()

    def _load( self ):
        if self._loaded: return
        if not os.path.isdir(self._config_path):
            os.makedirs(self._config_path)
            self._default()
            return
        if not os.path.exists(self._config_file):
            self._default()
            return
        pass

    def _default( self ):

        self._loaded = True
        
    def get_visible(self):
        return self._visible
        
    def add_installed( self, engine_name, widget_path ):
        self._installed.append( (engine_name, widget_path) )
        self._timer.restart()

    def uninstall( self, widget_path ):
        for i in self._installed:
            (e,w) = i
            if w == widget_path: self._installed.remove(i)
        self._timer.restart()
        self.hide(widget_path)
    
    def hide( self, widget_path ):
        for v in self._visible:
            (w,x,y,cx,cy) = v
            if w == widget_path: self._visible.remove(v)
        self._timer.restart()

    def show( self, widget_path, x, y, cx, cy ):
        self._visible.append( (widget_path, x, y, cx, cy) )
        self._timer.restart()

    def _write_config( self, arg=None ):
    
        return False
