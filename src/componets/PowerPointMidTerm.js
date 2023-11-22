import { Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, Image, List, ListIcon, ListItem, Progress, Text } from '@chakra-ui/react'
import React, { useState } from 'react';
import storage from "../firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useToast } from '@chakra-ui/react';
import { AddIcon, CheckCircleIcon } from '@chakra-ui/icons';
import SmartCity from '../asset/SmartCity.pptx'

export default function PowerPointMidTerm() {
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
            const storageRef = ref(storage, `/EHSS9PXT/${file.name}`);

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
                    <Flex>
                        <Text fontWeight="bold">1. Download file hare : </Text>
                        <a
                            href={SmartCity}
                            download="Example-PDF-document"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <button style={{ color: "green" }}>SmartCity.pptx</button>
                        </a>
                    </Flex>
                </ListItem>

                {/* 2. Text Basic:================================================ */}
                <ListItem>
                    <Flex>
                        <Text fontWeight="bold">2. Slide Basics:</Text>
                    </Flex>
                    <Flex>
                        <ListIcon as={CheckCircleIcon} color='green.500' mt="3px" />
                        <Text >Add adding notes "my city" at slide number 2</Text>
                    </Flex>

                    <Flex>
                        <ListIcon as={CheckCircleIcon} color='green.500' mt="3px" />
                        <Text >Add new slide below the first slide and define layout TItle and Content </Text>
                    </Flex>


                    <Flex>
                        <ListIcon as={CheckCircleIcon} color='green.500' mt="3px" />
                        <Text >Duplicate slide has title "Duplicate me" </Text>
                    </Flex>

                </ListItem>


                {/*3. Formatting Text:================================================ */}
                <ListItem>
                    <Flex>
                        <Text fontWeight="bold">3. Working with text:</Text>
                    </Flex>
                    <Flex>
                        <ListIcon as={CheckCircleIcon} color='green.500' mt="3px" />
                        <Text >At the first slide : Bold the title</Text>
                    </Flex>

                    <Flex>
                        <ListIcon as={CheckCircleIcon} color='green.500' mt="3px" />
                        <Text >Italicize a specific sentence within the description.("smart cities" )</Text>
                    </Flex>

                    <Flex>
                        <ListIcon as={CheckCircleIcon} color='green.500' mt="3px" />
                        <Text>Underline the keyword. (their advanced use of technology , urban living)</Text>
                    </Flex>
                </ListItem>

                {/*4.Find and Replace::================================================ */}
                <ListItem>
                    <Flex>
                        <Text fontWeight="bold">4. Managing Slides:</Text>
                    </Flex>
                    <Flex>
                        <ListIcon as={CheckCircleIcon} color='green.500' mt="3px" />
                        <Text>Change all slide size to standard (4:3)</Text>
                    </Flex>
                    <Flex>
                        <ListIcon as={CheckCircleIcon} color='green.500' mt="3px" />
                        <Text>Add Section name: My Favorite City that contains 1 or more slide city names.</Text>
                    </Flex>


                </ListItem>

                {/*6.Find and Replace::================================================ */}
                <ListItem>
                    <Flex>
                        <Text fontWeight="bold">5. Using Find & Replace:</Text>
                    </Flex>

                    <Flex>
                        <ListIcon as={CheckCircleIcon} color='green.500' mt="3px" />
                        <Text>Find : extansive , Replace with: extensive </Text>
                    </Flex>

                    <Flex>
                        <ListIcon as={CheckCircleIcon} color='green.500' mt="3px" />
                        <Text>Find : sustainabilities , Replace with: sustainability </Text>
                    </Flex>

                    <Flex>
                        <ListIcon as={CheckCircleIcon} color='green.500' mt="3px" />
                        <Text>Find : technology , Replace with: technologies </Text>
                    </Flex>

                </ListItem>

                {/*6.Find and Replace::================================================ */}
                <ListItem>
                    <Flex>
                        <Text fontWeight="bold">6. Indents, Line Spacing and Pictures:</Text>
                    </Flex>
                    <Flex>
                        <ListIcon as={CheckCircleIcon} color='green.500' mt="3px" />
                        <Text>
                            At slide My favorite smart city define indent 0.5 of the description, Adjust the line spacing with 1.5 . </Text>
                    </Flex>
                    <Flex>
                        <ListIcon as={CheckCircleIcon} color='green.500' mt="3px" />
                        <Text>
                            Make the pictures of the city as circle shape.</Text>
                    </Flex>
                </ListItem>

                {/*7.Find and Replace::================================================ */}
                <ListItem>
                    <Flex>
                        <Text fontWeight="bold">7. List:</Text>
                    </Flex>
                    <Flex>
                        <ListIcon as={CheckCircleIcon} color='green.500' mt="3px" />
                        <Text>At the last slide. (LIST OF SOME CITIES AROUND THE WORLD)</Text>
                    </Flex>
                    <Flex>
                        <ListIcon as={CheckCircleIcon} color='green.500' mt="3px" />
                        <Text>Change number list color to Blue color.</Text>
                    </Flex>
                    <Flex>
                        <ListIcon as={CheckCircleIcon} color='green.500' mt="3px" />
                        <Text>Change the start number of the second list to 6 make sure that both lists start from 1-10.</Text>
                    </Flex>
                    <Flex>
                        <ListIcon as={CheckCircleIcon} color='green.500' mt="3px" />
                        <Text>Add space between number list and text 0.5.</Text>
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
