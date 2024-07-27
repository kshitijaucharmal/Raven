import {
    Box,
    Button,
    Flex,
    Text,
    Link as LinkButton,
    Callout
} from "@radix-ui/themes";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";




const NotFoundPage = () => {
    
    const navigate = useNavigate();
    const handleNavigation = () => {
        navigate("/login");
    }

    return (
        <Flex direction="column" gap="3" align={"center"}>
            <Text className="cal-sans" align="center" size="3"> Error Code 404 </Text>
            <Text className="cal-sans" align="center" size="8"> PAGE NOT FOUND </Text>
                <Button className="w-[100vw]"  variant="surface" color="orange" onClick={handleNavigation}> 
                    <Link to='/login'> GO BACK</Link>
                </Button>
        </Flex>
    )
}

export const Component = NotFoundPage