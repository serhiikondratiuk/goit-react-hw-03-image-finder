// import PropTypes from "prop-types";
import s from "./ImageGallery.module.css";
import ImageGalleryItem from "../ImageGalleryItem";
import { toast } from "react-toastify";
import { Component } from "react";
import NewLoader from "../Loader";
import API from "../../services/imageFinderApi";
import LoadMoreButton from "../Button";
import Modal from "../Modal";

class ImageGallery extends Component {
  state = {
    gallery: [],
    page: 1,
    error: null,
    status: "idle",
    showModal: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.query;
    const nextQuery = this.props.query;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevQuery !== nextQuery || prevPage < nextPage) {
      this.setState({ status: "pending" });

      API.fetchImage(nextQuery, this.state.page)
        .then(({ hits }) =>
          this.setState(({ gallery }) => ({
            gallery: [...gallery, ...hits],
            status: "resolved",
          }))
        )
        .catch((error) => this.setState({ error, status: "rejected" }));
    }
  }

  // handleNewGallary = () => {
  //   this.setState({ gallery: [] });
  // };

  handleLoadMoreButton = () => {
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { gallery, error, status, showModal } = this.state;

    if (status === "idle") {
      return <h1>Enter anything you are looking for</h1>;
    }

    if (status === "pending") {
      return <NewLoader />;
    }

    if (status === "rejected") {
      return toast.error(`${error.message}`);
    }

    if (status === "resolved") {
      return (
        <>
          <ul className={s.ImageGallery}>
            {gallery.map((elem) => (
              <ImageGalleryItem
                key={elem.id}
                item={elem}
                onClick={this.toggleModal}
              />
            ))}
          </ul>
          {gallery.length >= 12 && (
            <LoadMoreButton onClick={this.handleLoadMoreButton} />
          )}
          ,{showModal && <Modal onToggle={this.toggleModal} />}
        </>
      );
    }
  }
}

export default ImageGallery;
