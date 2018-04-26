# -*- coding: utf-8 -*-
"""
Created on Sat Apr  7 00:16:04 2018

@author: PULKIT LUTHRA
"""



from flask import Flask
from flask_pymongo import PyMongo
from datetime import datetime, timezone
from bson.objectid import ObjectId

now = datetime.now(timezone.utc)
app = Flask(__name__)


app.config['MONGO_DBNAME'] = 'letalent-main'
app.config['MONGO_URI'] ='mongodb://letalent_admin:iamadmin@ds147228.mlab.com:47228/letalent-main'
          
mongo = PyMongo(app)       

#print (str(now))


# Function to update record to mongo db
def update(p):
    job = mongo.db.jobs
    i=0
    
    for document in job.find():
        #print (p[i])
        criteria = document['_id']
        mongo.db.jobs.update_one(
            {'_id': ObjectId(criteria)},
            {
            "$set": {
                "tag": p[i]

            }
            }
        )
        #print ("\nRecords updated successfully\n")
        i+=1



@app.route('/')             
def iterate():
    job = mongo.db.jobs
    l=[]
    s=0
    i=0
    for document in job.find():
        #print (i,'-------')
        
        #print(str(document['createdAt']))
        views = int(str(document['views']))
        #print (str(document['tag']))
        timediff= (now-(document['createdAt'])).total_seconds()
        
        #print (views/timediff)
        s=s+(views/timediff)
        l.append(views/timediff)
        i+=1
        
        #print()
    
    for i in range(len(l)):
        l[i]=(l[i]/s)*100
    #print (l)
    
    p=''
    
    l1=[]
    for i in range(len(l)):
        if (l[i]>=30.0):
            p='Trending'
        
        elif (15.0<l[i]<30.0):
            p='Hot'
        
        else:
            p='None'
        l1.append(p) 
    update(l1)    
    
    return ('')

if __name__=='__main__':
    app.run()          
       
