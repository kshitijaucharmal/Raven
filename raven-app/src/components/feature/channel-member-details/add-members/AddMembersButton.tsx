import { AddChannelMembersModalContent } from "./AddChannelMemberModal"
import { RiUserAddLine } from "react-icons/ri"
import { ChannelListItem } from "@/utils/channel/ChannelListProvider"
import { BiUserPlus } from "react-icons/bi"
import { useState } from "react"
import { useModalContentStyle } from "@/hooks/useModalContentStyle"
import { Button, Dialog, IconButton } from "@radix-ui/themes"
import { ButtonProps } from "@radix-ui/themes/dist/cjs/components/button"
import { ChannelMembers } from "@/utils/channel/ChannelMembersProvider"

interface AddMembersButtonProps extends ButtonProps {
    channelData: ChannelListItem,
    updateMembers: () => void,
    isIconButton?: boolean,
    channelMembers?: ChannelMembers
}

export const AddMembersButton = ({ channelData, updateMembers, isIconButton = false, channelMembers, ...props }: AddMembersButtonProps) => {

    const [open, setOpen] = useState(false)
    const onClose = () => {
        setOpen(false)
    }
    const contentClass = useModalContentStyle()

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>

            {isIconButton ? <Dialog.Trigger>
                <IconButton variant='surface' color='gray' aria-label={"add members to channel"} {...props}>
                    <RiUserAddLine />
                </IconButton>
            </Dialog.Trigger> : <Dialog.Trigger>
                <Button variant="ghost" size='1' {...props}>
                    <BiUserPlus fontSize={'1.1rem'} />Add members</Button>
            </Dialog.Trigger>}

            <Dialog.Content className={contentClass}>
                <AddChannelMembersModalContent
                    onClose={onClose}
                    channelMembers={channelMembers}
                    channelID={channelData.name}
                    channel_name={channelData.channel_name}
                    type={channelData.type}
                    updateMembers={updateMembers} />
            </Dialog.Content>

        </Dialog.Root>
    )
}