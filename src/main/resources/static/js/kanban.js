





/*

본인이 작성한 부분에 주석을 달아놓았습니다.
김선 으로 검색하면 편하게 찾아보실 수 있습니다.

*/









//칸반 버튼 색 바꾸기
if(bgColor == '5f76e8') {
	$('.kanban-list-add').attr("class", 'kanban-list-add btn-primary');
}
if(bgColor == '22ca80') {
	$('.kanban-list-add').attr("class", 'kanban-list-add btn-success');
}
if(bgColor == 'fdc16a') {
	$('.kanban-list-add').attr("class", 'kanban-list-add btn-warning');
}
if(bgColor == 'ff4f70') {
	$('.kanban-list-add').attr("class", 'kanban-list-add btn-danger');
}
if(bgColor == 'e8eaec' || bgColor == 'ffffff') {
	$('.kanban-list-add').attr("class", 'kanban-list-add btn-light');
	$('.kanban-list-add-header').css("color", 'black');
}
if(bgColor == '6c757d') {
	$('.kanban-list-add').attr("class", 'kanban-list-add btn-secondary');
}
if(bgColor == '1c2d41') {
	$('.kanban-list-add').attr("class", 'kanban-list-add btn-dark');
}


//카드 추가 버튼
var addcardbtn = 
"<div class='kanban-card-add-list' id='addcardel'>"
+ "<a class='kanban-card-add-el btn-light-my' id='addcard'>"
   +  "<span class='icon'>+</span>"
    + "<span class='kanban-card-add-text'>Add Card</span>"
 + "</a>"
+ "</div>"


//리스트
var addlistTag = 
  "<div class='kanban-list-wrapper'>"
    + "<div class='kanban-list-content'>"
        + "<div class='kanban-card' ondrop='drop(event, this)' ondragover='allowDrop(event)'> "
            + "<div class='kanban-list-header-input'id='listheader'>"
            + "<textarea rows='1' class='autosize list-composer-textarea' placeholder='Enter a title for this list' style='overflow: hidden; overflow-wrap: break-word; resize: none; '></textarea>"
            + "</div>"
            + "<a class='kanban-list-menu far fa-trash-alt'>"
                + "<span class=''></span>"
            + "</a>"
            + "<a class='btn btn-primary kanban-addlistdone'>Add List</a>"
            + "<a class='btn btn-secondary kanban-addlistCancle'>cancle</a>"
        + "</div>"
    + "</div>"
+ "</div>";


//파일 추가 
var uploadFileTag =  "<div class='card-modal-list-cloudfile'>"
						   +"<p class='card-modal-list-cloud'>"
							   +"<a class='card-modal-fileLink' download>"
								   +"<span class='card-modal-filename'>"
								   +"</span>"
							   +"</a>"
							   +"<span class='card-modal-file-delete far fa-trash-alt'></span>"
						   +"</p>"
					+"</div>";


/**
 * @함수명 : addUploadFileTag(parent, file)
 * @작성자 : 김선
 * @설명 : parent element에 file 내용을 반영해서 html append, attribute 값 변경 
 **/  
function addUploadFileTag(parent, file){
	
	let filePath = 'cloud/'+ $('#teamNo').val() + '/' + file.fileName;
	parent.append(uploadFileTag);
	parent.find('.card-modal-filename').last().append(file.originFileName);
	parent.find('.card-modal-file-delete').last().attr('fileNo', file.fileNo);
	parent.find('.card-modal-fileLink').last().attr('href', filePath);
	parent.find('.card-modal-fileLink').last().attr('download', file.originFileName);
}


/**
 * @함수명 : addCardFileCountTag(parent, fileCount)
 * @작성자 : 김선
 * @설명 : parent element에 fileCount 내용을 반영해서 html append
 **/  
function addCardFileCountTag(parent, fileCount){
	let cardFileCountIcon = "<div class='kanban-card-badge' title='file'>"
								+"<span class='icon-paper-clip badge-icon'></span>"
								+"<span class='badge-text'>"
								+ fileCount
								+"</span>"
							+"</div>";
	parent.append(cardFileCountIcon);
}

var startListIDX = "";
var endListIDX = "";
var currentCardNo = "";
var startListNo = "";
var endListNo = "";
var startCardIDX = "";
var endCardIDX = "";

