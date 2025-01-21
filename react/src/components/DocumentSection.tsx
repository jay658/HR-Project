import {
  Box,
  Card,
  CardActions,
  CardContent,
  Chip,
  Grid2,
  IconButton,
  Modal,
  Paper,
  Typography
} from '@mui/material';
import { DocumentPreview, DocumentStatus } from '../types/Document';
import React, { useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import DescriptionIcon from '@mui/icons-material/Description';
import DownloadIcon from '@mui/icons-material/Download';
import PreviewIcon from '@mui/icons-material/Preview';

interface DocumentsSectionProps {
  isEditing: boolean;
  uploadedFiles: {
    [key: string]: { name: string; url: string } | null;
  };
  onboarding: any;
  localData: any;
}

const getStatusColor = (status: DocumentStatus) => {
  switch (status) {
    case 'approved':
      return 'success';
    case 'rejected':
      return 'error';
    default:
      return 'warning';
  }
};

const getDocumentTitle = (type: string): string => {
  const titles: { [key: string]: string } = {
    profilePicture: 'Profile Picture',
    driverLicense: "Driver's License",
    optReceipt: 'OPT Receipt',
    i983: 'I-983 Form',
    i20: 'I-20',
    optEAD: 'OPT EAD'
  };
  return titles[type] || type;
};

export const DocumentsSection: React.FC<DocumentsSectionProps> = ({
  isEditing,
  uploadedFiles,
  onboarding,
  localData
}) => {
  const [selectedDoc, setSelectedDoc] = useState<{
    url: string;
    fileName: string;
    type: string;
  } | null>(null);

  // Combine existing and newly uploaded documents
  const getDocuments = () => {
    const documents: Array<{
      type: string;
      fileName: string;
      url: string;
      status: DocumentStatus;
    }> = [];

    // Helper function to add document if it exists
    const addDocument = (type: string, condition: boolean = true) => {
      if (uploadedFiles[type]) {
        documents.push({
          type,
          fileName: uploadedFiles[type]!.name,
          url: uploadedFiles[type]!.url,
          status: 'pending'
        });
      } else if (
        onboarding[type] ||
        (type === 'driverLicense' && onboarding.licenseDocument) ||
        (type === 'optReceipt' && onboarding.employementDocuments?.length)
      ) {
        let url;
        let fileKey;
        let doc;

        switch (type) {
          case 'profilePicture':
            url = onboarding.profilePicture?.fileUrl;
            fileKey = onboarding.profilePicture?.fileKey;
            break;
          case 'driverLicense':
            url = onboarding.licenseDocument?.fileUrl;
            fileKey = onboarding.licenseDocument?.fileKey;
            break;
          case 'optReceipt':
          case 'i983':
          case 'i20':
          case 'optEAD':
            doc = onboarding.employementDocuments?.find(
              (doc: any) => doc.type === type
            );
            url = doc?.fileUrl;
            fileKey = doc?.fileKey;
            break;
        }

        if (url) {
          documents.push({
            type,
            fileName: fileKey || getDocumentTitle(type),
            url,
            status: onboarding.status || 'pending'
          });
        }
      }
    };

    // Add documents based on conditions
    addDocument('profilePicture');
    addDocument('driverLicense', localData.hasLicense === 'yes');
    addDocument('optReceipt', localData.visaType === 'F1(CPT/OPT)');
    addDocument('i983', localData.visaType === 'F1(CPT/OPT)');
    addDocument('i20', localData.visaType === 'F1(CPT/OPT)');
    addDocument('optEAD', localData.visaType === 'F1(CPT/OPT)');

    return documents;
  };

  const handlePreview = (doc: any) => {
    setSelectedDoc(doc);
  };

  const handleDownload = (doc: any) => {
    const link = document.createElement('a');
    link.href = doc.url;
    link.download = doc.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const documents = getDocuments();

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant='h6' sx={{ mb: 2 }}>
        Documents
      </Typography>

      <Grid2 container spacing={2}>
        {documents.map((doc) => (
          <Grid2 key={doc.type} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card variant='outlined'>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <DescriptionIcon sx={{ mr: 1 }} />
                  <Typography variant='subtitle2' noWrap>
                    {doc.fileName}
                  </Typography>
                </Box>
                {/* <Chip
                  label={doc.status}
                  size='small'
                  color={getStatusColor(doc.status)}
                  sx={{ mb: 1 }}
                /> */}
                <Typography
                  variant='caption'
                  display='block'
                  sx={{ mb: 1 }}
                  noWrap
                >
                  Type: {getDocumentTitle(doc.type)}
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton
                  size='small'
                  title='Preview'
                  onClick={() => handlePreview(doc)}
                >
                  <PreviewIcon />
                </IconButton>
                <IconButton
                  size='small'
                  title='Download'
                  onClick={() => handleDownload(doc)}
                >
                  <DownloadIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid2>
        ))}
      </Grid2>

      <Modal
        open={selectedDoc !== null}
        onClose={() => setSelectedDoc(null)}
        aria-labelledby='document-preview-modal'
      >
        <Paper
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            height: '80%',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            overflow: 'auto'
          }}
        >
          <Box
            sx={{
              mb: 2,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Typography variant='h6'>
              {selectedDoc && getDocumentTitle(selectedDoc.type)}
            </Typography>
            <IconButton onClick={() => setSelectedDoc(null)}>
              <CloseIcon />
            </IconButton>
          </Box>

          {selectedDoc?.url && (
            <Box
              sx={{
                height: 'calc(100% - 60px)',
                '& iframe': {
                  width: '100%',
                  height: '100%',
                  border: 'none'
                }
              }}
            >
              <iframe
                src={selectedDoc.url}
                title={selectedDoc.fileName}
                allowFullScreen
              />
            </Box>
          )}
        </Paper>
      </Modal>
    </Box>
  );
};
