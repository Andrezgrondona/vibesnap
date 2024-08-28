
import React, { useEffect, useState } from 'react';
import { db, storage } from '../services/firebase';
import { collection, onSnapshot, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { 
  Button, 
  Input, 
  VStack, 
  Image, 
  SimpleGrid, 
  Box, 
  useToast, 
  Modal, 
  ModalOverlay, 
  ModalContent, 
  ModalHeader, 
  ModalCloseButton, 
  ModalBody, 
  ModalFooter, 
  Heading, 
  Flex 
} from '@chakra-ui/react';

const PhotosUserPage: React.FC = () => {
  const [photos, setPhotos] = useState<any[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isOpen, setIsOpen] = useState(false); 
  const toast = useToast();

  // Cargar fotos desde Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'photos'), (snapshot) => {
      const photosData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log('Fotos recuperadas:', photosData);
      setPhotos(photosData);
    });

    return unsubscribe; 
  }, []);

 
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  // Manejar la subida de fotos
  const handleUpload = async () => {
    if (file) {
      setIsUploading(true);
      try {
        const storageRef = ref(storage, `images/${file.name}`);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);

        // Guarda en Firestore
        await addDoc(collection(db, 'photos'), { url: downloadURL });

        toast({
          title: 'Foto subida exitosamente.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });

     
        setFile(null);
        setIsOpen(false); 
      } catch (error) {
        console.error('Error subiendo la foto: ', error);
        toast({
          title: 'Error al subir la foto.',
          description: 'Hubo un problema al subir la foto, intenta de nuevo.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <VStack spacing={6} p={6} bg="gray.50" borderRadius="md" boxShadow="md">
      <Heading as="h2" size="lg" color="orange.500">Galería de Fotos</Heading>
      <Flex direction="column" align="center" width="100%">
        <Button 
          colorScheme="orange" 
          onClick={() => setIsOpen(true)} 
          width="200px"
        >
          Subir tu Foto
        </Button>
      </Flex>
      <SimpleGrid 
        columns={{ base: 1, md: 2, lg: 3 }} 
        spacing={4} 
        width="100%"
      >
        {photos.map(photo => (
          <Box key={photo.id} border="1px solid #ccc" borderRadius="md" overflow="hidden">
            <Image 
              src={photo.url} 
              alt="Uploaded" 
              borderRadius="md" 
              objectFit="cover" 
              height="200px" 
              width="100%" 
            />
          </Box>
        ))}
      </SimpleGrid>

      {/* Modal para subir fotos */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sube tu Foto</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input 
              type="file" 
              onChange={handleFileChange} 
              accept="image/*"
              mb={4}
            />
          </ModalBody>
          <ModalFooter>
            <Button 
              colorScheme="orange" 
              onClick={handleUpload} 
              isLoading={isUploading} 
              isDisabled={!file}
            >
              Subir
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  );
};

export default PhotosUserPage;