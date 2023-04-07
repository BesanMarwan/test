var eventBus = new Vue()

Vue.component('product-review', {
    template: ` <form class="review-form m-5" @submit.prevent="onSubmit">

     <p v-if="errors.length">
        <ul >
            <b>Please correct the following error(s) :</b>
            <li v-for="error in errors">{{error}}</li>
        </ul>
     </p>
     <div class="form-group row">
    <label class="col-sm-2 col-form-label">Name</label>
    <div class="col-md-12">
      <input  v-model="name"  class="form-control" />
    </div>
  </div>
  <div class="form-group">
    <label for="exampleFormControlTextarea1">Review</label>
    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="review"></textarea>
  </div>
      
       <div class="form-group">
      <label for="inputState">Rating</label>
      <select v-model.number="rating" class="form-control">
        <option selected>Choose...</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
    </div>  
      <div class="form-group d-flex justify-content-center">
      <button type="submit" value="submit" class="btn btn-primary">Submit</button>
    </div>

    </form>
`,
    data() {
        return {
            name: null,
            rating: null,
            review: null,
            errors: []
        }
    },
    methods: {
        onSubmit() {
            if (this.name && this.rating && this.review) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                }

                eventBus.$emit('review-submitted', productReview)
                //                this.$emit('review-submitted', productReview)
                //reset the form after submit
                this.name = null
                this.rating = null
                this.review = null
                this.errors = []
            } else {
                //validation form
                if (!this.name)
                    this.errors.push('Name required');

                if (!this.rating)
                    this.errors.push('Rating required');

                if (!this.review)
                    this.errors.push('Review required');

            }
        }
    }
});

Vue.component('product-tabs', {
    props: {
        reviews: {
            type: Array,
            required: true
        }
    },
    template: `
      <div class="tabs">
        <span class="tab mx-5" v-for="(tab,index) in tabs"
:class="{activeTab :selectedTab === tab }"
:v-key="index" @click="selectedTab = tab">{{tab}}</span>


<div class="m-5" v-show="selectedTab ==='reviews'">
            <h3>Reviews</h3>
            <p v-if="! reviews.length">There's no review ywt</p>
           
             <ul  v-for="review in reviews" class="list-unstyled">
                <li>
                    <div class="card" style="width: 18rem;">
                        <div class="card-body">
                            <h5 class="card-title">{{review.name}}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">Rating :{{review.rating}}</h6>
                            <p class="card-text">{{review.review}}.</p>

                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <product-review  v-show="selectedTab ==='Make a review'" 
></product-review>
        </div>


  
      `,
    data() {
        return {
            tabs: ['reviews', 'Make a review'],
            selectedTab: 'reviews'
        }
    }
})

var app = new Vue({
    el: '#app',
    data: {
        brand: 'lorem',
        product: 'socks',
        description: 'Lorem ipsum is placeholder text commonly used in the graphic',
        selectedVariant: 0,
        //        image: '../assets/images/green-socks.png',
        //        inventory: 100,
        //inStock: true,
        details: ['80% cotton', '20% polyester', 'Gender-neutral'],
        variants: [
            {
                variantId: 1,
                variantColor: "green",
                variantImage: '../assets/images/green-socks.png',
                variantQty: 100

            },
            {
                variantId: 2,
                variantColor: "blue",
                variantImage: '../assets/images/blue-socks.png',
                variantQty: 0

            }
        ],
        cart: [],
        reviews: []
    },
    methods: {
        addToCart: function (variantId) {
            this.cart.push(variantId)
        },
        removeFromCart: function (variantId) {
            var variant_index = this.cart.indexOf(variantId);
            this.cart.splice(variant_index);
        },
        updateProductImage(indexVariant) {
            this.selectedVariant = indexVariant;
        },
//                addReview(productReview) {
//                    this.reviews.push(productReview);
//                }
    },
     mounted() {
        eventBus.$on('review-submitted', productReview => {
          this.reviews.push(productReview)
        })
      }
  ,
    computed: {
        title() {
            return this.brand + ' ' + this.product
        },
        inventory() {
            return this.variants[this.selectedVariant].variantQty
        },
        image() {
            return this.variants[this.selectedVariant].variantImage
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQty
        },
        emptyCart() {
            return this.cart.length == 0
        }
    }

});
