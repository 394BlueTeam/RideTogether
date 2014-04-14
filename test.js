var email = "amandaanumba2014@u.northwestern.edu";
var email3 = "angie@u.northwestern.edu";
var email2 = "amanda.anumba@gmail.com";
var end = "@u.northwestern.edu";

var len = email2.length;
var len2 = end.length;

var pos = len - len2
var ending = email2.slice(pos, len);

if (ending == end) {
	console.log("success!");
}

else {
	console.log("didnt work");
}

console.log(ending);