/**
 * @작성자 : 김선
 * @설명 : 칸반 카드에 Sortable 적용
 **/  
 $('.divForDragNDrop').sortable({
	 connectWith: '.divForDragNDrop',
	 start( event, ui ){
		 currentCardNo = ui.item.data('cardno');
		 startCardIDX = ui.item.index();
		 startListNo = ui.item.parents('div.kanban-list-content').data('listno');
	 },
	 
	 receive: function(event, ui){ // 다른 리스트간 이동
		 endCardIDX = ui.item.index();
       	 endListNo = ui.item.parents('div.kanban-list-content').data('listno');
       	 
       	 if(startListNo != endListNo){
       		
       		 $.ajax({
       				url: "resortKanbanCard.ajax",
       				data: {
       						"allBoardListNo": $.trim($('#allBoardListNo').val()),
       						"kanbanCardNo": $.trim(currentCardNo),
       						"startListNo": $.trim(startListNo),
       						"endListNo": $.trim(endListNo),
       						"startCardIDX": $.trim(startCardIDX),
       						"endCardIDX": $.trim(endCardIDX) 
       						},
       				success: function() {
       						},
       				error: function(e){
       				}
       		 });
       	 }
	 },
	 stop( event, ui ){ // 같은 리스트 내에서 이동
     	
     	//같은 카드 내에서 이동될 경우 recive를 사용할 수 없다
     	endCardIDX = ui.item.index();
     	endListNo = ui.item.parents('div.kanban-list-content').data('listno');

     	
      	 if((startListNo == endListNo) && (startCardIDX != endCardIDX)){
        		
       		 $.ajax({
       				url: "resortKanbanCard.ajax",
       				data: {
       						"allBoardListNo": $.trim($('#allBoardListNo').val()),
       						"kanbanCardNo": $.trim(currentCardNo),
       						"startListNo": $.trim(startListNo),
       						"endListNo": $.trim(endListNo),
       						"startCardIDX": $.trim(startCardIDX),
       						"endCardIDX": $.trim(endCardIDX) 
       						},
       				success: function() {
       						},
       				error: function(e){
       				}
       		 });
       	 }
     	
		 
	 }
	 
 });
 
 
 
/**
 * @작성자 : 김선
 * @설명 : 칸반 리스트에 Sortable 적용
 **/  
 $('#kanban').sortable({ // 상위요소
   	 items: ".kanban-list-wrapper",
        itemOrientation: "horizontal",
        handle: ".kanban-list-title", // 이부분 주석처리하면 버튼도 움직임..
        moveItemOnDrop: true,
        start( event, ui ){
       	 startListIDX = ui.item.index();
        },
        deactivate( event, ui ){
	       	 endListIDX = ui.item.index();
	       	 let currentListNo = ui.item.children().data('listno');
	       	 
	       	 if(!(startListIDX == endListIDX)){
	       		 
	       		 $.ajax({
	       				url: "resortKanbanList.ajax",
	       				data: {
	       						"kanbanListNo": $.trim(currentListNo),
	       						"startListIDX": $.trim(startListIDX),
	       						"endListIDX": $.trim(endListIDX)
	       						},
	       				success: function() {
	       						},
	       				error: function(e){
	       				}
	       		 });
	       	 }
        },
        stop( event, ui ){
        	kanbanListArr = ui.item.parent().find('.kanban-list-content');
        	
        	$.each(kanbanListArr, function(index, item){
        		$(item).attr('data-listindex', index); // 재정렬된 요소에 index 속성 새로 부여하기
        	});
        }
        
    });


	
var boardName =""

//텍스트에어리어 사이즈 자동 조절
function resize(obj) {
        obj.style.height = "1px";
        obj.style.height = (obj.scrollHeight)+"px";
    }
    $(document).on('keydown','.autosize',function() {
        resize(this);
    });
    $(document).on('focus','.autosize',function() {
        resize(this);
    });
    $(document).on('keyup','.autosize',function() {
        resize(this);
});

    
    
/**
 * @함수명 : 익명함수
 * @작성자 : 김선
 * @설명 : 칸반 리스트 추가
 **/         
$(document).on('click', '#addlist', function() {

    $(this).before(addlistTag);
    
	let trashIcon = $(this).prev().find('a.fa-trash-alt');
	let titleInputBox = $(this).prev().find('.list-composer-textarea');
      
    trashIcon.hide();  
    $(this).hide()
    
    titleInputBox.focus();

    //새로 생성된 리스트에 드래그앤 드롭 적용
    $('#kanban').sortable({ // 상위요소
   	 items: ".kanban-list-wrapper",
        itemOrientation: "horizontal",
        handle: ".kanban-list-title", 
        moveItemOnDrop: true,
        
        start( event, ui ){
       	 startListIDX = ui.item.index();
        },
        deactivate( event, ui ){
	       	 endListIDX = ui.item.index();
	       	 let currentListNo = ui.item.children().data('listno');
	       	 
	       	 if(!(startListIDX == endListIDX)){
	       		
	       		 $.ajax({
	       				url: "resortKanbanList.ajax",
	       				data: {
	       						"allBoardListNo": $.trim($('#allBoardListNo').val()),
	       						"kanbanListNo": $.trim(currentListNo),
	       						"startListIDX": $.trim(startListIDX),
	       						"endListIDX": $.trim(endListIDX)
	       						},
	       		        dataType: "json",
	       				success: function() {
	       						},
	       				error: function(e){
	       				}
	       		 });
	       	 }
        },
        stop( event, ui ){
        	kanbanListArr = ui.item.parent().find('.kanban-list-content');
        	
        	$.each(kanbanListArr, function(index, item){
        		$(item).attr('data-listindex', index); // 재정렬된 요소에 index 속성 새로 부여하기
        	});
        }
        
    });
    
});



/**
 * @함수명 : 익명함수
 * @작성자 : 김선
 * @설명 : 칸반 리스트 추가 취소
 **/         
