import heartFilled from "../assets/heartFilled.png";
import editIcon from "../assets/edit.png";
import deleteIcon from "../assets/delete.png";
import heartEmpty from "../assets/heartEmpty.png";
import plus from "../assets/plus.png";
import BackButton from '../assets/BackButton.png'
import App from "../App";
import { AppStrings } from "./Strings";

export const ListRow = [
  {
    id: 1,
    name: AppStrings.Tabs.All,
  },
  {
    id: 2,
    name: AppStrings.Tabs.Favourate,
  },
  {
    id: 3,
    name: AppStrings.Tabs.Archive,
  },
];

export const AppImages = {
  heartFilled,
  heartEmpty,
  editIcon,
  deleteIcon,
  plus,
  BackButton
};

export const dummyNotes = [
  {
    id: 1,
    title: "First Note",
    description: "This is the description of the first note.",
    isLiked: false,
  },
  {
    id: 2,
    title: "Second Note",
    description: "This is the description of the second note.",
    isLiked: false,
  },
  {
    id: 3,
    title: "Third Note",
    description: "This is the description of the third note.",
    isLiked: true,
  },
];
