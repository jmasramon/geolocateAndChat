describe("The MessageList view", function() {
    it("should be binded with the collection of messages", function() {
        expect(window.app.messageListView.collection).not.toBe(undefined);
    });

    it("should initially have only the dummy message", function() {
        expect(window.app.messageListView.$el.find('ul.no-padding').children("li").length).toBe(1);
    });

    it("addMessage function should be called when an add event is triggered by the collection", function() {
        spyOn(window.app.messageListView, 'addMessage').andCallThrough();
        var grav;
        // grav = "http://www.gravatar.com/avatar/" + crypto.createHash('md5').update('jmasramon@gmail.com').digest('hex');
        window.app.messageListView.collection.add({
            userId: 1,
            nickName: 'jmsol',
            email: 'jmasramon@gmail.com',
            lat: '41.42',
            lng: '2.25',
            message: 'Hola lola',
            time: new Date(),
            gravatar: grav
        });
        expect(window.app.messageListView.addMessage).toHaveBeenCalled();
        // expect(window.app.messageListView.addMessage).toHaveBeenCalledWith({userId:1, nickName:'jmsol', email:'jmasramon@agenbolsa.com', lat:'41.42', lng:'2.25', message:'Hola lola', time: new Date()});
    });

    it("should add the received message to the DOM", function() {
        expect(window.app.messageListView.$el.find('ul.no-padding').children("li").length).toBe(2);
    });

});