$(document).on('click', '.kanban-addlistCancle', function(){
	let listWrapper = $(this).parents('.kanban-list-wrapper');
	
	listWrapper.remove(); // 인풋 div 제거
	$('#addlist').show(); // +Add List 살리기
	
});


/**
 * @함수명 : 익명함수
 * @작성자 : 김선
 * @설명 : 칸반 리스트 추가 완료 후 변경사항 비동기 적용
 **/         
$('#kanban').on('click', '.kanban-addlistdone', function() {
	
    let listName = $(this).parent().find('textarea').val();
		
    let allBoardListNo = Number($('#allBoardListNo').val());
    let kanbanListContent = $(this).parent().parent();
    let titleInputBox = $(this).siblings('div').find('textarea');
    let new1 = $(this).parent();
    let addlist = $(this).parents('.kanban-list-wrapper').next();
    let txtIpTrIconAddBtn = $(this).parent().children();
    let newKanbanList = $(this).parents().find('.kanban-list-wrapper').last();
    
    let kanbanListIndex = newKanbanList.index();
    
	if(listName == "") { // 리스트 제목을 입력하지 않은 경우
        alert('list title을 입력하세요.');        
        titleInputBox.focus(); //input on focus       
		return;
    }

	txtIpTrIconAddBtn.remove();
    
    new1.append("<div class='kanban-list-header'id='listheader'>"
	    		+"<h4 class='kanban-list-title'>"+listName+"</h4>"
	    		+"</div>"
	    		+ "<a class='kanban-list-menu far fa-trash-alt' data-toggle='modal' data-target='#info-alert-modal'>"
	    		+ "</a>"
	    		+ "<div class='divForDragNDrop'></div>")
	    		  .find('.divForDragNDrop').sortable({
	    			 connectWith: '.divForDragNDrop'
	    		 });
    
    kanbanListContent.attr('data-title', listName);			//속성에 listName추가하기
	kanbanListContent.attr('data-listindex', kanbanListIndex);    //속성에 index 추가하기
    
    new1.append(addcardbtn);
    var trash = $(this).prev();
    
    $(this).remove();
    addlist.show()

    $.ajax({
		url: "InsertKanbanList.ajax",
		data: {
				"listTitle": $.trim(listName),
				"kanbanListIndex": $.trim(kanbanListIndex),
				"allBoardListNo": $.trim(allBoardListNo)
				},
        dataType: "text",
		success: function(resData) {
			kanbanListContent.attr('data-listno', resData);
		}
	});
	
});


/**
 * @함수명 : 익명함수
 * @작성자 : 김선, 박혜정
 * @설명 : 칸반 리스트 제목 수정
 **/         
$('#kanban').on('click', '.kanban-list-title', function() {

    let allBoardListNo = Number($('#allBoardListNo').val());
	let kanbanList = $(this);
	let deleteIcon = $(this).parent().next();
	let listName = $(this).text();
	let kanbanListNo = $(this).parents('.kanban-list-content').attr('data-listno');

	$(this).before("<textarea rows='1' class='autosize list-composer-textarea-edit' id='listNameInput' style='overflow: hidden; overflow-wrap: break-word; resize: none;'>"+listName+"</textarea>");
    $('#listNameInput').focus();

    deleteIcon.hide(); // 휴지통 아이콘 숨기기
	kanbanList.hide();// 보여지는 제목
	
	$('#listNameInput').blur(function() {
		if($(this).val() == "") {
			alert('list Name을 입력하세요');
			$(this).focus();
			return;
		}
		
		let newKanbanListName = $(this).val(); //변경된 title
        
		$('.deleteListDiv').show();
		
		$(this).remove();
		deleteIcon.show();
        
        $.ajax({
			url: "updateKanbanList.ajax",
			data: {
					"listTitle": $.trim(newKanbanListName),
					"kanbanListNo": $.trim(kanbanListNo)
					},
	        dataType: "json",
	        
			success: function(resData) {
				kanbanList.empty();
				
				kanbanList.text(resData.listTitle);
				kanbanList.show();

			}
		});
    });
	
	 
    
});




/**
 * @함수명 : 익명함수
 * @작성자 : 김선, 박혜정
 * @설명 : 칸반 리스트 삭제
 **/         
$('#kanban').on('click', '.kanban-list-menu', function() {
	
    var listName = $(this).parent().children().eq(0).text()
    let allBoardListNo = Number($('#allBoardListNo').val());
	let kanbanListNo = $(this).parents('.kanban-list-content').attr('data-listno');

    var deleteel = $(this).parent().parent().parent()
   
    	      Swal.fire({
		      text: "정말로 '"+listName+"' 리스트의 모든 내용을 삭제하시겠습니까?",
		      icon: 'warning',
		      showCancelButton: true,
		      confirmButtonText: '네',
		      cancelButtonText: '아니오'
		   }).then((result) => {
		      if (result.value) {
		         var promise = 
		        	 $.ajax({
		        		 url: "deleteKanbanList.ajax",
		         		data: {
		         				"kanbanListNo": $.trim(kanbanListNo)
		         				},
							async: false,
							success: function(response) {
								Swal.fire({
									  icon: 'success',
									  text: '리스트가 삭제되었습니다.'
									})
									deleteel.remove()
								},
							error: function(e) {
								Swal.fire({
									  icon: 'error',
									  text: '리스트삭제에 실패하였습니다.'
									})
								}
						});
		          promise.done(reloadListPromise);
		          promise.fail(promiseError);
		      }
		   });
});



