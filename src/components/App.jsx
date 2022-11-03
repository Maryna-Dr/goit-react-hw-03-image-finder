import { Searchbar, ImageGallery, Modal, Loader } from 'components';

import { Component } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export class App extends Component {
  state = {
    query: null,
    collection: [],
    isModalOpen: false,
    currentImg: {
      imgUrl: '',
      altText: '',
    },
    status: 'idle',
  };

  BASE_URL = 'https://pixabay.com/api/';
  params = new URLSearchParams({
    key: '30371757-a5b40e590621142e63a85b7cd',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: 1,
    per_page: 12,
  });

  componentDidUpdate(prevProps, prevState) {
    const { BASE_URL, params } = this;
    const prevQuery = prevState.query;
    const nextQuery = this.state.query;

    if (prevQuery !== nextQuery) {
      this.setState({ status: 'pending' });

      fetch(`${BASE_URL}?${params}&q=${nextQuery}`)
        .then(res => res.json())
        .then(data => {
          if (data.hits.length > 0) {
            this.setState({ status: 'resolve', collection: data.hits });
            return;
          }

          return Promise.reject(
            new Error(`No pictures requested ${nextQuery}`)
          );
        })
        .catch(e => Notify.failure(e.message));
    }
  }

  toggleModal = (url, text) => {
    this.setState(({ isModalOpen }) => ({
      isModalOpen: !isModalOpen,
      currentImg: {
        imgUrl: url,
        altText: text,
      },
    }));
  };

  getQuery = value => {
    this.setState({ query: value });
  };

  render() {
    const { getQuery, toggleModal } = this;
    const { collection, query, isModalOpen, currentImg, status } = this.state;

    return (
      <>
        <Searchbar onSubmit={getQuery} />

        {status === 'pending' && <Loader />}

        {status === 'resolve' && collection && (
          <ImageGallery
            data={collection}
            name={query}
            openModal={toggleModal}
          />
        )}

        {isModalOpen && <Modal onShow={toggleModal} img={currentImg} />}
      </>
    );
  }
}

export default App;
