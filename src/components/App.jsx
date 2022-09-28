import { useState, useEffect } from 'react';
import { GlobalStyle } from './GlobalStyle';
import { AppSection } from './App.styled';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Report } from 'notiflix/build/notiflix-report-aio';

const API_KEY = '29159880-83bd8f09217c4813e14c9607d';
const PER_PAGE = 12;
const URL = 'https://pixabay.com/api/';

export const App = () => {
  const [search, setSearch] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [modalImg, setModalImg] = useState(null);
  const [loadeMore, setLoadeMore] = useState(false);
  const [page, setPage] = useState(1);

  const showModal = img => {
    setModalImg(img);
    setModalShow(true);
  };

  const closeModal = () => {
    setModalShow(false);
    setModalImg(null);
  };

  const handleSubmit = info => {
    if (info === search) {
      Report.info('FINDER INFO', 'Please enter a new request.', 'Okay');
      return;
    } else {
      setSearch(info);
      setPage(1);
      setItems([]);
    }
  };

  const hendleLoadeMore = () => {
    setPage(prevState => prevState + 1);
  };

  useEffect(() => {
  
    if (search === '') {
      return;
    }
    setLoading(true);
    fetch(
      `${URL}?q=${search}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`
    )
      .then(response => response.json())
      .then(items => {
        if (items.total === 0) {
          Report.info(
            'FINDER INFO',
            'Sorry, but nothing was found for your query.',
            'Okay &#9785;'
          );
        } else if (items.total <= PER_PAGE) {
          setItems(items.hits);
        } else {
          setItems(prevState => [...prevState, ...items.hits]);
          setLoadeMore(true);
          if (items.hits.length < 12 || items.total / page === PER_PAGE) {
            setLoadeMore(false);
          }
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [search, page]);

  return (
    <AppSection>
      <GlobalStyle />
      <Searchbar onSubmit={handleSubmit} />

      <ImageGallery>
        {items.map(item => {
          return (
            <ImageGalleryItem
              id={item.id}
              imageItem={item.webformatURL}
              description={item.tags}
              openModal={showModal}
              modalImage={item.largeImageURL}
              key={item.id}
            />
          );
        })}
      </ImageGallery>
      {loading && <Loader />}
      {loadeMore && (
        <Button
          loadeMore={() => {
            hendleLoadeMore();
          }}
        />
      )}
      {modalShow && (
        <Modal onClose={closeModal}>
          {<img src={modalImg} alt={search} />}
        </Modal>
      )}
    </AppSection>
  );
};
