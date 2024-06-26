package com.cookquest.user.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cookquest.user.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
}
