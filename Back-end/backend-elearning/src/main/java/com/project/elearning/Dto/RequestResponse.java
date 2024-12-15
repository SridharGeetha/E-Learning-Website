package com.project.elearning.Dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.project.elearning.Entity.Chapter;
import com.project.elearning.Entity.Course;
import com.project.elearning.Entity.MyUser;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
@NoArgsConstructor
@AllArgsConstructor
public class RequestResponse {
    
    private Long id;
    private int statusCode;
    private String error;
    private String message;
    private String token;
    private String refreshToken;
    private String expirationTime;
    private String name;
    private String email;
    private String password;
    private String role;

    private MyUser user;
    private List<MyUser> userList;

    private Course course;
    private List<Course> courseList;

    private Chapter chapter;
    private List<Chapter> chapterList;

}
