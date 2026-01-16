import React, { useState } from "react";
import { AppImages } from "../utils/AppConstants";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

interface BoxItemProps {
  _id: number;
  title: string;
  description: string;
  isLiked: boolean;
  likeBtnClicked?: (id: number) => void;
  deleteBtnClicked?: any;
  addToArchived: any;
  isArchived?: any;
  permantentDelete?: boolean;
  donotShowArchive?: boolean;
}

const BoxItem = ({
  _id,
  title,
  description,
  isLiked,
  isArchived,
  likeBtnClicked,
  deleteBtnClicked,
  addToArchived,
  permantentDelete,
  donotShowArchive,
}: BoxItemProps) => {
  const navigate = useNavigate();
  const [heartClicked, setHeartClicked] = useState(false);

  const heartbtnClicked = (id: number) => {
    setHeartClicked(!heartClicked);
    if (likeBtnClicked) {
      likeBtnClicked(id);
    }
  };

  const editNotes = (
    _id: number,
    title: string,
    description: string,
    isLiked: boolean,
    isArchived: boolean
  ) => {
    navigate("/add", {
      state: { _id, title, description, isLiked, isArchived },
    });
  };

  const deleteNotes = (_id: number) => {
    console.log("Delete note with id:", _id);
    if (deleteBtnClicked) {
      deleteBtnClicked(_id);
    }
  };

  const archiveBtnClicked = (_id: number) => {
    console.log("Archive note with id:", _id);
    if (permantentDelete) {
      deleteNotes(_id);
      return;
    } else {
      if (addToArchived) {
        addToArchived(_id);
      }
    }
  };

  return (
    <>
      {isArchived !== true && (
        <div className="todoBox" style={styles.todoBox} key={_id}>
          <div style={styles.todoInner}>
            <div style={styles.todoTextContainer}>
              <h6 style={styles.title}>{title ? title : "tttt"}</h6>
              <h6 style={styles.description}>
                {description ? description : "dddd"}
              </h6>
            </div>
            <div style={styles.menuWrapper}>
              <button
                className="menuButton"
                onClick={() => heartbtnClicked(_id)}
              >
                <img
                  src={isLiked ? AppImages.heartFilled : AppImages.heartEmpty}
                  alt="like"
                  style={styles.imgStyle}
                />
              </button>

              <button
                className="menuButton"
                onClick={() =>
                  editNotes(_id, title, description, isLiked, isArchived)
                }
              >
                <img
                  src={AppImages.editIcon}
                  alt="like"
                  style={styles.imgStyle}
                />
              </button>

              <button
                className="menuButton"
                onClick={() => archiveBtnClicked(_id)}
              >
                <img
                  src={AppImages.deleteIcon}
                  alt="delete"
                  style={styles.imgStyle}
                />
              </button>
            </div>
          </div>

          <ToastContainer />
        </div>
      )}
    </>
  );
};

export default BoxItem;

const styles: { [key: string]: React.CSSProperties } = {
  todoBox: { width: "80vw", marginTop: 20 },
  todoInner: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 10,
    overflowX: "hidden",
  },
  todoTextContainer: {
    display: "flex",
    flexDirection: "column",
    width: "80%",
    margin: 0,
  },
  title: { margin: 2, padding: 5 },
  description: { margin: 0, padding: 5 },
  menuWrapper: { flexWrap: "nowrap", marginTop: 10 },

  imgStyle: {
    width: 20,
    height: 20,
  },
};
