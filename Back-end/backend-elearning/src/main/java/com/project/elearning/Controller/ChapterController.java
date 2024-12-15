package com.project.elearning.Controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.project.elearning.Dto.ChapterDto;
import com.project.elearning.Entity.Chapter;
import com.project.elearning.Service.ChapterService;

@RestController
public class ChapterController {
    
    @Autowired
    private ChapterService chapterService;
 
    @PostMapping("/admin/chapter-upload/{courseId}")
    public ResponseEntity<Chapter> uploadChapter(
            @PathVariable Long courseId,
            @RequestParam("title") String title,
            @RequestParam(value = "video",required = false) MultipartFile videoFile ) throws IOException {

        Chapter chapter = chapterService.uploadChapter(courseId, title, videoFile);
        return new ResponseEntity<>(chapter, HttpStatus.CREATED);
    }

    @GetMapping("/adminuser/{courseId}/chapter")
    public ResponseEntity<List<ChapterDto>> getChaptersByCourse(@PathVariable Long courseId) {
        List<ChapterDto> chapters = chapterService.getChaptersByCourse(courseId);
        return new ResponseEntity<>(chapters, HttpStatus.OK);
    }
 
    @GetMapping("/public/{courseId}/chapterTitle")
    public ResponseEntity<List<String>> getChapterTitle(@PathVariable Long courseId) {
        List<String> chapterTitle = chapterService.getChapterTitle(courseId);
        return new ResponseEntity<>(chapterTitle, HttpStatus.OK);
    }
}
