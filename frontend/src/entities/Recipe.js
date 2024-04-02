export default class Recipe {
    // constructor(id, siteLink, title, imgLink, timeToCook, description, reviews, tagsList, favorite) {
    constructor(id, title, ingredients, instructions, favorite) {
        this.id = id;
        // this.siteLink = siteLink;
        this.title = title;
        // this.imgLink = imgLink;
        // this.timeToCook = timeToCook;
        this.ingredients = ingredients;
        this.instructions = instructions;
        // this.reviews = reviews;
        // Tags might be taken out
        // this.tagsList = tagsList;
        this.favorite = favorite;
    }
}