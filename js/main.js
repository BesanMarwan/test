var app = new Vue({
    el: '#app',
    data: {
        brand: 'lorem',
        product: 'socks',
        description: 'Lorem ipsum is placeholder text commonly used in the graphic',
        selectedVariant : 0,
//        image: '../assets/images/green-socks.png',
//        inventory: 100,
        //inStock: true,
        details: ['80% cotton', '20% polyester', 'Gender-neutral'],
        variants: [
            {
                variantId: 1,
                variantColor: "green",
                variantImage: '../assets/images/green-socks.png',
                variantQty : 100

            },
            {
                variantId: 2,
                variantColor: "blue",
                variantImage: '../assets/images/blue-socks.png',
                variantQty:0

            }
        ],
        cart: 0
    },
    methods: {
        addToCart: function () {
            this.cart += 1;
        },
        updateProductImage (indexVariant){
            this.selectedVariant = indexVariant;
        }
    },
    computed : {
        title() {
           return this.brand + ' '+ this.product
        },
        inventory(){
           return this.variants[this.selectedVariant].variantQty
        },
          image(){
           return this.variants[this.selectedVariant].variantImage
        },
        inStock(){
            return this.variants[this.selectedVariant].variantQty
        }
     }
});
