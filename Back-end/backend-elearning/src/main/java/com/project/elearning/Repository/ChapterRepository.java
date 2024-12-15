package com.project.elearning.Repository;

import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.project.elearning.Entity.Chapter;


@Repository
public interface ChapterRepository extends JpaRepository<Chapter,Long>{
    
    List<Chapter> findByCourseCourseId(Long courseId);

    @Query("SELECT c.chapterTitle FROM Chapter c WHERE c.course.id=:courseId")
    List<String> findChapterTilteByCourseId(@Param("courseId") Long courseId);
}
