from timer import Timer
import os
from grommitutils import *
import gconf

class Preferences:
    _single = None
    
    def __init__( self ):
        if Preferences._single:
            raise Singleton(Preferences._single)
        Preferences._single = self
        self._preferences = {}
        self._loaded = False
        self._client = gconf.client_get_default()
        self._client.add_dir ("/apps/grommits", gconf.CLIENT_PRELOAD_NONE)
        self.add_key("/apps/grommits/base_path" )
        self.add_key("/apps/grommits/share_path" )

        self._config_path = os.path.expanduser("~/.config/grommits")
        self._config_file = self._config_path + "/preferences.conf"
        self._load()

    def _load ( self ):
        if self._loaded: return
        if not os.path.isdir(self._config_path):
            os.makedirs(self._config_path)
        if not os.path.exists(self._config_file):
            self._default()
            return
        # Load keys from gconf

        self._loaded = True

    def _default( self ):
        self['base_path'] = os.path.expanduser("~/.local/share/grommits")
        self['share_path'] = os.path.expanduser("/usr/share/grommits")
        self._loaded = True

    def _config_notify( self, client, cnxn_id, entry, erm ):
        if (entry.get_value().type == gconf.VALUE_STRING):
            val = entry.get_value().get_string()
            key = entry.get_key()
            key = key.replace("/apps/grommits/", "")
            if key in self._preferences:
                if self._preferences[key] == val:
                    return
            self._preferences[key] = val

    def add_key( self, key ):
        self._client.notify_add("/apps/grommits/"+key, self._config_notify )

    def __setitem__( self, key, value ):
        if not key in self._preferences:
            self._preferences[key] = value
        elif self._preferences[key] != value:
            self._preferences[key] = value

        if type(value) == str:
            self._client.set_string("/apps/grommits/"+key,value)
        elif type(value) == int:
            self._client.set_int("/apps/grommits/"+key,value)
        elif type(value) == float:
            pass
        elif type(value) == list:
            print "setting list"
            sub_type = type(value[0])
            print sub_type
    
    def __getitem__( self, key ):
        if key in self._preferences:
            return self._preferences[key]
        return None
    
    def __contains__( self, key ):
        return key in self._preferences

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

        try: self._preferences = Preferences()
        except Singleton as e: self._preferences = e.get_singleton()

        self._client = gconf.client_get_default()
        self._client.add_dir ("/apps/grommits/widgets", gconf.CLIENT_PRELOAD_NONE)

        self._installed = [] # Tuple ( engine_name, widget_path )

        self._visible = []
        self._visible.append( ("Dashboard", "/home/karl/.local/share/grommits/DashboardWidgets/World Clock.wdgt") )
        self._visible.append( ("Dashboard", "/home/karl/.local/share/grommits/DashboardWidgets/World Clock.wdgt") )

        self.write_config()
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
        
    def get_visible(self,engine=None):
        if not engine:
            return self._visible
        visible = []
        for widget in self._visible:
            (e,w) = widget
            if e == engine:
                visible.append(w)
        return visible

    def add_installed( self, engine_name, widget_path ):
        self._installed.append( (engine_name, widget_path) )

    def uninstall( self, widget_path ):
        for i in self._installed:
            (e,w) = i
            if w == widget_path: self._installed.remove(i)
        self.hide(widget_path)
    
    def hide( self, widget_path ):
        for v in self._visible:
            (w,x,y,cx,cy) = v
            if w == widget_path: self._visible.remove(v)

    def show( self, widget_path, x, y, cx, cy ):
        self._visible.append( (widget_path, x, y, cx, cy) )

    def write_config( self ):
        out = {}
        for widget in self._visible:
            (e,w) = widget
            if e in out:
                out[e].append(w)
            else:
                out[e] = []
                out[e].append(w)

        for e in out:
            print e
            self._preferences.add_key(e)
            self._preferences[e] = out[e]
