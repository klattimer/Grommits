import gobject
from datetime import datetime, timedelta

class Timer:
    def __init__(self, time, callback=None, duration=None, data=None):
        self._time = time
        self._data = data
        self._callback = callback
        self._timeout_id = None
        self._duration = duration
        self._start_time = 0

    def start(self):
        if self._timeout_id == None:
            self._start_time = datetime.now()
            self._timeout_id = gobject.timeout_add(self._time, self.execute_callback)
            return True
        return False

    def stop(self):
        if self._timeout_id != None:
            self._start_time = 0
            gobject.source_remove(self._timeout_id)
            self._timeout_id = None
            return True
        return False

    def restart(self):
        self.stop()
        return self.start()

    def get_timeout_id( self ):
        return self._timeout_id

    # Seconds since started float(seconds)
    def get_time ( self ):
        now = datetime.now()
        d = now - self._start_time
        s = d.days * 86400.0 + d.seconds + (d.microseconds/1000000.0)
        return s

    def get_end_time( self ):
        if self._duration:
            return self._start_time + self._duration
        else:
            return None

    def get_start_time( self ):
        return self._start_time

    def execute_callback( self ):
        if not self._callback:
            return False

        # Check to see if duration is exceeded, call stop
        if self._duration and self.get_time() > self.get_end_time():
            self.stop()
            return False
        return self._callback( self )
        
