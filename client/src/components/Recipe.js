import React, {Component} from 'react';
import '../styles/Recipe.css';
import {inject, observer} from 'mobx-react';
import Rating from 'react-rating';
import Button from './utils/Button';
import slugify from 'slugify';
import {Link} from 'react-router-dom';


@inject('store')
@observer
export default class Recipe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userRating: 0,
            average: 0,
            numRatings: 0,
            cannotModify: false
        };
        this.recipeStore = this.props.store.recipeStore;
        this.modalStore = this.props.store.modalStore;
        this.userStore = this.props.store.userStore;
    }
    
    async componentDidMount() {
        const {average, count} = this.recipeStore.getAverageRatingAndRatingCount(this.props.recipeid);
        if(average > 0 && count > 0) {
            const userRating = this.recipeStore.getUserRatingForRecipe(this.props.recipeid, this.userStore.currentUser ? this.userStore.getCurrentUser().userid : this.props.userid);
            await this.setState({average, numRatings: count, userRating});
        }
    }
    
    async updateRating(rating) {
        this.setState({userRating: rating});
        const {average, count} = await this.recipeStore.updateOrCreateRating(rating, this.props.recipeid, this.userStore.getCurrentUser().userid);
        await this.setState({average, numRatings: count});
        
    }
    
    truncateTitle(title) {
        const shortened = title.substring(0, 50);
        return shortened.substring(0, shortened.lastIndexOf(" ")) + "...";
    }
    
    onEnter() {
        if(!this.props.store.userStore.loggedIn) {
            setTimeout(() => {
                this.setState({cannotModify: true});
            }, 600);
        }
    }
    
    onLeave() {
        setTimeout(() => {
            this.setState({cannotModify: false});
        }, 600);
    }
    
    render() {
        const loggedIn = this.props.store.userStore.loggedIn;
        return (
            <div className="recipe">
                <img src={this.props.imageURL} alt="recipe" />
                <div className={this.modalStore.windowWidth < 1100 ? 'mobile-recipe' : 'overlay'}
                style={this.modalStore.modalIsOpen ? {display: 'none'} : {display: 'flex'}}>
                    <h3>{this.props.title.length >= 45 ? this.truncateTitle(this.props.title) : this.props.title}</h3>
                    <Rating 
                        className="rating"
                        empty="fa fa-star-o fa-2x"
                        full="fa fa-star fa-2x"
                        fractions={2}
                        initialRate={this.state.userRating}
                        readonly={!loggedIn || this.props.userid === this.userStore.getCurrentUser().userid}
                        title={!loggedIn ? "You have to be signed in to rate this recipe" : "Rate recipe"}
                        onChange={this.updateRating.bind(this)}
                    />
                    <h5>Average rating:   
                        <Rating readonly={true}
                        className="average-rating"
                        fractions={2} 
                        initialRate={parseFloat(this.state.average)}
                        title={`${this.state.average} stars`}
                        empty="fa fa-star-o fa-2x"
                        full="fa fa-star fa-2x"
                        /> 
                        <small className="ratings-count">({this.state.numRatings} {this.state.numRatings === 1 ? "review" : "reviews"})</small>
                    </h5>
                    <Link className="details-link" to={{pathname: `/details?recipe=${slugify(this.props.title)}-${this.props.recipeid}`, state: this.props}}>
                        <Button text="Details" borderColor="white" hoverColor="white"/>
                    </Link>
                </div>
                
            </div>
        )
    }
}
