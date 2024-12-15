package com.project.elearning.Dto;

import com.project.elearning.Entity.MyUser;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserRegiterReq {

    private int statusCode;
    private String error;
    private String message;
    private String name;
    private String email;
    private String password;
    private String role;
    private MyUser user;
    
}
