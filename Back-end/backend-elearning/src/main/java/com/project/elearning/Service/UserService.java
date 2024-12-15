package com.project.elearning.Service;


import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.project.elearning.Dto.RequestResponse;
import com.project.elearning.Entity.Course;
import com.project.elearning.Entity.MyUser;
import com.project.elearning.Repository.CourseRepository;
import com.project.elearning.Repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private AuthenticationManager authorizationManager;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public RequestResponse registerUser(RequestResponse regReq){
        RequestResponse response = new RequestResponse();

        try{
            MyUser user = new MyUser();
            user.setEmail(regReq.getEmail());
            user.setName(regReq.getName());
            user.setPassword(passwordEncoder.encode(regReq.getPassword()));
            user.setRole(regReq.getRole());

            MyUser result = userRepository.save(user);

            if(result.getId()>0){
                response.setUser((user));
                response.setMessage("User was saved successfully");
                response.setStatusCode(200);
            }
        }catch (Exception e){
            response.setStatusCode(500);
            response.setError(e.getMessage());
        }

        return  response; 
    }
    
    public boolean emailExist(String email){
            return userRepository.findByEmail(email).isPresent();
    }

    public RequestResponse login(RequestResponse logReq){
        RequestResponse response = new RequestResponse();

        try{
            authorizationManager.authenticate(new UsernamePasswordAuthenticationToken(logReq.getEmail(), logReq.getPassword()));
                        var user = userRepository.findByEmail(logReq.getEmail()).orElseThrow();
            var jwt = jwtUtils.generateToken(user);
            var refreshToken = jwtUtils.generateRefershToken(new HashMap<>(), user);
            response.setId(user.getId());
            response.setStatusCode(200);
            response.setToken(jwt);
            response.setUser(user);
            response.setRole(user.getRole());
            response.setRefreshToken(refreshToken);
            response.setExpirationTime("24Hrs");
            response.setMessage("Successfully Logged In");

        }catch (Exception e){
            response.setStatusCode(500);
            response.setMessage(e.getMessage());
        }
        return response;    
        }
    
    public RequestResponse refreshToken(RequestResponse refreshTokenReq){
        RequestResponse response = new RequestResponse();
        try{
            String email = jwtUtils.extractUsername(refreshTokenReq.getToken());
            MyUser user = userRepository.findByEmail(email).orElseThrow();
            if(jwtUtils.isTokenValid(refreshTokenReq.getToken(), user)){
                var jwt = jwtUtils.generateToken(user);
                response.setStatusCode(200);
                response.setToken(jwt);
                response.setRefreshToken(refreshTokenReq.getToken());
                response.setExpirationTime("24Hr");
                response.setMessage("Successfully Refreshed Token");
            }

            response.setStatusCode(200);
            return response;

        }catch (Exception e){
            response.setStatusCode(500);
            response.setMessage(e.getMessage());
            return response;
        }
    }

    public RequestResponse getAllUsers(){
        RequestResponse response = new RequestResponse();

        try{
            List<MyUser> result = userRepository.findAll();
            if(!result.isEmpty()){
                response.setUserList(result);
                response.setStatusCode(200);
                response.setMessage("success");
            }else{
                response.setStatusCode(400);
                response.setMessage("no user found");
            }

            return response;

        }catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error occurred: " + e.getMessage());
            return response;
        }
}

public RequestResponse getUserById(Long id){
    RequestResponse response = new RequestResponse();
    try{
        MyUser user = userRepository.findById(id).orElseThrow(()->  new RuntimeException("user not found"));
        response.setUser(user);
        response.setStatusCode(200);
        response.setMessage("User with id : "+id+"founded successfully");
        
    }catch(Exception e){
        response.setStatusCode(500);
        response.setMessage("Error occurred: " + e.getMessage());
    }
    return response;
}

public RequestResponse deleteUser(Long id){
    RequestResponse response = new RequestResponse();

    try {
        Optional<MyUser> user = (userRepository.findById(id));
        if(user.isPresent()){
            userRepository.deleteById(id);
            response.setStatusCode(200);
            response.setMessage("user deleted successfully");
        }else{
            response.setStatusCode(404);
            response.setMessage("user not found");
        }
    }catch(Exception e) {
        response.setStatusCode(500);
        response.setMessage("Error occurred while deleting user: " + e.getMessage());
    }

    return response;
}

public RequestResponse updateUser(Long id,MyUser updateUser){
    RequestResponse response = new RequestResponse();
    try {
        Optional<MyUser> user = userRepository.findById(id);
        if(user.isPresent()){
            MyUser existUser = user.get();
            existUser.setEmail(updateUser.getEmail());
            existUser.setName(updateUser.getName());
            existUser.setRole(updateUser.getRole());
            if (updateUser.getPassword() != null && !updateUser.getPassword().isEmpty()) {
                existUser.setPassword(passwordEncoder.encode(updateUser.getPassword()));
            }
            MyUser savedUser = userRepository.save(existUser);
            response.setUser(savedUser);
            response.setStatusCode(200);
            response.setMessage("User updated successfully");
        }else{
            response.setStatusCode(404);
            response.setMessage("User not found");  
        }
    } catch (Exception e) {
        response.setStatusCode(500);
        response.setMessage("Error occurred while updating user: " + e.getMessage());
    }

    return response;
}

public RequestResponse myInfo(String email){
    RequestResponse response = new RequestResponse();

    try {
        Optional<MyUser> user = (userRepository.findByEmail(email));
        if(user.isPresent()){

        response.setUser(user.get());
        response.setStatusCode(200);
        response.setMessage("success");

        }else{
            response.setStatusCode(404);
            response.setMessage("not found user with email"+email); 
        }

    } catch (Exception e) {
        response.setStatusCode(500);
        response.setMessage("error while fetch the user with"+email); 
    }

    return response;
}

// enroll course
public String  assignCourseToUser(Long userId, Long courseId) {

       Optional<MyUser> user = userRepository.findById(userId);
       Optional<Course> course = courseRepository.findById(courseId);

       if(user.isPresent()&&course.isPresent()){
        MyUser iUser = user.get();
        Course iCourse = course.get();

        iUser.getCourses().add(iCourse);

        userRepository.save(iUser);

        return "user enrolled the course "+iCourse.getCourseName()+" successfully";
        
       }

       return "user or course not found";

    }

    public List<MyUser> getUserByRole(){
        return userRepository.findByRole("USER");
    }
    
}
