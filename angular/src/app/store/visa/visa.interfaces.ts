export interface Employment {
    title: string;
    startDate: string;
    endDate: string;
    daysRemaining: number;
  }
  
  export interface VisaApplication {
    _id: string;
    userId: string;
    name: string;
    email: string;
    nextStep: string;
    employment: Employment;
    action: string;
  }
  
  export interface VisaResponse {
    data: VisaApplication[];
  }