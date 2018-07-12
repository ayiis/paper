```python
#!/usr/bin/env python2.7
# -*- coding: utf-8 -*-
"""
    http://api.mongodb.com/python/current/tutorial.html
"""

from pymongo import MongoClient
import datetime, time, traceback

mongodbConfig = {
    "connAddr": [
        "127.0.0.1:27017",
    ],
    "user": "",
    "password": "",
    "database": "my_worldstar"
}

collection_name = "test"


def init_connection():
    dbname = mongodbConfig["database"]
    if mongodbConfig.get("replicaSet"):
        client = MongoClient(mongodbConfig["connAddr"], replicaSet=mongodbConfig["replicaSet"])
    else:
        client = MongoClient(mongodbConfig["connAddr"])
    if mongodbConfig.get("user"):
        client[mongodbConfig["user"]].authenticate(mongodbConfig["user"], mongodbConfig["password"])

    print "DEBUG: # mongo init ok:", client[dbname]
    return client[dbname]


def insert(db, collection_name, req_data):

    result = db[collection_name].insert(req_data)

    print "DEBUG: # mongo insert ok:", result

    return result


def query(db, collection_name, req_data, sort_data=None):

    sort_data = sort_data or [("_id", -1)]

    result = db[collection_name].find(req_data).sort(sort_data).limit(10)

    print "DEBUG: # mongo find ok, result.count:", result.count()

    return list(result)


def update(db, collection_name, req_data, update_data):

    # multi(False): update multi items if matched
    # upsert(False): insert a new item if no one matched
    result = db[collection_name].update(req_data, update_data, multi=False, upsert=False)

    print "DEBUG: # mongo update ok:", result

    return result


def delete(db, collection_name, req_data):

    result = db[collection_name].remove(req_data)

    print "DEBUG: # mongo remove ok:", result

    return result


def test():

    # build connection to mongodb
    db = init_connection()

    for i in range(5):
        time.sleep(0.2)

        # insert a dict into mongodb
        insert(
            db,
            collection_name,
            {
                "_id": i,
                "k": i**i,
                "ts": datetime.datetime.now(),
            }
        )

    time.sleep(1)
    # query from mongodb, with conditions
    retult = query(
        db,
        collection_name,
        {
            "_id": 4,
        }
    )

    time.sleep(1)
    # replace whole item with new item
    retult = update(
        db,
        collection_name,
        {
            "_id": 1,
        },
        {
            "k": 999,
        }
    )

    time.sleep(1)
    # use `$set` to update specify key in matched items
    retult = update(
        db,
        collection_name,
        {
            "i": 4,
        },
        {
            "$set": {
                "k": 123456
            }
        }
    )

    time.sleep(1)
    # delete specify item if matched
    retult = delete(
        db,
        collection_name,
        {
            "_id": 4,
        }
    )

    time.sleep(1)
    # delete all item (be carefull)
    retult = delete(
        db,
        collection_name,
        {}
    )


if __name__ == "__main__":
    test()
```