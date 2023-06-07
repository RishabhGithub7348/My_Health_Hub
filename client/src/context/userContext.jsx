import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';


export const UserContext = createContext({});
 
export function UserContextProvider({ children }) {
    const [user, setUser] = useState({});
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [formDetails, setFormDetails] = useState([]);
    const [formNavigate, setFormNavigate] = useState(false);
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [latestNote, setLatestNote] = useState({});
    const [files, setFiles] = useState([]);
    const [records, setRecords] = useState([]);
    const [file, setFile] = useState(null);
    const [fileId, setFileId] = useState(null);
    const [downloadfileId, setDownloadFileId] = useState(null);

    

    useEffect(() => {
        const token = localStorage.getItem('token');
    
        const fetchUserDetails = async () => {
          try {
            const response = await axios.get('https://my-health-hub-9wxa.onrender.com/user', {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            setUser(response.data);
            setIsAuthenticated(true);
          } catch (error) {
            console.log(error);
          
          }
        };
    
        if (token) {
          fetchUserDetails();
        }
      }, [setUser, setIsAuthenticated]);
      console.log(user.email);


      const fetchFormDetails = async () => {
        try {
          const token = localStorage.getItem('token');
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
    
          const response = await axios.get('https://my-health-hub-9wxa.onrender.com/api/getFormDetails', config);
    
          if (response.status === 200) {
            setFormDetails(response.data);
            setFormNavigate(true);
            
            setLoading(false);
          } else {
            console.error('Failed to fetch form details');
          }
        } catch (error) {
          console.error('Error fetching form details:', error);
        }
      };
      useEffect(() => {
        fetchFormDetails();
      }, []);
      console.log(formDetails);


      useEffect(() => {
    
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        fetch('https://my-health-hub-9wxa.onrender.com/api/notes', config)
          .then(response => response.json())
          .then(data => {
            // console.log('Success:', data);
            setNotes(data);
            setIsLoading(false);
          })
          .catch((error) => {
            console.error('Error:', error);
            setIsLoading(false);
          });
      }, [setNotes]);


      useEffect(() => {
        const token = localStorage.getItem('token');
            const config = {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
        async function fetchLatestNote() {
            
          const response = await fetch('https://my-health-hub-9wxa.onrender.com/api/latest', config);
          const data = await response.json();
          setLatestNote(data);
        }
        fetchLatestNote();
      }, []);

      useEffect(() => {
        const token = localStorage.getItem('token');
            const config = {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
        fetch('https://my-health-hub-9wxa.onrender.com/files', config) 
          .then((response) => response.json())
          .then((data) => setFiles(data));
      }, [setFiles]);

      useEffect(() => {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        async function fetchRecords() {
          const response = await fetch('https://my-health-hub-9wxa.onrender.com/api/add-record',config);
          const data = await response.json();
          setRecords(data);
          
        }
        fetchRecords();
      }, [setRecords]);


      const handleUploadButtonClick = async () => {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        if (!file) {
          alert('Please select a file');
          return;
        }
        const formData = new FormData();
        formData.append('file', file);
        setIsLoading(true);
        try {
          const response = await axios.post('https://my-health-hub-9wxa.onrender.com/upload', formData, config);
    
         
          setFileId(response.data.fileId);
          alert('File uploaded successfully!');
        } catch (err) {
          console.log(err);
          alert('An error occurred while uploading the file');
        }
        finally {
          setIsLoading(false);
        }
      };


      async function deleteFile(fileId) {
        try {
          const response = await fetch(`https://my-health-hub-9wxa.onrender.com/files/${fileId}`, {
            method: 'DELETE'
          });
      
          const data = await response.json();
          // console.log(data);
        } catch (err) {
          console.log(err);
        }
      }


      const handleDownloadButtonClick = async (id) => { 
        try {
          const response = await axios.get(`https://my-health-hub-9wxa.onrender.com/download/${id}`, {
            responseType: 'blob',
          });
          const contentDisposition = response.headers['content-disposition'];
          const filename =
            contentDisposition && typeof contentDisposition === 'string'
              ? contentDisposition.split('filename=')[1]
              : 'download.pdf';
          const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
          const url = window.URL.createObjectURL(pdfBlob);
          const link = document.createElement('a');
    
          link.href = url;
          link.download = `${filename}.pdf`;
          document.body.appendChild(link);
          link.click();
        } catch (err) {
          console.log(err);
          alert('An error occurred while downloading the file');
        }
      };

      const handleDownload = async (id) => { 
        try {
          const response = await axios.get(`https://my-health-hub-9wxa.onrender.com/recordfiledownload/${id}`, {
            responseType: 'blob',
          });
      
          const contentDisposition = response.headers['content-disposition'];
          const filename =
            contentDisposition && typeof contentDisposition === 'string'
              ? contentDisposition.split('filename=')[1]
              : 'download.pdf';
          const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
          const url = window.URL.createObjectURL(pdfBlob);
          const link = document.createElement('a');
    
          link.href = url;
          link.download = `${filename}.pdf`;
          document.body.appendChild(link);
          link.click();
        } catch (err) {
          console.log(err);
          alert('An error occurred while downloading the file');
        }
      };

      const handleDeleteNote = async (id) => {
        try {
          const response = await fetch(`https://my-health-hub-9wxa.onrender.com/api/notes/${id}`, {
            method: 'DELETE'
          });
      
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
      
          const updatedNotes = notes.filter((note) => note.id !== id);
          setNotes(updatedNotes);
      
        } catch (error) {
          console.error('Error:', error);
        }
      };

      const handleDeleteRecord = async (id) => {
        try {
          const response = await fetch(`https://my-health-hub-9wxa.onrender.com/api/delete-record/${id}`, {
            method: 'DELETE'
          });
      
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
      
          const updatedRecord = records.filter((record) => record.id !== id);
          setRecords(updatedRecord);
      
        } catch (error) {
          console.error('Error:', error);
        }
      };
      
 
  return (
    <UserContext.Provider
      value={{
       
      user,
        setUser,
        isAuthenticated,
        setIsAuthenticated,
        formDetails,
        setFormDetails,
        formNavigate,
        setFormNavigate,
        notes,
        setNotes,
        loading,
        setLoading,
        isLoading,
        setIsLoading,
        isError,
        setIsError,
        latestNote,
        setLatestNote,
        files,
        setFiles,
        records,
        setRecords,
        file,
        setFile,
        fileId,
        handleUploadButtonClick,
        deleteFile,
        handleDownloadButtonClick,
        handleDeleteNote,
        handleDeleteRecord,
        handleDownload,
        
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
