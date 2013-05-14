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

