'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import HomeCard from './Card';
import MeetingModal from './MeetingModal';
import { useUser } from '@clerk/nextjs';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import Loader from './Loader';
import { useToast } from './ui/use-toast';

const initialValues = {
  dateTime: new Date(),
  description: '',
  link: '',
};

const MeetingTypeList = () => {
  const router = useRouter();
  const [meetingState, setMeetingState] = useState<
    'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined
  >(undefined);
  const client = useStreamVideoClient(); 
  const [callDetails, setCallDetails] = useState<Call>();
  const [values, setValues] = useState(initialValues);
  const { user } = useUser();
  const { toast } = useToast();

  const createMeating = async () => {
    if(!client || !user) return;

    try {
      if(!values.dateTime){
        toast({ title: 'Please select a date and time' });
      }
      const id= crypto.randomUUID();
      const call= client.call('default', id);

      if(!call) throw new Error('Failed to create call');

      const startAt = values.dateTime.toISOString() || new Date(Date.now()).toString();
      const description = values.description || 'Instant Meeting';

      await call.getOrCreate({
        data: {
          starts_at: startAt,
          custom: {
            description,
          }
        }
      })
      setCallDetails(call);
      
      if(!values.description) {
        router.push(`/meeting/${call.id}`)
      }
      toast({
        title: 'Meeting created successfully'
      })

    } catch (error) {
      console.log(error);
      toast({ title: 'Failed to create Meeting' });
    }
  };

  if (!client || !user) return <Loader />;

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <HomeCard
        img="/icons/add-meeting.svg"
        title="New Meeting"
        description="Start an instant meeting"
        handleClick={() => setMeetingState('isInstantMeeting')}
      />
      <HomeCard
        img="/icons/join-meeting.svg"
        title="Join Meeting"
        description="via invitation link"
        className="bg-blue-1"
        handleClick={() => setMeetingState('isJoiningMeeting')}
      />
      <HomeCard
        img="/icons/schedule.svg"
        title="Schedule Meeting"
        description="Plan your meeting"
        className="bg-purple-1"
        handleClick={() => setMeetingState('isScheduleMeeting')}
      />
      <HomeCard
        img="/icons/recordings.svg"
        title="View Recordings"
        description="Meeting Recordings"
        className="bg-yellow-1"
        handleClick={() => router.push('/recordings')}
      />

      <MeetingModal
        isOpen={meetingState === 'isInstantMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="New Meeting"
        className="text-center"
        buttonText='Start Meeting'
        handleClick={createMeating}
      />
    </section>
  );
};

export default MeetingTypeList;