//카드 추가
$(document).on('click', "#addcard",function(){

	   let kanbanListNo = $(this).parents('.kanban-list-content').attr('data-listno');
	   let DnDdiv = $(this).parent().siblings('.divForDragNDrop');
	   
        var addcardTag = "<div class='kanban-card-list btn-card-hover'>"
                         +"<span class='icon-pencil active-card-icon' style='position: relative;'></span>"
                         +"<div class='kanban-card-element' data-toggle='modal' data-target='#card-content'>"
                         +"<span class='kanban-card-title' >"
                         +"<textarea rows='1' class='autosize list-card-composer-textarea' placeholder='Enter a title for this card' style='overflow: hidden; overflow-wrap: break-word; resize: none; '></textarea>"
                         +"</span>"
                         +"<div class='kanban-card-badges'>"
                         +'<span title="content">'
                         +"</span>"
                         +'<span title="comments">'
                         +'</span>'
                         +'<span title="file">'
                         +'</span>'
                         +"</div>"
                         +"</div>"
                         +"</div>"
                   
       
	    DnDdiv.append(addcardTag);                         
        
 	   let input = $(this).parent().prev().find('textarea');// 여기는 더해지고 나서 설정돼야함
 	   let comment = $(this).parent().prev().find('[title="comments"]').last();
 	   let file = $(this).parent().prev().find('[title="file"]').last();
 	   let kanbanCardNo = $(this).parent().siblings('.divForDragNDrop').children().last();
 	   
        $(this).parent().mouseleave() // a#addcardel
        
        input.focus();
        
        let cardIndex = kanbanCardNo.index();
        
        $('.kanban-card-element').removeAttr('data-toggle' ,'modal')
        $('.kanban-card-element').removeAttr( 'data-target', '#card-content')
        
        kanbanCardNo.attr('data-cardindex', cardIndex)
        
        //카드 추가 엔터키 이벤트
        $(input).keydown(function(key) {
        		if (key.keyCode == 13) {
        			 if(input.val().trim() == "") {
        	            	$(this).closest('.kanban-card-list').remove()
        	                return ;
        	            }
        			 var cardtitle = $(input).val();
        	            $(this).parent().text($(input).val());
        	            $(input).remove();
        	            $('.kanban-card-element').attr('data-toggle' ,'modal')
        	            $('.kanban-card-element').attr( 'data-target', '#card-content')
        	            
        	            $.ajax({
        	    			url: "InsertKanbanCard.ajax",
        	    			data: { title: cardtitle,
        	    					cardIndex :cardIndex,
        	    					kanbanListNo: kanbanListNo,
        	    					},
        	    	        dataType: "html",
        	    	        
        	    			success: function(resData) {
        	    				 kanbanCardNo.attr('data-cardno', resData);
        	    			}
        	    		}); 
        		}
        });

        //카드 추가 이벤트
        $(input).blur(function() {
            if(input.val().trim() == "") {
            	$(this).closest('.kanban-card-list').remove()
                return ;
            }
            
            var cardtitle = $(input).val();
            $(this).parent().text($(input).val());
            $(input).remove();
            $('.kanban-card-element').attr('data-toggle' ,'modal')
            $('.kanban-card-element').attr( 'data-target', '#card-content')
            
            $.ajax({
    			url: "InsertKanbanCard.ajax",
    			data: { title: cardtitle,
    					cardIndex :cardIndex,
    					kanbanListNo: kanbanListNo,
    					},
    	        dataType: "html",
    	        
    			success: function(resData) {
    				 kanbanCardNo.attr('data-cardno', resData);
    			}
    		}); 
		});  
		
		
		/**
		 * @작성자 : 김선
		 * @설명 : 새로 생성된 카드에 Sortable 적용
		 **/  
        $('.divForDragNDrop').sortable({
       	 connectWith: '.divForDragNDrop',
       	 start( event, ui ){
       		 currentCardNo = ui.item.data('cardno');
       		 startCardIDX = ui.item.index();
       		 startListNo = ui.item.parents('div.kanban-list-content').data('listno');
       		 
       	 },
       	 receive: function(event, ui){ // 다른 리스트간 이동
       		 endCardIDX = ui.item.index();
              	 endListNo = ui.item.parents('div.kanban-list-content').data('listno');

              	 
              	 if(startListNo != endListNo){
              		 
              		
              		 $.ajax({
              				url: "resortKanbanCard.ajax",
              				data: {
              						"kanbanCardNo": $.trim(currentCardNo),
              						"startListNo": $.trim(startListNo),
              						"endListNo": $.trim(endListNo),
              						"startCardIDX": $.trim(startCardIDX),
              						"endCardIDX": $.trim(endCardIDX) 
              						},
              				success: function() {
              						},
              				error: function(e){
              				}
              		 });
              	 }
       	 },
       	 stop( event, ui ){ // 같은 리스트 내에서 이동
            	
            	//같은 카드 내에서 이동될 경우 receive를 사용할 수 없다
            	endCardIDX = ui.item.index();
            	endListNo = ui.item.parents('div.kanban-list-content').data('listno');

            	
             	 if((startListNo == endListNo) && (startCardIDX != endCardIDX)){
               		
              		 $.ajax({
              				url: "resortKanbanCard.ajax",
              				data: {
              						"allBoardListNo": $.trim($('#allBoardListNo').val()),
              						"kanbanCardNo": $.trim(currentCardNo),
              						"startListNo": $.trim(startListNo),
              						"endListNo": $.trim(endListNo),
              						"startCardIDX": $.trim(startCardIDX),
              						"endCardIDX": $.trim(endCardIDX) 
              						},
              				success: function() {
              						},
              				error: function(e){
              				}
              		 });
              	 }
       	 }
       	 
        });
        
});

