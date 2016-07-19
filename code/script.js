window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;

function onInitFs(fs) {
  console.log('Opened file system: ' + fs.name);
}
function errorHandler(e) {

  var msg = '';

  switch (e.code) {
    case FileError.QUOTA_EXCEEDED_ERR:
      msg = 'QUOTA_EXCEEDED_ERR';
      break;
    case FileError.NOT_FOUND_ERR:
      msg = 'NOT_FOUND_ERR';
      break;
    case FileError.SECURITY_ERR:
      msg = 'SECURITY_ERR';
      break;
    case FileError.INVALID_MODIFICATION_ERR:
      msg = 'INVALID_MODIFICATION_ERR';
      break;
    case FileError.INVALID_STATE_ERR:
      msg = 'INVALID_STATE_ERR';
      break;
    default:
      msg = 'Unknown Error';
      break;
  };

  console.log(e);
}
navigator.webkitPersistentStorage.requestQuota (
    1024*1024*8, function(grantedBytes) {  
        console.log('we were granted ', grantedBytes, 'bytes');

    }, function(e) { console.log('Error', e); }
);


document.querySelector('#myfile').onchange = function(e) {
  var files = this.files;

  window.requestFileSystem(window.TEMPORARY, 1024*1024, function(fs) {
    // Duplicate each file the user selected to the app's fs.
    for (var i = 0, file; file = files[i]; ++i) {

      // Capture current iteration's file in local scope for the getFile() callback.
      (function(f) {
        fs.root.getFile(f.name, {create: true, exclusive: true}, function(fileEntry) {
          fileEntry.createWriter(function(fileWriter) {
            fileWriter.write(f); // Note: write() can take a File or Blob object.
            console.log(f.name +':being written');
          }, errorHandler);
        }, errorHandler);
      })(file);

    }
  }, errorHandler);

};

function showFiles(){


	function toArray(list) {
	  return Array.prototype.slice.call(list || [], 0);
	}

	function listResults(entries) {
	  // Document fragments can improve performance since they're only appended
	  // to the DOM once. Only one browser reflow occurs.
	  var fragment = document.createDocumentFragment();

	  entries.forEach(function(entry, i) {
	    var img;
	    if(entry.isFile)
	    switch(entry.name.toUpperCase().substr(-3))
	    {
	    	case 'GIF':
	    	case 'JPG':
	    	case 'PNG': img='<div class="img"></div>';break;
	    	case 'TXT': img='<div class="txt"></div>';break;
	    }
	    if(entry.isDirectory)
	    	img='<div class="dir"></div>';
	    var div = document.createElement('div');
	    div.setAttribute("id","file"+i);
	    sessionStorage.setItem("file"+i,entry.name);
	    div.setAttribute("class","tile");
	    div.innerHTML = [img, '<div class="mid"></div><div>', (entry.name.length>12)?entry.name.substr(0,6)+".."+entry.name.substr(-4):entry.name, '</div>'].join('');
	    fragment.appendChild(div);
	  });

	  document.querySelector('#filelist').appendChild(fragment);
	}

	function onInitFs(fs) {

	  var dirReader = fs.root.createReader();
	  console.log(dirReader);
	  var entries = [];

	  // Call the reader.readEntries() until no more results are returned.
	  var readEntries = function() {
	     dirReader.readEntries (function(results) {
	      if (!results.length) {
	      	console.log("result:")
	      	console.log(results);
	        listResults(entries.sort());
	      } else {
	      	console.log("Result:")
	      	console.log(results);
	        entries = entries.concat(toArray(results));
	        readEntries();
	      }
	    }, errorHandler);
	  };

	  readEntries(); // Start reading dirs.
	}

	window.requestFileSystem(window.TEMPORARY, 1024*1024, onInitFs, errorHandler);
}

