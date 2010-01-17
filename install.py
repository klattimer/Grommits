from grommits.engines.DashboardWidgets.install import *

if __name__ == "__main__":
    install = Install()
    print sys.argv
    install.install_widget(sys.argv[1])
