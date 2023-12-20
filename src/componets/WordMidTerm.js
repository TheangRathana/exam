import { Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, Image, List, ListIcon, ListItem, Progress, Text } from '@chakra-ui/react'
import React, { useState } from 'react';
import storage from "../firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useToast } from '@chakra-ui/react';
import { AddIcon, CheckCircleIcon } from '@chakra-ui/icons';


export default function WordMidTerm() {
    const toast = useToast()
    const [file, setFile] = useState("");
    const [progress, setProgress] = useState("none")
    // progress
    const [percent, setPercent] = useState(0);

    // Handle file upload event and update state
    function handleChange(event) {
        setFile(event.target.files[0]);
    }

    const handleUpload = () => {

        if (!file) {
            alert("Please upload an image first!");
        } else {
            setProgress('div')
            const storageRef = ref(storage, `/EHSS7CWord/${file.name}`);

            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const percent = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );

                    // update progress
                    setPercent(percent);
                },
                (err) => console.log(err),
                () => {
                    // download url
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        setFile(null)
                        setPercent(0);
                        setProgress('none')
                        toast({
                            title: 'upload success!',
                            status: 'success',
                            duration: 9000,
                            position: 'top',
                            isClosable: true,
                        })

                    });
                }
            );
        }
    };
    return (
        <Box margin="auto" w="80%">
            <Heading mt="25px" textAlign="center" mb="25px">Mid-Term</Heading>
            <List spacing={10} fontSize={18} >
                <ListItem>
                    <Text fontWeight="bold">1. Open a new Microsoft Word document.</Text>
                </ListItem>

                {/* 2. Text Basic:================================================ */}
                <ListItem>
                    <Flex>
                        <Text fontWeight="bold">2. Text Basic:</Text>
                    </Flex>
                    <Flex>
                        <ListIcon as={CheckCircleIcon} color='green.500' mt="3px" />
                        <Text >Copy the Paragraph below and paste it into the Word document</Text>
                    </Flex>
                    <Flex mt={4}>
                        <Text>Favorite hobby</Text>
                    </Flex>
                    <Flex >

                        <Text fontSize="16px"  >One of my favorite hobbies is stergazing. There's something mesmerizing about gazing up at the night sky, tracing constellations, and marveling at the vastness of the universe. Armed with a telescope and a passion for celestial exploration, I spend countless nights observing distant galaxies, planets, and the dance of stars. Each astronomical discovery feels like uncovering a hidden secrat in the night sky, and the sense of awe and wonder never fails to captivate me. Stargazing is not just a hobby; it's a journey into the infinite beauty of space that brings tranquility and inspir to my life.</Text>
                    </Flex>
                    <Flex mt={4}>
                        <ListIcon as={CheckCircleIcon} color='green.500' mt="3px" />
                        <Text >Change the font style to Calibri, size to 15pt, and color to blue of the text.</Text>
                    </Flex>
                </ListItem>


                {/*3. Formatting Text:================================================ */}
                <ListItem>
                    <Flex>
                        <Text fontWeight="bold">3. Formatting Text:</Text>
                    </Flex>
                    <Flex>
                        <ListIcon as={CheckCircleIcon} color='green.500' mt="3px" />
                        <Text >Bold the title of your paragraph.</Text>
                    </Flex>

                    <Flex>
                        <ListIcon as={CheckCircleIcon} color='green.500' mt="3px" />
                        <Text >Italicize a specific sentence within the paragraph.(the night sky)</Text>
                    </Flex>

                    <Flex>
                        <ListIcon as={CheckCircleIcon} color='green.500' mt="3px" />
                        <Text>Underline the keyword. (constellations, marveling, vastness, universe)</Text>
                    </Flex>
                </ListItem>

                {/*4.Find and Replace::================================================ */}
                <ListItem>
                    <Flex>
                        <Text fontWeight="bold">4. Find and Replace:</Text>
                    </Flex>
                    <Flex>
                        <ListIcon as={CheckCircleIcon} color='green.500' mt="3px" />
                        <Text>Find : stergazing , Replace : stargazing </Text>
                    </Flex>
                    <Flex>
                        <ListIcon as={CheckCircleIcon} color='green.500' mt="3px" />
                        <Text>Find : secrat , Replace : secret </Text>
                    </Flex>
                    <Flex>
                        <ListIcon as={CheckCircleIcon} color='green.500' mt="3px" />
                        <Text>Find : inspir , Replace : inspiration </Text>
                    </Flex>
                </ListItem>

                {/*6.Find and Replace::================================================ */}
                <ListItem>
                    <Flex>
                        <Text fontWeight="bold">5. Indent:</Text>
                    </Flex>
                    <Flex>
                        <ListIcon as={CheckCircleIcon} color='green.500' mt="3px" />
                        <Text>Indent the first line of each paragraph in your document.(0.5) </Text>
                    </Flex>
                </ListItem>

                {/*6.Find and Replace::================================================ */}
                <ListItem>
                    <Flex>
                        <Text fontWeight="bold">6. Line and Spacing:</Text>
                    </Flex>
                    <Flex>
                        <ListIcon as={CheckCircleIcon} color='green.500' mt="3px" />
                        <Text>Adjust the line spacing of your document. Experiment with 1.5 line spacing.</Text>
                    </Flex>
                </ListItem>

                {/*7.Find and Replace::================================================ */}
                <ListItem>
                    <Flex>
                        <Text fontWeight="bold">7. List:</Text>
                    </Flex>
                    <Flex>
                        <ListIcon as={CheckCircleIcon} color='green.500' mt="3px" />
                        <Text>Create a bulleted list of three items related to your hobby.</Text>
                    </Flex>
                    <Flex>
                        <ListIcon as={CheckCircleIcon} color='green.500' mt="3px" />
                        <Text>Create a numbered list of steps for someone interested in learning about your hobby.</Text>
                    </Flex>
                </ListItem>

                {/*7.Find and Replace::================================================ */}
                <ListItem>
                    <Flex>
                        <Text fontWeight="bold">8. Hyperlinks:</Text>
                    </Flex>
                    <Flex>
                        <ListIcon as={CheckCircleIcon} color='green.500' mt="3px" />
                        <Text>Create a hyperlink tha located to YouTub. (Text YouTube)</Text>
                    </Flex>

                </ListItem>

                {/*7.Save and submit:================================================ */}
                <ListItem>
                    <Flex>
                        <Text fontWeight="bold">9. Save and submit your work:</Text>
                    </Flex>

                    <Flex>
                        <ListIcon as={CheckCircleIcon} color='green.500' mt="3px" />
                        <Text>Save file with your full name, Example : Theang Rathana</Text>
                    </Flex>
                    <Flex>
                        <ListIcon as={CheckCircleIcon} color='green.500' mt="3px" />
                        <Text>Choose your file and upload your work, Please wait until the success message pops up.</Text>
                    </Flex>
                </ListItem>
            </List>


            <Card mb="50px" mt={10} align='center' border='1px' borderColor='gray.200'>

                <CardHeader>
                    <Heading size='md'>Submit your work here!</Heading>
                </CardHeader>
                <CardBody>
                    <Progress display={progress} hasStripe value={percent} />
                    <Box mt="5px">
                        <input type="file" onChange={handleChange} accept="/image/*" />
                    </Box>
                </CardBody >
                <CardFooter>
                    <Button leftIcon={<AddIcon />} colorScheme='teal' disabled onClick={handleUpload}>Upload</Button>
                </CardFooter>
            </Card >
        </Box>
    )
}
