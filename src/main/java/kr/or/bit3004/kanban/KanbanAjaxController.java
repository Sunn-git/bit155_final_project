package kr.or.bit3004.kanban;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import kr.or.bit3004.comment.KanbanComment;

@RestController
public class KanbanAjaxController {
	
	@Autowired
	private KanbanService service;


	
	/**
	* @Method Name : resortKanbanList (칸반 리스트 재정렬)
	* @작성자 : 김선
	* @Method 설명 : 드래그앤 드랍으로 변경된 칸반리스트 index를 DB에 반영
	* @param : int kanbanListNo
	* @param : int startListIDX
	* @param : int endListIDX
	* @return : void
	**/
	@RequestMapping("resortKanbanList.ajax")
	public void resortKanbanList(int kanbanListNo, int startListIDX, int endListIDX) {
		service.resortKanbanList(kanbanListNo, startListIDX, endListIDX);
	}

	/**
	* @Method Name : resortKanbanCard (칸반 카드 재정렬)
	* @작성자 : 김선
	* @Method 설명 : 드래그앤 드랍으로 변경된 칸반카드 index를 DB에 반영
	* @param : int kanbanCardNo
	* @param : int startListNo
	* @param : int endListNo
	* @param : int startCardIDX
	* @param : int endCardIDX
	* @return : void
	**/
	@RequestMapping("resortKanbanCard.ajax")
	public void resortKanbanCard(int kanbanCardNo, int startListNo, int endListNo, int startCardIDX, int endCardIDX) {
		service.resortKanbanCard(kanbanCardNo, startListNo, endListNo, startCardIDX, endCardIDX);
	}

	/**
	* @Method Name : kanbanFilesUpload (칸반 카드에 파일 업로드)
	* @작성자 : 김선, 이서영(cloud)
	* @Method 설명 : 사용자가 업로드한 파일을 프로젝트 폴더 및 DB에 저장하고 클라우드에 업로드
	* 			       비동기로 파일 목록을 업데이트 하기 위해 return값 필요
	* @param : MultipartHttpServletRequest request
	* @return : List<KanbanUpload>
	**/
	//카드 파일 업로드
	@RequestMapping(value="kanbanFilesUpload.ajax", method=RequestMethod.POST)
	public List<KanbanUpload> kanbanFilesUpload(MultipartHttpServletRequest request){
		return service.kanbanFilesUpload(request);
	}
		
	/**
	* @Method Name : deleteKanbanCardFile (칸반 카드 업로드 파일 지우기)
	* @작성자 : 김선
	* @Method 설명 : 칸반카드에 업로드된 파일을 삭제
	* @param : int fileNo
	* @param : int cardNo
	* @param : int teamNo
	* @return : List<KanbanUpload>
	**/
	@RequestMapping("cardFilesDelete.ajax")
	public List<KanbanUpload> deleteKanbanCardFile(int fileNo, int cardNo, int teamNo) {
		return service.deleteKanbanCardFile(fileNo, cardNo, teamNo);
	}

	/**
	* @Method Name : updateKanbanList (칸반 리스트 제목 업데이트)
	* @작성자 : 김선
	* @Method 설명 : kanbanlist 정보와 session으로 가져온 사용자 id를 사용해 칸반 리스트 제목을 업데이트
	* @param : KanbanList kanbanlist
	* @param : HttpSession session
	* @return : KanbanList
	**/
	@RequestMapping("updateKanbanList.ajax")
	public KanbanList updateKanbanList(KanbanList kanbanlist, HttpSession session) {
		return service.updateKanbanListTitle(kanbanlist, session);
	}
	
	/**
	* @Method Name : deleteKanbanList (칸반 리스트 삭제)
	* @작성자 : 김선
	* @param : int kanbanListNo
	* @return : void
	**/
	@RequestMapping("deleteKanbanList.ajax")
	public void deleteKanbanList(int kanbanListNo) {
		service.deleteKanbanList(kanbanListNo);
	}
	
	/**
	* @Method Name : deleteKanbanCard (칸반 카드 삭제)
	* @작성자 : 김선
	* @Method 설명 : 칸반카드 삭제
	* @param : int cardNo
	* @return : void
	**/
	//카드 삭제
	@RequestMapping("deleteKanbanCard.ajax")
	public void deleteKanbanCard(int cardNo) {
		service.deleteKanbanCard(cardNo);
	}
		
