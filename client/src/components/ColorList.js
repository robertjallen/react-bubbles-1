import React, { useState, useEffect} from "react";
import axios from "axios";

import api from '../utils/api'
const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const [newColor, setNewColor] = useState(initialColor);


  useEffect(()=>{
    api()
    .get('/api/colors')
    .then(res => {
      console.log(res.data)
      updateColors(res.data)
    })
  },[editing])


  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    api()
    .put(`/api/colors/${colorToEdit.id}`, colorToEdit)
    .then(res => {
      console.log("saveEditResponse", res);
      console.log(colors)
      // updateColors([colorToEdit])
    })

    setEditing(false)
    console.log("editing", editing)
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    if(window.confirm("DELETE")){
      api()
      .delete(`/api/colors/${color.id}`)
      .then(res => {
        console.log("deleteres", res)
        const newList = colors.filter(clr => clr.id !== color.id)
        console.log("newList", newList)
        updateColors(newList)
      })
    }
  };

  const saveNew = e => {
    newColor.id = Date.now();

    e.preventDefault();
    api()
    .post(`/api/colors/${newColor.id}`, newColor)
    .then(res => {
      console.log("ADD_NEW_Response", res);
      updateColors(res.data)
    })

    setEditing(false)
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
