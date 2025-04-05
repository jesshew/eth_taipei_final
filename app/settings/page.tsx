'use client'

import { NavigationLayout } from '@/components/NavigationLayout'
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Shield, Bell, User, MapPin, Eye, Sliders, ChevronRight, ToggleLeft, ToggleRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";


export default function SettingsPage() {
  const router = useRouter();
  const { toast } = useToast();  
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [incognitoMode, setIncognitoMode] = useState(false);
  const [distanceRadius, setDistanceRadius] = useState([25]);
  const [ageRange, setAgeRange] = useState([21, 35]);
  const [showBlockDialog, setShowBlockDialog] = useState(false);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [blockReason, setBlockReason] = useState("");
  const [reportReason, setReportReason] = useState("");
  
//   const handleIncognitoToggle = () => {
//     if (!user?.isPremium && !incognitoMode) {
//       toast({
//         title: "Premium Feature",
//         description: "Incognito Mode is only available to premium subscribers.",
//         duration: 3000,
//       });
//       return;
//     }
//     setIncognitoMode(!incognitoMode);
//   };
  
  const blockReasons = [
    "I'm not interested in this person",
    "Inappropriate messages or behavior",
    "Fake profile or spam",
    "Harassing or threatening behavior",
    "Other reason",
  ];
  
  const reportReasons = [
    "Fake profile or scam",
    "Inappropriate photos or content",
    "Underage user",
    "Harassing or threatening behavior",
    "Hate speech, racism, or discrimination",
    "Violence or dangerous behavior",
    "Other concern",
  ];
  
  return (
    <NavigationLayout>
       <div className="pb-20">
      <div className="sticky top-0 z-10 bg-white border-b p-4 flex items-center">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold ml-4">Settings</h1>
      </div>

      <div className="divide-y">
        <section className="p-4">
          <h2 className="text-lg font-semibold mb-3 flex items-center">
            <Shield className="h-5 w-5 mr-2 text-dating-purple" />
            Safety & Privacy
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Incognito Mode</p>
                <p className="text-sm text-gray-500">
                  Browse without being shown to others
                </p>
              </div>
              <div onClick={()=>{}} className="cursor-pointer">
                {incognitoMode ? 
                  <ToggleRight className="h-7 w-7 text-dating-purple" /> : 
                  <ToggleLeft className="h-7 w-7 text-gray-400" />
                }
              </div>
            </div>
            
            <Button 
              variant="outline" 
              className="w-full justify-between"
              onClick={() => setShowBlockDialog(true)}
            >
              <span>Block Users</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-between"
              onClick={() => setShowReportDialog(true)}
            >
              <span>Report a Concern</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </section>
        
        <section className="p-4">
          <h2 className="text-lg font-semibold mb-3 flex items-center">
            <Bell className="h-5 w-5 mr-2 text-dating-purple" />
            Notifications
          </h2>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="notifications" className="cursor-pointer">
              Enable Push Notifications
            </Label>
            <Switch
              id="notifications"
              checked={notificationsEnabled}
              onCheckedChange={setNotificationsEnabled}
            />
          </div>
        </section>
        
        <section className="p-4">
          <h2 className="text-lg font-semibold mb-3 flex items-center">
            <User className="h-5 w-5 mr-2 text-dating-purple" />
            Discovery Preferences
          </h2>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <Label>Age Range</Label>
                <span className="text-sm">
                  {ageRange[0]} - {ageRange[1]}
                </span>
              </div>
              <Slider
                defaultValue={ageRange}
                min={18}
                max={65}
                step={1}
                onValueChange={setAgeRange}
                className="my-4"
              />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <Label>Distance</Label>
                <span className="text-sm">
                  {distanceRadius[0]} miles
                </span>
              </div>
              <Slider
                defaultValue={distanceRadius}
                min={1}
                max={100}
                step={1}
                onValueChange={setDistanceRadius}
                className="my-4"
              />
            </div>
            
            <Button 
              variant="outline" 
              className="w-full justify-between"
              onClick={() => {
                toast({
                  title: "Coming Soon",
                  description: "Advanced filters will be available in the next update.",
                });
              }}
            >
              <span>Advanced Filters</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </section>
        
        <section className="p-4">
          <h2 className="text-lg font-semibold mb-3 flex items-center">
            <MapPin className="h-5 w-5 mr-2 text-dating-purple" />
            Location
          </h2>
          
          <div>
            <p className="text-sm mb-2">Current Location</p>
            <p className="font-medium">San Francisco, CA</p>
            
            <Button 
              variant="outline" 
              className="w-full mt-3 justify-between"
              onClick={() => {
                toast({
                  title: "Premium Feature",
                  description: "Changing your location is a premium feature.",
                });
              }}
            >
              <span>Change Location</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </section>
      </div>
      
      {/* Block Dialog */}
      <Dialog open={showBlockDialog} onOpenChange={setShowBlockDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Block a User</DialogTitle>
            <DialogDescription>
              Blocked users won't be able to see your profile or message you.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-2 my-4">
            <Label>Select a Reason</Label>
            <div className="space-y-2">
              {blockReasons.map((reason) => (
                <div 
                  key={reason}
                  className={`p-3 border rounded-md cursor-pointer ${
                    blockReason === reason ? "border-dating-purple bg-dating-purple/5" : ""
                  }`}
                  onClick={() => setBlockReason(reason)}
                >
                  {reason}
                </div>
              ))}
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowBlockDialog(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive"
              onClick={() => {
                toast({
                  title: "User Blocked",
                  description: "You won't see this user anymore.",
                });
                setShowBlockDialog(false);
              }}
              disabled={!blockReason}
            >
              Block User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Report Dialog */}
      <Dialog open={showReportDialog} onOpenChange={setShowReportDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Report a Concern</DialogTitle>
            <DialogDescription>
              We take your safety seriously. Please let us know what's happening.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-2 my-4">
            <Label>What would you like to report?</Label>
            <div className="space-y-2">
              {reportReasons.map((reason) => (
                <div 
                  key={reason}
                  className={`p-3 border rounded-md cursor-pointer ${
                    reportReason === reason ? "border-dating-purple bg-dating-purple/5" : ""
                  }`}
                  onClick={() => setReportReason(reason)}
                >
                  {reason}
                </div>
              ))}
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowReportDialog(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={() => {
                toast({
                  title: "Report Submitted",
                  description: "Thank you for helping keep our community safe. We'll review your report.",
                });
                setShowReportDialog(false);
              }}
              disabled={!reportReason}
            >
              Submit Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
    </NavigationLayout>
  )
} 