function grep (elems, callback, inv) {
    print('Parametres rebuts: ' + JSON.stringify(elems, null, 4) + ', ' + callback + ', ' + inv);

    var retVal, ret = [],
        i = 0,
        length = elems.length;
    inv = !!inv;

    print('inv = ' + inv);
    print('length = ' + length);
    // Go through the array, only saving the items that pass the validator function
    for (; i < length; i++) {
        print('i = ' + i);
        print('elems[i] = ' + JSON.stringify(elems[i], null, 4));
        print('elems[i].nickName = ' + elems[i].nickName);

        retVal = !!callback(elems[i], i);
        print('retVal = ' + retVal)
        if (inv !== retVal) {
            ret.push(elems[i]);
        }
    }

    return ret;
}

var users = [
    {
        "id":       1,
        "email":    "marc@gmail.com",
        "nickName": "jmsol",
        "lat":      "41.395039",
        "lng":      "2.148918"
    },
    {
        "id":       2,
        "email":    "jordi@gmail.com",
        "nickName": "marc",
        "lat":      "1.395039",
        "lng":      ".148918"
    }
];

var info = [
    {
        "nickName": "jmsol",
        "lat":      "42.395039",
        "lng":      "3.148918"
    }
];

print("Initial users: " + JSON.stringify(users, null, 4));
print("Initial info: " + JSON.stringify(info, null, 4));
print("Initial nickName: " + info[0].nickName);
movingUser = grep(users, function (e, i) {
    return e.nickName == info[0].nickName;
}, false);

print('moving user = ' + JSON.stringify(movingUser[0], null, 4));
print('Array of users: ' + JSON.stringify(users, null, 4));
print('Index of movingUser: ' + users.indexOf(movingUser[0]));

users.splice(users.indexOf(movingUser[0]), 1); // Elimina l'usu de la llista d'usus connectats

print('Array of users after splice: ' + JSON.stringify(users, null, 4));

movingUser[0].lat = info[0].lat;
movingUser[0].lng = info[0].lng;
users.push(info[0]); // Guarda el nou usu a la llista d'usus connectats. No hi ha bd. Tot es fa en t real (en memo)

print('User moved. New array of users: ' + JSON.stringify(users, null, 4));