//카드 수정 버튼 호버 
$('#kanban').on('mouseenter','.kanban-card-list',function(){
    var mouseeven = $(this).children().eq(0)
    $(this).children().eq(0).show()
    $('#kanban').on('mouseleave','.kanban-card-list',function(){
        $(mouseeven).hide()
    })
})

//card 수정 
$('#kanban').on('click','.active-card-icon',function(){
	
    $('.kanban-card-element').removeAttr('data-toggle' ,'modal')
    $('.kanban-card-element').removeAttr( 'data-target', '#card-content')
    $(this).mouseleave();
    let cardNo = $(this).parent().children().eq(1).children().eq(0).parent().parent().attr("data-cardno")
    var cardelement = $(this).parent().children().eq(1).children().eq(0)
    var cardtext =  $(cardelement).text()
    
    $(cardelement).hide()
    $(cardelement).before("<span class='kanban-card-title'>"+"<textarea rows='1' class='autosize list-card-composer-textarea' placeholder='Enter a title for this card' style='overflow: hidden; overflow-wrap: break-word; resize: none;'>"+cardtext+"</textarea>"+"</span>")
    $(cardelement).remove();
    var textarea = $(this).parent().children().eq(1).children().find('textarea')
    $(textarea).focus()
    
    $(textarea).blur(function() {
        if($(textarea).val() == "") {
            alert('Card title을 입력하세요');
            $(textarea).focus();
            return;   
        }
        var cardTitle = $(textarea).val();
        $(this).parent().text($(textarea).val());
        $('.kanban-card-element').attr('data-toggle' ,'modal')
        $('.kanban-card-element').attr( 'data-target', '#card-content')
        
        $.ajax({
			url: "UpdateKanbanCard.ajax",
			data: { title: cardTitle,
					cardNo: cardNo,
					},
	        dataType: "html",
	        
			success: function(resData) {
			}
		});
    })
})


var cardCommentcount="";
var cardFilecount="";


//모달
$('#kanban').on('click', '.kanban-card-element', function() {
	
	 cardElements = $(this).parent();
     listtitle = $(this).parent().parent().parent().children().eq(0).text()
     cardtitletext = $(this).children().eq(0).text()
     cardtitle = $(this).children().eq(0)
     cardNo = $(this).parent().attr("data-cardno")

     $('#modaltitle').text(cardtitletext)
     $('.card-in-list').text("in list "+listtitle)
     
    //카드 내용 유무 체크 후 뿌려주기
     $.ajax({ 
			url: "CardContentSelect.ajax",
			data: {
					cardNo: cardNo
					},
	        dataType: "json",
	        
			success: function(resData) {
				var cardComment = resData.commentCount;
				cardCommentcount = cardComment;
				var cardFile = resData.fileCount;
				cardFilecount = cardFile;
				 if(resData.content == "" || resData.content == null){
					 $('#modallDescrioption').hide();
					 $('#modallDescrioptiontextarea').show();
				 }else{
					 $('#modallDescrioptiontextarea').hide();
					 $('#modallDescrioption').text(resData.content)
					 $('#modallDescrioption').show();
				 }
			} 
		});
	 
		
     //모달 리플 내용 유무 체크 후 뿌려주기 
	 $.ajax({ 
			url: "CardReplySelect.ajax",
			data: {
					cardNo: cardNo
					},
	        dataType: "json",
	        
			success: function(resData) {
			
				$('.reply-list').empty();
				makereply(resData);
			} 
		});


	 /**
	 * @작성자 : 김선
	 * @설명 : 모달 실행시 파일 목록 뿌려주기
	 **/ 
	 $.ajax({ 
			url: "cardFilesSelect.ajax",
			data: {
					cardNo: cardNo
					},
	        dataType: "json",	        
			success: function(resData) {
				
				$('#cardModalFileList').empty();

				$.each(resData, function(index, item){
					addUploadFileTag($('#cardModalFileList'), item);
				});
			} 
		});

});


