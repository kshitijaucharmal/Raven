import { useColorModeValue } from '@/ThemeProvider'
import { ChannelListItem } from '@/utils/channel/ChannelListProvider'
import { ChannelIcon } from '@/utils/layout/channelIcon'
import { HStack, Stack, StackDivider, Text } from '@chakra-ui/react'
import { ReactRendererOptions } from '@tiptap/react'
import {
    forwardRef, useEffect, useImperativeHandle,
    useState,
} from 'react'

export default forwardRef((props: ReactRendererOptions['props'], ref) => {

    const buttonGroupBgColor = useColorModeValue('white', 'gray.900')
    const [selectedIndex, setSelectedIndex] = useState(0)

    const selectItem = (index: number) => {
        const item = props?.items[index]
        if (item) {
            props.command({ id: item.name, label: item.channel_name })
        }
    }

    const upHandler = () => {
        setSelectedIndex((selectedIndex + props?.items.length - 1) % props?.items.length)
    }

    const downHandler = () => {
        setSelectedIndex((selectedIndex + 1) % props?.items.length)
    }

    const enterHandler = () => {
        selectItem(selectedIndex)
    }

    useEffect(() => setSelectedIndex(0), [props?.items])

    useImperativeHandle(ref, () => ({
        onKeyDown: ({ event }: { event: KeyboardEvent }) => {
            if (event.key === 'ArrowUp') {
                upHandler()
                return true
            }

            if (event.key === 'ArrowDown') {
                downHandler()
                return true
            }

            if (event.key === 'Enter') {
                enterHandler()
                return true
            }

            return false
        },
    }))

    return (
        <Stack divider={<StackDivider />} spacing='0' rounded='md' overflowY={'scroll'} maxH='480px' shadow='dark-lg' bgColor={buttonGroupBgColor}>
            {props?.items.length
                ? props.items.map((item: ChannelListItem, index: number) => (
                    <MentionItem
                        item={item}
                        index={index}
                        selectItem={selectItem}
                        selectedIndex={selectedIndex}
                        key={item.name}
                        itemsLength={props.items.length}
                    />
                ))
                : <div className="item">No result</div>
            }
        </Stack>
    )
})

const MentionItem = ({ item, index, selectItem, selectedIndex, itemsLength }: { itemsLength: number, selectedIndex: number, index: number, item: ChannelListItem, selectItem: (index: number) => void }) => {

    const { selectedBgColor, selectedColor, textColor, backgroundColor } = useColorModeValue({
        selectedBgColor: 'gray.900',
        selectedColor: 'gray.50',
        textColor: 'gray.900',
        backgroundColor: 'white'
    }, {
        selectedBgColor: 'gray.100',
        selectedColor: 'gray.900',
        textColor: 'gray.100',
        backgroundColor: 'gray.700'
    })
    return <HStack
        as={'button'}
        rounded='md'
        roundedBottom={index === itemsLength - 1 ? 'md' : 'none'}
        roundedTop={index === 0 ? 'md' : 'none'}
        px='3'
        py='1.5'
        textAlign={'left'}
        // colorScheme='blue'
        bgColor={index === selectedIndex ? selectedBgColor : backgroundColor}
        color={index === selectedIndex ? selectedColor : textColor}
        key={index}
        onClick={() => selectItem(index)}>
        <ChannelIcon type={item.type} className={'mt-0.5'} />
        <Text as='span' fontSize='sm'>{item.channel_name}</Text>
    </HStack>
}