import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Carousel } from 'antd';
import Introduction from './Introduction';
import TopBackgroundListEntry from './TopBackgroundListEntry';

class TopBackgroundList extends Component {
   constructor(props) {
      super(props);
   }
   render() {
      const { background } = this.props;

      return (
         <div>
            <Carousel
               effect="fade"
               infinite={true}
               dots={false}
               arrows={false}
               slidesToShow={1}
               slidesToScroll={1}
               autoplay={true}
               speed={4000}
               autoplaySpeed={3000}
               pauseOnHover={false}
            >
               <Introduction />
               {background.map((movieData, i) => (
                  <TopBackgroundListEntry key={i} movieData={movieData} />
               ))}
            </Carousel>
         </div>
      );
   }
}

export default withRouter(TopBackgroundList);
