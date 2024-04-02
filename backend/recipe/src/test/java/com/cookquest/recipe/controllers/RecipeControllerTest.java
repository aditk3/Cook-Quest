package com.cookquest.recipe.controllers;

import com.cookquest.recipe.entities.Recipe;
import com.cookquest.recipe.services.RecipeService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.aspectj.lang.annotation.Before;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import com.cookquest.recipe.testUtils.RecipeUtility;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.hamcrest.Matchers.hasSize;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@Tag("omit-cloud-build")
@WebMvcTest(RecipeController.class)
class RecipeControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private RecipeService recipeService;

    private static List<Recipe> recipes;

    @BeforeAll
    static void setUp() {
        recipes = RecipeUtility.getRecipes();
    }

    public static String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Test
    void callingAll_getsAllRecipesWithStatusOK() throws Exception {
        when(recipeService.findAllRecipes()).thenReturn(recipes);
        mockMvc.perform(MockMvcRequestBuilders.get("/recipe/all"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].recipeName").value("Chicken Parmesan"))
                .andExpect(jsonPath("$[1].recipeName").value("Philly Cheesesteak"));
        verify(recipeService, times(1)).findAllRecipes();
    }

    @Test
    void callingUserId_getsAllRecipesForUserIdWithStatusOK() throws Exception {
        when(recipeService.findAllRecipesByUserId("ravi.kumar.ceo@cognizant.com")).thenReturn(recipes.subList(0, 1));
        mockMvc.perform(MockMvcRequestBuilders.get("/recipe/ravi.kumar.ceo@cognizant.com"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].recipeName").value("Chicken Parmesan"));
        verify(recipeService, times(1)).findAllRecipesByUserId("ravi.kumar.ceo@cognizant.com");
    }

    @Test
    void callingInvalidUserId_returnsStatusNotFound() throws Exception {
        List<Recipe> emptyList = new ArrayList<>();
        when(recipeService.findAllRecipesByUserId("ravi.kumar.ceo@cognizant.com")).thenReturn(emptyList);
        mockMvc.perform(MockMvcRequestBuilders.get("/recipe/ravi.kumar.ceo@cognizant.com"))
                .andExpect(status().isNotFound());
        verify(recipeService, times(1)).findAllRecipesByUserId("ravi.kumar.ceo@cognizant.com");
    }

    @Test
    void addingRecipeWithNullId_postsRecipeWithStatusOK() throws Exception {
        Recipe recipe = Recipe.builder().recipeName("Mac 'n cheese").build();
//        when(recipeService.saveRecipe(recipe)).thenReturn(recipe);
        when(recipeService.saveRecipe(any(Recipe.class))).thenReturn(recipe);
        mockMvc.perform(MockMvcRequestBuilders.post("/recipe/add")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(recipe)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.recipeName").value("Mac 'n cheese"));
        verify(recipeService, times(1)).saveRecipe(any(Recipe.class));
    }

    @Test
    void addingRecipeWithNonNullId_postsRecipeWithStatusBadRequest() throws Exception {
        Recipe recipe = Recipe.builder().recipeName("Mac 'n cheese").recipeId(70L).build();
        mockMvc.perform(MockMvcRequestBuilders.post("/recipe/add")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(recipe)))
                .andExpect(status().isBadRequest());
        verify(recipeService, never()).saveRecipe(any(Recipe.class));
    }

    @Test
    void deletingRecipeWithValidId_hardDeletesRecipeWithStatusOK() throws Exception {
        when(recipeService.findRecipeById(1L)).thenReturn(Optional.ofNullable(recipes.get(0)));
        mockMvc.perform(MockMvcRequestBuilders.delete("/recipe/delete/1"))
                .andExpect(status().isOk());
        verify(recipeService, times(1)).findRecipeById(1L);
        verify(recipeService, times(1)).hardDeleteRecipe(1L);
    }

    @Test
    void deletingRecipeWithInvalidId_returnsStatusBadRequest() throws Exception {
        when(recipeService.findRecipeById(1L)).thenReturn(Optional.empty());
        mockMvc.perform(MockMvcRequestBuilders.delete("/recipe/delete/1"))
                .andExpect(status().isBadRequest());
        verify(recipeService, times(1)).findRecipeById(1L);
        verify(recipeService, never()).hardDeleteRecipe(1L);
    }

    @Test
    void deletingAllRecipesForUserId_softDeletesRecipesWithStatusOK() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.delete("/recipe/delete/user/Gordon.Ramsay@cognizant.com"))
                .andExpect(status().isOk());
        verify(recipeService, times(1)).deleteRecipesByUserId(any(String.class));
    }

    @Test
    void activatingAllRecipesForUserId_activatesRecipesWithStatusOk() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.put("/recipe/activate/user/Gordon.Ramsay@cognizant.com"))
                .andExpect(status().isOk());
        verify(recipeService, times(1)).activateRecipesByUserId(any(String.class));
    }
}
// package com.cookquest.recipe.controllers;

