import requests

def start():
    print('--------------------------------')
    read()
    print('--------------------------------')
    print('1 - Create, 2 - Read, 3 - Update, 4 - Delete')
    select = (input('Enter: '))

    if select=='1':
        create()
    elif select=='2':
        read()
    elif select=='3':
        update()
    elif select=='4':
        delete()
    elif select=='0':
        pass
    

def create():
    #get data
    name = str(input('Name: '))
    studentid = str(input('Student ID: '))
    #give data to array
    array = {
    'name': name,
    'id': studentid
    }
    #send to node js
    data = {'array':array}
    res = requests.post('http://127.0.0.1:3000/addstudent', json=data)
    #display results
    displayreply(res) 

def read():
    res = requests.get('http://127.0.0.1:3000/read')
    data = res.json()
    print('--------------------------------')
    print ("{:<10} {:<15} {:<10}".format('','STUDENT LIST',''))
    print('--------------------------------')
    print ("{:<4} {:<15} {:<10}".format('ID','NAME','STUDENT NUMBER'))
    for x in range(len(data)):
        print ("{:<4} {:<15} {:<10}".format(str(data[x]['id']),data[x]['studentname'],str(data[x]['studentid'])))
    #displayreply(res)

def update():
    id = str(input('ENTER ID:'))
    print ('WHAT ITEM YOU WANT TO UPDATE?')
    print ('N - name, S - student ID, B - for both')
    vname = str(input('Enter: '))
    if vname == 'N':
        nname = str(input('ENTER NEW NAME: '))
        array = {
        'pkid': id,
        'newname':nname
        }
        data = {'array':array}
        res = requests.put('http://127.0.0.1:3000/update', json=data)
        displayreply(res)
    elif vname == 'S':
        nsid = str(input('ENTER NEW STUDENT ID: '))
        array = {
            'pkid': id,
            'newsid':nsid
        }
        data = {'array':array}
        res = requests.put ('http://127.0.0.1:3000/update', json=data)
        displayreply(res)
    elif vname == 'B':
        nname = str(input('ENTER NEW NAME:'))
        nsid = str(input('ENTER NEW STUDENT ID:'))
        array = {
            'pkid':id,
            'newname':nname,
            'newsid':nsid
        }
        data = {'array': array}
        res = requests.put('http://127.0.0.1:3000/update', json=data)
        displayreply(res)

def delete():
    studentid = str(input('Student ID you want to delete: '))
    array = {
    'id': studentid
    }
    data = {'array':array}
    res = requests.delete('http://127.0.0.1:3000/deletestudent', json=data)
    displayreply(res)

def displayreply(res):
    returned_data = res.json()
    print(returned_data)
    start()

start()