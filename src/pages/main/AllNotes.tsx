import React from "react";
import { ToastContainer, toast } from "react-toastify";
// import { AppImages, dummyNotes, ListRow } from "../utils/AppConstants";
import BoxItem from "../../components/BoxItem";
import { AppStrings } from "../../utils/Strings";
import { updateNotesApi } from "../../services/apiList";

interface AllNotesProps {
  List: Array<any>;
  setAllNotesList: any;
}

const AllNotes = ({ List, setAllNotesList }: AllNotesProps) => {
  const notify = () => toast("Note added to Archived !");
  const archiveNotify = () => toast("Note added to Archived !");
  const editify = () => toast("Note edited successfully !");

  const likeBtnClicked = (note: any) => {
    setAllNotesList((prevItems: any) =>
      prevItems.map((item: any) =>
        item._id === note._id ? { ...item, isLiked: !item.isLiked } : item
      )
    );
    let data = {
      title: note.title,
      description: note.description,
      isLiked: !note.isLiked,
      isArchived: note.isArchived,
    };
    EditNoteApi(note._id, data);
  };

  const EditNoteApi = async (noteId: any, data: any) => {
    try {
      const result = await updateNotesApi(noteId, data);
      console.log("EditNoteApi result:", result);
    } catch (e) {
      console.log("Error in EditNoteApi:", e);
    }
  };

  const deleteBtnClicked = (note: any) => {
    console.log("Delete note with id (from AllNotes):", note._id);
    setAllNotesList((prevItems: any) =>
      prevItems.filter((item: any) => item._id !== note._id)
    );
  };

  const addToArchived = (note: any) => {
    setAllNotesList((prevItems: any) =>
      prevItems.map((item: any) =>
        item._id === note._id ? { ...item, isArchived: true } : item
      )
    );
    let data = {
      title: note.title,
      description: note.description,
      isLiked: note.isLiked,
      isArchived: true,
    };
    EditNoteApi(note._id, data);
    // notify();
    toast("Note added to Archived !");
  };

  return (
    <div style={styles.container}>
      {List.length > 0 ? (
        List.map((note) => (
          <BoxItem
            key={note._id}
            _id={note._id}
            title={note.title}
            isLiked={note.isLiked}
            description={note.description}
            isArchived={note.isArchived}
            likeBtnClicked={() => likeBtnClicked(note)}
            deleteBtnClicked={() => deleteBtnClicked(note)}
            addToArchived={() => addToArchived(note)}
          />
        ))
      ) : (
        <h3>{AppStrings.NoAllNote}</h3>
      )}
      <ToastContainer />
    </div>
  );
};

export default AllNotes;
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column",
    padding: 20,
  },
  headerWrapper: {
    // alignItems: "center"
  },
  listRow: { display: "flex", flexDirection: "row" },
};
