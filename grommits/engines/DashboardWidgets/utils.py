import os
from xml.dom import minidom

def ParsePlist( widget_path ):
    if not os.path.exists( widget_path +"/Info.plist"):
        raise Exception("Cannot find apple bundle in %s" % widget_path)
    dom = minidom.parse( widget_path +"/Info.plist" )
    nodes = dom.getElementsByTagName('dict')[0].childNodes
    info = {}
    key = None
    for node in nodes:
        value = None
        if node.firstChild:
            if node.nodeName == "key":
                key = node.firstChild.nodeValue
            elif node.nodeName == "string":
                value = node.firstChild.nodeValue
                if not value: value = ""
            elif node.nodeName == 'true':
                value = True
            elif node.nodeName == 'integer':
                try: value = int(node.firstChild.nodeValue)
                except: value = 0
        if key and value:
            info[key] = value
            key = None
    return info

def Verify( widget_path ):
    """
    Check if this is indeed a dashboard widget, return true if it is, false otherwise
    """
    pass
