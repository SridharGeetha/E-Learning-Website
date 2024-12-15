package com.project.elearning.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.elearning.Entity.MyUser;

@Repository
public interface UserRepository extends JpaRepository<MyUser,Long>{

    Optional<MyUser> findByEmail(String email);

    long countByRole(String role);

    List<MyUser> findByRole(String role);

}
