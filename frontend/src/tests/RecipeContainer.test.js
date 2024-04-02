import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Recipe from '../entities/Recipe';
import RecipeContainer from '../components/RecipeContainer';

const testRecipes = [
    new Recipe(1, "https://cafedelites.com/kung-pao-chicken/", "kung pao chicken", "https://cafedelites.com/wp-content/uploads/2018/04/Kung-Pao-Chicken-IMAGE-42.jpg", "20 minutes", "Kung Pao Chicken is highly addictive stir-fried chicken with the perfect combination of salty, sweet and spicy flavour! Make it better than Chinese take out right at home! With crisp-tender chicken pieces and some crunchy veggies thrown in, this is one Kung Pao chicken recipe hard to pass up!", "5/5", ["vegan", "roasted", "healthy"], false),
    new Recipe(2, "https://cafedelites.com/kung-pao-chicken/", "kung pao chicken", "https://cafedelites.com/wp-content/uploads/2018/04/Kung-Pao-Chicken-IMAGE-42.jpg", "20 minutes", "Kung Pao Chicken is highly addictive stir-fried chicken with the perfect combination of salty, sweet and spicy flavour! Make it better than Chinese take out right at home! With crisp-tender chicken pieces and some crunchy veggies thrown in, this is one Kung Pao chicken recipe hard to pass up!", "5/5", ["vegan", "roasted", "healthy"], false),
    new Recipe(3, "https://cafedelites.com/kung-pao-chicken/", "kung pao chicken", "https://cafedelites.com/wp-content/uploads/2018/04/Kung-Pao-Chicken-IMAGE-42.jpg", "20 minutes", "Kung Pao Chicken is highly addictive stir-fried chicken with the perfect combination of salty, sweet and spicy flavour! Make it better than Chinese take out right at home! With crisp-tender chicken pieces and some crunchy veggies thrown in, this is one Kung Pao chicken recipe hard to pass up!", "5/5", ["vegan", "roasted", "healthy"], false),
]

beforeEach(() => {
    render(<RecipeContainer recipes={testRecipes} />);
})

it(`should display all of the cards passed in`, () => {
    expect(screen.getAllByTitle("Card").length).toBe(testRecipes.length)
})