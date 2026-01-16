import React from "react";
import BoxItem from "../../components/BoxItem";
import { ToastContainer, toast } from "react-toastify";
import { deleteNoteApi, updateNotesApi } from "../../services/apiList";

interface FavourateNotesProps {
  List?: Array<any>;
  setAllNotesList?: any;
}

const ArchivedNotes = ({ List, setAllNotesList }: FavourateNotesProps) => {
  const [archivedList, setArchivedList] = React.useState<Array<any>>([]);
  const notify = () => toast("Note added to Archived !");
  const deleteNotify = () => toast("Note Permanently Deleted !");

  React.useEffect(() => {
    const ArchList = List?.filter((item) => item.isArchived);
    setArchivedList(ArchList || []);
  }, [List]);

  const likeBtnClicked = (note: any) => {
    setAllNotesList((prevItems: any) =>
      prevItems.map((item: any) =>
        item._id === note._id ? { ...item, isLiked: !item.isLiked } : item
      )
    );
    EditNoteApi(note);
  };

  const EditNoteApi = async (note: any) => {
    try {
      let data = {
        title: note.title,
        description: note.description,
        isLiked: !note.isLiked,
        isArchived: note.isArchived,
      };
      const result = await updateNotesApi(note._id, data);
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
    deleteNotePermanently(note);
    deleteNotify();
  };

  const deleteNotePermanently = async (note: any) => {
    try {
      // Assuming there's an API endpoint to delete a note permanently
      const result = await deleteNoteApi(note._id);
      console.log("DeleteNotePermanently result:", result);
    } catch (e) {
      console.log("Error in DeleteNotePermanently:", e);
    }
  };

  const addToArchived = (note: any) => {
    setAllNotesList((prevItems: any) =>
      prevItems.map((item: any) =>
        item._id === note._id ? { ...item, isArchived: true } : item
      )
    );
    notify();
  };
  return (
    <div style={styles.container}>
      {archivedList.length > 0 ? (
        archivedList.map((note) => (
          <BoxItem
            key={note._id}
            _id={note._id}
            title={note.title}
            isLiked={note.isLiked}
            description={note.description}
            likeBtnClicked={() => likeBtnClicked(note)}
            deleteBtnClicked={() => deleteBtnClicked(note)}
            addToArchived={() => addToArchived(note)}
            permantentDelete={true}
          />
        ))
      ) : (
        <h3>No Archived Notes</h3>
      )}
      <ToastContainer />
    </div>
  );
};

export default ArchivedNotes;
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
