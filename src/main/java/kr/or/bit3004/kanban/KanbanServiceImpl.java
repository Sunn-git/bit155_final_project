package kr.or.bit3004.kanban;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import kr.or.bit3004.cloud.UploadObject;
import kr.or.bit3004.comment.KanbanComment;
import kr.or.bit3004.dao.KanbanDao;
import kr.or.bit3004.user.SessionUser;

@Service
public class KanbanServiceImpl implements KanbanService {
   
   @Autowired
   private KanbanDao dao;
   
      
   /**
   * @Method Name : resortKanbanList (칸반 리스트 재정렬)
   * @작성자 : 김선
   * @Method 설명 : 드래그앤 드랍으로 변경된 칸반리스트 index를 DB에 반영
   * @param : int kanbanListNo
   * @param : int startListIDX
   * @param : int endListIDX
   * @return : void
   **/
   @Override
   public void resortKanbanList(int kanbanListNo, int startListIDX, int endListIDX) {
      dao.updateKanbanListIndex(kanbanListNo, endListIDX);
      
      if(endListIDX-startListIDX > 0) {
//         System.out.println("큰 index로 이동");
         // 중간 index들 -1
         dao.resortKanbanListIndexSTB(kanbanListNo, startListIDX, endListIDX);

      }else if(endListIDX-startListIDX < 0) {
//         System.out.println("작은 index로 이동");
         // 중간 index들 +1
         dao.resortKanbanListIndexBTS(kanbanListNo, startListIDX, endListIDX);
      }   
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
   @Override
   public void resortKanbanCard(int kanbanCardNo, int startListNo, int endListNo, int startCardIDX, int endCardIDX) {

      if(startListNo == endListNo) { // 같은 리스트 내에서 카드 이동
         //업데이트
         dao.updateKanbanCardIndex(kanbanCardNo, endCardIDX);
         
         if(endCardIDX-startCardIDX > 0) {
//            System.out.println("큰 index로 이동");
            // 중간 index들 -1
            dao.resortKanbanCardIndexSTB(endListNo, kanbanCardNo, startCardIDX, endCardIDX);
         }else{
//            System.out.println("작은 index로 이동");
            // 중간 index들 +1
            dao.resortKanbanCardIndexBTS(endListNo, kanbanCardNo, startCardIDX, endCardIDX);
         }
         
      }else { // 다른 리스트간 카드 이동   
         //업데이트
         dao.updateKanbanCardIndexBL(kanbanCardNo, endListNo, endCardIDX);
         
         //정렬
         dao.resortStartKanbanCardIndex(startListNo, startCardIDX);
         dao.resortEndKanbanCardIndex(endListNo, endCardIDX, kanbanCardNo);
         
      }
      
   }

   /**
   * @Method Name : kanbanFilesUpload (칸반 카드에 파일 업로드)
   * @작성자 : 김선, 이서영(cloud)
   * @Method 설명 : 사용자가 업로드한 파일을 프로젝트 폴더 및 DB에 저장하고 클라우드에 업로드
   * 			       비동기로 파일 목록을 업데이트 하기 위해 return값 필요
   * @param : MultipartHttpServletRequest request
   * @return : List<KanbanUpload>
   **/
   @Override
   public List<KanbanUpload> kanbanFilesUpload(MultipartHttpServletRequest request) {
   
   List<MultipartFile> fileList = request.getFiles("kanbanFiles");
   int allBoardListNo = Integer.parseInt(request.getParameter("allBoardListNo"));
   int cardNo = Integer.parseInt(request.getParameter("cardNo"));
   int teamNo = Integer.parseInt(request.getParameter("teamNo"));
   
   List<KanbanUpload> returnFileList = new ArrayList<KanbanUpload>(); //      ajax return용 업로드파일목록
   
   
   if(fileList != null && fileList.size() >0) {
      for(MultipartFile multiFile : fileList) {
         String originFileName = multiFile.getOriginalFilename();
         
         UUID uuid = UUID.randomUUID();            
         String fileName = uuid.toString() + originFileName;
         
         String cPath = System.getProperty("user.dir") + "\\src\\main\\resources\\static\\cloud"; 
         File cFolder = new File(cPath);
         
         //클라우드 폴더 없을경우 클라우드 폴더 생성하기
         if(!cFolder.exists()) {
               try {
                  cFolder.mkdir();
                  
               } catch (Exception e) {
                  System.out.println("폴더 생성 실패");
                  e.getMessage();
               }
            System.out.println("클라우드 폴더가 생성되었습니다.");
         }
         
         String path = cPath + "\\" + teamNo;
         File tFolder = new File(path);
            
         //폴더가 없을경우 팀 폴더 생성하기
         if(!tFolder.exists()) {
            try {
               tFolder.mkdir();
               
            } catch (Exception e) {
               System.out.println("폴더 생성 실패");
               e.getMessage();
            }
            System.out.println("팀 폴더가 생성되었습니다.");
         }
         
         
         String filePath = path + "\\" + fileName;
         KanbanUpload kanbanUpload = new KanbanUpload();
         
         if((!fileName.equals("")) && (multiFile.getSize() > 0)) { // 파일 업로드               
            FileOutputStream fs = null;
            
            try {
               
               fs = new FileOutputStream(filePath);
               fs.write(multiFile.getBytes());
               
            } catch (Exception e) {
               System.out.println("file write error");
               e.getMessage();
            }finally {
               try {
                  fs.close();
               } catch (IOException e) {
                  System.out.println("fs close error");
                  e.getMessage();
               }
            } // finally end               
         } else{ // if end
            System.out.println("제목이 없거나 빈 파일입니다.");
            continue;
         }
      
         kanbanUpload.setOriginFileName(originFileName);
         kanbanUpload.setFileName(fileName); 
         kanbanUpload.setFileSize(multiFile.getSize());
         kanbanUpload.setFilePath(filePath);
         kanbanUpload.setAllBoardListNo(allBoardListNo);
         kanbanUpload.setCardNo(cardNo);
      
         dao.insertKanbanUploadFile(kanbanUpload);
         returnFileList.add(kanbanUpload);
      
         //클라우드에 저장하기 - 작성 : 이서영
         try {
            UploadObject.uploadObject("final-project-281709", "king240",originFileName,filePath); 
         } catch (Exception e) {
         }
   
      
      } // for end
   } // if end      
   return returnFileList;
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
   @Override
   public List<KanbanUpload> deleteKanbanCardFile(int fileNo, int cardNo, int teamNo) {
      List<KanbanUpload> fileList = null;
      
      KanbanUpload selectedFile = dao.getAKanbanCardFile(fileNo);
      String filePath = System.getProperty("user.dir") 
                  + "\\src\\main\\resources\\static\\cloud\\" + teamNo
                  + "\\" + selectedFile.getFileName();
      
      
      File file = new File(filePath);
      
      if(file.exists()) {
         if(file.delete()) {
            System.out.println("파일 삭제 성공");
         }else {
            System.out.println("파일 삭제 실패");
         }
      }else {
         System.out.println("파일이 존재하지 않습니다.");
      }
      
      dao.deleteKanbanCardFile(fileNo);
      fileList = dao.getKanbanCardFiles(cardNo);
      return fileList;
   }

   
   /**
	* @Method Name : updateKanbanList (칸반 리스트 제목 업데이트)
	* @작성자 : 김선
	* @Method 설명 : kanbanlist 정보와 session으로 가져온 사용자 id를 사용해 칸반 리스트 제목을 업데이트
	* @param : KanbanList kanbanlist
	* @param : HttpSession session
	* @return : KanbanList
	**/
   @Override
   public KanbanList updateKanbanListTitle(KanbanList kanbanlist, HttpSession session) {
	  SessionUser currentUser = (SessionUser)session.getAttribute("currentUser");   
	  kanbanlist.setId(currentUser.getId());
      
      dao.updateKanbanListTitle(kanbanlist);
      KanbanList newKanbanList = dao.getAKanbanListByKanbanListNo(kanbanlist.getKanbanListNo());
      return newKanbanList;
   }

   /**
   * @Method Name : deleteKanbanList (칸반 리스트 삭제)
   * @작성자 : 김선
   * @param : kanbanListNo
   * @return : void
   **/
  @Override
  public void deleteKanbanList(int kanbanListNo) {
     dao.deleteKanbanList(kanbanListNo);
     
  }

  /**
  * @Method Name : deleteKanbanCard (칸반 카드 삭제)
  * @작성자 : 김선
  * @Method 설명 : 칸반카드 삭제
  * @param : int cardNo
  * @return : void
  **/
  @Override
  public void deleteKanbanCard(int cardNo) {
     dao.deleteKanbanCard(cardNo);
  }

  	/**
   * @Method Name : getKanbanCardFiles (칸반 카드 파일 목록 가져오기)
   * @작성자 : 김선
   * @Method 설명 : 칸반카드에 업로드된 파일 목록을 가져옴
   * @param : int cardNo
   * @return : List<KanbanUpload>
   **/
   @Override
   public List<KanbanUpload> getKanbanCardFiles(int cardNo) {
      return dao.getKanbanCardFiles(cardNo);
   }



// =========================================
   

   
   @Override
   public int insertListTitle(KanbanList kanbanlist, HttpSession session) {
	  SessionUser currentUser = (SessionUser)session.getAttribute("currentUser");
      
      int newKanbanListNo = 0;
      kanbanlist.setId(currentUser.getId());
      
      dao.insertListTitle(kanbanlist);
      newKanbanListNo = dao.getANewKanbanListNo();
      
      return newKanbanListNo;
   }
      
   @Override
   public List<KanbanCard> kanbanCardList(){
      return dao.kanbanCardList();
   }
   
   @Override
   public List<Map> kanbanListJoinCard(int allBoardListNo){
      return dao.kanbanListJoinCard(allBoardListNo);
      
   }
   
   @Override
   public List<Map> kanbanList(int teamNo) {
      return null;
   }
   
   @Override
   public int insertCardTitle(String title, int cardIndex, int kanbanListNo, HttpSession session) {
      int newcardNo;
	  SessionUser currentUser = (SessionUser)session.getAttribute("currentUser");   
      
      dao.insertCardTitle(title, currentUser.getId(), cardIndex, kanbanListNo);
      
      newcardNo = dao.getANewCardNo();
      
      return newcardNo;
   }

   @Override
   public List<KanbanList> kanbanListFromAllBoardListNo(int allBoardListNo) {
      return dao.kanbanListFromAllBoardListNo(allBoardListNo);
   }
   
   @Override
   public void kanbanCardTitleUpdate(String title , int cardNo) {
      dao.updateCardTitle(title, cardNo);
   }
   
   @Override
   public KanbanCard kanbanCardContentSelect(int cardNo) {
      return dao.kanbanCardContent(cardNo);
   }
   
   @Override
   public void kanbanCardDescrioptionUpdate(String content, int cardNo) {
      dao.updateCardDescrioption(content,cardNo);
   }
   @Override
   public int insertCardReply(String content, int cardNo, String id) {
      return dao.insertCardReply(content, cardNo, id);
   }
   @Override
   public List<KanbanComment> getKanbanCommentList(int cardNo){
      return dao.getKanbanCommentList(cardNo);
   }
   
   @Override
   public void updateCardReply(String content, int commentNo) {
      dao.updateCardReply(content, commentNo);
   }
   
   public void deleteCardReply(int commentNo) {
      dao.deleteCardReply(commentNo);
   }

   //드래그앤 드랍 카드 업데이트 (스타트 리스트)
   @Override
   public void dragCard(int[]cardNo , int[] cardIndex, int kanbanListNo) {
      Map<Integer, Integer> cardnomap = new HashMap<Integer, Integer>();
      Map<Integer, Integer> cardindexmap = new HashMap<Integer, Integer>();
      for(int i = 0 ; i < cardNo.length; i++) {
         cardnomap.put(i, cardNo[i]);
         System.out.println(cardnomap.get(i));
      }
      for(int i = 0; i < cardIndex.length; i ++ ) {
         cardindexmap.put(i, cardIndex[i]);
         
      }
      for(int i = 0; i < cardNo.length; i ++) {
         dao.dragCardUpdate(cardnomap.get(i), cardindexmap.get(i), kanbanListNo);
      }
      
   }

   @Override
   public Map<String, String> boardNameSelect(int allBoardListNo) {
	   return dao.boardNameSelect(allBoardListNo);
   }


}