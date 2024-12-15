package com.project.elearning.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.project.elearning.Dto.RequestResponse;
import com.project.elearning.Entity.MyUser;
import com.project.elearning.Service.UserService;

@RestController
public class UserController {
    
    @Autowired
    private UserService userService;

    @PostMapping("/auth/register")
    public ResponseEntity<?> registerUser(@RequestBody RequestResponse reqres){
        if(userService.emailExist(reqres.getEmail())){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email already exists");
        }
        return ResponseEntity.ok(userService.registerUser(reqres));
    }

    @PostMapping("/auth/login")
    public ResponseEntity<RequestResponse> login(@RequestBody RequestResponse req){
        return ResponseEntity.ok(userService.login(req));
    }

    @PostMapping("/auth/refresh")
    public ResponseEntity<RequestResponse> refreshToken(@RequestBody RequestResponse req){
        return ResponseEntity.ok(userService.refreshToken(req));
    }

    @GetMapping("/admin/get-all-users")
    public ResponseEntity<RequestResponse> getAllUsers(){
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/adminuser/get-user/{id}")
    public ResponseEntity<RequestResponse> getUserById(@PathVariable Long id){
        return ResponseEntity.ok(userService.getUserById(id));
    }

    @PutMapping("/adminuser/update-user/{id}")
    public ResponseEntity<RequestResponse> updateUser(@PathVariable Long id,@RequestBody MyUser user){
        return ResponseEntity.ok(userService.updateUser(id, user));
    }

    @DeleteMapping("/admin/delete-user/{id}")
    public ResponseEntity<RequestResponse> deleteUser(@PathVariable Long id){
        return ResponseEntity.ok(userService.deleteUser(id));
    }

    @PostMapping("/user/{userId}/enroll/{courseId}")
    public String assignCourseToStudent(
        @PathVariable Long userId,
        @PathVariable Long courseId)
  {
    return userService.assignCourseToUser(userId, courseId);
  }

@GetMapping("/admin/user-data")
public List<MyUser> getUserByRole(){
    return userService.getUserByRole();
}
   
}
