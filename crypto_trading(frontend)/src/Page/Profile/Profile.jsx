import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import React from "react";
import { VerifiedIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import AccountVerificationForm from "./AccountVerificationForm";
import { useSelector } from "react-redux";

const Profile = () => {
  const { auth } = useSelector((store) => store);
  const handleEnableTwoStepVerification = () => {
    console.log("two step verification");
  };
  return (
    <div className="flex flex-col items-center mb-5">
      <div className="pt-10 w-full lg:w-[60%]">
        <Card>
          <CardHeader className="pb-9">
            <CardTitle>Your Information </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="lg:flex gap-32">
              <div className="space-y-7 flex-1 font-small">
                <div className="flex">
                  <p className="w-[9rem] font-medium">Email:</p>
                  <p
                    className="text-gray-500 truncate max-w-[10rem] overflow-hidden whitespace-nowrap"
                    title={auth.user?.email}
                  >
                    {auth.user?.email}
                  </p>
                </div>
                <div className="flex">
                  <p className="w-[9rem] font-medium">Full Name:</p>
                  <p className="text-gray-500">{auth.user?.fullName}</p>
                </div>
                <div className="flex">
                  <p className="w-[9rem] font-medium">Date of Birth:</p>
                  <p className="text-gray-500">25/09/1998</p>
                </div>
                <div className="flex">
                  <p className="w-[9rem] font-medium">Nationality:</p>
                  <p className="text-gray-500">Indian</p>
                </div>
              </div>

              <div className="space-y-7 flex-1">
                <div className="flex">
                  <p className="w-[9rem] font-medium">Email:</p>
                  <p
                    className="text-gray-500 truncate max-w-[10rem] overflow-hidden whitespace-nowrap"
                    title={auth.user?.email}
                  >
                    {auth.user?.email}
                  </p>
                </div>
                <div className="flex">
                  <p className="w-[9rem] font-medium">Full Name:</p>
                  <p className="text-gray-500 ">{auth.user?.fullName}</p>{" "}
                  {/* ?: if user is null dont do this we also put a check in app.jsx for all componets it null then dont render acc */}
                </div>
                <div className="flex">
                  <p className="w-[9rem] font-medium">Date of Birth:</p>
                  <p className="text-gray-500">25/09/1998</p>
                </div>
                <div className="flex">
                  <p className="w-[9rem] font-medium">Nationality:</p>
                  <p className="text-gray-500">Indian</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="mt-6">
          <Card className="w-full">
            <CardHeader className="pb-7">
              <div className="flex items-center gap-3">
                <CardTitle> 2 Step Verification</CardTitle>
                {true ? (
                  <Badge className="bg-green-500">
                    <VerifiedIcon />
                    <span>Enabled</span>
                  </Badge>
                ) : (
                  <Badge className="bg-orange-500">Disabled</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div>
                <Dialog>
                  <DialogTrigger>
                    <Button className={"bg-white text-black"}>
                      Enable Two step Verification
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Verify your Account </DialogTitle>
                    </DialogHeader>
                    <AccountVerificationForm
                      handleSubmit={handleEnableTwoStepVerification}
                    />
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
