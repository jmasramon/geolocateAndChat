GrepTest = TestCase("grepTest");

GrepTest.prototype.setUp = function () {
    this.users = [
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

    this.info = [
        {
            "nickName": "jmsol",
            "lat":      "42.395039",
            "lng":      "3.148918"
        }
    ];
};

GrepTest.prototype.tearDown = function () {
    delete this.users;
    delete this.info;
};

GrepTest.prototype.testYshouldReturnFullYear = function () {
    // print("Initial users: " + JSON.stringify(users, null, 4));
    // print("Initial this.info: " + JSON.stringify(this.info, null, 4));

    // print("Initial nickName: " + this.info[0].nickName);
    assertEquals("jmsol", this.info[0].nickName);

    self = this;

    movingUser = grep(this.users, function (e, i) {
        return e.nickName == self.info[0].nickName;
    }, false);

    // print('moving user = ' + JSON.stringify(movingUser[0], null, 4));
    assertEquals(1, movingUser.length);
    assertNotEquals(movingUser[0].lat, this.info[0].lat);
    assertNotEquals(movingUser[0].lng, this.info[0].lng);
    assertEquals("jmsol", movingUser[0].nickName);
    assertEquals(this.info[0].nickName, movingUser[0].nickName);

    // print('Array of users: ' + JSON.stringify(users, null, 4));
    assertEquals(2, this.users.length);

    // print('Index of movingUser: ' + users.indexOf(movingUser[0]));
    assertEquals(0, this.users.indexOf(movingUser[0]));

    this.users.splice(this.users.indexOf(movingUser[0]), 1); // Elimina l'usu de la llista d'usus connectats
    // print('Array of users after splice: ' + JSON.stringify(users, null, 4));
    assertEquals(1, this.users.length);

    this.users.push(this.info[0]); // Guarda el nou usu a la llista d'usus connectats. No hi ha bd. Tot es fa en t real (en memo)
    // print('User moved. New array of users: ' + JSON.stringify(users, null, 4));
    assertEquals(2, this.users.length);
    assertEquals(this.users[1].lat, this.info[0].lat);
    assertEquals(this.users[1].lng, this.info[0].lng);

};