import { createSlice } from "@reduxjs/toolkit"
import { fetchVisaType, fetchNextDocument, fetchAllDocument,
    uploadFile, createVisa } from "./visaThunks";

interface Document {
    _id: string;
    userId: string;
    type: string;
    status: string;
    feedback?: {
        comment: string;
        updatedBy: string;
        updatedAt: Date;
    };
    fileKey: string;
    fileUrl: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface visaState {   
    visaType : string,
    documentType : string, // This is next-document
    documents: Document[];
    action: string;
    error: string | null;
}

const initialState: visaState = {
    visaType : "",
    documentType: "",
    documents: [],
    action:"Please start your document submission process.",
    error: null
}

const getActionMessage = (documents: Document[]) => {
    if (!documents || documents.length === 0) {
        return { 
            message: "Please upload your OPT Receipt to begin the process.",
        };
    }

    const latestDoc = documents[documents.length - 1];

    switch (latestDoc.type) {
        case 'optReceipt':
            switch (latestDoc.status) {
                case 'pending':
                    return {
                        message: "Waiting for HR to approve your OPT Receipt.",
                    };
                case 'approved':
                    return {
                        message: "Please upload a copy of your OPT EAD.",
                    };
                case 'rejected':
                    return {
                        message: `Rejected! HR Feedback:${latestDoc.feedback?.comment}`,
                    };
                default:
                    return {
                        message: "Please handle your OPT Receipt submission.",
                    };
            }
        
        case 'optEAD':
            switch (latestDoc.status) {
                case 'pending':
                    return {
                        message: "Waiting for HR to approve your OPT EAD.",
                    };
                case 'approved':
                    return {
                        message: "Please download and fill out the I-983 form.",
                    };
                case 'rejected':
                    return {
                        message: `Rejected! HR Feedback:${latestDoc.feedback?.comment}`,
                    };
                default:
                    return {
                        message: "Please handle your OPT EAD submission.",
                    };
            }
        
        case 'i983':
            switch (latestDoc.status) {
                case 'pending':
                    return {
                        message: "Waiting for HR to approve and sign your I-983.",

                    };
                case 'approved':
                    return {
                        message: "Please send the I-983 along with all necessary documents to your school and upload the new I-20.",
                    };
                case 'rejected':
                    return {
                        message: `Rejected! HR Feedback:${latestDoc.feedback?.comment}`,
                    };
                default:
                    return {
                        message: "Please handle your I-983 form submission.",
                    };
            }

        case 'i20':
            switch (latestDoc.status) {
                case 'pending':
                    return {
                        message: "Waiting for HR to approve your I-20.",
                    };
                case 'approved':
                    return {
                        message: "Completed: All documents have been approved.",
                    };
                case 'rejected':
                    return {
                        message: `Rejected! HR Feedback:${latestDoc.feedback?.comment}`,
                    };
                default:
                    return {
                        message: "Please handle your I-20 submission.",
                    };
            }
        
        default:
            return {
                message: `Please upload your document.`,
            };
    }

}


const visaSlice = createSlice({
    name: 'visaSlice',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchVisaType.fulfilled, (state, action) => {
                state.visaType = action.payload
            }),

        builder
            .addCase(fetchNextDocument.fulfilled, (state, action) => {
                state.documentType = action.payload
                const actionInfo = getActionMessage(state.documents);
                state.action = actionInfo.message;
                console.log("Next Document",state.documentType)
            }),
        builder
            .addCase(fetchAllDocument.fulfilled, (state, action) => {
                state.documents = action.payload.documents
                const actionInfo = getActionMessage(action.payload.documents);
                state.action = actionInfo.message;
                console.log("Documents Array",state.documents)
            })
        builder
            .addCase(uploadFile.fulfilled, (state) => {
                const actionInfo = getActionMessage(state.documents);
                state.action = actionInfo.message;
                state.error = null;
            })
            .addCase(uploadFile.pending, (state) => {
                state.action = "Refreshing";
            })
            .addCase(uploadFile.rejected, (state, action) => {
                state.error = action.payload as string;
            });
        builder
            .addCase(createVisa.fulfilled, (state) => {
                state.error = null;
            })
    },
    
});

export default visaSlice.reducer;