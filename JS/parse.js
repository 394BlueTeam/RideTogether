Parse.initialize("ilS8dRyPiIgYZt8rfKgcIaSlPvo5knHsMEOwKiSJ", "e1JkunoNhD7zPdWXpWIlJ11nPkrqTb1YEYLezO55");
    var TestObject = Parse.Object.extend("TestObject");
    var query = new Parse.Query(TestObject);
    
    function enroll(frm){
      if (frm.txtName.value == "")
        alert("please enter your name.");
      else if (frm.txtAddress.value == "")
        alert("please enter your address.");
      else if(frm.txtCar.value == "")
        alert("please specify your car model.");
      else {
        var driver = new TestObject();
        driver.save({Name: frm.txtName.value, Address: frm.txtAddress.value, Car: frm.txtCar.value});
        alert('driver profile created');
      }
    }

    function query(){

    }