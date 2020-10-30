import React, {useState} from 'react';
import {Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
	}
	 from 'reactstrap';
import Items from './CarouselItems.js';
// import {withRouter} from 'react-router-dom';

const HomeComponent = (props) => {
	const [activeIndex, setActiveIndex] = useState(0);
	const [animating, setAnimating] = useState(false);

	const next = () => {
	    if (animating) return;
	    const nextIndex = activeIndex === Items.length - 1 ? 0 : activeIndex + 1;
	    setActiveIndex(nextIndex);
	}

	const previous = () => {
	    if (animating) return;
	    const nextIndex = activeIndex === 0 ? Items.length - 1 : activeIndex - 1;
	    setActiveIndex(nextIndex);
	}

	const goToIndex = (newIndex) => {
	    if (animating) return;
	    setActiveIndex(newIndex);
	}
  const ClickHandler = (name,e) => {
    e.preventDefault();
    props.redirectCallback("player",name);
  };
	const slides = Items.map((item) => {
		return(
			<CarouselItem
	        onExiting={() => setAnimating(true)}
	        onExited={() => setAnimating(false)}
	        key={item.caption}
	        className="row pr-0"
	      >
          <a
            className="d-none d-md-block"
            type="button"
            href={`/player/${item.altText}`}
            onClick={(e) => {ClickHandler(item.altText,e)} }
          >
            <CarouselCaption className="offset-md-3" captionHeader={item.caption} captionText=""/>
          </a>
      <a
        className="col-12 pr-0 col-md-4 link-img"
        type="button"
        href={`/player/${item.altText}`}
        onClick={(e) => {ClickHandler(item.altText,e)} }
        >
          <img className="Carousel-img" src={item.src} alt={item.altText}/>
        </a>
	      </CarouselItem>
		);
	});
	return(
			<div className="ml-0 mr-0 ml-md-4 pl-md-1 pr-0 pl-0 col-md-8 pr-md-0">
				<Carousel
					activeIndex={activeIndex}
      		next={next}
				  previous={previous}
          interval={3000}
				>
  				<CarouselIndicators
  					items={Items}
  					activeIndex={activeIndex}
  					onClickHandler={goToIndex}
  				/>
  				{slides}
  				<CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
        	<CarouselControl direction="next" directionText="Next" onClickHandler={next} />
				</Carousel>
			</div>
	);
}

export default HomeComponent;
// captionText={item.caption}
