import pymongo
from datetime import datetime, timedelta
from collections import Counter 


## https://www.w3schools.com/python/python_mongodb_create_db.asp
myclient = pymongo.MongoClient("mongodb+srv://jonathandaw29:yTwavgztICSam05T@clusterfinalyear.qfdqz.mongodb.net")
mydb = myclient["final-year-db"]
dblist = myclient.list_database_names()
# print(mydb.list_collection_names())


user_col = mydb["user"]
booking_col = mydb["booking"]

# https://stackoverflow.com/questions/21417711/search-multiple-fields-for-multiple-values-in-mongodb
valid_host_query = (
  {"$and":[
        {"roles": "host"},
        {"status": "VERIFIED"},
        {"privacy.analysis" : True}
    ]}
)

valid_customer_query = (
  {"$and":[
        {"roles": "customer"},
        {"status": "VERIFIED"},
        {"privacy.analysis" : True}
    ]}
)

# https://stackoverflow.com/questions/30002639/mongodb-search-to-return-only-specific-fields
id_project = ({"_id" : 1})
property_id_project = ({"propertyId"})

valid_host_res = user_col.find(valid_host_query, id_project)
valid_customer_res = user_col.find(valid_customer_query, id_project)

valid_host_ids = [x["_id"] for x in valid_host_res]
valid_customer_ids = [x["_id"] for x in valid_customer_res]

print(valid_host_ids)
print("****************88")

for x in valid_customer_res:
  print(x)

valid_booking_query = (
  {"$and":[
        {"guestId": {"$in" : valid_customer_ids}},
        {"ownerId": {"$in" : valid_host_ids}},
        {"accepted" : True},
        {"cancelled" : False}
    ]}
)

valid_booking_res = booking_col.find(valid_booking_query, property_id_project)
print(valid_booking_res)

# https://stackoverflow.com/questions/67755157/how-to-get-a-date-a-week-from-now-on-in-python
week_ago = datetime.now().astimezone() - timedelta(days=7)
def in_past_week(id):
  return True
  # https://pymongo.readthedocs.io/en/stable/api/bson/objectid.html
  #print(id)
  created_at = id.generation_time
#   print(week_ago)
#   print(created_at)
  print(created_at >= week_ago)
  return (created_at >= week_ago)

valid_property_ids = [x["propertyId"] for x in valid_booking_res if in_past_week(x["_id"])]  
print(valid_property_ids)

id_to_freq = Counter(valid_property_ids)

#print(id_to_freq)
print(len(id_to_freq))
print("**************")
# print(id_to_freq)
# https://stackoverflow.com/questions/48606406/find-most-frequent-value-in-python-dictionary-value-with-maximum-count
if(len(id_to_freq) > 4):
  top_props = [x for x,_ in id_to_freq.most_common(2)]
  bottom_props = [x for x,_ in id_to_freq.most_common()[::-1][ : 2]]
  print(top_props)
  print(bottom_props)














