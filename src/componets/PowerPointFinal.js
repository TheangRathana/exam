import { Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, Image, List, ListIcon, ListItem, Progress, Text } from '@chakra-ui/react'
import React, { useState } from 'react';
import storage from "../firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useToast } from '@chakra-ui/react';
import { AddIcon, CheckCircleIcon } from '@chakra-ui/icons';

export default function PowerPointFinal() {
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
            const storageRef = ref(storage, `/EHSS9FINAL/${file.name}`);

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
            <Heading mt="25px" textAlign="center" mb="25px">Final Exam (EHSS-9)</Heading>
            <List>
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
