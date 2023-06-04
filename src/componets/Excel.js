import { Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, Image, List, ListIcon, ListItem, Progress, Text } from '@chakra-ui/react'
import React, { useState } from 'react';
import { AddIcon, CheckCircleIcon } from '@chakra-ui/icons';
import ExcelInvoice from '../asset/Excel-Invoice.jpg';
import storage from "../firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useToast } from '@chakra-ui/react';

export default function Excel() {
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
            const storageRef = ref(storage, `/excel/${file.name}`);

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
        <Box margin="auto" w="50%" >
            <Box fontFamily="Siemreap" >
                <Heading mt="25px" textAlign="center" mb="25px">MID-TERM EXAM</Heading>
                <List spacing={3} fontSize={18} >
                    <ListItem>
                        <Flex>
                            <ListIcon as={CheckCircleIcon} color='green.500' mt="3px" />
                            <Text> រៀបចំទម្រង INVOICE (25pt)</Text>
                        </Flex>
                    </ListItem>
                    <ListItem>
                        <Flex>
                            <ListIcon as={CheckCircleIcon} color='green.500' mt="3px" />
                            <Text>កំណត់ Format​ Number Cell UNIT PRICE និង Align Center (5pt)</Text>
                        </Flex>
                    </ListItem>
                    <ListItem>
                        <Flex>
                            <ListIcon as={CheckCircleIcon} color='green.500' mt="3px" />
                            <Text>កំណត់ Format​ Number Cell TOTAL និង Align Right (5pt)</Text>
                        </Flex>
                    </ListItem>
                    <ListItem>
                        <Flex>
                            <ListIcon as={CheckCircleIcon} color='green.500' mt="3px" />
                            <Text>កំណត់ Format​ Percentage TAX RATE និង Align Right (5pt)</Text>
                        </Flex>
                    </ListItem>
                    <ListItem>
                        <Flex>
                            <ListIcon as={CheckCircleIcon} color='green.500' mt="3px" />
                            <Text>កំណត់ Format​ Accounting Balance Due និង Align Middle (5pt)</Text>
                        </Flex>
                    </ListItem>
                    <ListItem>
                        <Flex>
                            <ListIcon as={CheckCircleIcon} color='green.500' mt="3px" />
                            <Text>ត្រូវប្រាកដថា INVOICE ត្រូវមាន Row A - F និង Column  1-38 (5pt)</Text>
                        </Flex>
                    </ListItem>
                </List>
            </Box>
            <Image src={ExcelInvoice} />

            <Card mb="50px" align='center' border='1px' borderColor='gray.200'>

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
        </Box >
    )
}
