import { Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, Image, List, ListIcon, ListItem, Progress, Text } from '@chakra-ui/react'
import React, { useState } from 'react';
import { AddIcon, CheckCircleIcon } from '@chakra-ui/icons';
import storage from "../firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useToast } from '@chakra-ui/react';

// import PowerpointFile from '../asset/PUC_PowerPoint.pptx';
import wordTable from '../asset/wordTable.JPG';
import dropcap from '../asset/dropcap.JPG'
import list1 from '../asset/list1.JPG'
import list2 from '../asset/list2.JPG'
import list3 from '../asset/list3.JPG'

export default function Word() {
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
            const storageRef = ref(storage, `/words/${file.name}`);

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
                <Heading mt="25px" textAlign="center" mb="25px">Final EXAM</Heading>
                {/* <Heading mt="25px" textAlign="center" mb="25px">MID-TERM EXAM</Heading> */}

                <List spacing={10} fontSize={18} >

                    <ListItem>
                        <Flex>
                            <ListIcon as={CheckCircleIcon} color='green.500' mt="3px" />
                            <Text fontWeight="bold">បើកកម្មវិធី Microsoft Word</Text>
                        </Flex>
                        <Flex>
                            <ListIcon as={CheckCircleIcon} color='green.500' mt="3px" />
                            <Text fontWeight="bold">ធ្វើការ Save File ដោយដាក់ឈ្មោះពេញរបស់អ្នក Example: Chan Thida ID14250</Text>
                        </Flex>
                    </ListItem>
                    <ListItem>
                        <Flex>
                            <ListIcon as={CheckCircleIcon} color='green.500' mt="3px" />
                            <Text fontWeight="bold">បង្កើត Table ដែលមានទម្រង់ដូចខាងក្រោម</Text>
                        </Flex>
                        <Image src={wordTable} />
                    </ListItem>
                    <ListItem>
                        <Flex>
                            <ListIcon as={CheckCircleIcon} color='green.500' mt="3px" />
                            <Text fontWeight="bold">ប្រើ Drop Cap ដើម្បីរៀបចំអត្ថបទដូចខាងក្រោម៖</Text>
                        </Flex>
                        <Image src={dropcap} />
                    </ListItem>
                    <Text>Copy អត្ថបទដូចខាងក្រោម៖</Text>
                    <Text>create Table
                        A drop cap (dropped capital) is a large capital letter used as a decorative element at the beginning of a paragraph or section. The size of a drop cap is usually two or more lines.</Text>

                    <ListItem>
                        <Flex>
                            <ListIcon as={CheckCircleIcon} color='green.500' mt="3px" />
                            <Text fontWeight="bold">បង្កើត Lists ដែលមានទម្រង់ដូចខាងក្រោម</Text>
                        </Flex>
                        <Image src={list1} />
                        <Image src={list2} />
                        <Image src={list3} />
                        <Text>Copy អត្ថបទដូចខាងក្រោម៖</Text>
                        <Text>New Members
                            Carolyn Serpinski
                            Social Media Marketing
                            Jackson Hull
                            Fundraising
                            Primarily Europe
                            Pablo Moreno
                            Co-Treasurer
                            <br />
                            ------------------------------
                            <br />
                            Treasurer’s Report
                            Fundraising Budget
                            Last month’s spending
                            Amount available this month
                            Outreach Budget
                            Last month’s spending
                            Future months
                            Social Media Campaign Budget
                            Beginning Balance
                            <br />
                            ------------------------------
                            <br />
                            Communications Report
                            Website overhaul
                            New marketing materials
                            New PR hires</Text>
                    </ListItem>
                </List>
            </Box>

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
        </Box >
    )
}
