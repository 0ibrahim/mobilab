# coding=utf-8
import sys
import pymongo

from pymongo import MongoClient
client = MongoClient('localhost', 3001)
db = client.meteor

def saveRecord(line):
	# sectorId = line[0:2]
	companyId = line[0:2]
	date = line[2:10]
	time = line[10:16]
	local_code = line[16:20]
	lane = line[20:21]
	if companyId == 'L2':
		register_number = line[21:27]
		register_type = line[27:28]
		vehicle_plate = line[28:35]
		vehicle_type = line[35:36]
		class_vehicle_type = line[36:37]
		vehicle_length = line[37:40]
		ponctual_velocity = line[40:43]
		occupation_time = line[43:48]
		velocity = line[48:51]
	else:
		register_number = line[21:28]
		register_type = line[28:29]
		vehicle_plate = line[29:36]
		vehicle_type = line[36:37]
		class_vehicle_type = line[37:38]
		vehicle_length = line[38:41]
		ponctual_velocity = line[41:44]
		occupation_time = line[44:49]
		velocity = line[49:52]

	record = {"companyId": companyId, "date": date, "time": time, "local_code": local_code, "lane": lane,
	"register_number": register_number, "register_type": register_type, "vehicle_plate": vehicle_plate,
	"vehicle_type": vehicle_type, "class_vehicle_type": class_vehicle_type, "vehicle_length": vehicle_length,
	"ponctual_velocity": ponctual_velocity, "occupation_time": occupation_time, "velocity": velocity}

	# record = {"sectorId": sectorId}
	return db.datapoints.insert(record)
	# return db.newpoints.insert(record)

if len(sys.argv) < 2:
	print "Exiting invalid parameters"
	print "add-tp-db.py <file>"
	sys.exit(0)

f = open(sys.argv[1], 'r')

for line in f:
	if line.startswith("L"):
		local_code = line[16:20]
		if local_code != '0000':
			saveRecord(line)