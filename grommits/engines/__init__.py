"""
Plugin interfaces and utility functions for engines

Each widget is a gtk.Window with stuff tacked on, any number of things can be put inside of it, the engine
is a way of managing widgets, and each engine will load their widgets themselves to avoid any kind of confusion
"""
import gtk
import os

_engine_ = "Engine"
_widget_ = "Widget"

class Widget(gtk.Window):
    __gsignals__ = {
        "screen-changed": "override",
    }
    
    def __init__( self, engine, widget_path ):
        gtk.Window.__init__(self)

        self._engine = engine
        self._widget_path = widget_path
        self.set_decorated ( False )
        self.set_app_paintable ( True )
        self.set_double_buffered ( True )
        self.do_screen_change ()
        
        # TODO set some WM hints so the WM knows which layer we're on


    def do_screen_change( self, event=None ):
        screen = self.get_screen()
        colormap = screen.get_rgba_colormap()
        if not colormap:
            print "Can't find rgba visual"
            colormap = screen.get_rgb_colormap()
        self.set_colormap( colormap ) 

class Engine:
    def __init__( self ):
        self._widgets = []
    
    def add_widget( self, widget ):
        self._widgets.append(widget)

    def remove_widget(self, widget ):
        self._widgets.remove(widget)

class Engines:
    def __init__( self ):
        # Look for folders in the same path as this file, load them up, and register
        # their engine components ("Widget/Engine" classes), read the condfiguration
        pass
