import React, { useState } from "react";
import api from '../utils/api'

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  // console.log('updateColors',updateColors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState(initialColor);



  const saveNew = e => {
    e.preventDefault();
    api()
    .post(`/api/colors/`, newColor)
    .then(res => {
      console.log("ADD_NEW_Response", res.data);
      updateColors(res.data)
    })
  };

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
    // console.log("editColor",color)
  };


  const saveEdit = e => {
    e.preventDefault();
    api()
      .put(`/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        const newColors = colors.map(color => {
          if (color.id === colorToEdit.id) {
            return res.data;
          }
          return color;
        });
        updateColors(newColors);
      })
    setEditing(false);
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
      {/* <div className="spacer" /> */}


      {/* //add new */}

      {<form onSubmit={saveNew}>
          <legend>new color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setNewColor({ ...newColor, color: e.target.value })
              }
              value={newColor.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setNewColor({...newColor, 
                  code: { hex: [e.target.value] }})
              }
              value={newColor.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>}
    </div>
  );
};

export default ColorList;