//모달 리플 달기 엔터키 이벤트 
var textarea = document.getElementById('modalreply');
$(textarea).keydown(function(key) {
if (key.keyCode == 13) {
	$(textarea).blur();
	  if($('#modalreply').val() == "") {
	        alert('내용을 입력해 주세요');
	        $('#modalreply').focus();
	        return;
	    }
	  
	    var replycontent = $('#modalreply').val()
	    $('#modalreply').val("")
	    
	    $.ajax({
			url: "CardReplyInsert.ajax",
			data: {
					cardNo: cardNo,
					content :replycontent,
					id : currUser
					},
	        dataType: "html",
	        
			success: function(resData) {
				
				$.ajax({ 
					url: "CardReplySelect.ajax",
					data: {
							cardNo: cardNo
							},
			        dataType: "json",
			        
					success: function(resData) {
						 $.ajax({ 
								url: "CardContentSelect.ajax",
								data: {
										cardNo: cardNo
										},
						        dataType: "json",
						        
								success: function(result) {
									
									var cardComment = result.commentCount;
									cardCommentcount = cardComment;
									

								} 
							});
						$('.reply-list').empty();
						makereply(resData);
					} 
				});
			}
		});
	}
});	


//모달 리플 달기 버튼클락 이벤트
$('#card-content').on('click', '.reply-done', function(){

    if($('#modalreply').val() == "") {
        alert('내용을 입력해 주세요');
        $('#modalreply').focus();
        return;
    }
	
    var replycontent = $('#modalreply').val()
    $('#modalreply').val("")
    
    $.ajax({
		url: "CardReplyInsert.ajax",
		data: {
				cardNo: cardNo,
				content :replycontent,
				id : currUser
				},
        dataType: "html",
        
		success: function(resData) {
			
			$.ajax({ 
				url: "CardReplySelect.ajax",
				data: {
						cardNo: cardNo
						},
		        dataType: "json",
		        
				success: function(resData) {
					 $.ajax({ 
							url: "CardContentSelect.ajax",
							data: {
									cardNo: cardNo
									},
					        dataType: "json",
					        
							success: function(result) {
								
								var cardComment = result.commentCount;
								cardCommentcount = cardComment;
							} 
						});
					$('.reply-list').empty();
					makereply(resData);
				} 
			});
		}
	});
});


//리플 그리는 함수 (재사용성을 위해 따로 뻄)
function makereply(resData) {
		var replyhtml ="";
		$.each(resData, function(index, obj){
			let imagesrc = ""
			let objimage = obj.image;
			if(objimage.startsWith('https')){
				imagesrc = obj.image;
			}else{
				imagesrc = "assets/images/userImage/"+obj.image;
			}
			
			if(cardNo == obj.cardNo){
				replyhtml += "<div class='card-modal-reply'>" 
				    + "<div class='rounded-circle card-modal-profile'"
				    + "style='float:left; background-color: white; overflow: hidden; height:35px; width:35px;'>"
				    + "<div style='top: 0; left: 0; right: 0; bottom: 0; transform: translate(50%, 50%);'>"
				        + "<img src='"+imagesrc+"' alt='user'"
				                + "style='width :auto; height: 35px; transform: translate(-50%, -50%);'>"
				        + "</div>"
				    + "</div>"		
				    + "<div class='card-modal-reply-userinfo'>"
				    + "<span class='card-modal-reply-username'>"+obj.nickname+"</span>"
				        + "<span class='card-modal-reply-date'>"+obj.writeDate+"</span>"
				    + "</div>"
				    + "<div class='card-modal-reply-document display'>"
				        + "<div class='card-modal-reply-comment' data-cardreplyno='"+obj.commentNo+"'>"
				        + "<p class='card-modal-reply-el'>"+obj.content+"</p>"
				        + "<textarea rows='1' class='autosize reply-textarea-edit' id='replyedit' style='overflow: hidden; overflow-wrap: break-word; resize:none; display : none;'></textarea>"
				        + "</div>"
				    + "</div>"
				    if(obj.id == currUser){
				    	replyhtml +=
				    	  "<div class='modal-reply-btn'>"
			            + 	"<a class='card-modal-reply-delete'"
			            + 	"data-container='body' data-toggle='popover' data-placement='bottom'"
			            + 	"data-content=''>"
			            + 	"<i class='far fa-trash-alt'></i>Delete</a>"
			            + 	"<a class='card-modal-reply-edit'><i class='far fa-edit'></i>Edit</a>"
			            + "</div>"
				    }
				    + "</div>"
			}
		});
		 $('.reply-list').append(replyhtml);
	}


//모달 창에 카드 삭제
$('.card-modal-close').on('click',function(){
	 var cardtitle = $(this).next().children().find('#modaltitle').text()
	 
     Swal.fire({
	      text: "정말로 '"+cardtitle+ "' 카드의 모든 내용을 삭제하시겠습니까?",
	      icon: 'warning',
	      showCancelButton: true,
	      confirmButtonText: '네',
	      cancelButtonText: '아니오'
	   }).then((result) => {
	      if (result.value) {
	         var promise = 
	        	 $.ajax({
	        		 url: "deleteKanbanCard.ajax",
	     		 	data:{
	     		 			"cardNo": cardNo
	     		 			},
						async: false,
						success: function(response) {
							Swal.fire({
								  icon: 'success',
								  text: '카드가 삭제되었습니다.'
								})
								 cardElements.remove();
							$('#card-content').modal('hide');
							},
						error: function(e) {
							Swal.fire({
								  icon: 'error',
								  text: '카드삭제에 실패하였습니다.'
								})
							}
					});
	          promise.done(reloadListPromise);
	          promise.fail(promiseError);
	      }
	   });
});

