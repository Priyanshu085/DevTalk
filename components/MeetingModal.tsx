import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from './ui/button';
import Image from 'next/image';  
import { cn } from '@/lib/utils';

interface MeeetingModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    className: string;
    children?: React.ReactNode;
    handleClick?: () => void;
    buttonText?: string;
    image?: string;
    buttonIcon?: string;
    }

const MeetingModal = ({ isOpen, onClose, title, className, children, handleClick, buttonText, image, buttonIcon }: MeeetingModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className='flex w-full max-w-[520px] flex-col gap-6 border-none bg-dark-1 px-6 py-9 text-white'>
					<div className='flex flex-col gap-6'>
						{image && (
							<img src={image} alt='meeting' width={72} height={72} />
						)}
						<h1 className={cn('text-3xl font-bold leading-[42px]', className)}>{title}</h1>
						{children}
						<Button className='bg-blue-1 focus-visible:ring-0 focus-visible:ring-offset-0' onClick={handleClick}>
							{buttonIcon && (
								<Image src={buttonIcon} alt='icon' width={13} height={13} />
							)} &nbsp; {buttonText || 'Schedule Meeting'}
						</Button>
					</div>
			</DialogContent>
    </Dialog>

  )
}

export default MeetingModal
