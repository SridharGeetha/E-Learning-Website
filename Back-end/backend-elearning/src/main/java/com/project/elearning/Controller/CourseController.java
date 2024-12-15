package com.project.elearning.Controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.project.elearning.Entity.Course;
import com.project.elearning.Service.CourseService;
   
@RestController
public class CourseController {
    
    @Autowired
    private CourseService courseService;
 
    @PostMapping("/admin/add-new-course")
    public ResponseEntity<String> addNewCourse(
        @RequestParam("courseName") String courseName,
        @RequestParam("description") String description,
        @RequestParam("instructor") String instructor,
        @RequestParam(value = "courseImage", required = false) MultipartFile courseImage
    )
    throws IOException{
        return ResponseEntity.ok(courseService.addNewCourse(courseName, description, instructor, courseImage));
    }

    @GetMapping(value = {"/auth/getCourse","/public/{courseId}"})
    public List<Course> getCourses(@PathVariable(required = false)Long courseId){
        return courseService.getCourseDetails(courseId);
    }

    @DeleteMapping("/admin/delete-course/{id}")
    public String removeCourse(@PathVariable Long id){
       return courseService.deleteCourse(id);
    }   

    @GetMapping("/admin/get-dashboard-data")
    public Map<String ,Long> getDataForDashBoard(){
        Map<String,Long> responseData = new HashMap<>();
        responseData.put("TotalStudents", courseService.getTotalStudent());
        responseData.put("TotalCourse", courseService.getTotalCourse());
        responseData.put("TotalEnroll", courseService.getTotalEnrollCourse());

        return responseData;
    }

    @GetMapping("/admin/get-enroll-data")
    public List<String> getEnrollDetailList(){
        return courseService.getCourseEnrollmentDetails();
    }
}
