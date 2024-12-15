package com.project.elearning.Service;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.project.elearning.Dto.ChapterDto;
import com.project.elearning.Entity.Chapter;
import com.project.elearning.Entity.Course;
import com.project.elearning.Repository.ChapterRepository;
import com.project.elearning.Repository.CourseRepository;

@Service
public class ChapterService {
     
    @Autowired
    private ChapterRepository chapterRepository;

    @Autowired
    private CourseRepository courseRepository;

        public Chapter uploadChapter(Long courseId, String title, MultipartFile videoFile) throws IOException {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));
        
        Chapter chapter = new Chapter();
        chapter.setChapterTitle(title);
        chapter.setCourse(course);
        if(videoFile==null||videoFile.isEmpty()){
            chapter.setVideoFileName(null); 
        }else{
            chapter.setVideoFileName(videoFile.getBytes()); 
        }
        
        return chapterRepository.save(chapter);
    }

    public List<ChapterDto> getChaptersByCourse(Long courseId){
    List<Chapter> chapters = chapterRepository.findByCourseCourseId(courseId);
    return chapters.stream()
                    .map(chapter -> new ChapterDto(chapter.getChapterTitle(),chapter.getVideoFileName()))
                    .collect(Collectors.toList());
    }

    public List<String> getChapterTitle(Long courseId){
        List<String> chapterTitle =  chapterRepository.findChapterTilteByCourseId(courseId);
        return chapterTitle;       
      }

}
