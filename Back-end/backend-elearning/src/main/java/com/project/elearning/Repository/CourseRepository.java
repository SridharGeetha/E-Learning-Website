package com.project.elearning.Repository;

import java.util.List;
import java.util.Optional;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.project.elearning.Entity.Course;

@Repository
public interface CourseRepository extends JpaRepository<Course,Long> {
    List<Course> findAllByCourseId(long courseId);

    @Query("SELECT c FROM Course c JOIN FETCH c.chapters WHERE c.id = :courseId")
    Optional<Course> findCourseWithChapters(@Param("courseId") Long courseId);

    long count();
}
