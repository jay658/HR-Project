import { AppDispatch, RootState } from '../store/store';
import React, { useEffect, useRef } from "react";
import { fetchVisaType, fetchNextDocument, fetchAllDocument,
  uploadFile, createVisa, fetchFileURL
 } from "../store/visaSlice/visaThunks";
import {
  Box,
  Button,
  Card,
  CardContent,
  Link,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
  Alert,
  Divider
} from "@mui/material";

import { useDispatch, useSelector } from 'react-redux'

const VisaStatusPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const visaState = useSelector((state: RootState) => state.visa);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedDocType, setSelectedDocType] = React.useState<string>("");

  const shouldShowNextDocument = () => {
    if (!visaState.documents || !visaState.documentType) return false;
    return !visaState.documents.some(doc => doc.type === visaState.documentType);
  }

  const handleButtonClick = (docType: string) => {
    setSelectedDocType(docType);
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && selectedDocType) {
      const fileURLResult = await dispatch(fetchFileURL(file)).unwrap()
      
      const uploadNewDocument = {
        username: "kobe.bryant",
        type: selectedDocType,
        fileKey: file.name,
        fileURL: fileURLResult.fileURL
      }
      
      await dispatch(uploadFile(uploadNewDocument));
      
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  useEffect(() => {
    const userData = {"username": 'kobe.bryant'}
    dispatch(createVisa(userData))
  },[])

  useEffect(() => {
    const userData = {"username": 'kobe.bryant'}
    dispatch(fetchVisaType(userData))
    dispatch(fetchNextDocument(userData))
    dispatch(fetchAllDocument(userData))
  },[dispatch, visaState.action])

  const downloadFileTemplate = () => {
    return (
      <Box sx={{ 
        mt: 4, 
        p: 3, 
        bgcolor: 'background.paper', 
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'grey.200'
      }}>
        <Typography variant="h6" gutterBottom>
          I-983 Templates Available
        </Typography>
        <Stack 
          direction={{ xs: 'column', sm: 'row' }} 
          spacing={2} 
          sx={{ mt: 2 }}
        >
          <Button
            variant="outlined"
            color="primary"
            href="../Empty Template.pdf"
            download="Empty Template.pdf"
            fullWidth
          >
            Download Empty Template
          </Button>
          <Button
            variant="outlined"
            color="primary"
            href="../Sample Template.pdf"
            download="Sample Template.pdf"
            fullWidth
          >
            Download Sample Template
          </Button>
        </Stack>
      </Box>
    )
  }
  
  return (
    <Box sx={{ maxWidth: "lg", mx: "auto", p: 3 }}>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />

      <Card sx={{ mb: 4, boxShadow: 3, borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
            Visa Status Management
          </Typography>

          {visaState.visaType && (
            <Alert 
              severity="info" 
              sx={{ mb: 3 }}
            >
              Current Visa Type: {visaState.visaType}
            </Alert>
          )}

          {visaState.visaType === 'F1(CPT/OPT)' ? (
            <>
              <Typography variant="body1" color="text.secondary" gutterBottom sx={{ mb: 2 }}>
                Manage your work authorization documents here.
              </Typography>

              {visaState.action && (
                <Typography 
                  variant="body1" 
                  sx={{ 
                    mb: 3, 
                    p: 2, 
                    bgcolor: 'grey.100', 
                    borderRadius: 1 
                  }}
                >
                  Required Action: {visaState.action}
                </Typography>
              )}

              <List sx={{ width: '100%' }}>
                {visaState.documents && visaState.documents.length > 0 ? (
                  visaState.documents.map((doc, index) => (
                    <React.Fragment key={doc._id}>
                      <ListItem 
                        sx={{ 
                          bgcolor: 'background.paper',
                          borderRadius: 1,
                          mb: 2,
                          border: '1px solid',
                          borderColor: 'grey.200',
                          flexDirection: { xs: 'column', sm: 'row' },
                          alignItems: { xs: 'flex-start', sm: 'center' },
                          gap: 2,
                          p: 2
                        }}
                      >
                        <ListItemText
                          primary={
                            <Typography variant="h6" component="div">
                              {doc.type}
                            </Typography>
                          }
                          secondary={
                            <Box sx={{ mt: 1 }}>
                              <Typography 
                                component="span" 
                                display="block"
                                sx={{ 
                                  color: doc.status === 'approved' ? 'success.main' : 
                                         doc.status === 'rejected' ? 'error.main' : 
                                         'warning.main'
                                }}
                              >
                                Status: {doc.status}
                              </Typography>
                              {doc.feedback?.comment && (
                                <Typography 
                                  component="span" 
                                  display="block"
                                  sx={{ mt: 1, color: 'text.secondary' }}
                                >
                                  Feedback: {doc.feedback?.comment}
                                </Typography>
                              )}
                              <Typography 
                                component="span" 
                                display="block"
                                sx={{ mt: 1 }}
                              >
                                File: <Link
                                  href={doc.fileUrl}
                                  target="_blank"
                                  sx={{
                                    textDecoration: 'underline',
                                    '&:hover': {
                                      textDecoration: 'none'
                                    }
                                  }}
                                >
                                  {doc.fileKey}
                                </Link>
                              </Typography>
                            </Box>
                          }
                        />
                        {doc.status === 'pending' && (
                          <Button 
                            variant="contained" 
                            size="medium" 
                            color="primary"
                            onClick={() => handleButtonClick(visaState.documentType)}
                            sx={{ minWidth: 120 }}
                          >
                            Re-Upload
                          </Button>
                        )}
                        {doc.status === 'rejected' && (
                          <Button 
                            variant="contained" 
                            size="medium" 
                            color="error"
                            onClick={() => handleButtonClick(visaState.documentType)}
                            sx={{ minWidth: 120 }}
                          >
                            Resubmit
                          </Button>
                        )}
                      </ListItem>
                      {index < visaState.documents.length - 1 && (
                        <Divider sx={{ my: 2 }} />
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  <Alert severity="info">No documents found.</Alert>
                )}

                {shouldShowNextDocument() && (
                  <ListItem 
                    sx={{ 
                      bgcolor: 'background.paper',
                      borderRadius: 1,
                      mt: 2,
                      border: '1px solid',
                      borderColor: 'grey.200',
                      flexDirection: { xs: 'column', sm: 'row' },
                      alignItems: { xs: 'flex-start', sm: 'center' },
                      gap: 2,
                      p: 2
                    }}
                  >
                    {visaState.documentType === 'completed' ? (
                      <Alert severity="success" sx={{ width: '100%' }}>
                        All steps completed. You are all set with the Visa.
                      </Alert>
                    ) : (
                      <>
                        <ListItemText 
                          primary={
                            <Typography variant="h6" component="div">
                              {visaState.documentType}
                            </Typography>
                          }
                          secondary="Status: Pending Upload"
                        />
                        <Button 
                          variant="contained" 
                          size="medium" 
                          color="primary"
                          onClick={() => handleButtonClick(visaState.documentType)}
                          sx={{ minWidth: 120 }}
                        >
                          Upload New
                        </Button>
                      </>
                    )}
                  </ListItem>
                )}
              </List>

              {visaState.documentType === 'i983' && downloadFileTemplate()}
            </>
          ) : (
            <Alert severity="info">
              Your visa type {visaState.visaType} does not require additional documentation.
            </Alert>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default VisaStatusPage;