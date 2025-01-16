import { AppDispatch, RootState } from '../store/store';
import React, { useEffect, useState } from "react";
import { fetchVisaType, fetchNextDocument, fetchAllDocument,
  uploadFile
 } from "../store/visaSlice/visaThunks";
import { useDispatch, useSelector } from 'react-redux'
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";

const VisaStatusPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const visaState = useSelector((state: RootState) => state.visa);

  const shouldShowNextDocument = () => {
    if (!visaState.documents || !visaState.documentType) return false;
    // Check if the next required document type is different from all existing document types
    return !visaState.documents.some(doc => doc.type === visaState.documentType);
  }

  const handleFileSubmit = async (docType: string) => {
    const uploadNewDocument = {
      username: "user5",
      type: docType,
      fileKey: "Jan 15 - 1725 File",
      fileURL: "http://localhost:3000/url"
    }
    const result = await dispatch(uploadFile(uploadNewDocument));

    console.log(result)
  };

  useEffect(() => {
    const userData = {"username": 'user5'}
    dispatch(fetchVisaType(userData))

    dispatch(fetchNextDocument(userData))

    dispatch(fetchAllDocument(userData))
  },[])
  
  return (
    
    <Box sx={{ p: 3, maxWidth: 600, mx: "auto", mt: 5 }}>
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
                    onClick={() => handleFileSubmit(visaState.documentType)}>
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
