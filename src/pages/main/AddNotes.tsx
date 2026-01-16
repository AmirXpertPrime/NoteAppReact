import React, { useEffect, useState } from "react";
import "../../App.css";
import RoundTextInput from "../../components/Inputs/RoundTextInput";
import LargeTextInput from "../../components/Inputs/LargeTextInput";
import ValidationError from "../../components/Validations/validationError";
import RoundButton from "../../components/Buttons/RoundButton";
import { AppStrings } from "../../utils/Strings";
import { useLocation, useNavigate } from "react-router-dom";
import { createNoteApi, updateNotesApi } from "../../services/apiList";
import { AppImages } from "../../utils/AppConstants";

const AddNotes = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [submitClick, setSubmitClick] = useState(false);
  const [isArchived, setIsArchived] = useState(false);

  console.log("Location state in AddNotes:", location.state);

  useEffect(() => {
    if (location.state) {
      const { title, description, _id } = location.state as {
        title: string;
        description: string;
        _id: string;
        isLiked: boolean;
        setIsArchived: boolean;
      };
      setTitle(title);
      setDescription(description);
      setIsArchived(isArchived);
      console.log("Editing note with id:", _id);
    }
  }, [location.state]);

  const submitBtnClicked = () => {
    console.log("Title:", title);
    console.log("Description:", description);
    setSubmitClick(true);
    if (!title || !description) {
      return;
    } else {
      if (!location.state) {
        // Creating a new note
        createNotewithApi();
      } else {
        // Editing an existing note
        console.log("Editing existing note");

        let note = {
          _id: location.state?._id,
          title: title,
          description: description,
          isLiked: location.state?.isLiked,
          isArchived: location.state?.isArchived,
        };

        EditNoteApi(note);

        console.log("Navigating back to Home");
      }
    }
  };

  const EditNoteApi = async (note: any) => {
    try {
      let data = {
        title: note.title,
        description: note.description,
        isLiked: note.isLiked,
        isArchived: note.isArchived,
      };
      const result = await updateNotesApi(note._id, data);
      console.log("EditNoteApi result:", result);
      if (result && result.status === 200) {
        navigate("/home");
      }
    } catch (e) {
      console.log("Error in EditNoteApi:", e);
    }
  };

  const createNotewithApi = async () => {
    try {
      console.log("Creating note via API");
      let data = {
        title: title,
        description: description,
        isArchived: false,
        isLiked: false,
        user: "6966a5fa6e3282dc84c11e8a",
      };
      const result = await createNoteApi(data);
      console.log("createNoteApi result:", result);
      if (result.success) {
        navigate("/home");
      }
    } catch (e) {
      console.log("Error in createNoteApi:", e);
    }
  };

  return (
    <div style={{ padding: 10 }}>
      <div
        style={{
          flexDirection: "row",
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 20,
          padding: "0 12px",
        }}
      >
        <button
          className="menuButton"
          onClick={() => navigate("/Home")}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={AppImages.BackButton} alt="back" style={styles.imgStyle} />
        </button>
        <h1 style={{ margin: 0, fontSize: "var(--text-lg)" }}>
          Add Notes Page
        </h1>
      </div>

      <div className="w-full max-w-sm">
        <RoundTextInput
          value={title}
          setValue={setTitle}
          LABEL={AppStrings.Title}
          placeholder={AppStrings.TitleText}
        />
        {submitClick && !title && (
          <ValidationError validationMsg={AppStrings.Validations.EnterTitle} />
        )}
        <div style={{ marginTop: 20 }}>
          <LargeTextInput
            value={description}
            setValue={setDescription}
            LABEL={AppStrings.Description}
            placeholder={AppStrings.DescriptionText}
          />
        </div>
        {submitClick && !description && (
          <ValidationError
            validationMsg={AppStrings.Validations.EnterDescription}
          />
        )}

        <div style={{ marginTop: 20 }}>
          <RoundButton
            submitBtnClicked={submitBtnClicked}
            buttonText={AppStrings.Submit}
          />
        </div>
      </div>
    </div>
  );
};

export default AddNotes;

const styles: { [key: string]: React.CSSProperties } = {
  imgStyle: {
    width: 20,
    height: 20,
  },
};
