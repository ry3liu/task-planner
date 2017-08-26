//save the form information as soon as the submit button is pressed

document.getElementById("infoForm").addEventListener('submit', saveFormInfo);

function saveFormInfo(h){
	var taskName=document.getElementById("taskName").value;
	var taskDesc=document.getElementById("taskDesc").value;
	var taskImport=document.getElementById("taskImportance").value;
	var taskId=chance.guid();
	var taskTime=document.getElementById("taskTime").value;
	var assignedTo=document.getElementById("taskAssign").value;
	var statuss="To Be Completed";
	
	var task={
		name:taskName, description:taskDesc, urgency:taskImport, id:taskId,
		time:taskTime, who:assignedTo,
		statusss:statuss
	}
	
	if (localStorage.getItem('tasks')==null){
		
		var tasks=[];
		tasks.push(task);
	}
	else{
		var tasks=JSON.parse(localStorage.getItem('tasks'));
		tasks.push(task);
		
	}
	localStorage.setItem('tasks',JSON.stringify(tasks));
	
	document.getElementById("infoForm").reset(); //to empty the form after we saved the info inside the form
	
	showTasks();
	h.preventDefault();
}

function conditionDone(id){
	
	var any = JSON.parse(localStorage.getItem('tasks'));

  for (var i = 0; i < any.length; i++) {
    if (any[i].id == id) {
      any[i].statusss = 'Done';
    }
  }

  localStorage.setItem('tasks', JSON.stringify(any));
  //Calling setItem() with a named key that already exists will silently overwrite the previous value.

  showTasks();
}

function conditionDel(id){
	
	var any = JSON.parse(localStorage.getItem('tasks'));

  for (var i = 0; i < any.length; i++) {
    if (any[i].id == id) {
		any.splice(i,1);
    }
  }

  localStorage.setItem('tasks', JSON.stringify(any));
  //Calling setItem() with a named key that already exists will silently overwrite the previous value.
  
  //it works until here

  showTasks();
  }



function showTasks(){
	
	//get tasks data information from local storage
	//the data got will be in JSON format, need to convrt to javascript, so use parse
	
	var getTasks=JSON.parse(localStorage.getItem('tasks'));
	var addHTML=document.getElementById("taskList");
	addHTML.innerHTML="";
	
	for(var i=0; i<getTasks.length; i++){ //length tells you how many blocks are in the array, which is one more than the array index
		
		var name=getTasks[i].name;
		var description=getTasks[i].description;
		var urgency=getTasks[i].urgency;
		var time=getTasks[i].time;
		var id=getTasks[i].id;
		var who=getTasks[i].who;
		var condition=getTasks[i].statusss;
		
		
		addHTML.innerHTML += '<div class="panel panel-default">'+
		'<div class="panel-heading">'+
		name +'</div>'+
		'<div class="panel-body">'+
		'<p><span class="label label-info">' + condition+ '</span></p>'+
		'<h3>'+ description +'</h3>'+
		'<p><span class="glyphicon glyphicon-filter">' +time+'</span></p>'+
		'<p><span class="glyphicon glyphicon-time">'+urgency+ '</span></p>'+
		'<p> Will be completed by: ' + who + '</p>'+
		 '<a href="#" onclick="conditionDone(\''+id+'\')" class="btn btn-success">Done</a>'+
          '<a href="#" onclick="conditionDel(\''+id+'\')" class="btn btn-danger">Delete</a>'+
                 
			'</div>'+
			'</div>'
			
			
		
	}
}




