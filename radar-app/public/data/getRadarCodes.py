with open("newoutput.txt") as FileObj:
	codes = []
	count = 0
	total = 0
	for lines in FileObj:
		if lines.strip():
			line = lines[16:]
			code = line[:4]
			if (code == "0000"):
				print lines
				count += 1
			codes.append(code)
		total += 1
	print set(codes)
	print count, "zeros out of ", total


