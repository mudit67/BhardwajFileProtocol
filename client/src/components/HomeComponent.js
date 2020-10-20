import React, {useState} from 'react';
import {Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
	}
	 from 'reactstrap';
import Items from './CarouselItems.js';
import {withRouter} from 'react-router-dom';

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
    var page = `/player/${name}`
    props.history.push(page);
  };
	const slides = Items.map((item) => {
		return(
			<CarouselItem
	        onExiting={() => setAnimating(true)}
	        onExited={() => setAnimating(false)}
	        key={item.caption}
	        className="row"
	      >
          <a
            type="button"
            href={`/player/${item.altText}`}
            onClick={(e) => {ClickHandler(item.altText,e)} }
          >
            <CarouselCaption className="offset-3" captionHeader={item.caption} captionText=""/>
          </a>
      <a
        className="col-4 link-img"
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
		<div className="container">
			<div className="row">
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
		</div>
	);
}

export default withRouter(HomeComponent);
// captionText={item.caption}
