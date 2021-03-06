package kr.or.bit3004.aside;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.bit3004.dao.AsideDao;
import kr.or.bit3004.groupAndTeam.GroupAndTeam;
import kr.or.bit3004.groupAndTeam.Team;
import kr.or.bit3004.groupAndTeam.TeamMember;
import kr.or.bit3004.user.User;

@Service
public class AsideServiceImpl implements AsideService {
	
	@Autowired
	private AsideDao dao;
	
	@Override
	public Team getTeam(int teamNo) {
		System.out.println("AsideServiceImpl");
		return dao.getTeam(teamNo);
	}
	
	@Override
	public List<TeamMember> getTeamMember(int teamNo) {
		return dao.getTeamMember(teamNo);
	}
	
	@Override
	public List<AllBoardList> getAllBoardList(int teamNo) {
		return dao.getAllBoardList(teamNo);
	}
	
	@Override
	public void insertAllBoard(AllBoardList allBoard) {
		dao.insertAllBoard(allBoard);
	}
	
	@Override
	public int getCurrAllBoardListNo() {
		return dao.getCurrAllBoardListNo();
	}
	
	@Override
	public List<String> searchUser(String id) {
		return dao.searchUser(id);
	}
	
	@Override
	public void inviteMember(GroupAndTeam groupAndTeam) {
		dao.inviteMember(groupAndTeam);
		int groupNo = dao.searchPersonalNo(groupAndTeam.getId());
		groupAndTeam.setGroupNo(groupNo);
		dao.insertGroupTeam(groupAndTeam);
	}
	
	@Override
	public void deleteTeamMember(GroupAndTeam groupAndTeam) {
		dao.deleteTeamMember(groupAndTeam);
	}
	
	@Override
	public void deleteGroupTeam(GroupAndTeam groupAndTeam) {
		dao.deleteGroupTeam(groupAndTeam);
	}
	
	@Override
	public void updateNewLeader(Map<String, Object> newLeaderAndTeamNo) {
		dao.updateNewLeader(newLeaderAndTeamNo);
	}
	
	@Override
	public User selectInvitedMemberInfo(String id) {
		return dao.selectInvitedMemberInfo(id);
	}
	
	@Override
	public void updateAsideBoardName(AllBoardList allBoardList) {
		dao.updateAsideBoardName(allBoardList);
	}
	
	@Override
	public void deleteAsideBoard(AllBoardList allBoardList) {
		dao.deleteAsideBoard(allBoardList);
	}
	
	@Override
	public void updateTeamName(Team team) {
		dao.updateTeamName(team);
	}

	@Override
	public String isTeamLeader(String id, int teamNo) {
		return dao.isTeamLeader(id, teamNo);
	}
}
