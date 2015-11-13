function selectImage(name) {
	//Clear all the other effects
	var arr = document.getElementsByClassName("icon");
	for(var i = 0; i < arr.length; i++)
	{
		arr[i].style.border = "3px inset rgba(0,0,0,0)";
	}
	//document.getElementById('icon2').style.border = "3px inset rgba(0,0,0,0)";
	//document.getElementById('icon3').style.border = "3px inset rgba(0,0,0,0)";
	var image = document.getElementById(name);
	image.style.border = "3px inset #999999";
}

	//if(typeof(Storage) !== "undefined") {
	//	localStorage.setItem("john", "smith");
	//	localStorage.setItem("myCat", "Tom2323");
	//}
	//console.log(document.getElementById("result"));

var visible = true;
function toggle() {
	var timeField = document.getElementById("time_selector");
	if(visible) {
		timeField.style.visibility = "hidden";
		console.log("hi");
	} else {
		timeField.style.visibility = "visible";
		console.log("bye");
	}
	visible = !visible;
}	



function saveIt() {
	var week = document.getElementsByName("date");
	var perWeek = [];
	for(var i = 0; i < week.length; i++)
	{
		if (week[i].checked)
		{
			perWeek[i] = true;
		}
		else
		{
			perWeek[i] = false;
		}
		console.log(perWeek[i]);
	}

	var daily = document.getElementsByName("day");
	var perDay = 0;
	for(var i = 0; i < daily.length; i ++)
	{
		if (daily[i].checked)
		{
			perDay = daily[i].value;
		}
		console.log(perDay + "days baby");
	}

	var habit = {
		title: document.getElementById("title").value, 
		weeklyFreq: perWeek,
		dailyFreq:  perDay
	};
	

	console.log(document.getElementById("title").value);
	
	//document.location.href="list.html";
}

$(function () {
    $(":file").change(function () {
        if (this.files && this.files[0]) {
            var reader = new FileReader();
            reader.onload = imageIsLoaded;
            reader.readAsDataURL(this.files[0]);
        }
    });
});

function imageIsLoaded(e) {
	$('#showhere').attr('style', "visiblility: visible;");
    $('#showhere').attr('src', e.target.result);
};