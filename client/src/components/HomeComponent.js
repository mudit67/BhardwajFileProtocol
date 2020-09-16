import React, {useState} from 'react';
import {Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
	}
	 from 'reactstrap';
import Items from './CarouselItems.js';



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

	const slides = Items.map((item) => {
		return(
			<CarouselItem
	        onExiting={() => setAnimating(true)}
	        onExited={() => setAnimating(false)}
	        key={item.caption}
	        className="row"
	      >
	        <img className="Carousel-img col-4" src={item.src} alt={item.altText} />
	        <CarouselCaption className="col-5" captionHeader={item.caption} captionText="" />
	      </CarouselItem>
		);
	});
	return(
		<div className="container">
			<div className="row">
			This is the HomeComponent
			</div>
			<div className="row">
				<Carousel
					activeIndex={activeIndex}
      				next={next}
				    previous={previous}
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
		</div>
	);
}

export default HomeComponent;
// captionText={item.caption}