function add_mul(){
	var path = 'music/genres/jazz/';

	function createDir(rootDirEntry, folders) {
	  // Throw out './' or '/' and move on to prevent something like '/foo/.//bar'.
	  if (folders[0] == '.' || folders[0] == '') {
	    folders = folders.slice(1);
	  }
	  rootDirEntry.getDirectory(folders[0], {create: true}, function(dirEntry) {
	    // Recursively add the new subfolder (if we still have another to create).
	    if (folders.length) {
	      createDir(dirEntry, folders.slice(1));
	    }
	  }, errorHandler);
	};

	function onInitFs(fs) {
	  createDir(fs.root, path.split('/')); // fs.root is a DirectoryEntry.
	}

	window.requestFileSystem(window.TEMPORARY, 1024*1024, onInitFs, errorHandler);
}
line = function(str,id){
	this.elem = document.createElement("div");
	this.elem.setAttribute("id",id);
    this.elem.innerHTML=str;
}
/*document.onclick=function(event){
	if(!document.querySelector("#popup"))
	{
	var x = event.clientX;
    var y = event.clientY;
    var btn = document.createElement("div");

    btn.setAttribute("class","mk_popup");
    btn.setAttribute("id","popup");
    btn.style.top=y;
    btn.style.left=x;
    document.body.appendChild(btn);
    var bt1 = new line('Create Directory',"cd");
    var bt2 = new line('Create Text File',"ct");
    var bt3 = new line('Create Image File',"ci");
    var bt4 = new line('Paste',"cv");
    btn.appendChild(bt1.elem);
    btn.appendChild(bt2.elem);
    btn.appendChild(bt3.elem);
    //btn.appendChild(document.createElement("hr"));
    btn.appendChild(bt4.elem);
	}
	else {
		document.body.removeChild(document.querySelector('#popup'))
	}
};*/
function def_popup(pos){
	console.log('i too got triggered');
	if(!document.querySelector("#popup"))
	{
	var x = pos.x;
    var y = pos.y;
    var btn = document.createElement("div");

    btn.setAttribute("class","mk_popup");
    btn.setAttribute("id","popup");
    btn.style.top=y;
    btn.style.left=x;
    document.body.appendChild(btn);
    var bt1 = new line('Create Directory',"cd");
    var bt2 = new line('Create Text File',"ct");
    var bt3 = new line('Create Image File',"ci");
    var bt4 = new line('Paste',"cv");
    btn.appendChild(bt1.elem);
    btn.appendChild(bt2.elem);
    btn.appendChild(bt3.elem);
    //btn.appendChild(document.createElement("hr"));
    btn.appendChild(bt4.elem);
	}
	/*else {
		document.body.removeChild(document.querySelector('#popup'))
	}*/
};
/*window.requestFileSystem(window.TEMPORARY, 1024*1024, function(fs) {
  fs.root.getDirectory('New Folder', {create: true}, function(dirEntry) {
  showFiles();}, errorHandler);
}, errorHandler);*/
if(document.querySelector('#cd'))
document.querySelector('#cd').onclick=function (){
	window.requestFileSystem(window.TEMPORARY, 1024*1024, function(fs) {
  fs.root.getDirectory('New Folder', {create: true}, function(dirEntry) {
  showFiles();}, errorHandler);
}, errorHandler);
}

function callback(e) {
    var e = window.e || e;
console.log(e);
if(document.querySelector("#popup2"))
document.body.removeChild(document.querySelector("#popup2"))
if(document.querySelector("#popup"))
document.body.removeChild(document.querySelector("#popup"))
if(e.srcElement.id=="filelist")
{
	console.log(e.srcElement.id);
    def_popup({x:e.clientX,y:e.clientY});
}
else if (e.srcElement && e.srcElement.parentElement && e.srcElement.parentElement.className=="tile"){
	file_popup(e.srcElement.parentElement,{x:e.clientX,y:e.clientY});
}
    // Do something
}

if (document.addEventListener)
    {document.addEventListener('click', callback, false);}
else
    {document.attachEvent('onclick', callback);}

function file_popup(v,pos){
/*if (document.querySelector('#popup'))
	document.body.removeChild(document.querySelector('#popup'))*/
	
	//console.log('i too got triggered');
	if(!document.querySelector("#popup2"))
	{
	var x = pos.x;
    var y = pos.y;
    var btn = document.createElement("div");

    btn.setAttribute("class","mk_popup");
    btn.setAttribute("id","popup2");
    btn.style.top=y;
    btn.style.left=x;
    document.body.appendChild(btn);
    var bt1 = new line('Cut',"cx");
    var bt2 = new line('Copy',"cv");
    var bt3 = new line('Delete',"del");
    var bt4 = new line('Rename',"rn");
    bt3.elem.onclick=function(){
    	console.log(v.childNodes[2].innerText)
    	window.requestFileSystem(window.TEMPORARY, 1024*1024, function(fs) {
		  fs.root.getFile(sessionStorage.getItem(v.id), {create: false}, function(fileEntry) {

		    fileEntry.remove(function() {
		      console.log('File removed.');
		      sessionStorage.removeItem(v.id);
		    }, errorHandler);

		  }, errorHandler);
		}, errorHandler);
    }
    btn.appendChild(bt1.elem);
    btn.appendChild(bt2.elem);
    btn.appendChild(bt3.elem);
    //btn.appendChild(document.createElement("hr"));
    btn.appendChild(bt4.elem);

	}
	/*else {
		document.body.removeChild(document.querySelector('#popup2'))
	}*/
}