// import com.cookquest.recipe.entities.Recipe;
// import com.cookquest.recipe.services.RecipeService;
// import com.fasterxml.jackson.databind.ObjectMapper;
// import org.junit.jupiter.api.BeforeEach;
// import org.junit.jupiter.api.Test;
// import org.mockito.InjectMocks;
// import org.mockito.Mock;
// import org.mockito.MockitoAnnotations;
// import org.springframework.http.MediaType;
// import org.springframework.test.web.servlet.MockMvc;
// import org.springframework.test.web.servlet.setup.MockMvcBuilders;

// import java.util.Arrays;
// import java.util.Optional;

// import static org.hamcrest.Matchers.hasSize;
// import static org.hamcrest.Matchers.is;
// import static org.mockito.ArgumentMatchers.any;
// import static org.mockito.ArgumentMatchers.anyString;
// import static org.mockito.Mockito.*;
// import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
// import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
// import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

// class RecipeControllerTest {

//     @Mock
//     RecipeService recipeService;

//     @InjectMocks
//     RecipeController recipeController;

//     MockMvc mockMvc;

//     ObjectMapper objectMapper = new ObjectMapper();

//     @BeforeEach
//     void setUp() {
//         MockitoAnnotations.openMocks(this);
//         mockMvc = MockMvcBuilders.standaloneSetup(recipeController).build();
//     }

//     @Test
//     void getAllRecipes() throws Exception {
//         Recipe recipe1 = new Recipe(1L, "r1", "i1", "s1", "u1");
//         Recipe recipe2 = new Recipe(2L, "r2", "i2", "s2", "u2");

//         when(recipeService.findAllRecipes()).thenReturn(Arrays.asList(recipe1, recipe2));

//         mockMvc.perform(get("/recipe/all")
//                         .contentType(MediaType.APPLICATION_JSON))
//                 .andExpect(status().isOk())
//                 .andExpect(jsonPath("$", hasSize(2)))  
//                 .andExpect(jsonPath("$[0].recipeName", is("r1")))
//                 .andExpect(jsonPath("$[1].recipeName", is("r2")));

//         verify(recipeService, times(1)).findAllRecipes();
//     }

//     @Test
//     void getRecipes() throws Exception {
//         Recipe recipe1 = new Recipe(1L, "r1", "i1", "s1", "u1");
//         Recipe recipe2 = new Recipe(2L, "r2", "i2", "s2", "u2");

//         when(recipeService.findAllRecipesByUserId(anyString())).thenReturn(Arrays.asList(recipe1, recipe2));

//         mockMvc.perform(get("/recipe")
//                         .contentType(MediaType.APPLICATION_JSON)
//                         .content("1"))
//                 .andExpect(status().isOk())
//                 .andExpect(jsonPath("$", hasSize(2)));  // assuming you have jsonPath in your dependencies

//         verify(recipeService, times(1)).findAllRecipesByUserId(anyString());
//     }

//     @Test
//     void postRecipe() throws Exception {
//         Recipe recipe = new Recipe();
//         recipe.setRecipeName("Sample Recipe");

//         when(recipeService.saveRecipe(any(Recipe.class))).thenReturn(recipe);

//         mockMvc.perform(post("/recipe/add")
//                         .contentType(MediaType.APPLICATION_JSON)
//                         .content(objectMapper.writeValueAsString(recipe)))
//                 .andExpect(status().isOk())
//                 .andExpect(jsonPath("$.recipeName", is("Sample Recipe")));

//         verify(recipeService, times(1)).saveRecipe(any(Recipe.class));
//     }

//     @Test
//     void postRecipeWithExistingId() throws Exception {
//         Recipe recipe = new Recipe();
//         recipe.setRecipeId(1L); // Setting ID to make it invalid for adding

//         mockMvc.perform(post("/recipe/add")
//                         .contentType(MediaType.APPLICATION_JSON)
//                         .content(objectMapper.writeValueAsString(recipe)))
//                 .andExpect(status().isBadRequest());

//         verify(recipeService, times(0)).saveRecipe(any(Recipe.class));
//     }

//     @Test
//     void deleteRecipe() throws Exception {
//         Long recipeId = 1L;

//         when(recipeService.findRecipeById(recipeId)).thenReturn(Optional.of(new Recipe()));

//         mockMvc.perform(delete("/recipe/delete/{recipeId}", recipeId))
//                 .andExpect(status().isOk());

//         verify(recipeService, times(1)).deleteRecipe(recipeId);
//     }

//     @Test
//     void deleteRecipeNotFound() throws Exception {
//         Long recipeId = 1L;

//         when(recipeService.findRecipeById(recipeId)).thenReturn(Optional.empty());

//         mockMvc.perform(delete("/recipe/delete/{recipeId}", recipeId))
//                 .andExpect(status().isBadRequest());

//         verify(recipeService, times(0)).deleteRecipe(recipeId);
//     }
// }
