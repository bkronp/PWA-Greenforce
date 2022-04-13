const Styles = () => (
	<style global jsx>{`
        .react-multi-carousel-list{
            display     : flex;
            align-items : center;
            overflow    : hidden;
            position    : relative
        }
        .react-multi-carousel-track{
            list-style          : none;
            padding             : 0;
            margin              : 0;
            display             : flex;
            flex-direction      : row;
            position            : relative;
            transform-style     : preserve-3d;
            backface-visibility : hidden;
        }
        .react-multiple-carousel__arrow{
            position      : absolute;
            outline       : 0;
            transition    : all .5s;
            border-radius : 35px;
            z-index       : 1000;
            border        : 0;
            background    : rgba(0,0,0,0.5);
            min-width     : 43px;
            min-height    : 43px;
            opacity       : 1;
            cursor        : pointer
        }
        .react-multiple-carousel__arrow:hover{
            background : rgba(0,0,0,0.8)
        }
        .react-multiple-carousel__arrow::before{
            font-size   : 20px;
            color       : #fff;
            display     : block;
            text-align  : center;
            z-index     : 2;
            position    : relative
        }
        .react-multiple-carousel__arrow--left{
            left : calc(4% + 1px)
        }
        .react-multiple-carousel__arrow--left::before{
            content : '❮'!important;
        }
        .react-multiple-carousel__arrow--right{
            right : calc(4% + 1px);
        }
        .react-multiple-carousel__arrow--right::before{
            content : '❯'!important;
        }
        .react-multi-carousel-dot-list{
            position        : absolute;
            bottom          : 0;
            display         : flex;
            left            : 0;
            right           : 0;
            justify-content : center;
            margin          : auto;
            padding         : 0;
            margin          : 0;
            list-style      : none;
            text-align      : center
        }
        .react-multi-carousel-dot button{
            display       : inline-block;
            width         : 12px;
            height        : 12px;
            border-radius : 50%;
            opacity       : 1;
            padding       : 5px 5px 5px 5px;
            box-shadow    : none;
            transition    : background .5s;
            border-width  : 1px;
            border-style  : solid;
            border-color  : #80808005;
            padding       : 0;
            margin        : 0;
            margin-right  : 6px;
            outline       : 0;
            cursor        : pointer
        }
        .react-multi-carousel-dot button : hover : active{
            background : #efb8105c;
        }
        .react-multi-carousel-dot--active button{
            background : #EFB810;
        }
        .react-multi-carousel-item{
            transform-style     : preserve-3d;
            backface-visibility : hidden
        }
        @media all and (-ms-high-contrast : none),(-ms-high-contrast : active){
            .react-multi-carousel-item{
                flex-shrink : 0 !important
            }
            .react-multi-carousel-track{
                overflow : visible !important
            }
        }
    
    `}</style>
);

export default Styles;

