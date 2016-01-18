# coding=utf-8
import sys
import pymongo

from pymongo import MongoClient
client = MongoClient('localhost', 3001)
db = client.meteor

def saveRecord(line):
	sectorId = line[0:2]

	record = {"sectorId": sectorId}

	return db.datapoints.insert(record)


if len(sys.argv) < 2:
	print "Exiting invalid parameters"
	print "add-tp-db.py <file>"
	sys.exit(0)

f = open(sys.argv[1], 'r')

for line in f:
	saveRecord(line)