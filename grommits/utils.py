class Singleton(Exception):
    def __init__( self, singleton ):
        self._singleton = singleton
        
    def get_singleton( self ):
        return self._singleton

def color_to_hex( r, g, b ):
    r = int(r)
    g = int(g)
    b = int(b)
    color = "#%x%x%x" % (r, g, b)
    return color
