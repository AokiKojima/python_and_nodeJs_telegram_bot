from check import map1
import sys

census = {}
inn = 0
for i in range(len(map1)):
    inn += 1
    census[inn] = {}
    census[inn] = map1[inn]['name']

presearch = sys.argv[1]
search = str(presearch)

values = list(census.values())

lowercase_list = [s.lower() for s in values]

search = search.lower()

filtering = list(filter(lambda x: search in x, lowercase_list))

searching = filtering[0]

if searching in lowercase_list:
    try:
        index = lowercase_list.index(searching)
        
    except ValueError:
        print("Item is not in the list")

true_index = index + 1
