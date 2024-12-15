package com.project.elearning.Service;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.project.elearning.Entity.Course;
import com.project.elearning.Repository.CourseRepository;
import com.project.elearning.Repository.UserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private UserRepository userRepository;

    public String addNewCourse(String courseName,String des,String intsructor,MultipartFile image)throws IOException{
        Course course = new Course();
        course.setCourseName(courseName);
        course.setDescription(des);
        course.setInstructor(intsructor);
        if(image!=null && !image.isEmpty()){
            byte[] imageBytes = image.getBytes();
            course.setCourseImage(imageBytes);
        }

        courseRepository.save(course);

        return "Course Added Successfully";

    }

    public List<Course> getCourseDetails(Long courseId){
        if(null!=courseId){
            return courseRepository.findAllByCourseId(courseId);
        }else{
            return courseRepository.findAll();
        }
    }

    public String deleteCourse(Long courseId){
        courseRepository.deleteById(courseId);
        return "course with id :"+courseId+"deleted successfully";
    }

    // information for dashboard

    public long getTotalStudent(){
        return userRepository.countByRole("USER");
    }
 
    public long getTotalCourse(){
        return courseRepository.count();
    }

    public long getTotalEnrollCourse(){
        return courseRepository.findAll().stream()
                    .mapToLong(course -> course.getUsers().size()).sum();
    }

    public List<String> getCourseEnrollmentDetails(){
        return courseRepository.findAll().stream()
                .map(course -> course.getCourseName()+": "+course.getUsers().size()+"Students").collect(Collectors.toList());
    }
    
}
