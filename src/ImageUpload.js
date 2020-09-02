import React, { useState } from "react";
import "./ImageUpload.css";
import { Button } from "@material-ui/core";
import { db, storage } from "./firebase";
import firebase from "firebase";

function ImageUpload({ username }) {
  const [caption, setCaption] = useState("");
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progress function ...
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        // Error function ...
        console.log(error);
        alert(error.message);
      },
      () => {
        // complete function ...
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            // post image in db

            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: username,
            });

            setProgress(0);
            setCaption("");
            setImage(null);
          });
      }
    );
  };

  return (
    <div className="imageUpload">
      <h3>Upload a new Post</h3>
      <progress className="imageUpload__progress" value={progress} max="100" />
      <input
        className="imageUpload__input"
        type="text"
        placeholder="Enter a caption..."
        onChange={(e) => setCaption(e.target.value)}
        value={caption}
      />
      <input
        className="imageUpload__file"
        type="file"
        onChange={handleChange}
      />
      <Button
        color="primary"
        variant="contained"
        className="imageUpload__button"
        onClick={handleUpload}
      >
        Upload
      </Button>
    </div>
  );
}

export default ImageUpload;
