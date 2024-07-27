import {
    Box,
    Button,
    Flex,
    Text,
    Link as LinkButton,
} from "@radix-ui/themes";

const NotFoundPage = () => {

    return (
        <Flex direction="column" gap="2">
            <Text className="cal-sans" align="center" size="3"> Error Code 404 </Text>
            <Text className="cal-sans" align="center" size="8"> PAGE NOT FOUND </Text>
            <Button color="orange" variant="surface">Go Back</Button>
        </Flex>
    )
}

export const Component = NotFoundPage