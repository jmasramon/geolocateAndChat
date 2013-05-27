describe("The inputareaView", function() {
  it("should trigger message send when something is written and the enter key pressed", function() {
    spyOn(window.app.connection, 'message');

    window.app.inputAreaView.$el.find('input').val('Hola Lola');
    expect(window.app.inputAreaView.$el.find('input').val()).toBe('Hola Lola');
    
    var form = window.app.inputAreaView.$el.find('form');
    expect(form).not.toBe(undefined);
    
    form.submit();

    expect(window.app.connection.message).toHaveBeenCalled();
    expect(window.app.connection.message).toHaveBeenCalledWith('Hola Lola');
  });

  it("should become empty when the message is sent", function() {
    expect(window.app.inputAreaView.$el).not.toBe(undefined);
    expect(window.app.inputAreaView.$el.find('input').val()).toBe('');
  });

  it("should not send empty messages", function() {
   spyOn(window.app.connection, 'message');
  
    window.app.inputAreaView.$el.find('form').submit();

    expect(window.app.connection.message).not.toHaveBeenCalled();
  
  });

});