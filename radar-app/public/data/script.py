import shutil
import glob

with open("newoutput.txt", 'wb') as outfile:
    for filename in glob.glob('/Users/ibrahim/Dropbox/Radares/L2/2014/11/*/*.TXT'):
	print filename
        if filename == "output.txt" or filename == "newoutput.txt":
            # don't want to copy the output into the output
            continue
        with open(filename, 'rb') as readfile:
            shutil.copyfileobj(readfile, outfile)
