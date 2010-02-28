from engines.DashboardWidgets.install import *

def Install( widget_zip ):
    install.install_widget(widget_zip)

if __name__ == "__main__":
    install = Install()
    if len(sys.argv) < 2:
        print "Please specifiy a .wdgt.zip file"
        sys.exit(1)
    Install(sys.argv[1])
