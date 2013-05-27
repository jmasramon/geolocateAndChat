describe("The UserListView ", function() {
  it("should do nothing if not called", function() {
    expect($('section.userList ul.no-padding').children("li").length).toBe(1);
  });

  it("should trigger addUser when a user is added to the collection", function() {
    spyOn(window.app.userListView, 'addUser').andCallThrough();
    
    expect(window.app.userListView.collection.length).toBe(0);
    
    window.app.userListView.collection.add({id:1, nickName:'jmsol', email:'jmasramon@agenbolsa.com', lat:'41.42', lng:'2.25'});
    
    expect(window.app.userListView.collection.length).toBe(1);
    expect(window.app.userListView.addUser).toHaveBeenCalled();
  });

  it("should add an li with the new user to the DOM", function() {
    expect($('section.userList ul.no-padding').children("li").length).toBe(2);
  });

  it("should trigger removeUser whenever a user is removed from the collection", function() {
    spyOn(window.app.userListView, 'removeUser').andCallThrough();
    
    expect(window.app.userListView.collection.length).toBe(1);
    expect(window.app.userListView.collection.toJSON()).toEqual([ { id : 1, nickName : 'jmsol', email : 'jmasramon@agenbolsa.com', lat : '41.42', lng : '2.25' } ]);
    
    var removed = window.app.userListView.collection.remove(new ChatApp.Model.User({id:1,nickName:'jmsol', email:'jmasramon@agenbolsa.com', lat:'41.42', lng:'2.25'}));
    
    expect(removed.length).toBe(0);
    expect(window.app.userListView.collection.length).toBe(0);
    expect(window.app.userListView.removeUser).toHaveBeenCalled();
  });

  it("should remove the li with the removed user from the DOM", function() {
    expect($('section.userList ul.no-padding').children("li").length).toBe(1);
  });

});