package kr.or.bit3004.file;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class FileController {
	
	@RequestMapping("/file.do")
	public String file() {
		return "fileTest";
	}
	
}