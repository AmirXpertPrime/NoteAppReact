import React, { useEffect } from "react";
import { AppImages, ListRow } from "../../utils/AppConstants";
import "../../App.css";
import { useLocation, useNavigate } from "react-router-dom";
import { AppStrings } from "../../utils/Strings";
import AllNotes from "./AllNotes";
import FavourateNotes from "./FavourateNotes";
import ArchivedNotes from "./ArchivedNotes";
import { ToastContainer, toast } from "react-toastify";
import { getAllUserNotes } from "../../services/apiList";
import { setAuthenticated, setUser } from "../../redux/Slice";
import { useDispatch } from "react-redux";

const Home = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = React.useState("All");
  const [AllNotesList, setAllNotesList] = React.useState<any[]>(() => {
    try {
      const s = localStorage.getItem("notes");
      console.log("Retrieved notes from localStorage:", s);
      return s ? JSON.parse(s) : [];
    } catch (e) {
      return [];
    }
  });
  const editify = () => toast("Note edited successfully !");
  //const addToast = () => toast("Note added successfully !");

  const addToast = () => {
    toast("Note added successfully!", {
      autoClose: 2000,
      closeButton: true,
    });
  };
  const location = useLocation();
  const { state } = location;
  const dispatch = useDispatch();

  // useEffect(() => {
  //   localStorage.setItem("notes", JSON.stringify(AllNotesList));
  //   console.log("AllNotesList updated in localStorage:", AllNotesList);
  // }, [AllNotesList]);

  // useEffect(() => {
  //   if (state && state.id) {
  //     console.log("Processing state in Home:", state);
  //     const newNote = {
  //       id: state.id,
  //       title: state.title,
  //       description: state.description,
  //       isLiked: state.isLiked ?? false,
  //     };

  //     let existingNote = AllNotesList.find((item) => item.id === newNote.id);
  //     if (existingNote) {
  //       console.log("Note exists, updating note with id:", newNote.id);
  //       setAllNotesList((prevItems) =>
  //         prevItems.map((item) =>
  //           item.id === newNote.id ? { ...item, ...newNote } : item
  //         )
  //       );
  //       editify();
  //     } else {
  //       console.log(
  //         "Note does not exist, adding new note with id:",
  //         newNote.id
  //       );
  //       console.log("New Note to add:", newNote);
  //       // Prevent adding duplicates (can happen in Strict Mode or multiple navigations)
  //       setAllNotesList((prevItems) => {
  //         if (prevItems.some((item: any) => item.id === newNote.id)) {
  //           console.log("Note already exists, skipping add.");
  //           return prevItems;
  //         }
  //         return [...prevItems, newNote];
  //       });
  //       console.log("Added new note to AllNotesList");
  //       addToast();
  //     }
  //   }
  // }, [state]);

  useEffect(() => {
    getAllNotesfroApi();
  }, []);

  const logout = () => {
    localStorage.removeItem("jwtAuthToken");
    dispatch(setAuthenticated(false));
    dispatch(setUser(""));
    navigate("/");
  };

  const getAllNotesfroApi = async () => {
    try {
      console.log("Fetching notes from API...");
      const response = await getAllUserNotes({});
      console.log("Api Result All Notes:", JSON.stringify(response.data.notes));
      if (response && response.data && response.data.notes) {
        setAllNotesList(response.data.notes);
      } else {
        setAllNotesList([]);
      }
    } catch (error) {
      console.error("Error fetching notes from API:", error);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.headerWrapper}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            height: 56,
            marginBottom: 20,
            padding: "0 12px",
            gap: 12,
          }}
        >
          <h1 style={{ margin: 0, fontSize: "var(--text-lg)" }}>Notes App</h1>
          <button
            className="addButton"
            onClick={() => navigate("/add")}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: 36,
            }}
          >
            <img src={AppImages.plus} alt="plus" className="ImageICon" />
          </button>
        </div>
        <button
          key={6}
          className="todoButton"
          onClick={() => {
            console.log("Logout btn clicked");
            logout();
          }}
          style={{
            height: 36,
            display: "flex",
            alignItems: "center",
          }}
        >
          <h6 style={{ margin: 0 }}>Logout</h6>
        </button>
      </div>

      <div style={styles.listRow}>
        {ListRow.map((item, _index) => (
          <button
            key={_index}
            className="todoButton"
            onClick={() => setSelectedTab(item.name)}
          >
            <h6 style={{ margin: 0 }}>{item.name}</h6>
          </button>
        ))}
      </div>
      {selectedTab === AppStrings.Tabs.All ? (
        <>
          <AllNotes List={AllNotesList} setAllNotesList={setAllNotesList} />
        </>
      ) : selectedTab === AppStrings.Tabs.Favourate ? (
        <>
          <FavourateNotes
            List={AllNotesList}
            setAllNotesList={setAllNotesList}
          />
        </>
      ) : (
        <>
          <ArchivedNotes
            List={AllNotesList}
            setAllNotesList={setAllNotesList}
          />
        </>
      )}
      <ToastContainer />
    </div>
  );
};

export default Home;
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column",
    padding: 20,
  },
  headerWrapper: {
    // alignItems: "center"
    // backgroundColor: "red",
    display: "flex",
    width: "85%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    overflowX: "hidden",
  },
  listRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: 36,
  },
};
