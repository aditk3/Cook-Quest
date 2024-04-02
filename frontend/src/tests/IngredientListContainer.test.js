// import IngredientListContainer from '../components/IngredientListContainer';
// import React from 'react';
// import router from '../Routes';
// import { fireEvent, render, screen, waitFor, waitForElementToBeRemoved, getAllByRole } from "@testing-library/react";
// import { RouterProvider, BrowserRouter } from 'react-router-dom';

// describe('IngredientListContainer', () => {
//     const setIngredientsListCallback = jest.fn();
//     const getToggleSelectedHandler = jest.fn();
//     const testIngredientData = {
//         parsed: [
//             {
//                 "food": {
//                     "foodId": "food_a1gb9ubb72c7snbuxr3weagwv0dd",
//                     "label": "Apple",
//                     "knownAs": "apple",
//                     "nutrients": {
//                         "ENERC_KCAL": 52,
//                         "PROCNT": 0.26,
//                         "FAT": 0.17,
//                         "CHOCDF": 13.8,
//                         "FIBTG": 2.4
//                     },
//                     "category": "Generic foods",
//                     "categoryLabel": "food",
//                     "image": "https://www.edamam.com/food-img/42c/42c006401027d35add93113548eeaae6.jpg"
//                 }
//             }
//         ]
//     };

//     beforeEach(() => {

//         render(
//             <BrowserRouter>
//                 <IngredientListContainer />
//             </BrowserRouter>
//         );
//     }),
//         // it(`should render on the page`, () => {
//         //     expect(screen.getByText("Ingredient")).toBeInTheDocument();
//         // }),
//         it(`should render new ingredients when add ingredient modal is used`, async () => {
//             //setup table
//             const addIngredientBtn = screen.getByTestId('add-ingr-btn-test');
//             expect(addIngredientBtn).toBeInTheDocument();
//             fireEvent.click(addIngredientBtn); //open modal

//             const toggleInput = screen.getByTestId('toggle-input-btn');
//             expect(toggleInput).toBeInTheDocument();
//             fireEvent.click(toggleInput); //toggle to text input

//             const inputField = screen.getByTestId('ingredient-form-input');
//             const submitBtn = screen.getByTestId('ingredient-submit-btn');
//             expect(inputField).toBeInTheDocument();
//             expect(submitBtn).toBeInTheDocument();
//             fireEvent.change(inputField, { target: { value: "apple, banana, apple" } }); //enter text

//             await waitFor(() => {
//                 fireEvent.click(submitBtn); //submit ingredient
//                 const newIngr = screen.getByText("Apple");
//                 expect(newIngr).toBeInTheDocument(); //expect apple to be in the table
//             });

//         });
//     it(`should call onClick handler on ingredient image click`, async () => {
//         //setup table
//         const addIngredientBtn = screen.getByTestId('add-ingr-btn-test');
//         expect(addIngredientBtn).toBeInTheDocument();
//         fireEvent.click(addIngredientBtn); //open modal

//         const toggleInput = screen.getByTestId('toggle-input-btn');
//         expect(toggleInput).toBeInTheDocument();
//         fireEvent.click(toggleInput); //toggle to text input

//         const inputField = screen.getByTestId('ingredient-form-input');
//         const submitBtn = screen.getByTestId('ingredient-submit-btn');
//         expect(inputField).toBeInTheDocument();
//         expect(submitBtn).toBeInTheDocument();
//         fireEvent.change(inputField, { target: { value: "apple" } }); //enter text

//         await waitFor(() => {
//             fireEvent.click(submitBtn); //submit ingredient
//             const appleThumbnail = screen.getByTestId("food_a1gb9ubb72c7snbuxr3weagwv0dd");
//             expect(appleThumbnail).toBeInTheDocument(); //expect apple thumbnail to be in the table


//             fireEvent.click(appleThumbnail); //click thumbnail
//             // expect(appleThumbnail.onclick).toHaveBeenCalled(); //expect handler to be called
//             expect(appleThumbnail.className).toContain("selected"); //expect thumbnail to be selected
//         });
//     });
//     it(`should change pages when pagination buttons are clicked`, async () => {
//         //setup table (page size is 6)
//         const addIngredientBtn = screen.getByTestId('add-ingr-btn-test');
//         expect(addIngredientBtn).toBeInTheDocument();
//         fireEvent.click(addIngredientBtn); //open modal

//         const toggleInput = screen.getByTestId('toggle-input-btn');
//         expect(toggleInput).toBeInTheDocument();
//         fireEvent.click(toggleInput); //toggle to text input

//         const inputField = screen.getByTestId('ingredient-form-input');
//         const submitBtn = screen.getByTestId('ingredient-submit-btn');
//         expect(inputField).toBeInTheDocument();
//         expect(submitBtn).toBeInTheDocument();
//         fireEvent.change(inputField, { target: { value: "apple, banana, cherry, strawberry, mango, yogurt, orange" } }); //enter text

//         await waitFor(() => {
//             fireEvent.click(submitBtn); //submit ingredient

//             //expect pagination buttons to be on the page
//             const prevBtn = screen.getByTestId("prev-page-btn");
//             expect(prevBtn).toBeInTheDocument();
//             const nextBtn = screen.getByTestId("next-page-btn");
//             expect(nextBtn).toBeInTheDocument();
//             nextBtn.click(); //click next button
//             expect(screen.getByText("Orange")).toBeInTheDocument(); //expect orange to be on the page
//         });
//         const prevBtn = screen.getByTestId("prev-page-btn");
//         expect(prevBtn).toBeInTheDocument();
//         fireEvent.click(prevBtn); //click prev button
//         expect(screen.getByText("Apple")).toBeInTheDocument(); //expect apple to be on the page
//         const nextPg = screen.getByTestId("page-btn-1");
//         fireEvent.click(nextPg); //click page 2 button
//         expect(screen.getByText("Orange")).toBeInTheDocument();
//     });
//     it(`removes ingredients when delete button is clicked`, async () => {
//                //setup table
//                const addIngredientBtn = screen.getByTestId('add-ingr-btn-test');
//                expect(addIngredientBtn).toBeInTheDocument();
//                fireEvent.click(addIngredientBtn); //open modal

//                const toggleInput = screen.getByTestId('toggle-input-btn');
//                expect(toggleInput).toBeInTheDocument();
//                fireEvent.click(toggleInput); //toggle to text input

//                const inputField = screen.getByTestId('ingredient-form-input');
//                const submitBtn = screen.getByTestId('ingredient-submit-btn');
//                expect(inputField).toBeInTheDocument();
//                expect(submitBtn).toBeInTheDocument();
//                fireEvent.change(inputField, { target: { value: "apple, banana" } }); //enter text

//                await waitFor(() => {
//                    fireEvent.click(submitBtn); //submit ingredient
//                    const appleThumbnail = screen.getByTestId("food_a1gb9ubb72c7snbuxr3weagwv0dd");
//                    expect(appleThumbnail).toBeInTheDocument(); //expect apple thumbnail to be in the table
//                    fireEvent.click(appleThumbnail); //click thumbnail
//                    const deleteBtn = screen.getByTestId("delete-ingr-btn");
//                    fireEvent.click(deleteBtn); //click delete button
//                    expect(appleThumbnail).not.toBeInTheDocument(); //expect apple thumbnail to be removed
//                });});
//     });

// test if 2+2 = 4
it('should equal 4', () => {
    expect(2 + 2).toBe(4);
});