//모달 창에서 타이틀 수정  
$('#card-content').on('click','.card-modal-title',function() {
    
	var newCardTitle="";
	
	$('.card-modal-title').hide();
	$('#modallisttitle').show();
	$('#modallisttitle').val(cardtitletext);
    $('#modallisttitle').focus();
    
    $('#modallisttitle').blur(function() {
		if($('#modallisttitle').val() == "") {
			alert('list Name을 입력하세요');
			$('#modallisttitle').focus();
			return;
        }
        
		$('.card-modal-title').show();
		
        $('.card-modal-title').text($('#modallisttitle').val());
        newCardTitle = $('#modallisttitle').val();
        
        newCardTitleList = newCardTitle //모달 밖 카드 타이틀 바꾸기 
        cardtitletext = newCardTitle  //현재 모달창 카드 타이틀 바꾸기 
        
		$('#modallisttitle').hide();
        cardtitle.text(newCardTitleList);
		
        $.ajax({
			url: "UpdateKanbanCard.ajax",
			data: { title: newCardTitle,
					cardNo: cardNo,
					},
	        dataType: "html",
	        
			success: function(resData) {

			}
		});
    });
});


// 모달 닫힐때 화면에 뿌리는 이벤트 (댓글 갯수, 파일 갯수)
$('#card-content').on('hide.bs.modal', function () {
	
	let fileElement = $('[data-cardno='+cardNo+']').find('[title=file]');
	let commentElement = $('[data-cardno='+cardNo+']').find('[title=comments]');
	
	let fileDiv = '<span class="ri-attachment-2 badge-icon"></span> <span class="badge-text">'+cardFilecount+'</span>'
	let commentDiv = '<span class="ri-chat-1-line badge-icon"></span> <span class="badge-text">'+cardCommentcount+'</span>'

	//파일,리플 없을떄
	if(cardFilecount == 0 && cardCommentcount == 0){
		fileElement.empty();
		fileElement.removeClass('kanban-card-badge')
		commentElement.empty();
		commentElement.removeClass('kanban-card-badge')
		
		return;
	}
	//파일만 있을때
	if(cardFilecount > 0 && cardCommentcount == 0){
		fileElement.empty();
		fileElement.append(fileDiv);
		fileElement.addClass('kanban-card-badge');
		commentElement.empty();
		commentElement.removeClass('kanban-card-badge')
		return;
	}
	//리플만 있을때
	if(cardFilecount == 0 && cardCommentcount > 0){
		commentElement.empty();
		commentElement.append(commentDiv);
		commentElement.addClass('kanban-card-badge')
		fileElement.empty();
		fileElement.removeClass('kanban-card-badge')
		return;
	}

	//파일, 리플 둘다 있을때
	if(cardFilecount > 0 && cardCommentcount > 0){
		fileElement.empty();
		fileElement.append(fileDiv);
		fileElement.addClass('kanban-card-badge');
		commentElement.empty();
		commentElement.append(commentDiv);
		commentElement.addClass('kanban-card-badge')
		return;
	};
});

//모달 카드 내용 인서트
$('.modal-textarea-description-edit').on('focus',function(){
	 
	 $('#modallDescrioptiontextarea').val("");
	 $('.modal-textarea-description-edit').on('blur',function(){
			 if($('#modallDescrioptiontextarea').val() ==""){
				 return;
			 }else{
				 var cardDescription = $('#modallDescrioptiontextarea').val()
				 $('#modallDescrioptiontextarea').hide();
				 $('#modallDescrioption').text(cardDescription);
				 $('#modallDescrioption').show();
				 $('#modallDescrioptiontextarea').val("");
				 
				 $.ajax({
						url: "CardDescrioptionInsert.ajax",
						data: {
								cardNo: cardNo,
								content :cardDescription
								},
				        dataType: "html",
				        
						success: function(resData) {
							
						}
					});
				 let contentval = $('#modallDescrioption').text();
				 let contentElement = $('[data-cardno='+cardNo+']').find('[title=content]');
				 let contentDiv = '<span class="ri-align-left badge-icon"></span>'
			     if(contentval !=""){
					contentElement.empty();
					contentElement.append(contentDiv);
					contentElement.addClass('kanban-card-badge');
				}	
			 }
			
	 })
});


//모달 카드 내용 수정 
$('.card-modal-list-description').on('click',function(){
	 var cardDescription = $('#modallDescrioption').text()
	 $('#modallDescrioptiontextarea').show();
	 $('#modallDescrioptiontextarea').focus();
	 $('#modallDescrioptiontextarea').val(cardDescription);
	 $('#modallDescrioption').hide();
	 
})

