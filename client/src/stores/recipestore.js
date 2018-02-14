import { observable, action, toJS } from 'mobx';
import axios from 'axios';
import _ from 'lodash';

const API_URL = "https://recipe-explorer-api.herokuapp.com";

class RecipeStore {
    @observable recipes = [];
    @observable ratings = [];
    @observable singleRecipe = null;
    @observable error = false;
    
    
    @action
    async fetchAll() {
        this.error = false;
      try {
         const { data } = await axios.get(API_URL + '/api/recipes/all');
         this.recipes = data.recipes;
         this.ratings = data.ratings;
      } catch(e) {
          this.error = true;
      }
    }
    
    @action
    async fetchOne(id) {
        this.error = false;
        try {
            const { data } = await axios.get(API_URL + '/api/recipes/' + id);
            this.singleRecipe = data;
            if(!this.singleRecipe) {
                this.error = true;
            }
        } catch(e) {
            this.error = true;
        }
        
    }
    
    @action
    async addRecipe(recipe) {
        this.error = false;
        try {
            await axios.post(API_URL + '/api/recipes/new', {recipe, token: window.localStorage.getItem("token")});
            const recipes = [recipe, ...this.recipes];
            this.recipes = recipes;
        } catch(e) {
            this.error = true;
            console.log(e);
        }
    }
    
    @action
    getAverageRatingAndRatingCount(recipeid) {
        const matchingRatings = this.ratings.filter(rating => rating.recipeid === recipeid);
        if(matchingRatings.length) {
            const average = (Math.round((_.sumBy(matchingRatings, rating => rating.rating) / matchingRatings.length) * 2) / 2).toFixed(1);
            console.log(average);
            return {average, count: matchingRatings.length};
        } else return {average: 0, count: 0};
        
    }
    
    @action 
    recipeHasRatings(recipeid) {
        const hasRatings = this.ratings.find(rating => rating.recipeid === recipeid);
        return hasRatings && hasRatings.length;
    }
    
    @action
    getUserRatingForRecipe(recipe, user) {
        const userRating = this.ratings.filter(rating => rating.recipeid === recipe && rating.userid === user)[0];
        return userRating && userRating.rating ? userRating.rating : 0;
    }
    
    @action
    async updateOrCreateRating(rating, recipeid, userid) {
        const userHasAlreadyRatedRecipe = this.ratings.length ? this.ratings.find(rating => rating.recipeid === recipeid && rating.userid === userid) : null;
        const recipeHasRating = this.ratings.length ? this.ratings.find(rating => rating.recipeid === recipeid && rating.userid !== userid) : null;
        if(!userHasAlreadyRatedRecipe) {
            if(recipeHasRating) {
                recipeHasRating.rating = rating;
            } 
            await axios.post(API_URL + '/api/recipes/ratings', {rating, recipeid, userid, token: window.localStorage.getItem("token")});
        } else {
            userHasAlreadyRatedRecipe.rating = rating;
            this.ratings.splice(this.ratings.indexOf(userHasAlreadyRatedRecipe, 1));
            await axios.put(API_URL + '/api/recipes/ratings', {rating, recipeid, userid, token: window.localStorage.getItem("token")});
        }
        this.ratings = [...this.ratings, recipeHasRating ? recipeHasRating : {recipeid, userid, rating}];
        return this.getAverageRatingAndRatingCount(recipeid);
    }
    
    @action
    async updateRecipe(id, field, value) {
        const { data } = await axios.put(API_URL + `/api/recipes/${id}`, {recipeid: id, field, value: toJS(value), token: window.localStorage.getItem("token")});
        this.recipes = this.recipes.map(recipe => {
            if(recipe.recipeid === data.recipeid) {
                recipe = data;
            }
            return recipe;
        });
    }
    
    @action
    async deleteRecipe(recipe) {
        await axios.delete(API_URL + `/api/recipes/${recipe}`, { data: { token: window.localStorage.getItem("token") } });
        await this.fetchAll();
    }
}

export default RecipeStore;