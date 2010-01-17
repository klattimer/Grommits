class Singleton(Exception):
    def __init__( self, singleton ):
        self._singleton = singleton
        
    def get_singleton( self ):
        return self._singleton

def color_to_hex( r, g, b ):
    if r > 1: raise Exception("Scaling from 0-1 not 0-255")
    if b > 1: raise Exception("Scaling from 0-1 not 0-255")
    if g > 1: raise Exception("Scaling from 0-1 not 0-255")
    r = int(r * 255)
    g = int(g * 255)
    b = int(b * 255)
    color = "#%x%x%x" % (r, g, b)
    return color
