import { Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, Image, List, ListIcon, ListItem, Progress, Text } from '@chakra-ui/react'
import React, { useState } from 'react';
import { AddIcon, CheckCircleIcon } from '@chakra-ui/icons';
import storage from "../firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useToast } from '@chakra-ui/react';
// import PowerpointFile from '../asset/powerpoint2016_slidebasics_practice.pptx';
import PowerpointFile from '../asset/PUC_PowerPoint.pptx';
import powerpoint2016 from '../asset/powerpoint2016.jpg';
import powerpoint2016_Bullet from '../asset/powerpoint2016_Bullet.jpg'

export default function Powerpoint() {
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
            const storageRef = ref(storage, `/powerpoint-EHSS-9B/${file.name}`);

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
                            <Text>Click download file : </Text>
                            <a
                                href={PowerpointFile}
                                download="download-"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <button style={{ color: "green" }}>powerpoint2016_slidebasics_practice.pptx</button>
                            </a>
                        </Flex>
                    </ListItem>
                    {/* <ListItem>
                        <Flex>
                            <ListIcon as={CheckCircleIcon} color='green.500' mt="3px" />
                            <Text>Design slide ទី 2 ​អោយមានទម្រង់ដូចរូបខាងក្រោម (10pt)</Text>
                        </Flex>
                        <Image src={powerpoint2016} />
                    </ListItem>
                    <ListItem>
                        <Flex>
                            <ListIcon as={CheckCircleIcon} color='green.500' mt="3px" />
                            <Text>ចុចលើ Slide ទី 4 ហើយកំណត់ list text ជា Hollow Square Bullet និងប្ដូព៌ណទៅជា Gold, Accent 4 (10pt)</Text>
                        </Flex>
                        <Image src={powerpoint2016_Bullet} />
                    </ListItem>
                    <ListItem>
                        <Flex>
                            <ListIcon as={CheckCircleIcon} color='green.500' mt="3px" />
                            <Text>ប្រើ find and replace ប្ដូពាក្យ a beach ទៅជា the beach និង​ benifits  ទៅជា benefits(10pt)</Text>
                        </Flex>
                    </ListItem>
                    <ListItem>
                        <Flex>
                            <ListIcon as={CheckCircleIcon} color='green.500' mt="3px" />
                            <Text>នៅ Slide ទី 7 add layout Title and Content (5pt)</Text>
                        </Flex>
                    </ListItem>
                    <ListItem>
                        <Flex>
                            <ListIcon as={CheckCircleIcon} color='green.500' mt="3px" />
                            <Text>Move slide ទី 7 ទៅជាទី 8 (5pt)</Text>
                        </Flex>
                    </ListItem>
                    <ListItem>
                        <Flex>
                            <ListIcon as={CheckCircleIcon} color='green.500' mt="3px" />
                            <Text>Applying Transitions Push ទៅ Slide ទី 1, 3, 4, (5pt)</Text>
                        </Flex>
                    </ListItem>
                    <ListItem>
                        <Flex>
                            <ListIcon as={CheckCircleIcon} color='green.500' mt="3px" />
                            <Text>Applying Transitions  Fade ទៅ Slide ទី 6(5pt)</Text>
                        </Flex>
                    </ListItem>
                    <ListItem>
                        <Flex>
                            <ListIcon as={CheckCircleIcon} color='green.500' mt="3px" />
                            <Text>ធ្វើការ save as ដោយដាក់ឈ្មោះរបស់អ្នក!</Text>
                        </Flex>
    </ListItem>*/}
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
