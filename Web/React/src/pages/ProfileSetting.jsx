import React, { useState } from "react";
import { Button } from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import axios from 'axios';
import { useSelector } from "react-redux";

function ProfileSetting() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const navigate = useNavigate();
  const SERVER_API_URL = `${process.env.REACT_APP_API_SERVER_URL}`;
  const MyuserNo = useSelector((state) => state.auth.userData.userNo);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedImage(file);
    }
  };

  const handleProfileSave = () => {
    if (uploadedImage) {
      const formData = new FormData();
      formData.append('profileFile', uploadedImage);
      
      const accessToken = localStorage.getItem("access-token");

      const headers = {
        'Authorization': `${accessToken}`,
        'Content-Type': 'multipart/form-data'
      };

      const url = `${SERVER_API_URL}/user/upload/profile`;
     

      axios.post(url, formData, { headers: headers } )
        .then(response => {
          alert("프로필 저장됨!");
          navigate(`/user/${ MyuserNo}`);
        })
        .catch(error => {
          alert("업로드에 실패했습니다.");
          console.error(error);
        });
      
    } else {
      alert("프로필 사진을 먼저 업로드하세요.");
    }
  };

  return (
    <div>
      <NavBar />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {uploadedImage ? (
            <img
              src={URL.createObjectURL(uploadedImage)}
              alt="profile-upload"
              style={{
                width: "300px",
                height: "300px",
                borderRadius: "50%",
                margin: "20px",
              }}
            />
          ) : (
            <div
              style={{
                width: "300px",
                height: "300px",
                borderRadius: "50%",
                background: "#f0f0f0",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <span style={{ color: "#888" }}>프로필 사진을 업로드하세요
              <br></br>
              (사진은 200mb까지 가능합니다)</span>
            </div>
          )}

          <Button
            variant="contained"
            component="label"
            style={{ position: "absolute", bottom: "20px", right: "20px" }}
          >
            <PhotoCameraIcon />
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleImageUpload}
            />
          </Button>
        </div>

        <button className="ProfileSetting-button" onClick={handleProfileSave}>
          프로필 저장
        </button>
      </div>
    </div>
  );
}

export default ProfileSetting;
