import React,{Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class SlideShow extends Component{
    constructor(){
        super();
        this.state = ({currentSlide: 0, images: [], idTarget: "", imageTarget:"", autoPlay: 3000, infinite: true, endDelay: true, pauseSlider: false});
        this.inverval = "";
    }

    componentDidMount(){
        this.setState({
            images: this.props.images,
            idTarget:  this.props.idTarget,
            imageTarget:  this.props.imageTarget,
            autoPlay: this.props.autoPlay,
            infinite: this.props.infinite,
            endDelay: this.props.endDelay
        });
        this.interval = setInterval(() => this.changeSlide(0), this.props.autoPlay);
    }

    changeSlide(slide){
        let currentSlide = this.state.currentSlide;

        if(slide === 0){
            if(!this.state.pauseSlider){
                if(currentSlide < this.state.images.size -1)
                    currentSlide++;
                else 
                    currentSlide = 0;
            }
        }else{
            if(slide === -1){
                if(currentSlide === 0)
                    currentSlide = this.state.images.size -1;
                else 
                    currentSlide--;
            }else{
                if(currentSlide < this.state.images.size -1)
                    currentSlide++;
                else 
                    currentSlide = 0;
            }
        }

        this.setState({currentSlide: currentSlide});
    }

    pauseSlider(action, event){
        event.preventDefault();
        this.setState({pauseSlider: action});
    }

    componentWillUnmount(){
        clearInterval(this.interval);
    }

    mountSlider(){
        let sliderImages = [], slide = 0;

        this.state.images.forEach(image =>
            {
                sliderImages.push(
                    <img key={image[this.state.idTarget]} alt="Custom_Slide" src={image[this.state.imageTarget]} onMouseOver={this.pauseSlider.bind(this ,true)} onMouseLeave={this.pauseSlider.bind(this ,false)} className={`slideShowItem ${slide === this.state.currentSlide ? "showSliderImage" : "hideSliderImage"}`}/>
                );

                slide++;
            }
        )

        return sliderImages;
    }


    render(){
        return(
            <div className="slideShow">
                {
                    this.mountSlider()
                }
                <div className="arrows">
                    <div className="left-arrow" onMouseOver={this.pauseSlider.bind(this ,true)} onMouseLeave={this.pauseSlider.bind(this ,false)} onClick={this.changeSlide.bind(this, -1)}><FontAwesomeIcon icon="chevron-left" size="3x"></FontAwesomeIcon></div>
                    <div className="right-arrow"  onMouseOver={this.pauseSlider.bind(this ,true)} onMouseLeave={this.pauseSlider.bind(this ,false)} onClick={this.changeSlide.bind(this, 1)}><FontAwesomeIcon icon="chevron-right" size="3x"></FontAwesomeIcon></div>
                </div>
            </div>
        );
    }
}