/**
 * @함수명 : 익명함수
 * @작성자 : 김선
 * @설명 : 모달 카드 파일 업로드
 **/         
$('#kanbanFileInputBtn').on('click',function(){
	 
	 let allBoardListNo = $('#allBoardListNo').val();

	 $('#inputAllBoardListNo').val(allBoardListNo);
	 $('#inputCardNo').val(cardNo);
	 $('#inputTeamNo').val(teamNo);
	 
	 let formData = new FormData($('#kanbanFileInput')[0]);
	 
	 $.ajax({ 
		 		type: "POST", 
		 		enctype: 'multipart/form-data', 
		 		url: 'kanbanFilesUpload.ajax', 
		 		data: formData,  
		 		processData: false, 
		 		contentType: false, 
		 		cache: false, 
		 		success: function(resData) { 
		 			if(resData.length > 0){
		 				
		 				$.each(resData, function(index, item){
		 					addUploadFileTag($('#cardModalFileList'), item);
		 				});
		 				cardFilecount += resData.length;

		 				 // input label 비우기
		 				 $('#kanbanFiles').siblings('.custom-file-label').text("Choose file");
		 				
		 			}else{
		 				console.log("업로드된 파일이 없습니다");
		 			}
		 		}, 
		 		error: function (e) { 
		 			console.log("ajax 에러발생");
		 		} 
		 	});
});


/**
 * @함수명 : 익명함수
 * @작성자 : 김선
 * @설명 : 모달 카드 파일 삭제
 **/         
$(document).on('click','.card-modal-file-delete',function() {
	
	let fileNo = $(this).attr('fileno')
	
	$.ajax({
		url: "cardFilesDelete.ajax",
		data: {
				"fileNo": fileNo,
				"cardNo": cardNo,
				"teamNo": $('#teamNo').val()
				},
		dataType: "json",
		success: function(resData){
				
				//파일 목록 비우기
				$('#cardModalFileList').empty();
				
				//파일 목록 다시 뿌리기
				$.each(resData, function(index, item){
 					addUploadFileTag($('#cardModalFileList'), item);
 				});
				
				//파일 개수 재설정
				cardFilecount = resData.length;
			
				},
		error: function(request, status, error){
					alert(  "code:"+request.status
							+"\n"+"message:"+request.responseText
							+"\n"+"error:"+error);
				}
	});
	
});

//모달창에서 리플 삭제 
$('#card-content').on('click', '.card-modal-reply-delete',function(){
    var commentNo = $(this).parent().prev().children().attr('data-cardreplyno')
    
    Swal.fire({
	      text: "정말로 리플을 삭제하시겠습니까?",
	      icon: 'warning',
	      showCancelButton: true,
	      confirmButtonText: '네',
	      cancelButtonText: '아니오'
	   }).then((result) => {
	      if (result.value) {
	         var promise = 
	        	 $.ajax({
	        			url: "CardReplyDelete.ajax",
	        			data: {
	        					commentNo : commentNo
	        					},
	        	        dataType: "html",
	        			success: function() {
	        				$.ajax({ 
	        					url: "CardReplySelect.ajax",
	        					data: {
	        							cardNo: cardNo
	        							},
	        			        dataType: "json",
	        			        
	        					success: function(resData) {
	        						 $.ajax({ 
	        								url: "CardContentSelect.ajax",
	        								data: {
	        										cardNo: cardNo
	        										},
	        						        dataType: "json",
	        						        
	        								success: function(result) {
	        									var cardComment = result.commentCount;
	        									cardCommentcount = cardComment;

	        								} 
	        							});
	        						$('.reply-list').empty();
	        						makereply(resData);
	        					} 
	        				});
	        			}
	        		});
	          promise.done(reloadListPromise);
	          promise.fail(promiseError);
	      }
	   });
    
})

//모달 리플 수정
$('#card-content').on('click', '.card-modal-reply-edit',function(){
	
	var cardCommentcount = $(this).parent().prev().children().attr('data-cardreplyno')
    $(this).parent().prev().children().children().eq(0).hide()
    $(this).parent().prev().children().children().eq(1).show()
    var replycontent =  $(this).parent().prev().children().children().eq(0)
    var replyinput = $(this).parent().prev().children().children().eq(1)
    
    $(this).parent().prev().children().children().eq(1).focus()
    replyinput.text(replycontent.text());
    var display= $(this).parent().prev();

    $(display).removeClass('display')

    $(replyinput).blur(function() {
    	
    if($(replyinput).val() == "") {
        $(replyinput).focus();
        return;
    }

    var newRelycontent = $(replyinput).val()
    
    $(replycontent).val(newRelycontent)
   
    $(display).addClass('display');
    
    $.ajax({
		url: "CardReplyUpdate.ajax",
		data: {
				commentNo : cardCommentcount,
				content : newRelycontent,
				},
				
        dataType: "html",
        
		success: function() {
			
			$.ajax({ 
				url: "CardReplySelect.ajax",
				data: {
						cardNo: cardNo
						},
		        dataType: "json",
		        
				success: function(resData) {
				
					$('.reply-list').empty();
					makereply(resData);
				} 
			});
		}
	});
    })
})





