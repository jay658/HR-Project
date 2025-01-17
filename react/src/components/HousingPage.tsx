import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Badge,
  Typography,
} from "@mui/material";
import { Home, Users, Mail } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../store/hook";
import {
  fetchHousingDetails,
  clearHousingDetails,
} from "../store/housingSlice/housingSlice";

const HousingPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { housingDetails, loading, error } = useAppSelector(
    (state) => state.housing
  );

  useEffect(() => {
    dispatch(fetchHousingDetails());

    return () => {
      // Clear housing details when the component unmounts
      dispatch(clearHousingDetails());
    };
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  if (!housingDetails) {
    return (
      <div className="container mx-auto p-4">
        <Card className="max-w-md mx-auto">
          <CardContent className="pt-6">
            <p className="text-center text-gray-600">
              No housing assignment found. Please contact your administrator.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { apartment, roommates } = housingDetails;

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-2xl mx-auto shadow-lg">
        <CardHeader>
          <Typography variant="h5" className="text-2xl">
            My Housing Details
          </Typography>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Apartment Details Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Home className="h-5 w-5" />
                <span className="font-semibold">Unit {apartment.unit}</span>
              </div>
              <Badge variant="standard" className="capitalize">
                {apartment.status}
              </Badge>
            </div>

            <div className="text-gray-600">{apartment.address}</div>
          </div>

          {/* Roommates Section */}
          <div className="border-t pt-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span className="font-semibold">
                  Roommates ({roommates.length}/{apartment.capacity})
                </span>
              </div>
            </div>

            <div className="space-y-3">
              {roommates.map((roommate) => (
                <div
                  key={roommate.id}
                  className={`p-4 rounded-lg ${
                    roommate.isCurrentUser
                      ? "bg-primary/10 border border-primary/20"
                      : "bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">
                        {roommate.username} {roommate.isCurrentUser && "(You)"}
                      </div>
                      <div className="text-sm text-gray-600 flex items-center mt-1">
                        <Mail className="h-4 w-4 mr-1" />
                        {roommate.email}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HousingPage;
