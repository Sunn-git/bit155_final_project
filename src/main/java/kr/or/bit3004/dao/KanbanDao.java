package kr.or.bit3004.dao;

import java.util.List;

import kr.or.bit3004.dto.Kanban;

public interface KanbanDao {
	
	public void insertListTite(Kanban kanban);
	public List<Object> allKanbanList(int teamNo);
	

}
