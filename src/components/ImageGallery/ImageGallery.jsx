// import { Component } from 'react';

import { ImageGalleryItem } from 'components';

import css from './ImageGallery.module.css';

export default function ImageGallery({ data, name, openModal }) {
  return (
    <ul className={css.gallery}>
      {data.map(({ id, webformatURL, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          smallImg={webformatURL}
          name={name}
          largeImg={largeImageURL}
          openModal={openModal}
        />
      ))}
    </ul>
  );
}

// class ImageGallery extends Component {
//   state = {
//     isModalOpen: false,
//   };

//   toggleModal = () => {
//     this.setState(({ isModalOpen }) => ({
//       isModalOpen: !isModalOpen,
//     }));
//   };

//   render() {
//     const { data, name } = this.props;
//     return (
//       <ul className={css.gallery}>
//         {data.map(({ id, webformatURL, largeImageURL }, idx) => (
//           <>
//             <ImageGalleryItem
//               key={id}
//               smallImg={webformatURL}
//               id={id}
//               name={name}
//               showModal={this.toggleModal}
//             />
//             {this.state.isModalOpen && <Modal key={idx} img={largeImageURL} />}
//           </>
//         ))}
//       </ul>
//     );
//   }
// }

// export default ImageGallery;

// largeImg={largeImageURL}
