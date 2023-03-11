export default {
    template: `<button :class="{
                  'bg-primary border-0 ' : type==='primary',
                  'bg-light border-0 ' : type==='muted',
                  'bg-success border-0 ' : type==='success',
}"
:disabled="proccessing">
                       <slot/>
                      </button>`,

    props: {
        type: {
            type: String,
            default: 'primary'
        },
        proccessing: {
            type: Boolean,
            default: false
        }
    },



    data() {
        return {
            processing: true,
        }
    }

}
