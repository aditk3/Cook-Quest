package com.cookquest.recipe.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Builder
@ToString
public class Recipe {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long recipeId;
    private String recipeName;

    @Column(length = 1000)
    private String recipeIngredients;
    @Column(length = 5000)
    private String recipeInstructions;

    // in place of foreign key
    private String userId;
    @Builder.Default private boolean recipeActive = true;
}
