"use client";

import MeetingRoom from "@/components/MeetingRoom";
import MeetingSetup from "@/components/MeetingSetup";
import { useGetCallById } from "@/hooks/useGetCallByID";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";

import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import Loader from "@/components/Loader";

const Meeting = ({params : {id} }: {params: { id: string }}) => {
  const { user, isLoaded } = useUser();
  const [isSetup, setIsSetup] = useState(false);
  const { call, isCallLoading } = useGetCallById(id);

  if(!isLoaded || isCallLoading) return <Loader />;

  return (
    <main className="h-screen w-full">
      <StreamCall call={call}>
        <StreamTheme>
          {isSetup ? (
            <MeetingSetup setIsSetupComplete={setIsSetup}/>
          ): (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  )
}

export default Meeting
