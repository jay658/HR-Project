import { AppDispatch, RootState } from '../store/store';
import React, { useEffect, useRef } from "react";
import { fetchVisaType, fetchNextDocument, fetchAllDocument,
  uploadFile, createVisa
 } from "../store/visaSlice/visaThunks";
import { useDispatch, useSelector } from 'react-redux'
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Stack,
} from "@mui/material";

const VisaStatusPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const visaState = useSelector((state: RootState) => state.visa);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedDocType, setSelectedDocType] = React.useState<string>("");

  const shouldShowNextDocument = () => {
    if (!visaState.documents || !visaState.documentType) return false;
    // Check if the next required document type is different from all existing document types
    return !visaState.documents.some(doc => doc.type === visaState.documentType);
  }

  const handleButtonClick = (docType: string) => {
    setSelectedDocType(docType);
    fileInputRef.current?.click();
  };
  

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    
    const file = event.target.files?.[0];
    if (file && selectedDocType) {
      // Handle file
      console.log(`Uploading file for ${selectedDocType}:`, file);
      
      const uploadNewDocument = {
        username: "user5",
        type: selectedDocType,
        fileKey: file.name,
        fileURL: "http://localhost:3000/url"
      }
      
      await dispatch(uploadFile(uploadNewDocument));
      
      // Clear the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleFileSubmit = async (docType: string) => {
    const uploadNewDocument = {
      username: "user5",
      type: docType,
      fileKey: "Jan 15 - 1725 File",
      fileURL: "http://localhost:3000/url"
    }
    const result = await dispatch(uploadFile(uploadNewDocument));
  };

  useEffect(() => {
    const userData = {"username": 'user5'}
    dispatch(createVisa(userData))
  },[])

  useEffect(() => {
    const userData = {"username": 'user5'}

    dispatch(fetchVisaType(userData))

    dispatch(fetchNextDocument(userData))

    dispatch(fetchAllDocument(userData))
  },[dispatch, visaState.action])

  const downloadFileTemplate = () => {
    return (
      <Box sx={{ mt: 2, mb: 2, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
        <Typography variant="subtitle1" gutterBottom>
          I-983 Templates Available:
        </Typography>
        <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
          <Button
            variant="outlined"
            color="primary"
            href="../Empty Template.pdf"
            download="Empty Template.pdf"
          >
            Download Empty Template
          </Button>
          <Button
            variant="outlined"
            color="primary"
            href="../Sample Template.pdf"
            download="Sample Template.pdf"
          >
            Download Sample Template
          </Button>
        </Stack>
      </Box>
    )
  }
  
  return (
    
    <Box sx={{ p: 3, maxWidth: 600, mx: "auto", mt: 5 }}>
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    <Typography variant="h4" gutterBottom>
      Visa Status Management
    </Typography>
    <Typography variant="h4" gutterBottom>
      {visaState.visaType}
    </Typography>
    {visaState.visaType === 'F1-OPT' ? (
      <>
        <Typography variant="body1" gutterBottom>
          Manage your work authorization documents here.
        </Typography>
        <Typography variant="body1" gutterBottom>
          Action: {visaState.action}
        </Typography>
        <List>
            {/* Existing Documents */}
            {visaState.documents && visaState.documents.length > 0 ? (
              
              visaState.documents.map((doc) => (
                <ListItem key={doc._id}>
                  <ListItemText
                    primary={doc.type} 
                    secondary={`Status: ${doc.status} | File: ${doc.fileKey}`} 
                  />
                  {doc.status === 'pending' && (
                    
                    <Button variant="contained" size="small" color="primary"
                    onClick={() => handleButtonClick(visaState.documentType)}>
                      Re-Upload
                    </Button>
                  )}
                  {doc.status === 'rejected' && (
                    <Button variant="contained" size="small" color="secondary"
                    onClick={() => handleFileSubmit(visaState.documentType)}>
                      Resubmit
                    </Button>
                  )}
                </ListItem>
              ))
            ) : (
              <Typography variant="body2">No documents found.</Typography>
            )}
            
            {/* Next Required Document */}
            {shouldShowNextDocument() && (
            <ListItem>
              {visaState.documentType === 'completed' ? (
                <>
                  <ListItemText 
                    primary="All steps completed"
                    secondary="Status: You are all set with the Visa"
                  />
                </>
              ) : (
                <>
                  <ListItemText 
                    primary={visaState.documentType}
                    secondary="Status: Pending Upload"
                  />
                  <Button 
                    variant="contained" 
                    size="small" 
                    color="primary" 
                    onClick={() => handleFileSubmit(visaState.documentType)}
                  >
                    Upload New
                  </Button>
                </>
              )}
            </ListItem>
          )}
          {/* Show I-983 templates for user to download */}
          {visaState.documentType === 'i983' && downloadFileTemplate()}
            
          </List>
      </>
    ) : (
      <Typography variant="body1" gutterBottom>
        Your visa type is: {visaState.visaType}
      </Typography>
    )}
  </Box>
  );
};

export default VisaStatusPage;
