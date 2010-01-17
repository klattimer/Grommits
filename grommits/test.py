import os
for (p,d,f) in os.walk("."):
    for filename in f:
        print filename
    print "--"
