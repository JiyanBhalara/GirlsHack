import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FileInputComponent from "./FileInputComponent"; 
import { motion } from "framer-motion";
import axios from 'axios';

function FileUploadPage() {
  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState(null);
  const [showResumeUpload, setShowResumeUpload] = useState(false);
  const navigate = useNavigate();

  const navigateToJobRecommendations = async () => {
    if (resume) {
      const formData = new FormData();
      formData.append("resume", resume);

      try {
        const response = await axios.post(
          "http://127.0.0.1:5000/upload_files",
          formData,
          {
            headers: {
              "Content-Type": "application/pdf"
            }
          }
        );
        navigate("/FileUploadPage"); // Navigate to another page after successful upload
      } catch (error) {
        console.error("Error uploading resume", error);
        alert("Error uploading resume.");
      }
    } else {
      alert("Please upload the resume first");
    }
  };

  const handleShowSkillGap = async () => {
    if (jobDescription && resume) {
      const formData = new FormData();
      formData.append("resume", resume);
      formData.append("job_description", jobDescription);
      try {
        const response = await axios.post(
          "http://127.0.0.1/upload_files",
          formData,
          {
            headers: {
              "Content-Type": "application/pdf"
            }
          }
        );
        console.log(response)
        setShowResumeUpload(true); // Enable display of resume input field and navigate
        navigate("/FileUploadPage"); // Navigate to the skill gaps page
      } catch (error) {
        console.error("Error uploading files:", error);
        alert("Error uploading files.");
      }
    } else {
      setShowResumeUpload(true); // Ensure the resume field remains hidden if files are missing
      alert("Please upload both job description and resume files first.");
    }
  };

  return (
    <div className="flex flex-col bg-cover items-center gap-10 bg-skillissue bg-center justify-center min-h-screen ">
  
        <FileInputComponent
          label="Resume"
          onFileChange={(file) => setResume(file[0])} // Correctly set the resume file
          style={{ display: "block" }} // Conditionally display this input
        />
      
      {showResumeUpload && (<FileInputComponent
        label="Job Description"
        onFileChange={(file) => setJobDescription(file[0])}
      />)}

      <div className="flex gap-20">
        <motion.button
          whileHover={{ scale: 1.2 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="rounded-xl bg-gradient-to-r from-[#486366] to-[#857878] border px-4 py-2 text-black"
          onClick={handleShowSkillGap}
        >
          Show Skill Gap
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.2 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="rounded-xl bg-gradient-to-r from-[#486366] to-[#857878] border px-4 py-2 text-black"
          onClick={navigateToJobRecommendations}
        >
          Show Job Recommendations
        </motion.button>
      </div>
    </div>
  );
}

export default FileUploadPage;