import { useState, useEffect } from "react";
import styled from "styled-components";
import db from "../../utils/db";
import { collection, addDoc, doc, onSnapshot, query } from "firebase/firestore";
import Color from "../../assets/color";
const OuterWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 4vh;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  align-self: center;
  height: fit-content;
  border: 1px solid ${(props) => props.theme.border};
  box-shadow: 0px 0px 4px 1px ${(props) => props.theme.shadow};
`;

const Input = styled.input.attrs({
  type: "text",
})`
  height: 6vh;
  margin-top: ${(props) => (props.focused ? "0.4%" : 0)};
  width: ${(props) => (props.isTitle ? "28vw" : "30vw")};
  border-radius: 6px;
  border: none;
  padding-left: 2%;
  font-size: 1rem;
  font-weight: bold;
  font-family: "QuickSand", sans-serif;
  outline: none;
  color: ${(props) => props.theme.font};
  background-color: ${(props) => props.theme.background};
`;

const BottomView = styled.div`
  height: 4vh;
  width: 100%;
  border-radius: 6px;
  margin-top: 1%;
  display: flex;
  align-items: center;
  margin-bottom: 1%;
  justify-content: space-between;
`;

const ImageContainer = styled.div`
  height: 35px;
  width: 35px;
  margin-left: ${(props) => (props.isFromList ? "0" : "2%")};
  cursor: pointer;
  border-radius: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: ${(props) => (props.isFromList ? "2vh" : "0vh")};
  &:hover {
    background-color: rgba(0, 0, 0, 0.09);
  }
  .svg {
    fill: green;
  }
`;

const CloseButton = styled.h4`
  font-family: "QuickSand", sans-serif;
  color: ${(props) => props.theme.font};
  margin-right: 2%;
  cursor: pointer;
`;

const NotesContainer = styled.div`
  display: grid;
  width: 90vw;
  margin-top: 4%;
  grid-template-columns: repeat(4, 2fr);
  grid-column-gap: 2%;
  grid-row-gap: 4vh;
`;

const NoteItem = styled.div`
  border: 1.5px solid ${(props) => props.theme.border};
  border-radius: 0.4rem;
  min-height: 10vh;
  min-width: 18vw;
  max-height: 15vh;
  max-width: 20vw;
  overflow: hidden;
  padding: 4% 6% 4% 6%;
`;

const NoteTitle = styled.h1`
  font-family: "QuickSand", sans-serif;
  color: ${(props) => props.theme.font};
  font-size: 1.2rem;
  font-weight: 600;
`;

const NoteData = styled.h3`
  font-family: "QuickSand", sans-serif;
  color: ${(props) => props.theme.font};
  font-size: 1rem;
  font-weight: 400;
  margin-top: 2%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const Note = () => {
  const [note, setNote] = useState("");
  const [title, setTitle] = useState("");
  const [inputFocused, setInputFocused] = useState(false);
  const [notesData, setNotesData] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "notes"));
    const unsuscribe = onSnapshot(q, (querySnapshot) => {
      let allNotes = [];
      querySnapshot.docChanges().forEach((change) => {
        allNotes.push(change.doc.data());
      });
      allNotes.sort((a, b) => b.lastUpdated - a.lastUpdated);
      setNotesData(allNotes);
    });
    return () => {
      unsuscribe();
    };
  }, [notesData]);

  const addNote = () => {
    //ToDo:- Firebase operation here
    if (note) {
      let noteRef = collection(db, "notes");
      addDoc(noteRef, {
        title: title,
        note: note,
        color: "green",
        lastUpdated: new Date(),
      })
        .then((res) => {
          setTitle("");
          setNote("");
        })
        .catch((e) => console.log(e));
    }
    setInputFocused(false);
  };

  return (
    <OuterWrapper>
      <Wrapper>
        {inputFocused ? (
          <Input
            value={title}
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            onFocus={(e) => setInputFocused(true)}
            type="text"
            isTitle={true}
          />
        ) : null}
        <Input
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Take a note..."
          onFocus={() => setInputFocused(true)}
          focused={inputFocused}
          type="text"
        />
        {inputFocused ? (
          <BottomView>
            <ImageContainer>
              <Color />
            </ImageContainer>
            <CloseButton onClick={() => addNote()}>Close</CloseButton>
          </BottomView>
        ) : null}
      </Wrapper>
      <NotesContainer>
        {notesData.map((item, index) => {
          if (item.title && item.note) {
            return (
              <NoteItem index={index} key={index}>
                <NoteTitle>{item.title}</NoteTitle>
                <NoteData>{item.note}</NoteData>
                <ImageContainer isFromList={true}>
                  <Color />
                </ImageContainer>
              </NoteItem>
            );
          }
        })}
      </NotesContainer>
    </OuterWrapper>
  );
};

export default Note;
