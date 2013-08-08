define("gallery/swfupload/swfupload",["swfobject"],function(require,exports,module){var SWFUpload;return void 0==SWFUpload&&(SWFUpload=function(a){this.initSWFUpload(a)}),SWFUpload.prototype.initSWFUpload=function(a){try{this.customSettings={},this.settings={},this.eventQueue=[],this.movieName="SWFUpload_"+SWFUpload.movieCount++,this.movieElement=null,SWFUpload.instances[this.movieName]=this,this.initSettings(a),this.loadSupport(),this.swfuploadPreload()&&this.loadFlash(),this.displayDebugInfo()}catch(b){throw delete SWFUpload.instances[this.movieName],b}},SWFUpload.instances={},SWFUpload.movieCount=0,SWFUpload.version="2.5.0 2010-01-15 Beta 2",SWFUpload.QUEUE_ERROR={QUEUE_LIMIT_EXCEEDED:-100,FILE_EXCEEDS_SIZE_LIMIT:-110,ZERO_BYTE_FILE:-120,INVALID_FILETYPE:-130},SWFUpload.UPLOAD_ERROR={HTTP_ERROR:-200,MISSING_UPLOAD_URL:-210,IO_ERROR:-220,SECURITY_ERROR:-230,UPLOAD_LIMIT_EXCEEDED:-240,UPLOAD_FAILED:-250,SPECIFIED_FILE_ID_NOT_FOUND:-260,FILE_VALIDATION_FAILED:-270,FILE_CANCELLED:-280,UPLOAD_STOPPED:-290,RESIZE:-300},SWFUpload.FILE_STATUS={QUEUED:-1,IN_PROGRESS:-2,ERROR:-3,COMPLETE:-4,CANCELLED:-5},SWFUpload.UPLOAD_TYPE={NORMAL:-1,RESIZED:-2},SWFUpload.BUTTON_ACTION={SELECT_FILE:-100,SELECT_FILES:-110,START_UPLOAD:-120,JAVASCRIPT:-130,NONE:-130},SWFUpload.CURSOR={ARROW:-1,HAND:-2},SWFUpload.WINDOW_MODE={WINDOW:"window",TRANSPARENT:"transparent",OPAQUE:"opaque"},SWFUpload.RESIZE_ENCODING={JPEG:-1,PNG:-2},SWFUpload.completeURL=function(a){try{var b="",c=-1;return"string"!=typeof a||a.match(/^https?:\/\//i)||a.match(/^\//)||""===a?a:(c=window.location.pathname.lastIndexOf("/"),b=0>=c?"/":window.location.pathname.substr(0,c)+"/",b+a)}catch(d){return a}},SWFUpload.onload=function(){},SWFUpload.prototype.initSettings=function(a){this.ensureDefault=function(b,c){var d=a[b];this.settings[b]=void 0!=d?d:c},this.ensureDefault("upload_url",""),this.ensureDefault("preserve_relative_urls",!1),this.ensureDefault("file_post_name","Filedata"),this.ensureDefault("post_params",{}),this.ensureDefault("use_query_string",!1),this.ensureDefault("requeue_on_error",!1),this.ensureDefault("http_success",[]),this.ensureDefault("assume_success_timeout",0),this.ensureDefault("file_types","*.*"),this.ensureDefault("file_types_description","All Files"),this.ensureDefault("file_size_limit",0),this.ensureDefault("file_upload_limit",0),this.ensureDefault("file_queue_limit",0),this.ensureDefault("flash_url","swfupload.swf"),this.ensureDefault("flash9_url","swfupload_fp9.swf"),this.ensureDefault("prevent_swf_caching",!0),this.ensureDefault("button_image_url",""),this.ensureDefault("button_width",1),this.ensureDefault("button_height",1),this.ensureDefault("button_text",""),this.ensureDefault("button_text_style","color: #000000; font-size: 16pt;"),this.ensureDefault("button_text_top_padding",0),this.ensureDefault("button_text_left_padding",0),this.ensureDefault("button_action",SWFUpload.BUTTON_ACTION.SELECT_FILES),this.ensureDefault("button_disabled",!1),this.ensureDefault("button_placeholder_id",""),this.ensureDefault("button_placeholder",null),this.ensureDefault("button_cursor",SWFUpload.CURSOR.ARROW),this.ensureDefault("button_window_mode",SWFUpload.WINDOW_MODE.WINDOW),this.ensureDefault("debug",!1),this.settings.debug_enabled=this.settings.debug,this.settings.return_upload_start_handler=this.returnUploadStart,this.ensureDefault("swfupload_preload_handler",null),this.ensureDefault("swfupload_load_failed_handler",null),this.ensureDefault("swfupload_loaded_handler",null),this.ensureDefault("file_dialog_start_handler",null),this.ensureDefault("file_queued_handler",null),this.ensureDefault("file_queue_error_handler",null),this.ensureDefault("file_dialog_complete_handler",null),this.ensureDefault("upload_resize_start_handler",null),this.ensureDefault("upload_start_handler",null),this.ensureDefault("upload_progress_handler",null),this.ensureDefault("upload_error_handler",null),this.ensureDefault("upload_success_handler",null),this.ensureDefault("upload_complete_handler",null),this.ensureDefault("mouse_click_handler",null),this.ensureDefault("mouse_out_handler",null),this.ensureDefault("mouse_over_handler",null),this.ensureDefault("debug_handler",this.debugMessage),this.ensureDefault("custom_settings",{}),this.customSettings=this.settings.custom_settings,this.settings.prevent_swf_caching&&(this.settings.flash_url=this.settings.flash_url+(this.settings.flash_url.indexOf("?")<0?"?":"&")+"preventswfcaching="+(new Date).getTime(),this.settings.flash9_url=this.settings.flash9_url+(this.settings.flash9_url.indexOf("?")<0?"?":"&")+"preventswfcaching="+(new Date).getTime()),this.settings.preserve_relative_urls||(this.settings.upload_url=SWFUpload.completeURL(this.settings.upload_url),this.settings.button_image_url=SWFUpload.completeURL(this.settings.button_image_url)),delete this.ensureDefault},SWFUpload.prototype.loadSupport=function(){this.support={loading:swfobject.hasFlashPlayerVersion("9.0.28"),imageResize:swfobject.hasFlashPlayerVersion("10.0.0")}},SWFUpload.prototype.loadFlash=function(){var a,b,c,d,e;if(!this.support.loading)return this.queueEvent("swfupload_load_failed_handler",["Flash Player doesn't support SWFUpload"]),void 0;if(null!==document.getElementById(this.movieName))return this.support.loading=!1,this.queueEvent("swfupload_load_failed_handler",["Element ID already in use"]),void 0;if(a=document.getElementById(this.settings.button_placeholder_id)||this.settings.button_placeholder,void 0==a)return this.support.loading=!1,this.queueEvent("swfupload_load_failed_handler",["button place holder not found"]),void 0;c="block"!==(a.currentStyle&&a.currentStyle.display||window.getComputedStyle&&document.defaultView.getComputedStyle(a,null).getPropertyValue("display"))?"span":"div",b=document.createElement(c),d=this.getFlashHTML();try{b.innerHTML=d}catch(f){return this.support.loading=!1,this.queueEvent("swfupload_load_failed_handler",["Exception loading Flash HTML into placeholder"]),void 0}return e=b.getElementsByTagName("object"),!e||e.length>1||0===e.length?(this.support.loading=!1,this.queueEvent("swfupload_load_failed_handler",["Unable to find movie after adding to DOM"]),void 0):(1===e.length&&(this.movieElement=e[0]),a.parentNode.replaceChild(b.firstChild,a),void 0==window[this.movieName]&&(window[this.movieName]=this.getMovieElement()),void 0)},SWFUpload.prototype.getFlashHTML=function(){return['<object id="',this.movieName,'" type="application/x-shockwave-flash" data="',this.support.imageResize?this.settings.flash_url:this.settings.flash9_url,'" width="',this.settings.button_width,'" height="',this.settings.button_height,'" class="swfupload">','<param name="wmode" value="',this.settings.button_window_mode,'" />','<param name="movie" value="',this.support.imageResize?this.settings.flash_url:this.settings.flash9_url,'" />','<param name="quality" value="high" />','<param name="allowScriptAccess" value="always" />','<param name="flashvars" value="'+this.getFlashVars()+'" />',"</object>"].join("")},SWFUpload.prototype.getFlashVars=function(){var a,b;return b=this.buildParamString(),a=this.settings.http_success.join(","),["movieName=",encodeURIComponent(this.movieName),"&amp;uploadURL=",encodeURIComponent(this.settings.upload_url),"&amp;useQueryString=",encodeURIComponent(this.settings.use_query_string),"&amp;requeueOnError=",encodeURIComponent(this.settings.requeue_on_error),"&amp;httpSuccess=",encodeURIComponent(a),"&amp;assumeSuccessTimeout=",encodeURIComponent(this.settings.assume_success_timeout),"&amp;params=",encodeURIComponent(b),"&amp;filePostName=",encodeURIComponent(this.settings.file_post_name),"&amp;fileTypes=",encodeURIComponent(this.settings.file_types),"&amp;fileTypesDescription=",encodeURIComponent(this.settings.file_types_description),"&amp;fileSizeLimit=",encodeURIComponent(this.settings.file_size_limit),"&amp;fileUploadLimit=",encodeURIComponent(this.settings.file_upload_limit),"&amp;fileQueueLimit=",encodeURIComponent(this.settings.file_queue_limit),"&amp;debugEnabled=",encodeURIComponent(this.settings.debug_enabled),"&amp;buttonImageURL=",encodeURIComponent(this.settings.button_image_url),"&amp;buttonWidth=",encodeURIComponent(this.settings.button_width),"&amp;buttonHeight=",encodeURIComponent(this.settings.button_height),"&amp;buttonText=",encodeURIComponent(this.settings.button_text),"&amp;buttonTextTopPadding=",encodeURIComponent(this.settings.button_text_top_padding),"&amp;buttonTextLeftPadding=",encodeURIComponent(this.settings.button_text_left_padding),"&amp;buttonTextStyle=",encodeURIComponent(this.settings.button_text_style),"&amp;buttonAction=",encodeURIComponent(this.settings.button_action),"&amp;buttonDisabled=",encodeURIComponent(this.settings.button_disabled),"&amp;buttonCursor=",encodeURIComponent(this.settings.button_cursor)].join("")},SWFUpload.prototype.getMovieElement=function(){if(void 0==this.movieElement&&(this.movieElement=document.getElementById(this.movieName)),null===this.movieElement)throw"Could not find Flash element";return this.movieElement},SWFUpload.prototype.buildParamString=function(){var a,b,c=[];if(b=this.settings.post_params,"object"==typeof b)for(a in b)b.hasOwnProperty(a)&&c.push(encodeURIComponent(a.toString())+"="+encodeURIComponent(b[a].toString()));return c.join("&amp;")},SWFUpload.prototype.destroy=function(){var a;try{if(this.cancelUpload(null,!1),a=this.cleanUp())try{a.parentNode.removeChild(a)}catch(b){}return window[this.movieName]=null,SWFUpload.instances[this.movieName]=null,delete SWFUpload.instances[this.movieName],this.movieElement=null,this.settings=null,this.customSettings=null,this.eventQueue=null,this.movieName=null,!0}catch(c){return!1}},SWFUpload.prototype.displayDebugInfo=function(){this.debug(["---SWFUpload Instance Info---\n","Version: ",SWFUpload.version,"\n","Movie Name: ",this.movieName,"\n","Settings:\n","	","upload_url:               ",this.settings.upload_url,"\n","	","flash_url:                ",this.settings.flash_url,"\n","	","flash9_url:                ",this.settings.flash9_url,"\n","	","use_query_string:         ",this.settings.use_query_string.toString(),"\n","	","requeue_on_error:         ",this.settings.requeue_on_error.toString(),"\n","	","http_success:             ",this.settings.http_success.join(", "),"\n","	","assume_success_timeout:   ",this.settings.assume_success_timeout,"\n","	","file_post_name:           ",this.settings.file_post_name,"\n","	","post_params:              ",this.settings.post_params.toString(),"\n","	","file_types:               ",this.settings.file_types,"\n","	","file_types_description:   ",this.settings.file_types_description,"\n","	","file_size_limit:          ",this.settings.file_size_limit,"\n","	","file_upload_limit:        ",this.settings.file_upload_limit,"\n","	","file_queue_limit:         ",this.settings.file_queue_limit,"\n","	","debug:                    ",this.settings.debug.toString(),"\n","	","prevent_swf_caching:      ",this.settings.prevent_swf_caching.toString(),"\n","	","button_placeholder_id:    ",this.settings.button_placeholder_id.toString(),"\n","	","button_placeholder:       ",this.settings.button_placeholder?"Set":"Not Set","\n","	","button_image_url:         ",this.settings.button_image_url.toString(),"\n","	","button_width:             ",this.settings.button_width.toString(),"\n","	","button_height:            ",this.settings.button_height.toString(),"\n","	","button_text:              ",this.settings.button_text.toString(),"\n","	","button_text_style:        ",this.settings.button_text_style.toString(),"\n","	","button_text_top_padding:  ",this.settings.button_text_top_padding.toString(),"\n","	","button_text_left_padding: ",this.settings.button_text_left_padding.toString(),"\n","	","button_action:            ",this.settings.button_action.toString(),"\n","	","button_cursor:            ",this.settings.button_cursor.toString(),"\n","	","button_disabled:          ",this.settings.button_disabled.toString(),"\n","	","custom_settings:          ",this.settings.custom_settings.toString(),"\n","Event Handlers:\n","	","swfupload_preload_handler assigned:  ",("function"==typeof this.settings.swfupload_preload_handler).toString(),"\n","	","swfupload_load_failed_handler assigned:  ",("function"==typeof this.settings.swfupload_load_failed_handler).toString(),"\n","	","swfupload_loaded_handler assigned:  ",("function"==typeof this.settings.swfupload_loaded_handler).toString(),"\n","	","mouse_click_handler assigned:       ",("function"==typeof this.settings.mouse_click_handler).toString(),"\n","	","mouse_over_handler assigned:        ",("function"==typeof this.settings.mouse_over_handler).toString(),"\n","	","mouse_out_handler assigned:         ",("function"==typeof this.settings.mouse_out_handler).toString(),"\n","	","file_dialog_start_handler assigned: ",("function"==typeof this.settings.file_dialog_start_handler).toString(),"\n","	","file_queued_handler assigned:       ",("function"==typeof this.settings.file_queued_handler).toString(),"\n","	","file_queue_error_handler assigned:  ",("function"==typeof this.settings.file_queue_error_handler).toString(),"\n","	","upload_resize_start_handler assigned:      ",("function"==typeof this.settings.upload_resize_start_handler).toString(),"\n","	","upload_start_handler assigned:      ",("function"==typeof this.settings.upload_start_handler).toString(),"\n","	","upload_progress_handler assigned:   ",("function"==typeof this.settings.upload_progress_handler).toString(),"\n","	","upload_error_handler assigned:      ",("function"==typeof this.settings.upload_error_handler).toString(),"\n","	","upload_success_handler assigned:    ",("function"==typeof this.settings.upload_success_handler).toString(),"\n","	","upload_complete_handler assigned:   ",("function"==typeof this.settings.upload_complete_handler).toString(),"\n","	","debug_handler assigned:             ",("function"==typeof this.settings.debug_handler).toString(),"\n","Support:\n","	","Load:                     ",this.support.loading?"Yes":"No","\n","	","Image Resize:             ",this.support.imageResize?"Yes":"No","\n"].join(""))},SWFUpload.prototype.addSetting=function(a,b,c){return this.settings[a]=void 0==b?c:b},SWFUpload.prototype.getSetting=function(a){return void 0!=this.settings[a]?this.settings[a]:""},SWFUpload.prototype.callFlash=function(functionName,argumentArray){var movieElement,returnValue,returnString;argumentArray=argumentArray||[],movieElement=this.getMovieElement();try{void 0!=movieElement?(returnString=movieElement.CallFunction('<invoke name="'+functionName+'" returntype="javascript">'+__flash__argumentsToXML(argumentArray,0)+"</invoke>"),returnValue=eval(returnString)):this.debug("Can't call flash because the movie wasn't found.")}catch(ex){this.debug("Exception calling flash function '"+functionName+"': "+ex.message)}return void 0!=returnValue&&"object"==typeof returnValue.post&&(returnValue=this.unescapeFilePostParams(returnValue)),returnValue},SWFUpload.prototype.selectFile=function(){this.callFlash("SelectFile")},SWFUpload.prototype.selectFiles=function(){this.callFlash("SelectFiles")},SWFUpload.prototype.startUpload=function(a){this.callFlash("StartUpload",[a])},SWFUpload.prototype.startResizedUpload=function(a,b,c,d,e,f){this.callFlash("StartUpload",[a,{width:b,height:c,encoding:d,quality:e,allowEnlarging:f}])},SWFUpload.prototype.cancelUpload=function(a,b){b!==!1&&(b=!0),this.callFlash("CancelUpload",[a,b])},SWFUpload.prototype.stopUpload=function(){this.callFlash("StopUpload")},SWFUpload.prototype.requeueUpload=function(a){return this.callFlash("RequeueUpload",[a])},SWFUpload.prototype.getStats=function(){return this.callFlash("GetStats")},SWFUpload.prototype.setStats=function(a){this.callFlash("SetStats",[a])},SWFUpload.prototype.getFile=function(a){return"number"==typeof a?this.callFlash("GetFileByIndex",[a]):this.callFlash("GetFile",[a])},SWFUpload.prototype.getQueueFile=function(a){return"number"==typeof a?this.callFlash("GetFileByQueueIndex",[a]):this.callFlash("GetFile",[a])},SWFUpload.prototype.addFileParam=function(a,b,c){return this.callFlash("AddFileParam",[a,b,c])},SWFUpload.prototype.removeFileParam=function(a,b){this.callFlash("RemoveFileParam",[a,b])},SWFUpload.prototype.setUploadURL=function(a){this.settings.upload_url=a.toString(),this.callFlash("SetUploadURL",[a])},SWFUpload.prototype.setPostParams=function(a){this.settings.post_params=a,this.callFlash("SetPostParams",[a])},SWFUpload.prototype.addPostParam=function(a,b){this.settings.post_params[a]=b,this.callFlash("SetPostParams",[this.settings.post_params])},SWFUpload.prototype.removePostParam=function(a){delete this.settings.post_params[a],this.callFlash("SetPostParams",[this.settings.post_params])},SWFUpload.prototype.setFileTypes=function(a,b){this.settings.file_types=a,this.settings.file_types_description=b,this.callFlash("SetFileTypes",[a,b])},SWFUpload.prototype.setFileSizeLimit=function(a){this.settings.file_size_limit=a,this.callFlash("SetFileSizeLimit",[a])},SWFUpload.prototype.setFileUploadLimit=function(a){this.settings.file_upload_limit=a,this.callFlash("SetFileUploadLimit",[a])},SWFUpload.prototype.setFileQueueLimit=function(a){this.settings.file_queue_limit=a,this.callFlash("SetFileQueueLimit",[a])},SWFUpload.prototype.setFilePostName=function(a){this.settings.file_post_name=a,this.callFlash("SetFilePostName",[a])},SWFUpload.prototype.setUseQueryString=function(a){this.settings.use_query_string=a,this.callFlash("SetUseQueryString",[a])},SWFUpload.prototype.setRequeueOnError=function(a){this.settings.requeue_on_error=a,this.callFlash("SetRequeueOnError",[a])},SWFUpload.prototype.setHTTPSuccess=function(a){"string"==typeof a&&(a=a.replace(" ","").split(",")),this.settings.http_success=a,this.callFlash("SetHTTPSuccess",[a])},SWFUpload.prototype.setAssumeSuccessTimeout=function(a){this.settings.assume_success_timeout=a,this.callFlash("SetAssumeSuccessTimeout",[a])},SWFUpload.prototype.setDebugEnabled=function(a){this.settings.debug_enabled=a,this.callFlash("SetDebugEnabled",[a])},SWFUpload.prototype.setButtonImageURL=function(a){void 0==a&&(a=""),this.settings.button_image_url=a,this.callFlash("SetButtonImageURL",[a])},SWFUpload.prototype.setButtonDimensions=function(a,b){this.settings.button_width=a,this.settings.button_height=b;var c=this.getMovieElement();void 0!=c&&(c.style.width=a+"px",c.style.height=b+"px"),this.callFlash("SetButtonDimensions",[a,b])},SWFUpload.prototype.setButtonText=function(a){this.settings.button_text=a,this.callFlash("SetButtonText",[a])},SWFUpload.prototype.setButtonTextPadding=function(a,b){this.settings.button_text_top_padding=b,this.settings.button_text_left_padding=a,this.callFlash("SetButtonTextPadding",[a,b])},SWFUpload.prototype.setButtonTextStyle=function(a){this.settings.button_text_style=a,this.callFlash("SetButtonTextStyle",[a])},SWFUpload.prototype.setButtonDisabled=function(a){this.settings.button_disabled=a,this.callFlash("SetButtonDisabled",[a])},SWFUpload.prototype.setButtonAction=function(a){this.settings.button_action=a,this.callFlash("SetButtonAction",[a])},SWFUpload.prototype.setButtonCursor=function(a){this.settings.button_cursor=a,this.callFlash("SetButtonCursor",[a])},SWFUpload.prototype.queueEvent=function(a,b){var c=this;if(void 0==b?b=[]:b instanceof Array||(b=[b]),"function"==typeof this.settings[a])this.eventQueue.push(function(){this.settings[a].apply(this,b)}),setTimeout(function(){c.executeNextEvent()},0);else if(null!==this.settings[a])throw"Event handler "+a+" is unknown or is not a function"},SWFUpload.prototype.executeNextEvent=function(){var a=this.eventQueue?this.eventQueue.shift():null;"function"==typeof a&&a.apply(this)},SWFUpload.prototype.unescapeFilePostParams=function(a){var d,e,f,b=/[$]([0-9a-f]{4})/i,c={};if(void 0!=a){for(e in a.post)if(a.post.hasOwnProperty(e)){for(d=e;null!==(f=b.exec(d));)d=d.replace(f[0],String.fromCharCode(parseInt("0x"+f[1],16)));c[d]=a.post[e]}a.post=c}return a},SWFUpload.prototype.swfuploadPreload=function(){var a;if("function"==typeof this.settings.swfupload_preload_handler)a=this.settings.swfupload_preload_handler.call(this);else if(void 0!=this.settings.swfupload_preload_handler)throw"upload_start_handler must be a function";return void 0===a&&(a=!0),!!a},SWFUpload.prototype.flashReady=function(){var a=this.cleanUp();return a?(this.queueEvent("swfupload_loaded_handler"),void 0):(this.debug("Flash called back ready but the flash movie can't be found."),void 0)},SWFUpload.prototype.cleanUp=function(){var a,b=this.getMovieElement();try{if(b&&"unknown"==typeof b.CallFunction){this.debug("Removing Flash functions hooks (this should only run in IE and should prevent memory leaks)");for(a in b)try{"function"==typeof b[a]&&(b[a]=null)}catch(c){}}}catch(d){}return window.__flash__removeCallback=function(a,b){try{a&&(a[b]=null)}catch(c){}},b},SWFUpload.prototype.mouseClick=function(){this.queueEvent("mouse_click_handler")},SWFUpload.prototype.mouseOver=function(){this.queueEvent("mouse_over_handler")},SWFUpload.prototype.mouseOut=function(){this.queueEvent("mouse_out_handler")},SWFUpload.prototype.fileDialogStart=function(){this.queueEvent("file_dialog_start_handler")},SWFUpload.prototype.fileQueued=function(a){a=this.unescapeFilePostParams(a),this.queueEvent("file_queued_handler",a)},SWFUpload.prototype.fileQueueError=function(a,b,c){a=this.unescapeFilePostParams(a),this.queueEvent("file_queue_error_handler",[a,b,c])},SWFUpload.prototype.fileDialogComplete=function(a,b,c){this.queueEvent("file_dialog_complete_handler",[a,b,c])},SWFUpload.prototype.uploadResizeStart=function(a,b){a=this.unescapeFilePostParams(a),this.queueEvent("upload_resize_start_handler",[a,b.width,b.height,b.encoding,b.quality])},SWFUpload.prototype.uploadStart=function(a){a=this.unescapeFilePostParams(a),this.queueEvent("return_upload_start_handler",a)},SWFUpload.prototype.returnUploadStart=function(a){var b;if("function"==typeof this.settings.upload_start_handler)a=this.unescapeFilePostParams(a),b=this.settings.upload_start_handler.call(this,a);else if(void 0!=this.settings.upload_start_handler)throw"upload_start_handler must be a function";void 0===b&&(b=!0),b=!!b,this.callFlash("ReturnUploadStart",[b])},SWFUpload.prototype.uploadProgress=function(a,b,c){a=this.unescapeFilePostParams(a),this.queueEvent("upload_progress_handler",[a,b,c])},SWFUpload.prototype.uploadError=function(a,b,c){a=this.unescapeFilePostParams(a),this.queueEvent("upload_error_handler",[a,b,c])},SWFUpload.prototype.uploadSuccess=function(a,b,c){a=this.unescapeFilePostParams(a),this.queueEvent("upload_success_handler",[a,b,c])},SWFUpload.prototype.uploadComplete=function(a){a=this.unescapeFilePostParams(a),this.queueEvent("upload_complete_handler",a)},SWFUpload.prototype.debug=function(a){this.queueEvent("debug_handler",a)},SWFUpload.prototype.debugMessage=function(a){var b,c,d;if(this.settings.debug)if(c=[],"object"==typeof a&&"string"==typeof a.name&&"string"==typeof a.message){for(d in a)a.hasOwnProperty(d)&&c.push(d+": "+a[d]);b=c.join("\n")||"",c=b.split("\n"),b="EXCEPTION: "+c.join("\nEXCEPTION: "),SWFUpload.Console.writeLine(b)}else SWFUpload.Console.writeLine(a)},SWFUpload.Console={},SWFUpload.Console.writeLine=function(a){var b,c;try{b=document.getElementById("SWFUpload_Console"),b||(c=document.createElement("form"),document.getElementsByTagName("body")[0].appendChild(c),b=document.createElement("textarea"),b.id="SWFUpload_Console",b.style.fontFamily="monospace",b.setAttribute("wrap","off"),b.wrap="off",b.style.overflow="auto",b.style.width="700px",b.style.height="350px",b.style.margin="5px",c.appendChild(b)),b.value+=a+"\n",b.scrollTop=b.scrollHeight-b.clientHeight}catch(d){alert("Exception: "+d.name+" Message: "+d.message)}},SWFUpload});