from grommits.engines.DashboardWidgets.install import *

if __name__ == "__main__":
    install = Install()
    if len(sys.argv) < 2:
        print "Please specifiy a .wdgt.zip file"
        sys.exit(1)
    install.install_widget(sys.argv[1])
