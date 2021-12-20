import PropTypes from "prop-types";
import s from "./ImageGalleryItem.module.css";

const ImageGalleryItem = ({ item, onClick }) => {
  const { webformatURL, tags, largeImageURL, id } = item;
  return (
    <li className={s.ImageGalleryItem} onClick={onClick}>
      <img
        className={s["ImageGalleryItem-image"]}
        src={webformatURL}
        alt={tags}
        data-src={largeImageURL}
        id={id}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  item: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
