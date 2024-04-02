package com.cookquest.user.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class User {
    @Id
    private String userId;
    private String displayName;
    private String profilePictureUrl;
    private boolean accountActive = true;
}
