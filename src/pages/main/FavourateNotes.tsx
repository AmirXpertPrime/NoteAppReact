import React from "react";
import BoxItem from "../../components/BoxItem";
import { ToastContainer, toast } from "react-toastify";
import { updateNotesApi } from "../../services/apiList";
import { data } from "react-router-dom";

interface FavourateNotesProps {
  List?: Array<any>;
  setAllNotesList?: any;
}

const FavourateNotes = ({ List, setAllNotesList }: FavourateNotesProps) => {
  const [filteredList, setFilteredList] = React.useState<Array<any>>([]);
  const notify = () => toast("Note added to Archived !");

  React.useEffect(() => {
    const favList = List?.filter((item) => item.isLiked);
    setFilteredList(favList || []);
  }, [List]);

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

  const deleteBtnClicked = (id: number) => {
    console.log("Delete note with id (from AllNotes):", id);
    setAllNotesList((prevItems: any) =>
      prevItems.filter((item: any) => item.id !== id)
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
    toast("Note added to Archived !");
  };
  return (
    <div style={styles.container}>
      {filteredList.length > 0 ? (
        filteredList.map((note) => (
          <BoxItem
            key={note._id}
            _id={note._id}
            title={note.title}
            isLiked={note.isLiked}
            description={note.description}
            isArchived={note.isArchived}
            likeBtnClicked={() => likeBtnClicked(note)}
            deleteBtnClicked={() => deleteBtnClicked(note._id)}
            addToArchived={() => addToArchived(note._id)}
          />
        ))
      ) : (
        <h3>No Favourate Notes</h3>
      )}
      <ToastContainer />
    </div>
  );
};

export default FavourateNotes;
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