	/**
	* @Method Name : getKanbanCardFiles (칸반 카드 파일 목록 가져오기)
	* @작성자 : 김선
	* @Method 설명 : 칸반카드에 업로드된 파일 목록을 가져옴
	* @param : int cardNo
	* @return : List<KanbanUpload>
	**/
	//카드 파일 목록 가져오기
	@RequestMapping("cardFilesSelect.ajax")
	public List<KanbanUpload> getKanbanCardFiles(int cardNo) {
		return service.getKanbanCardFiles(cardNo);
	}



// =======================================


	
	/**
	 * @Method Name : kanbanList
	 * @작성일 : 2020.07.28
	 * @작성자 : 박혜정
	 * @Method 설명 : kanban 게시판 초기 로딩시 필요한 동기 데이터. 비동기 처리를 위해 시퀀스로 부여된 리스트 넘버를 리턴해줌
	 * @param : session
	 * @param : allBoardListNo
	 * @param : model
	 * @return : newKanbanListNoString
	 **/
	@RequestMapping("InsertKanbanList.ajax")
	public String kanbanListInsert(KanbanList kanbanlist, HttpSession session) {
		int newKanbanListNo = service.insertListTitle(kanbanlist, session);
		String newKanbanListNoString = Integer.toString(newKanbanListNo);
		return newKanbanListNoString;
	}

	/**
	 * @Method Name : kanbanCardInsert
	 * @작성일 : 2020.07.28
	 * @작성자 : 박혜정
	 * @Method 설명 : kanban 카드 인서트시 비동기 처리를 위해 시퀀스로 부여된 카드 넘버를 리턴해줌
	 * @param : title
	 * @param : cardIndex
	 * @param : kanbanListNo
	 * @param : session
	 * @return : newcardNoString
	 **/
	@RequestMapping("InsertKanbanCard.ajax")
	public String kanbanCardInsert(String title, int cardIndex, int kanbanListNo, HttpSession session) {
		
		int newcardNo = service.insertCardTitle(title, cardIndex, kanbanListNo, session);
		String newcardNoString = Integer.toString(newcardNo);
		return newcardNoString;
	}
	
	//업데이트 칸반 카드
	@RequestMapping("UpdateKanbanCard.ajax")
	public void kanbanCardTitleUpdate(String title , int cardNo) {
		service.kanbanCardTitleUpdate(title, cardNo);
	}
	
	//카드내용 셀렉트
	@RequestMapping("CardContentSelect.ajax")
	public KanbanCard kanbanCardContentSelect(int cardNo) {
		return service.kanbanCardContentSelect(cardNo);
	}
	
	//카드 내용 인서트
	@RequestMapping("CardDescrioptionInsert.ajax")
	public void kanbanCardDescrioptionUpdate(String content, int cardNo) {
		service.kanbanCardDescrioptionUpdate(content, cardNo);
	}

	//카드 리플 인서트
	@RequestMapping("CardReplyInsert.ajax")
	public void kanbanCardReplyInsert(String content , int cardNo, String id) {
		service.insertCardReply(content, cardNo, id);
	}

	//카드 리플 셀렉트
	@RequestMapping("CardReplySelect.ajax")
	public List<KanbanComment> getKanbanCommentList(int cardNo){
		return service.getKanbanCommentList(cardNo);		
	}
	
	//카드 리플 업데이트
	@RequestMapping("CardReplyUpdate.ajax")
	public void kanbanCardReplyupdate(String content , int commentNo) {
		service.updateCardReply(content, commentNo);
	}

	//카드 리플 삭제
	@RequestMapping("CardReplyDelete.ajax")
	public void kanbanCardReplyDelete(int commentNo) {
		service.deleteCardReply(commentNo);
	}
		
	//카드 드래그앤 드롭 시 위치 변경
	@RequestMapping("StartDragCardUpdate.ajax")
	public void dragCard(int[]cardNo , int[] cardIndex, int kanbanListNo) {
		service.dragCard(cardNo, cardIndex, kanbanListNo);
	}
}
 