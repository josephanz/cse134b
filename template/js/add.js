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


	var hour = document.getElementById("hour").value;
	var ampm = document.getElementById("ampm").value;
	if(document.getElementById("ampm").value == "PM")
	{
		if(hour !== 12) {}
			hour = hour + 12;
		}
	} else if(hour == 12) {
		hour = 0;
	}

	var min = document.getElementById("min").value;
	
	var habit = {
		title: document.getElementById("title").value, 
		weeklyFreq: perWeek,
		dailyFreq:  perDay,
		time: hour + ":" + min
	};

	console.log(document.getElementById("title").value);
	console.log(habit.valueOf("time"));	
	document.location.href="list.html";
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
	$('#upload').remove();
	$('#icon4').attr('style', "visiblility: visible;");
	$('#icon4').attr('onclick', "selectImage('icon4')");
    $('#icon4').attr('src', e.target.result);
};