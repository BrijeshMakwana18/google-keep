import { useState, useEffect } from "react";
import styled from "styled-components";
import db from "../../utils/db";
import { collection, addDoc, doc, onSnapshot, query } from "firebase/firestore";

const OuterWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  align-self: center;
  height: fit-content;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.2);
`;

const Input = styled.input.attrs({
  type: "text",
})`
  height: 4vh;
  margin-top: ${(props) => (props.focused ? "0.4%" : 0)};
  width: ${(props) => (props.isTitle ? "25vw" : "30vw")};
  border-radius: 6px;
  border: none;
  padding-left: 2%;
  font-size: 1rem;
  font-weight: bold;
  font-family: "QuickSand", sans-serif;
  outline: none;
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
  margin-left: 2%;
  cursor: pointer;
  border-radius: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: rgba(0, 0, 0, 0.09);
  }
`;

const ColorSelector = styled.img`
  height: 18px;
  width: 18px;
  object-fit: contain;
  cursor: pointer;
`;

const CloseButton = styled.h4`
  font-family: "QuickSand", sans-serif;
  color: rgba(0, 0, 0, 0.4);
  margin-right: 2%;
  cursor: pointer;
`;

const NotesContainer = styled.div`
  display: grid;
  width: 90vw;
  margin-top: 4%;
  grid-template-columns: repeat(4, 2fr);
  grid-column-gap: 4%;
  grid-row-gap: 4vh;
`;

const NoteItem = styled.div`
  background-color: blue;
  border-radius: 10px;
`;

const NoteTitle = styled.h1`
  font-family: "QuickSand", sans-serif;
  color: rgba(0, 0, 0, 0.4);
  margin-right: 2%;
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
              <ColorSelector src="color.png" />
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
              </NoteItem>
            );
          }
        })}
      </NotesContainer>
    </OuterWrapper>
  );
};

export default Note;
