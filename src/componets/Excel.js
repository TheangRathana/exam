import { Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, Image, List, ListIcon, ListItem, Progress, Text } from '@chakra-ui/react'
import React, { useState } from 'react';
import { AddIcon, CheckCircleIcon } from '@chakra-ui/icons';
import ExcelInvoice from '../asset/Excel-Invoice.jpg';
import storage from "../firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useToast } from '@chakra-ui/react';
import Final_Exam from '../asset/Final_Exam.xlsx'
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
            const storageRef = ref(storage, `/excel_Final_Exam/${file.name}`);

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
                <Heading mt="25px" textAlign="center" mb="25px">FINAL EXAM</Heading>
                <List spacing={3} fontSize={18} >
                    <ListItem>
                        <Flex>
                            <ListIcon as={CheckCircleIcon} color='green.500' mt="3px" />
                            <Text>Click download file : </Text>
                            <a
                                href={Final_Exam}
                                download="Example-PDF-document"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <button style={{ color: "green" }}>Final_Exam</button>
                            </a>
                        </Flex>
                    </ListItem>
                    <ListItem>
                        <Flex>
                            <ListIcon as={CheckCircleIcon} color='green.500' mt="3px" />
                            <Text>សូមធ្វើការ Save As ដោយដាក់ឈ្មោះពេញរបស់អ្នក (5pt)</Text>
                        </Flex>
                    </ListItem>
                    <ListItem>
                        <Flex>
                            <ListIcon as={CheckCircleIcon} color='green.500' mt="3px" />
                            <Text>បន្ទបា់មក Open file excel ក្នុង​ sheet AND </Text>
                        </Flex>
                    </ListItem>
                    <ListItem>
                        <Flex>
                            <ListIcon as={CheckCircleIcon} color='green.500' mt="3px" />
                            <Text>ចូរប្រើ AND Function ដើម្បីរក TRUE ឬ​ FLASE ដោយប្រើលក្ខណ៖ Value A ធំជាង 50,Value B តូចជាងឬស្មើ 50 ក្នុង Comparison Cell (20pt)</Text>
                        </Flex>
                    </ListItem>
                    <ListItem>
                        <Flex>
                            <ListIcon as={CheckCircleIcon} color='green.500' mt="3px" />
                            <Text>ប្រើ COUNTIF Function ដើម្បីរកចំនួនសរុបរបស់ TRUE​ និង​ FALSE (5pt)</Text>
                        </Flex>
                    </ListItem>
                    <ListItem>
                        <Flex>
                            <ListIcon as={CheckCircleIcon} color='green.500' mt="3px" />
                            <Text>ក្នុង​ sheet IF ចូរសិក្សាលក្ខណ IF តម្លៃ Value A+Value B តូចជាង 60 បង្ហាញពាក្យ Less Than 60 ក្រៅពីនេះខុសបង្ហាញពាក្យ Greater Than 60 (20pt)</Text>
                        </Flex>
                    </ListItem>
                   
                </List>
            </Box>
            {/* <Image src={ExcelInvoice} /> */}

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
